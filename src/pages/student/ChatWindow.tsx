import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
import {
  Mic,
  Send,
  ChevronLeft,
  MessageCircle,
  Clock,
  BarChart2,
  Play,
  Pause,
  ArrowUp,
  X,
  LoaderPinwheel,
  Award,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// --- Centralized Logger ---
const logger = {
  log: (message: string, ...optionalParams: any[]) => {
    console.log(`[${new Date().toISOString()}] ${message}`, ...optionalParams);
  },
  emitting: (event: string, payload: any) => {
    console.log(
      `%c[Socket.IO EMIT] >> %c${event}`,
      "color: #f39c12; font-weight: bold;",
      "color: #f39c12;",
      { payload }
    );
  },
  receiving: (event: string, payload: any) => {
    console.log(
      `%c[Socket.IO RECEIVE] << %c${event}`,
      "color: #2ecc71; font-weight: bold;",
      "color: #2ecc71;",
      { payload }
    );
  },
  info: (message: string, data?: any) => {
    console.info(
      `%c[INFO] %c${message}`,
      "color: #3498db; font-weight: bold;",
      "color: inherit;",
      data || ""
    );
  },
  error: (message: string, error?: any) => {
    console.error(
      `%c[ERROR] %c${message}`,
      "color: #e74c3c; font-weight: bold;",
      "color: inherit;",
      error || ""
    );
  },
};

// --- Constants and Interfaces ---
const ChatEvents = {
  RESET_CHAT: "reset_chat",
  GET_CHAT_HISTORY: "getChatHistory",
  AUDIO: "audio",
  TEXT: "text",
  SESSION_STATUS: "session_status",
  ERROR: "error",
  AI_RESPONSE: "AI_RESPONSE",
  TTS_AUDIO_URL: "TTS_AUDIO_URL",
  CHAT_HISTORY: "chat_history",
  CHAT_COMPLETED: "chat_completed",
  ATTACHMENT_URL: "attachment_url",
  SPEECH_TRANSCRIBED: "speech_transcribed",
  STREAMING_COMPLETE: "streaming_complete",
  SESSION_STATUS_UPDATE: "session_status",
  BADGE_UNLOCKED: "badge_unlocked",
} as const;

interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  connect_error: (err: Error) => void;
  [ChatEvents.ERROR]: (payload: { message: string; error?: any }) => void;
  [ChatEvents.RESET_CHAT]: (payload: {
    success: boolean;
    message: string;
  }) => void;
  [ChatEvents.CHAT_HISTORY]: (payload: {
    chatHistory: any[];
    chatId: string;
  }) => void;
  [ChatEvents.CHAT_COMPLETED]: (payload: { message: string }) => void;
  [ChatEvents.ATTACHMENT_URL]: (payload: { attachment: string }) => void;
  [ChatEvents.SPEECH_TRANSCRIBED]: (payload: {
    textMessage: string;
    assessments: any;
  }) => void;
  [ChatEvents.SESSION_STATUS_UPDATE]: (payload: {
    remainingSeconds: number;
  }) => void;
  [ChatEvents.AI_RESPONSE]: (payload: {
    ai_response: string;
    feedback: string;
  }) => void;
  [ChatEvents.TTS_AUDIO_URL]: (payload: { tts_audio_url: string }) => void;
  [ChatEvents.STREAMING_COMPLETE]: (payload: {
    isCompleted: boolean;
    ai_response: string;
    feedback: string;
    ttsAudioUrl: string;
    [key: string]: any;
  }) => void;
  [ChatEvents.BADGE_UNLOCKED]: (payload: {
    userId: string;
    key: string;
    name: string;
    description: string;
    iconUrl: string;
    pointValue: number;
  }) => void;
}

interface ClientToServerEvents {
  [ChatEvents.RESET_CHAT]: (payload: {
    userId: string;
    topicId: string;
  }) => void;
  [ChatEvents.GET_CHAT_HISTORY]: (payload: {
    userId: string;
    topicId: string;
  }) => void;
  [ChatEvents.AUDIO]: (payload: {
    userId: string;
    chatId: string | null;
    audioBuffer: string;
    format: string;
  }) => void;
  [ChatEvents.TEXT]: (payload: {
    userId: string;
    chatId: string | null;
    textMessage: string;
  }) => void;
  [ChatEvents.SESSION_STATUS]: (payload: { userId: string }) => void;
}

