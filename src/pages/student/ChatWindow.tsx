import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  Send,
  ChevronLeft,
  Languages,
  MessageCircle,
  Clock,
  BarChart2,
  Play,
  Pause,
  ArrowUp,
  X,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import FeedbackSectionModal from "./FeedbackSectionModel";
import { Progress } from "@/components/ui/progress";

interface Message {
  id: string;
  messageType: string;
  text?: string;
  type: "sent" | "received" | "system";
  feedback?: any;
  audioUrl?: string;
  audioPlayed?: boolean;
  hasFeedback?: boolean;
  hasAssessment?: boolean;
  assessments?: any;
  isCompleted?: boolean;
  loading?: boolean;
  audioURL?: string;
}

interface ChatWindowProps {
  onShowFeedback: (feedback: { type: string; content: any }) => void;
  onTopicImage: (imageUrl: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onShowFeedback, onTopicImage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [chatId, setChatId] = useState<string | null>(null);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
  const [sessionLimitReached, setSessionLimitReached] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [chatCompleted, setChatCompleted] = useState(false);
  const [processedResponses, setProcessedResponses] = useState(new Set());
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [topicImage, setTopicImage] = useState<string | null>(null);
  const [isFeedbackDialog, setIsFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);

  const lastRecordingEndTimeRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const streamRef = useRef<MediaStream | null>(null);
  const isCanceledRef = useRef(false);
  const activityTimerId = useRef<NodeJS.Timeout | null>(null);
  const intentionalDisconnectRef = useRef(false);

  const { topicId } = useParams();
  console.log(topicId)
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userId = userData?.id;
  const WS_URL = import.meta.env.VITE_API_BASE_URL.replace(/^http/, "ws");
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, []);

  const resetActivityTimer = () => {
    clearTimeout(activityTimerId.current as NodeJS.Timeout);
    activityTimerId.current = setTimeout(() => {
      console.log("Inactivity detected. Closing WebSocket and showing dialog.");
      setErrorMessage("You've been inactive. Closing connection.");
      setShowError(true);
      intentionalDisconnectRef.current = true;
      wsRef.current?.close();
      setIsInactiveDialogOpen(true);
    }, 60 * 1000 * 1);
  };

  const connectWebSocket = () => {
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      console.log(`WebSocket already ${wsRef.current.readyState === WebSocket.OPEN ? 'open' : 'connecting'}.`);
      if (wsRef.current.readyState === WebSocket.OPEN) {
        resetActivityTimer();
      }
      return;
    }

    console.log("Attempting to connect WebSocket...");
    intentionalDisconnectRef.current = false;
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS connected");
      setErrorMessage("");
      setShowError(false);
      getChatHistory();
      resetActivityTimer();
      if (mode === "photo-mode") {
        // getTopicPhoto();
      }
    };

    ws.onerror = (err) => {
      console.error("WS error", err);
      setErrorMessage("WebSocket connection error. Please try refreshing.");
      setShowError(true);
    };

    ws.onclose = () => {
      console.log("WS closed.");
      clearTimeout(activityTimerId.current as NodeJS.Timeout);
      if (intentionalDisconnectRef.current) {
        console.log("WS closed intentionally (e.g., inactivity, user action, component unmount).");
      } else if (!isInactiveDialogOpen) {
        console.warn("WS closed unexpectedly.");
        setErrorMessage("Connection lost. Please check your internet and refresh if the issue persists.");
        setShowError(true);
      }
    };

    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);

      switch (msg.type) {
        case "chat_history":
          handleChatHistory(msg);
          break;
        case "streaming_response":
          handleStreamingResponse(msg);
          break;
        case "speech_transcribed":
          handleSpeechTranscribed(msg);
          break;
        case "text":
          handleTextChunk(msg);
          break;
        case "meta":
          // handleMetaInfo(msg);
          break;
        case "error":
          handleError(msg);
          break;
        case "audio_chunk":
          break;
        case "session_status":
          handleSessionStatus(msg);
          break;
        case "attachment_url":
          handleAttachmentUrl(msg);
          break;
        default:
          console.log("Unknown message type:", msg.type);
      }
    };
  };

  useEffect(() => {
    let attempts = 0;
    // const maxAttempts = 3;
    let retryTimeoutId: NodeJS.Timeout | null = null;

    const tryConnect = () => {
      if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
        console.log("WebSocket already open or connecting.");
        return;
      }

      if (wsRef.current && wsRef.current.readyState === WebSocket.CLOSED) {
        wsRef.current.onopen = null;
        wsRef.current.onmessage = null;
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
      }

      console.log("Attempting WebSocket connection (attempt" + " " + attempts + 1);
      if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {}

      connectWebSocket();
    };

    tryConnect();

    return () => {
      intentionalDisconnectRef.current = true;
      clearTimeout(retryTimeoutId as unknown as NodeJS.Timeout);
      clearTimeout(activityTimerId.current as NodeJS.Timeout);
      if (wsRef.current) {
        console.log("Closing WebSocket on component unmount.");
        wsRef.current.onopen = null;
        wsRef.current.onerror = null;
        wsRef.current.onclose = null;
        wsRef.current.onmessage = null;
        wsRef.current.close();
      }
    };
  }, [WS_URL]);

  // Auto-play new audio when added
  useEffect(() => {
    const latestAudioMsg = messages.findLast(
      (msg:any) => msg.type === "received" && msg.audioUrl && !msg.audioPlayed
    );

    if (latestAudioMsg && audioRefs.current[latestAudioMsg.id]) {
      const audioElement = audioRefs.current[latestAudioMsg.id];
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingAudio(latestAudioMsg.id);
            setMessages((currentMessages) =>
              currentMessages.map((m) =>
                m.id === latestAudioMsg.id
                  ? { ...m, audioPlayed: true }
                  : m
              )
            );
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setPlayingAudio(latestAudioMsg.id);
          });
      }
    }
  }, [messages]);

  const handleAttachmentUrl = (msg: any) => {
    if (msg.data.attachment) {
      const imageUrl = Array.isArray(msg.data.attachment)
        ? msg.data.attachment[0]
        : msg.data.attachment;
      setTopicImage(imageUrl);
      if (onTopicImage) {
        onTopicImage(imageUrl);
      }
    }
  };

  const handleChatHistory = (msg: any) => {
    if (msg.chatHistory && Array.isArray(msg.chatHistory)) {
      const formattedMessages = msg.chatHistory
        .filter((message: any) => message.content.trim() !== "")
        .map((message: any) => ({
          id: message.id || Date.now() + Math.random().toString(),
          messageType: "text",
          text: message.content,
          type: message.sender === "ai" ? "received" : "sent",
          feedback: message.feedback || null,
          audioUrl: message.audioUrl || null,
          audioPlayed: true,
          hasFeedback: !!message.feedback,
          hasAssessment: !!message.assessments,
          assessments: message.assessments || null,
          isCompleted: message.isCompleted || false,
        }));
      setMessages(formattedMessages);
      if (msg.chatId) setChatId(msg.chatId);
      const isCompleted = msg.chatHistory.some((m: any) => m.isCompleted);
      setChatCompleted(isCompleted);
    }
  };

  const handleStreamingResponse = (msg: any) => {
    const responseKey = msg.data.ai_response || msg.data.tts_audio_url;
    if (responseKey && processedResponses.has(responseKey)) return;
    if (responseKey) setProcessedResponses((prev) => new Set([...prev, responseKey]));

    if (msg.data.ai_response) {
      updateOrAddMessage({
        messageType: "text",
        text: msg.data.ai_response,
        feedback: msg.data.feedback || null,
        type: "received",
        hasFeedback: !!msg.data.feedback,
      });
    }
    if (msg.data.tts_audio_url) updateOrAddAudioUrl(msg.data.tts_audio_url);
  };

  const handleSpeechTranscribed = (msg: any) => {
    setMessages((m) => [
      ...m,
      {
        id: Date.now().toString(),
        messageType: "text",
        text: msg.textMessage,
        type: "sent",
        assessments: msg.assessments || null,
        hasAssessment: !!msg.assessments,
      },
    ]);
    removeLoadingMessage();
  };

  const handleTextChunk = (msg: any) => {
    updateOrAddMessage({ messageType: "text", text: msg.data, type: "received" });
  };

  const handleError = (msg: any) => {
    console.error("Server error:", msg.message);
    setErrorMessage(msg.message);
    setShowError(true);
    if (msg.message.includes("Daily session limit")) setSessionLimitReached(true);
    if (msg.message.includes("This chat has been completed")) setChatCompleted(true);
    removeLoadingMessage();
  };

  const handleSessionStatus = (msg: any) => {
    if (msg.remainingSeconds !== undefined) {
      setSessionTimeRemaining(msg.remainingSeconds);
      if (msg.remainingSeconds < 60) {
        setErrorMessage(`Session time running out! Only ${msg.remainingSeconds} seconds left.`);
        setShowError(true);
      }
    }
  };

  const updateOrAddMessage = (messageData: Partial<Message>) => {
    setMessages((currentMessages) => {
      const lastAiMessageIndex = currentMessages.findLastIndex(
        (m:any) => m.type === "received" && (m.loading || m.text?.endsWith("..."))
      );
      if (lastAiMessageIndex !== -1) {
        const newMessages = [...currentMessages];
        newMessages[lastAiMessageIndex] = {
          ...newMessages[lastAiMessageIndex],
          ...messageData,
          id: newMessages[lastAiMessageIndex].id,
          loading: false,
        };
        return newMessages;
      } else {
        return [...currentMessages, { id: Date.now().toString(), ...messageData } as Message];
      }
    });
  };

  const updateOrAddAudioUrl = (audioUrl: string) => {
    setMessages((currentMessages) => {
      const lastAiMessageIndex = currentMessages.findLastIndex((m:any) => m.type === "received");
      if (lastAiMessageIndex !== -1) {
        const newMessages = [...currentMessages];
        newMessages[lastAiMessageIndex] = {
          ...newMessages[lastAiMessageIndex],
          audioUrl,
          audioPlayed: false,
        };
        return newMessages;
      }
      return currentMessages;
    });
  };

  const removeLoadingMessage = () => {
    setMessages((currentMessages) => currentMessages.filter((m) => !m.loading));
  };

  const toggleAudio = (id: string, _audioUrl: string) => {
    const audioElement = audioRefs.current[id];
    if (!audioElement) return;
    if (playingAudio === id) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio && audioRefs.current[playingAudio]) {
        audioRefs.current[playingAudio].pause();
      }
      audioElement.play().then(() => setPlayingAudio(id)).catch(console.error);
    }
  };

  const getChatHistory = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "getChatHistory", userId, topicId }));
    } else {
      console.warn("Cannot get chat history, WebSocket not open.");
    }
  };

  const sendPlaceholder = () => {
    setMessages((m) => [...m, { id: "loading-" + Date.now(), loading: true, messageType: "loading", type: "received" } as Message]);
  };

  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  const getSupportedAudioType = () => (isIOS() ? "audio/mp4" : "audio/webm");

  const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const cleanupRecording = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setRecordTime(0);
    setIsRecording(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => {
        try { t.stop(); } catch (err) { console.error("Error stopping track:", err); }
      });
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    lastRecordingEndTimeRef.current = Date.now();
  };

  const cancelRecording = () => {
    if (isRecording && mediaRecorderRef.current) {
      isCanceledRef.current = true;
      try {
        if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
      } catch (err) { console.error("Error stopping recorder:", err); }
      cleanupRecording();
    }
  };

  const sendRecording = async () => {
    if (isRecording && mediaRecorderRef.current) {
      try {
        if (isIOS() && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.requestData();
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
      } catch (err) {
        console.error("Error finalizing recording:", err);
        cleanupRecording();
      }
    }
  };

  const startRecording = async () => {
    if (sessionLimitReached || chatCompleted) {
      setErrorMessage(sessionLimitReached ? "Daily session limit reached." : "Chat completed.");
      setShowError(true);
      return;
    }
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setErrorMessage("Not connected. Please wait or try reconnecting.");
      setShowError(true);
      setIsInactiveDialogOpen(true);
      return;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => {
        try { t.stop(); } catch (err) { console.error("Error stopping previous track:", err); }
      });
      streamRef.current = null;
    }
    if (isIOS() && lastRecordingEndTimeRef.current) {
      const timeSinceLast = Date.now() - lastRecordingEndTimeRef.current;
      if (timeSinceLast < 1000) await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
    }

    try {
      const constraints = { audio: isIOS() ? { echoCancellation: true, noiseSuppression: true, sampleRate: 22050, channelCount: 1 } : true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const mimeType = getSupportedAudioType();
      streamRef.current = stream;
      const mr = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];
      isCanceledRef.current = false;

      clearInterval(timerRef.current as NodeJS.Timeout);
      setRecordTime(0);
      timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
        else console.warn("Received empty data chunk");
      };
      mr.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        cleanupRecording();
        setErrorMessage("Recording error. Please try again.");
        setShowError(true);
      };
      mr.onstop = async () => {
        try {
          if (isCanceledRef.current) {
            console.log("Recording canceled");
            cleanupRecording(); return;
          }
          if (audioChunksRef.current.length === 0) {
            console.warn("No audio data captured");
            cleanupRecording();
            setErrorMessage("No audio captured. Try again.");
            setShowError(true); return;
          }
          const blob = new Blob(audioChunksRef.current, { type: mimeType });
          if (blob.size < 100) {
            console.warn("Audio blob too small");
            cleanupRecording();
            setErrorMessage("Recording too short. Try again.");
            setShowError(true); return;
          }
          const audioURL = URL.createObjectURL(blob);
          setMessages((m) => [...m, { id: Date.now().toString(), messageType: "audio", audioURL, type: "sent" } as Message]);
          sendPlaceholder();
          const base64 = await blobToBase64(blob);
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ userId, topicId, chatId, format: mimeType.split("/")[1], type: "audio", payload: { audioBuffer: base64, format: mimeType } }));
            resetActivityTimer();
          } else {
            console.error("WebSocket not open for sending audio");
            setErrorMessage("Connection error. Refresh page.");
            setShowError(true);
            setIsInactiveDialogOpen(true);
          }
        } catch (error) {
          console.error("Error processing recording:", error);
          setErrorMessage("Error processing recording. Try again.");
          setShowError(true);
        } finally {
          cleanupRecording();
        }
      };
      mr.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      setErrorMessage(isIOS() ? "Mic access error (iOS). Check permissions." : "Mic access error. Check permissions.");
      setShowError(true);
      cleanupRecording();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    if (sessionLimitReached || chatCompleted) {
      setErrorMessage(sessionLimitReached ? "Daily session limit reached." : "Chat completed.");
      setShowError(true); return;
    }
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setErrorMessage("Not connected. Please wait or try reconnecting.");
      setShowError(true);
      setIsInactiveDialogOpen(true);
      return;
    }

    setMessages((m) => [...m, { id: Date.now().toString(), messageType: "text", text: message.trim(), type: "sent" } as Message]);
    sendPlaceholder();
    wsRef.current.send(JSON.stringify({ userId, topicId, chatId, type: "text", payload: { textMessage: message.trim() } }));
    setMessage("");
    resetActivityTimer();
  };

  const formatTime = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  const formatSessionTime = (seconds: number | null) => seconds === null ? "" : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const displayMessages = messages.filter((msg) => msg.type !== "system");
  // const handleCloseError = () => setShowError(false);
  const handleShowAssessment = (assessments: any) => onShowFeedback({ type: "assessment", content: assessments });
  const handleBackClick = () => navigate(-1);

  const handleStillThereYes = () => {
    setIsInactiveDialogOpen(false);
    setErrorMessage("");
    setShowError(false);
    intentionalDisconnectRef.current = false;
    console.log("User wants to continue. Reconnecting WebSocket...");
    connectWebSocket();
  };

  const handleStillThereNo = () => {
    setIsInactiveDialogOpen(false);
    intentionalDisconnectRef.current = true;
    wsRef.current?.close();
    console.log("User does not want to continue. Navigating away.");
    navigate(-1);
  };

  return (
    <div className="flex flex-col max-h-[86vh]  md:min-h-[82vh] md:max-h-[82vh] max-w-[800px] mx-auto bg-card rounded-xl overflow-hidden bg-gray-100 p-2">
      <header className="flex justify-between items-center px-6 border-b-3 border-white">
        <Button variant="ghost" size="icon" onClick={handleBackClick}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-font-dark">{mode === "photo-mode" ? "Photo Mode" : "Chat Mode"}</h2>
        {sessionTimeRemaining !== null && (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatSessionTime(sessionTimeRemaining)} remaining</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <select className="bg-background text-sm px-3 py-1 rounded-md">
            <option value="en">English</option>
          </select>
        </div>
      </header>

      <div className="sm:hidden">
        {mode === "photo-mode" && topicImage && (
          <img src={topicImage} alt="Topic context" className="p-4 w-full" />
        )}
      </div>

      {chatCompleted && <div className="bg-yellow-100 text-yellow-800 p-2 text-center">Chat completed. Cannot continue.</div>}
      {sessionLimitReached && <div className="bg-red-100 text-red-800 p-2 text-center">Daily session limit reached. Try again tomorrow.</div>}

      <div className="flex-1 overflow-y-auto p-1 flex flex-col gap-4">
        {displayMessages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-1 ${msg.type === "sent" ? "self-end" : "self-start"}`}>
            {msg.loading && (
              <div className="flex items-center gap-2">
                <Progress />
                <span>AI is typing...</span>
              </div>
            )}
            {msg.messageType === "text" && !msg.loading && (
              <div className={`p-3 rounded-xl max-w-[300px] ${msg.type === "sent" ? "bg-primary text-white rounded-tr-none" : "bg-white text-text-color-1 rounded-tl-none"}`}>
                {msg.text}
                <div className="flex gap-2 mt-2">
                  {!msg.loading && msg.audioUrl && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAudio(msg.id, msg.audioUrl as string)}
                        className={`flex items-center gap-1 ${playingAudio === msg.id ? "text-[#6250E9]" : "text-[#757575]"}`}
                      >
                        {playingAudio === msg.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        <span className="text-xs">Tap to play</span>
                      </Button>
                      <audio
                        ref={(el) => { if (el) audioRefs.current[msg.id] = el; }}
                        src={msg.audioUrl}
                        onEnded={() => setPlayingAudio(null)}
                        className="hidden"
                        playsInline
                      />
                    </>
                  )}
                  {msg.type === "received" && msg.hasFeedback && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setIsFeedbackDialog(true); setFeedback(msg.feedback); onShowFeedback({ type: "feedback", content: msg.feedback }); }}
                      className="flex items-center gap-1 text-[#6250E9] text-xs"
                    >
                      <MessageCircle className="h-4 w-4" />
                      View Feedback
                    </Button>
                  )}
                  {msg.type === "sent" && msg.hasAssessment && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShowAssessment(msg.assessments)}
                      className="flex items-center gap-1 text-[#6250E9] text-xs"
                    >
                      <BarChart2 className="h-4 w-4" />
                      View Assessment
                    </Button>
                  )}
                </div>
              </div>
            )}
            {msg.messageType === "audio" && <audio className="message-audio" src={msg.audioURL} controls />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex items-center bg-white rounded-full px-4 py-2">
          <Input
            type="text"
            value={message}
            disabled={isRecording || sessionLimitReached || chatCompleted || isInactiveDialogOpen}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isInactiveDialogOpen ? "Session paused..." :
              sessionLimitReached ? "Session limit reached" :
              chatCompleted ? "Chat completed" :
              isRecording ? "Recording..." :
              "Write message..."
            }
            className="flex-1 border-none focus:ring-0"
          />
          {isRecording && <span className="text-sm mx-2">{formatTime(recordTime)}</span>}

          {isRecording ? (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={cancelRecording}
                className="text-red-500 hover:bg-red-100"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={sendRecording}
                className="text-green-500 hover:bg-green-100"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          ) : message.trim() ? (
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={startRecording}
              disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {showError && (
        <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2">
          <AlertTitle>{errorMessage.includes("limit") || errorMessage.includes("completed") ? "Warning" : "Error"}</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isFeedbackDialog && feedback && (
        <FeedbackSectionModal
          isOpen={isFeedbackDialog}
          onClose={() => setIsFeedbackDialog(false)}
          feedback={feedback}
        />
      )}

      <Dialog open={isInactiveDialogOpen} onOpenChange={(open) => !open && handleStillThereNo()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you still there?</DialogTitle>
            <DialogDescription>
              Your session was paused due to inactivity. Do you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleStillThereNo}>
              No, End Session
            </Button>
            <Button onClick={handleStillThereYes}>
              Yes, Keep Me Here
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatWindow;