interface Message {
  id: string;
  messageType: "text" | "audio" | "loading";
  text?: string;
  type: "sent" | "received";
  feedback?: any;
  audioUrl?: string;
  audioURL?: string;
  audioPlayed?: boolean;
  hasFeedback?: boolean;
  hasAssessment?: boolean;
  assessments?: any;
  loading?: boolean;
}

interface ChatWindowProps {
  onShowFeedback: (feedback: { type: string; content: any }) => void;
  onTopicImage: (imageUrl: string) => void;
}

function findLastIndex<T>(
  array: T[],
  predicate: (value: T) => boolean
): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) return i;
  }
  return -1;
}

const SILENT_AUDIO_URI =
  "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTG93IFJhdGUgU2FtcGxlA";

const ChatWindow: React.FC<ChatWindowProps> = ({
  onShowFeedback,
  onTopicImage,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [chatId, setChatId] = useState<string | null>(null);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState<
    number | null
  >(null);
  const [_sessionLimitReached, _setSessionLimitReached] = useState(false);
  const [chatCompleted, setChatCompleted] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [topicImage, setTopicImage] = useState<string | null>(null);
  const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [unlockedBadgeInfo, setUnlockedBadgeInfo] = useState<{
    name: string;
    description: string;
    iconUrl: string;
    pointValue: number;
  } | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isAudioContextUnlocked, setIsAudioContextUnlocked] = useState(false);

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isCanceledRef = useRef(false);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { topicId } = useParams<{ topicId: string }>();
  if (!topicId) throw new Error("Topic ID is required");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");
  const userData = JSON.parse(localStorage.getItem("AiTutorUser") || "{}");
  const userId = userData?.id;
  const SOCKET_URL =
    "https://malamute-content-cougar.ngrok-free.app/";

  const resetActivityTimer = useCallback(() => {
    if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
    activityTimerRef.current = setTimeout(() => {
      logger.info("User inactive, disconnecting socket.");
      socketRef.current?.disconnect();
      setIsInactiveDialogOpen(true);
    }, 2 * 60 * 1000);
  }, []);

  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  const getSupportedMimeType = () => {
    const types = [
      "audio/mp4",
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg",
    ];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return undefined;
  };

  const lastRecordingEndTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!userId) {
      toast.error("User information is missing.");
      logger.error("User ID is missing, cannot establish connection.");
      navigate(-1);
      return;
    }

    logger.info("Initializing Socket.IO connection...");
    const socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      query: { userId: userId },
      extraHeaders: { "ngrok-skip-browser-warning": "true" },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      logger.info(`Socket connected with ID: ${socket.id}`);
      setIsSocketConnected(true);
      toast.success("Connection established.");

      const historyPayload = { userId, topicId };
      logger.emitting(ChatEvents.GET_CHAT_HISTORY, historyPayload);
      socket.emit(ChatEvents.GET_CHAT_HISTORY, historyPayload);

      const sessionPayload = { userId };
      logger.emitting(ChatEvents.SESSION_STATUS, sessionPayload);
      socket.emit(ChatEvents.SESSION_STATUS, sessionPayload);

      resetActivityTimer();
    });

    socket.on("disconnect", () => {
      logger.info("Socket disconnected.");
      setIsSocketConnected(false);
      if (!isInactiveDialogOpen) toast.warning("Connection lost...");
    });

    socket.on("connect_error", (err) => {
      logger.error("Socket connection error:", err);
      toast.error(`Connection failed: ${err.message}`);
    });

    socket.on(ChatEvents.CHAT_HISTORY, (payload) => {
      logger.receiving(ChatEvents.CHAT_HISTORY, payload);
      const { chatHistory, chatId: newChatId } = payload;
      const formatted = chatHistory.map((msg: any) => ({
        id: msg.id,
        messageType: "text",
        text: msg.content,
        type: msg.sender === "ai" ? "received" : "sent",
        audioUrl: msg.audioUrl,
        audioPlayed: true,
        assessments: msg.assessments,
        hasAssessment: !!msg.assessments,
        feedback: msg.feedback,
        hasFeedback: !!msg.feedback,
      }));
      setMessages(formatted);
      setChatId(newChatId);
      if (chatHistory.some((m: any) => m.isCompleted)) {
        setChatCompleted(true);
        setIsCompleteDialogOpen(true);
      }
    });

    socket.on(ChatEvents.SPEECH_TRANSCRIBED, (payload) => {
      logger.receiving(ChatEvents.SPEECH_TRANSCRIBED, payload);
      const { textMessage, assessments } = payload;
      removeLoadingMessage();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: "sent",
          messageType: "text",
          text: textMessage,
          assessments,
          hasAssessment: !!assessments,
        },
      ]);

      sendPlaceholder();
    });

    socket.on(ChatEvents.AI_RESPONSE, (payload) => {
      logger.receiving(ChatEvents.AI_RESPONSE, payload);
      const { ai_response, feedback } = payload;
      setMessages((prev) => {
        const newMessages = [...prev];
        const i = findLastIndex(newMessages, (msg) => msg.loading === true);
        if (i !== -1) {
          newMessages[i] = {
            ...newMessages[i],
            loading: false,
            messageType: "text",
            type: "received",
            text: ai_response,
            feedback,
            hasFeedback: !!feedback,
          };
        }
        return newMessages;
      });
    });

    socket.on(ChatEvents.TTS_AUDIO_URL, (payload) => {
      logger.receiving(ChatEvents.TTS_AUDIO_URL, payload);
      const { tts_audio_url } = payload;
      setMessages((prev) => {
        const newMessages = [...prev];
        const i = findLastIndex(newMessages, (msg) => msg.type === "received");
        if (i !== -1) {
          newMessages[i] = {
            ...newMessages[i],
            audioUrl: tts_audio_url,
            audioPlayed: false,
          };
        }
        return newMessages;
      });
    });

    socket.on(ChatEvents.STREAMING_COMPLETE, (payload) => {
      logger.receiving(ChatEvents.STREAMING_COMPLETE, payload);
      const { ai_response, feedback, ttsAudioUrl, isCompleted } = payload;
      setMessages((prev) => {
        const newMessages = [...prev];
        const i = findLastIndex(newMessages, (msg) => msg.loading === true);
        if (i !== -1) {
          newMessages[i] = {
            id: newMessages[i].id,
            loading: false,
            messageType: "text",
            type: "received",
            text: ai_response,
            feedback,
            hasFeedback: !!feedback,
            audioUrl: ttsAudioUrl,
            audioPlayed: false,
          };
        }
        return newMessages;
      });
      if (isCompleted) {
        setChatCompleted(true);
        setIsCompleteDialogOpen(true);
      }
    });

    socket.on(ChatEvents.SESSION_STATUS_UPDATE, (payload) => {
      logger.receiving(ChatEvents.SESSION_STATUS_UPDATE, payload);
      setSessionTimeRemaining(payload.remainingSeconds);
    });
    socket.on(ChatEvents.ERROR, (payload) => {
      logger.receiving(ChatEvents.ERROR, payload);
      toast.error(payload.message);
    });
    socket.on(ChatEvents.CHAT_COMPLETED, (payload) => {
      logger.receiving(ChatEvents.CHAT_COMPLETED, payload);
      setChatCompleted(true);
      setIsCompleteDialogOpen(true);
      toast.info(payload.message);
    });
    socket.on(ChatEvents.ATTACHMENT_URL, (payload) => {
      logger.receiving(ChatEvents.ATTACHMENT_URL, payload);
      setTopicImage(payload.attachment);
      onTopicImage(payload.attachment);
    });

    socket.on(ChatEvents.BADGE_UNLOCKED, (payload) => {
      logger.receiving(ChatEvents.BADGE_UNLOCKED, payload);
      setUnlockedBadgeInfo({
        name: payload.name,
        description: payload.description,
        iconUrl: payload.iconUrl,
        pointValue: payload.pointValue,
      });
      setIsBadgeModalOpen(true);
      toast.success(`🎉 New Badge Unlocked: ${payload.name}!`);
    });

    return () => {
      logger.info("Component unmounting. Disconnecting socket.");
      if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
      socket.disconnect();
    };
  }, [userId, topicId, navigate, resetActivityTimer, onTopicImage]);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const unlockAudioContext = useCallback(() => {
    if (isAudioContextUnlocked || (window as any).isAudioContextUnlocked) return;
    logger.info("Attempting to unlock audio context...");
    const audio = new Audio(SILENT_AUDIO_URI);
    audio
      .play()
      .then(() => {
        logger.info("Audio context unlocked successfully globally.");
        setIsAudioContextUnlocked(true);
        (window as any).isAudioContextUnlocked = true;
      })
      .catch((error) => {
        logger.error(
          "Could not unlock audio context. Autoplay will likely fail.",
          error
        );
      });
  }, [isAudioContextUnlocked]);

  const sendPlaceholder = () => {
    logger.info("Adding AI thinking placeholder to UI.");
    setMessages((prev) => [
      ...prev,
      {
        id: `loading-${Date.now()}`,
        loading: true,
        messageType: "loading",
        type: "received",
      },
    ]);
  };
  const removeLoadingMessage = () => {
    logger.info("Removing AI thinking placeholder from UI.");
    setMessages((prev) => prev.filter((m) => !m.loading));
  };

  const blobToBase64 = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        reader.result
          ? resolve((reader.result as string).split(",")[1])
          : reject("Blob read failed");
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const cleanupRecording = () => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    if (streamRef.current)
      streamRef.current.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
    setRecordTime(0);
    streamRef.current = null;
    mediaRecorderRef.current = null;

    lastRecordingEndTimeRef.current = Date.now();
  };

  const startRecording = async () => {
    logger.info("Start recording requested.");
    unlockAudioContext();
    if (chatCompleted || _sessionLimitReached) {
      toast.warning("Cannot record: The chat session is complete.");
      return;
    }

    if (isIOS() && lastRecordingEndTimeRef.current) {
      const timeSinceLast = Date.now() - lastRecordingEndTimeRef.current;
      if (timeSinceLast < 1000) {
        logger.info(`iOS cooldown active: waiting ${1000 - timeSinceLast}ms`);
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 - timeSinceLast)
        );
      }
    }

    try {
      logger.info("Requesting user media...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = getSupportedMimeType();
      if (!mimeType) {
        toast.error(
          "Your browser does not support any of the required audio formats."
        );
        logger.error("No supported MIME type found for MediaRecorder.");
        cleanupRecording();
        return;
      }
      logger.info(`Using supported MIME type: ${mimeType}`);

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      isCanceledRef.current = false;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const wasCanceled = isCanceledRef.current;
        cleanupRecording();

        if (wasCanceled) {
          logger.info("Recording canceled by user.");
          return;
        }
        if (audioChunksRef.current.length === 0) {
          logger.error("No audio chunks recorded, stopping.");
          toast.error("No audio was captured. Please try again.");
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        if (audioBlob.size < 200) {
          logger.error(`Recorded blob is too small (${audioBlob.size} bytes).`);
          toast.error("Recording was too short. Please try again.");
          return;
        }

        const audioURL = URL.createObjectURL(audioBlob);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: "sent",
            messageType: "audio",
            audioURL,
          },
        ]);

        sendPlaceholder();
        const audioBase64 = await blobToBase64(audioBlob);
        const format = mimeType.split("/")[1].split(";")[0];
        const payload = { userId, chatId, audioBuffer: audioBase64, format };
        socketRef.current?.emit(ChatEvents.AUDIO, payload);
        resetActivityTimer();
      };

      recorder.onerror = (event) => {
        logger.error("MediaRecorder error:", event);
        toast.error("An unknown error occurred during recording.");
        cleanupRecording();
      };
      
      recorder.start();
      setIsRecording(true);
      recordTimerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);
      
    } catch (err: any) {
      logger.error("CRITICAL: Error starting recording:", {
        name: err.name,
        message: err.message,
      });
      let errorMessage = "An unknown microphone error occurred.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        errorMessage = "Microphone access denied. Please enable it in your browser settings.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        errorMessage = "No microphone found. Please connect a microphone and try again.";
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
        errorMessage = "Your microphone is already in use by another application.";
      }
      toast.error(errorMessage);
      cleanupRecording();
    }
  };

  const stopRecording = async (cancel = false) => {
    logger.info(`Stopping recording. Cancel: ${cancel}`);
    isCanceledRef.current = cancel;
    if (mediaRecorderRef.current?.state === "recording") {
      if (!cancel && isIOS()) {
        logger.info("iOS: Forcing requestData() before stop.");
        mediaRecorderRef.current.requestData();
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      mediaRecorderRef.current.stop();
    }
    else cleanupRecording();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    logger.info("Form submitted.");

    unlockAudioContext();

    if (!message.trim() || !isSocketConnected) {
      logger.error("Cannot send message.", {
        message: message.trim(),
        isSocketConnected,
      });
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: "sent",
        messageType: "text",
        text: message.trim(),
      },
    ]);
    sendPlaceholder();
    const payload = { userId, chatId, textMessage: message.trim() };
    logger.emitting(ChatEvents.TEXT, payload);
    socketRef.current?.emit(ChatEvents.TEXT, payload);
    setMessage("");
    resetActivityTimer();
  };

  const handleResetChat = () => {
    logger.info("Handling chat reset and reconnecting socket.");
    if (!socketRef.current) return toast.error("Socket not available.");

    const payload = { userId, topicId };
    logger.emitting(ChatEvents.RESET_CHAT, payload);
    socketRef.current.emit(ChatEvents.RESET_CHAT, payload);

    
    // Clear local state immediately for a responsive UI.
    // This makes the app feel faster.
    setMessages([]);
    setChatCompleted(false);
    setIsCompleteDialogOpen(false);
    setPlayingAudio(null);
    toast.info("Resetting chat session...");

    // 1. Tell the server to RESET the chat for this user and topic.
    const resetPayload = { userId, topicId };
    logger.emitting(ChatEvents.RESET_CHAT, resetPayload);
    socketRef.current.emit(ChatEvents.RESET_CHAT, resetPayload);

    // 2. IMMEDIATELY ask for the chat history again.
    // The server will have just deleted it, so this will return a fresh, empty state.
    const historyPayload = { userId, topicId };
    logger.emitting(ChatEvents.GET_CHAT_HISTORY, historyPayload);
    socketRef.current.emit(ChatEvents.GET_CHAT_HISTORY, historyPayload);
  };

  const handleStillThere = (isContinuing: boolean) => {
    setIsInactiveDialogOpen(false);
    logger.info(
      `User responded to inactivity dialog. Continuing: ${isContinuing}`
    );
    if (isContinuing) {
      logger.info("Reconnecting socket due to user confirmation.");
      socketRef.current?.connect();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const audioMsg = messages.find(
      (msg) => msg.type === "received" && msg.audioUrl && !msg.audioPlayed
    );

    if (
      audioMsg &&
      audioRefs.current[audioMsg.id] &&
      !autoplayFailed &&
      (isAudioContextUnlocked || (window as any).isAudioContextUnlocked)
    ) {
      logger.info(
        `Attempting to auto-play audio for message ID: ${audioMsg.id}`
      );

      const audio = audioRefs.current[audioMsg.id];
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            logger.info(`Autoplay successful for message ID: ${audioMsg.id}`);
            setPlayingAudio(audioMsg.id);
            setMessages((current) =>
              current.map((m) =>
                m.id === audioMsg.id ? { ...m, audioPlayed: true } : m
              )
            );
          })
          .catch((error) => {
            logger.error("Autoplay was prevented by the browser.", error);
            setAutoplayFailed(true);
            toast.info("Autoplay is disabled. Tap a message to play audio.", {
              duration: 5000,
            });
          });
      }
    }
  }, [messages, autoplayFailed, isAudioContextUnlocked]);

  const handleShowAssessment = (assessments: any) => {
    logger.info("Showing assessment.", { assessments });
    onShowFeedback({ type: "assessment", content: assessments });
  };

  const toggleAudio = (id: string) => {
    const audioElement = audioRefs.current[id];
    if (!audioElement) return;
    logger.info(
      `Toggling audio for message ID: ${id}. Current playing: ${playingAudio}`
    );
    if (playingAudio === id) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio && audioRefs.current[playingAudio]) {
        audioRefs.current[playingAudio].pause();
      }
      audioElement
        .play()
        .then(() => setPlayingAudio(id))
        .catch(console.error);
    }
  };

  const formatTime = (sec: number) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(
      sec % 60
    ).padStart(2, "0")}`;

  return (
    <div className="flex flex-col max-h-[86vh] min-h-[86vh] md:min-h-[82vh] md:max-h-[82vh] max-w-[800px] mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">
          {mode === "photo-mode" ? "Photo Mode" : "Chat Mode"}
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>
            {sessionTimeRemaining ? formatTime(sessionTimeRemaining) : "..."}
          </span>
        </div>
      </header>

      <div className="md:hidden">
        {mode === "photo-mode" && topicImage && (
          <div className="p-4 bg-black">
            <img
              src={topicImage}
              alt="Topic context"
              className="w-full rounded-lg object-contain max-h-48"
            />
          </div>
        )}
      </div>
      {_sessionLimitReached && (
        <div className="bg-yellow-500 text-white text-center p-2 text-sm font-semibold">
          You have reached your session limit.
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${msg.type === "sent"
              ? "self-end items-end"
              : "self-start items-start"
              }`}
          >
            {msg.loading ? (
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm">
                <LoaderPinwheel
                  size={18}
                  className="animate-spin text-primary"
                />
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            ) : msg.messageType === "audio" && msg.audioURL ? (
              <div className="p-2 bg-primary rounded-xl shadow">
                <audio
                  src={msg.audioURL}
                  controls
                  className="message-audio h-10"
                />
              </div>
            ) : (
              <div
                className={`p-3 rounded-xl max-w-md shadow-sm ${msg.type === "sent"
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-white text-gray-800 rounded-tl-none"
                  }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
                <div className="flex gap-2 items-center mt-2 flex-wrap">
                  {msg.type === "received" && msg.audioUrl && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAudio(msg.id)}
                        className={`flex items-center gap-1 p-1 h-auto ${playingAudio === msg.id
                          ? "text-primary font-semibold"
                          : "text-gray-500"
                          } ${autoplayFailed && !playingAudio
                            ? "animate-pulse text-blue-600"
                            : ""
                          }`}
                      >
                        {playingAudio === msg.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span className="text-xs">
                          {autoplayFailed ? "Tap to Play" : "Tap to play"}
                        </span>
                      </Button>

                      <audio
                        ref={(el) => {
                          if (el) audioRefs.current[msg.id] = el;
                        }}
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
                      onClick={() =>
                        onShowFeedback({
                          type: "feedback",
                          content: msg.feedback,
                        })
                      }
                      className="flex items-center gap-1 text-primary text-xs p-1 h-auto"
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
                      className="flex items-center gap-1 bg-white text-primary text-xs p-1 h-auto rounded-md shadow-sm border"
                    >
                      <BarChart2 className="h-4 w-4" />
                      View Assessment
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 bg-gray-50">
        <div className="flex items-center bg-white rounded-full px-4 py-1 shadow-sm">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isRecording
                ? `Recording... ${formatTime(recordTime)}`
                : "Write a message or press mic..."
            }
            disabled={
              isRecording ||
              chatCompleted ||
              _sessionLimitReached ||
              !isSocketConnected
            }
            className="flex-1 border-none focus:ring-0 bg-transparent"
          />
          {isRecording ? (
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => stopRecording(true)}
                className="text-red-500 hover:bg-red-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => stopRecording(false)}
                className="text-green-500 hover:bg-green-100 rounded-full"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>
          ) : message.trim() ? (
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="text-primary"
              disabled={!isSocketConnected || chatCompleted}
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-primary"
              onClick={startRecording}
              disabled={!isSocketConnected || chatCompleted}
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>

      <Dialog
        open={isCompleteDialogOpen}
        onOpenChange={(open) => !open && navigate(-1)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Completed</DialogTitle>
            <DialogDescription>
              This conversation has ended. Would you like to start over?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => navigate(-1)}>
              End Session
            </Button>
            <Button onClick={handleResetChat}>Reset Chat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isInactiveDialogOpen}
        onOpenChange={(open) => !open && handleStillThere(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you still there?</DialogTitle>
            <DialogDescription>
              Your session was paused due to inactivity. Do you want to
              continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleStillThere(false)}>
              No, End Session
            </Button>
            <Button onClick={() => handleStillThere(true)}>
              Yes, I'm Here
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBadgeModalOpen} onOpenChange={setIsBadgeModalOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <Award className="h-7 w-7 text-yellow-500" />
              Badge Unlocked!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Congratulations! You've earned a new badge for your progress.
            </DialogDescription>
          </DialogHeader>
          {unlockedBadgeInfo && (
            <div className="flex flex-col items-center justify-center p-4 my-4 bg-gray-50 rounded-lg">
              <img
                src={unlockedBadgeInfo.iconUrl}
                alt={unlockedBadgeInfo.name}
                className="w-24 h-24 mb-4 drop-shadow-lg"
              />
              <h3 className="text-xl font-semibold text-primary">
                {unlockedBadgeInfo.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {unlockedBadgeInfo.description}
              </p>
              <p className="text-lg font-bold text-yellow-600 mt-4">
                +{unlockedBadgeInfo.pointValue} Points
              </p>
            </div>
          )}
          <DialogFooter className="sm:justify-center">
            <Button onClick={() => setIsBadgeModalOpen(false)} className="w-full">
              Claim & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatWindow;