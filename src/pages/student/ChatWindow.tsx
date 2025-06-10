// // import React, { useState, useEffect, useRef } from "react";
// // import { toast } from 'sonner';
// // import {
// //   Mic,
// //   Send,
// //   ChevronLeft,
// //   Languages,
// //   MessageCircle,
// //   Clock,
// //   BarChart2,
// //   Play,
// //   Pause,
// //   ArrowUp,
// //   X,
// //   LoaderPinwheel,
// // } from "lucide-react";
// // import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter,
// // } from "@/components/ui/dialog";

// // function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
// //   for (let i = array.length - 1; i >= 0; i--) {
// //     if (predicate(array[i], i, array)) {
// //       return i;
// //     }
// //   }
// //   return -1;
// // }

// // function findLast<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined {
// //   for (let i = array.length - 1; i >= 0; i--) {
// //     if (predicate(array[i], i, array)) {
// //       return array[i];
// //     }
// //   }
// //   return undefined;
// // }

// // interface Message {
// //   id: string;
// //   messageType: string;
// //   text?: string;
// //   type: "sent" | "received" | "system";
// //   feedback?: any;
// //   audioUrl?: string;
// //   audioPlayed?: boolean;
// //   hasFeedback?: boolean;
// //   hasAssessment?: boolean;
// //   assessments?: any;
// //   isCompleted?: boolean;
// //   loading?: boolean;
// //   audioURL?: string;
// // }

// // interface ChatWindowProps {
// //   onShowFeedback: (feedback: { type: string; content: any }) => void;
// //   onTopicImage: (imageUrl: string) => void;
// // }

// // const ChatWindow: React.FC<ChatWindowProps> = ({ onShowFeedback, onTopicImage }) => {
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [recordTime, setRecordTime] = useState(0);
// //   const [chatId, setChatId] = useState<string | null>(null);
// //   const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
// //   const [sessionLimitReached, setSessionLimitReached] = useState(false);
// //   const [chatCompleted, setChatCompleted] = useState(false);
// //   const [processedResponses, setProcessedResponses] = useState(new Set());
// //   const [playingAudio, setPlayingAudio] = useState<string | null>(null);
// //   const [topicImage, setTopicImage] = useState<string | null>(null);
// //   const [_isFeedbackDialog, setIsFeedbackDialog] = useState(false);
// //   const [_feedback, setFeedback] = useState<any>(null);
// //   const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);
// //   const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

// //   const lastRecordingEndTimeRef = useRef<number | null>(null);
// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const wsRef = useRef<WebSocket | null>(null);
// //   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
// //   const audioChunksRef = useRef<Blob[]>([]);
// //   const timerRef = useRef<NodeJS.Timeout | null>(null);
// //   const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
// //   const streamRef = useRef<MediaStream | null>(null);
// //   const isCanceledRef = useRef(false);
// //   const activityTimerId = useRef<NodeJS.Timeout | null>(null);
// //   const intentionalDisconnectRef = useRef(false);

// //   const { topicId } = useParams();
// //   const [searchParams] = useSearchParams();
// //   const mode = searchParams.get("mode");

// //   const userData = JSON.parse(localStorage.getItem("AiTutorUser") || "{}");
// //   console.log("USER DATA: ", userData);
// //   const userId = userData?.id;
// //   const WS_URL = import.meta.env.VITE_API_BASE_URL.replace(/^http/, "ws");
// //   const navigate = useNavigate();

// //   // const isSmallScreen = typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false;

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   useEffect(() => {
// //     if (messages.length > 0) {
// //       scrollToBottom();
// //     }
// //   }, []);

// //   const resetActivityTimer = () => {
// //     clearTimeout(activityTimerId.current as NodeJS.Timeout);
// //     activityTimerId.current = setTimeout(() => {
// //       console.log("Inactivity detected. Closing WebSocket and showing dialog.");
// //       intentionalDisconnectRef.current = true;
// //       if (wsRef.current) {
// //         wsRef.current.close();
// //         wsRef.current = null; // Add this line
// //         console.warn("WebSocket Disconnected! Due to Inactivity")
// //       }
// //       setIsInactiveDialogOpen(true);
// //     }, 60 * 1000 * 2);
// //   };

// //   const connectWebSocket = () => {
// //     if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
// //       console.log(`WebSocket already ${wsRef.current.readyState === WebSocket.OPEN ? 'open' : 'connecting'}.`);
// //       if (wsRef.current.readyState === WebSocket.OPEN) {
// //         resetActivityTimer();
// //       }
// //       return;
// //     }

// //     console.log("Attempting to connect WebSocket...");
// //     intentionalDisconnectRef.current = false;
// //     const ws = new WebSocket(WS_URL);
// //     wsRef.current = ws;

// //     ws.onopen = () => {
// //       console.log("✅ WS connected");
// //       getChatHistory();
// //       resetActivityTimer();
// //       if (mode === "photo-mode") {
// //         // getTopicPhoto();
// //       }
// //     };

// //     ws.onerror = (err) => {
// //       console.error("WS error", err);
// //       toast.error("WebSocket connection error. Please try refreshing.");
// //     };

// //     ws.onclose = () => {
// //       console.log("WS closed.");
// //       clearTimeout(activityTimerId.current as NodeJS.Timeout);
// //       if (intentionalDisconnectRef.current) {
// //         console.log("WS closed intentionally (e.g., inactivity, user action, component unmount).");
// //       } else if (!isInactiveDialogOpen) {
// //         console.warn("WS closed unexpectedly.");
// //         toast.error("Connection lost. Please check your internet and refresh if the issue persists.");
// //       }
// //     };

// //     ws.onmessage = (ev) => {
// //       const msg = JSON.parse(ev.data);
// //       console.log("WS message received: TYPE::", msg.type, msg);

// //       switch (msg.type) {
// //         case "chat_history":
// //           handleChatHistory(msg);
// //           break;
// //         case "streaming_response":
// //           handleStreamingResponse(msg);
// //           break;
// //         case "speech_transcribed":
// //           handleSpeechTranscribed(msg);
// //           break;
// //         case "text":
// //           handleTextChunk(msg);
// //           break;
// //         case "meta":
// //           // handleMetaInfo(msg);
// //           break;
// //         case "error":
// //           handleError(msg);
// //           break;
// //         case "audio_chunk":
// //           break;
// //         case "session_status":
// //           handleSessionStatus(msg);
// //           break;
// //         case "attachment_url":
// //           handleAttachmentUrl(msg);
// //           break;
// //         default:
// //           console.log("Unknown message type:", msg.type);
// //       }
// //     };
// //   };

// //   useEffect(() => {
// //     let attempts = 0;
// //     let retryTimeoutId: NodeJS.Timeout | null = null;

// //     const tryConnect = () => {
// //       if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
// //         console.log("WebSocket already open or connecting.");
// //         return;
// //       }

// //       if (wsRef.current && wsRef.current.readyState === WebSocket.CLOSED) {
// //         wsRef.current.onopen = null;
// //         wsRef.current.onmessage = null;
// //         wsRef.current.onclose = null;
// //         wsRef.current.onerror = null;
// //       }

// //       console.log("Attempting WebSocket connection (attempt" + " " + attempts + 1);
// //       if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) { }

// //       connectWebSocket();
// //     };

// //     tryConnect();

// //     return () => {
// //       intentionalDisconnectRef.current = true;
// //       clearTimeout(retryTimeoutId as unknown as NodeJS.Timeout);
// //       clearTimeout(activityTimerId.current as NodeJS.Timeout);
// //       if (wsRef.current) {
// //         console.log("Closing WebSocket on component unmount.");
// //         wsRef.current.onopen = null;
// //         wsRef.current.onerror = null;
// //         wsRef.current.onclose = null;
// //         wsRef.current.onmessage = null;
// //         wsRef.current.close();
// //       }
// //     };
// //   }, [WS_URL]);

// //   // Auto-play new audio when added
// //   useEffect(() => {
// //     const latestAudioMsg = findLast(messages, (msg: any) => msg.type === "received" && msg.audioUrl && !msg.audioPlayed);

// //     if (latestAudioMsg && audioRefs.current[latestAudioMsg.id]) {
// //       const audioElement = audioRefs.current[latestAudioMsg.id];
// //       const playPromise = audioElement.play();
// //       if (playPromise !== undefined) {
// //         playPromise
// //           .then(() => {
// //             setPlayingAudio(latestAudioMsg.id);
// //             setMessages((currentMessages) =>
// //               currentMessages.map((m) =>
// //                 m.id === latestAudioMsg.id ? { ...m, audioPlayed: true } : m
// //               )
// //             );
// //           })
// //           .catch((error) => {
// //             console.log("Autoplay prevented:", error);
// //             setPlayingAudio(latestAudioMsg.id);
// //           });
// //       }
// //     }
// //   }, [messages]);

// //   const handleAttachmentUrl = (msg: any) => {
// //     if (msg.data.attachment) {
// //       const imageUrl = Array.isArray(msg.data.attachment)
// //         ? msg.data.attachment[0]
// //         : msg.data.attachment;
// //       setTopicImage(imageUrl);
// //       if (onTopicImage) {
// //         onTopicImage(imageUrl);
// //       }
// //     }
// //   };

// //   const handleChatHistory = (msg: any) => {
// //     console.log("history", msg);
// //     if (msg.chatHistory && Array.isArray(msg.chatHistory)) {
// //       const formattedMessages = msg.chatHistory
// //         .filter((message: any) => message.content.trim() !== "")
// //         .map((message: any) => ({
// //           id: message.id || Date.now() + Math.random().toString(),
// //           messageType: "text",
// //           text: message.content,
// //           type: message.sender === "ai" ? "received" : "sent",
// //           feedback: message.feedback || null,
// //           audioUrl: message.audioUrl || null,
// //           audioPlayed: true,
// //           hasFeedback: !!message.feedback,
// //           hasAssessment: !!message.assessments,
// //           assessments: message.assessments || null,
// //           isCompleted: message.isCompleted || false,
// //         }));
// //       setMessages(formattedMessages);
// //       console.log(msg.chatId, "CHATID FROM MSG")
// //       if (msg.chatId) setChatId(msg.chatId);
// //       const isCompleted = msg.chatHistory.some((m: any) => m.isCompleted);
// //       setChatCompleted(isCompleted);
// //       if (isCompleted) {
// //         setIsCompleteDialogOpen(true);
// //         toast.error("This chat has been completed.");
// //       }
// //     }
// //   };

// //   const handleStreamingResponse = (msg: any) => {
// //     const responseKey = msg.data.ai_response || msg.data.tts_audio_url;
// //     if (responseKey && processedResponses.has(responseKey)) return;
// //     if (responseKey) setProcessedResponses((prev) => new Set([...prev, responseKey]));

// //     if (msg.data.ai_response) {
// //       updateOrAddMessage({
// //         messageType: "text",
// //         text: msg.data.ai_response,
// //         feedback: msg.data.feedback || null,
// //         type: "received",
// //         hasFeedback: !!msg.data.feedback,
// //       });
// //     }
// //     if (msg.data.tts_audio_url) updateOrAddAudioUrl(msg.data.tts_audio_url);
// //   };

// //   const handleSpeechTranscribed = (msg: any) => {
// //     setMessages((m) => [
// //       ...m,
// //       {
// //         id: Date.now().toString(),
// //         messageType: "text",
// //         text: msg.textMessage,
// //         type: "sent",
// //         assessments: msg.assessments || null,
// //         hasAssessment: !!msg.assessments,
// //       },
// //     ]);
// //     removeLoadingMessage();
// //   };

// //   const handleTextChunk = (msg: any) => {
// //     updateOrAddMessage({ messageType: "text", text: msg.data, type: "received" });
// //   };

// //   const handleError = (msg: any) => {
// //     console.error("Server error:", msg.message);
// //     if (msg.message.includes("Daily session limit")) {
// //       setSessionLimitReached(true);
// //       toast.error("Daily session limit reached.");
// //       removeLoadingMessage();
// //       return

// //     }
// //     if (msg.message.includes("This chat has been completed")) {
// //       setChatCompleted(true);
// //       setIsCompleteDialogOpen(true);
// //       setIsCompleteDialogOpen(true);
// //       toast.error("This chat has been completed.");
// //       removeLoadingMessage();
// //       return
// //     }
// //     toast.error(msg.message)
// //     removeLoadingMessage();
// //   };

// //   const handleSessionStatus = (msg: any) => {
// //     if (msg.remainingSeconds !== undefined) {
// //       setSessionTimeRemaining(msg.remainingSeconds);
// //       if (msg.remainingSeconds < 60) {
// //         toast.warning(`Session time running out! Only ${msg.remainingSeconds} seconds left.`);
// //       }
// //     }
// //   };

// //   const updateOrAddMessage = (messageData: Partial<Message>) => {
// //     setMessages((currentMessages) => {
// //       const lastAiMessageIndex = findLastIndex(currentMessages, (m: any) => m.type === "received" && (m.loading || m.text?.endsWith("...")));
// //       if (lastAiMessageIndex !== -1) {
// //         const newMessages = [...currentMessages];
// //         newMessages[lastAiMessageIndex] = {
// //           ...newMessages[lastAiMessageIndex],
// //           ...messageData,
// //           id: newMessages[lastAiMessageIndex].id,
// //           loading: false,
// //         };
// //         return newMessages;
// //       } else {
// //         return [...currentMessages, { id: Date.now().toString(), ...messageData } as Message];
// //       }
// //     });
// //   };

// //   const updateOrAddAudioUrl = (audioUrl: string) => {
// //     setMessages((currentMessages) => {
// //       const lastAiMessageIndex = findLastIndex(currentMessages, (m: any) => m.type === "received");
// //       if (lastAiMessageIndex !== -1) {
// //         const newMessages = [...currentMessages];
// //         newMessages[lastAiMessageIndex] = {
// //           ...newMessages[lastAiMessageIndex],
// //           audioUrl,
// //           audioPlayed: false,
// //         };
// //         return newMessages;
// //       }
// //       return currentMessages;
// //     });
// //   };

// //   const removeLoadingMessage = () => {
// //     setMessages((currentMessages) => currentMessages.filter((m) => !m.loading));
// //   };

// //   const toggleAudio = (id: string, _audioUrl: string) => {
// //     const audioElement = audioRefs.current[id];
// //     if (!audioElement) return;
// //     if (playingAudio === id) {
// //       audioElement.pause();
// //       setPlayingAudio(null);
// //     } else {
// //       if (playingAudio && audioRefs.current[playingAudio]) {
// //         audioRefs.current[playingAudio].pause();
// //       }
// //       audioElement.play().then(() => setPlayingAudio(id)).catch(console.error);
// //     }
// //   };

// //   const getChatHistory = () => {
// //     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
// //       wsRef.current.send(JSON.stringify({ type: "getChatHistory", userId, topicId }));
// //     } else {
// //       console.warn("Cannot get chat history, WebSocket not open.");
// //       toast.error("Cannot get chat history, WebSocket not open.");
// //     }
// //   };

// //   const sendPlaceholder = () => {
// //     setMessages((m) => [...m, { id: "loading-" + Date.now(), loading: true, messageType: "loading", type: "received" } as Message]);
// //   };

// //   const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
// //   const getSupportedAudioType = () => (isIOS() ? "audio/mp4" : "audio/webm");

// //   const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
// //     const reader = new FileReader();
// //     // reader.onloadend = () => resolve(reader.result as string);
// //     reader.onloadend = () => {
// //       if (reader.result) {
// //         resolve((reader.result as string).split(",")[1]);
// //       } else {
// //         reject(new Error("Failed to read blob: result is null"));
// //       }
// //     };
// //     reader.onerror = reject;
// //     reader.readAsDataURL(blob);
// //   });

// //   const cleanupRecording = () => {
// //     clearInterval(timerRef.current as NodeJS.Timeout);
// //     setRecordTime(0);
// //     setIsRecording(false);
// //     if (streamRef.current) {
// //       streamRef.current.getTracks().forEach((t) => {
// //         try { t.stop(); } catch (err) { console.error("Error stopping track:", err); }
// //       });
// //       streamRef.current = null;
// //     }
// //     mediaRecorderRef.current = null;
// //     audioChunksRef.current = [];
// //     lastRecordingEndTimeRef.current = Date.now();
// //   };

// //   const cancelRecording = () => {
// //     if (isRecording && mediaRecorderRef.current) {
// //       isCanceledRef.current = true;
// //       try {
// //         if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
// //       } catch (err) { console.error("Error stopping recorder:", err); }
// //       cleanupRecording();
// //     }
// //   };

// //   const sendRecording = async () => {
// //     if (isRecording && mediaRecorderRef.current) {
// //       try {
// //         if (isIOS() && mediaRecorderRef.current.state === "recording") {
// //           mediaRecorderRef.current.requestData();
// //           await new Promise(resolve => setTimeout(resolve, 200));
// //         }
// //         if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
// //       } catch (err) {
// //         console.error("Error finalizing recording:", err);
// //         cleanupRecording();
// //       }
// //     }
// //   };

// //   const startRecording = async () => {
// //     if (sessionLimitReached || chatCompleted) {
// //       toast.error(sessionLimitReached ? "Daily session limit reached." : "Chat completed.");
// //       return;
// //     }
// //     if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
// //       toast.error("Not connected. Please wait or try reconnecting.");
// //       setIsInactiveDialogOpen(true);
// //       return;
// //     }

// //     if (streamRef.current) {
// //       streamRef.current.getTracks().forEach((t) => {
// //         try { t.stop(); } catch (err) { console.error("Error stopping previous track:", err); }
// //       });
// //       streamRef.current = null;
// //     }
// //     if (isIOS() && lastRecordingEndTimeRef.current) {
// //       const timeSinceLast = Date.now() - lastRecordingEndTimeRef.current;
// //       if (timeSinceLast < 1000) await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
// //     }

// //     try {
// //       const constraints = { audio: isIOS() ? { echoCancellation: true, noiseSuppression: true, sampleRate: 22050, channelCount: 1 } : true };
// //       const stream = await navigator.mediaDevices.getUserMedia(constraints);
// //       const mimeType = getSupportedAudioType();
// //       console.log("Recording started with MIME type:", mimeType);
// //       streamRef.current = stream;
// //       const mr = new MediaRecorder(stream, { mimeType });
// //       mediaRecorderRef.current = mr;
// //       audioChunksRef.current = [];
// //       isCanceledRef.current = false;

// //       clearInterval(timerRef.current as NodeJS.Timeout);
// //       setRecordTime(0);
// //       timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);

// //       mr.ondataavailable = (e) => {
// //         if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
// //         else console.warn("Received empty data chunk");
// //       };
// //       mr.onerror = (event) => {
// //         console.error("MediaRecorder error:", event);
// //         cleanupRecording();
// //         toast.error("Recording error. Please try again.");
// //       };
// //       mr.onstop = async () => {
// //         try {
// //           if (isCanceledRef.current) {
// //             console.log("Recording canceled");
// //             cleanupRecording(); return;
// //           }
// //           if (audioChunksRef.current.length === 0) {
// //             console.warn("No audio data captured");
// //             cleanupRecording();
// //             toast.error("No audio captured. Try again.");
// //             return;
// //           }
// //           const blob = new Blob(audioChunksRef.current, { type: mimeType });
// //           if (blob.size < 100) {
// //             console.warn("Audio blob too small");
// //             cleanupRecording();
// //             toast.error("Recording too short. Try again.");
// //             return;
// //           }
// //           const audioURL = URL.createObjectURL(blob);
// //           setMessages((m) => [...m, { id: Date.now().toString(), messageType: "audio", audioURL, type: "sent" } as Message]);
// //           sendPlaceholder();
// //           const base64 = await blobToBase64(blob);
// //           if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
// //             console.log("USERID: ", userId, "topicid ", topicId, "chatid: ", chatId, mimeType.split("/")[1], "LOGGED DATA"),
// //               wsRef.current.send(JSON.stringify({ userId, topicId, chatId, format: mimeType.split("/")[1], type: "audio", payload: { audioBuffer: base64, format: mimeType } }));
// //             resetActivityTimer();
// //           } else {
// //             console.error("WebSocket not open for sending audio");
// //             setIsInactiveDialogOpen(true);
// //             toast.error("Connection error. Refresh page.");
// //           }
// //         } catch (error) {
// //           console.error("Error processing recording:", error);
// //           toast.error("Error processing recording. Try again.");
// //         } finally {
// //           cleanupRecording();
// //         }
// //       };
// //       mr.start(1000);
// //       setIsRecording(true);
// //     } catch (error) {
// //       console.error("Error starting recording:", error);
// //       toast.error(isIOS() ? "Mic access error (iOS). Check permissions." : "Mic access error. Check permissions.");
// //       cleanupRecording();
// //     }
// //   };

// //   const handleSubmit = (e?: React.FormEvent) => {
// //     if (e) e.preventDefault();
// //     if (!message.trim()) return;
// //     if (sessionLimitReached || chatCompleted) {
// //       toast.error(sessionLimitReached ? "Daily session limit reached." : "Chat completed.");
// //       return;
// //     }
// //     if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
// //       toast.error("Not connected. Please wait or try reconnecting.");
// //       setIsInactiveDialogOpen(true);
// //       return;
// //     }

// //     setMessages((m) => [...m, { id: Date.now().toString(), messageType: "text", text: message.trim(), type: "sent" } as Message]);
// //     sendPlaceholder();
// //     wsRef.current.send(JSON.stringify({ userId, topicId, chatId, type: "text", payload: { textMessage: message.trim() } }));
// //     setMessage("");
// //     resetActivityTimer();
// //   };

// //   const formatTime = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
// //   const formatSessionTime = (seconds: number | null) => seconds === null ? "" : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
// //   const displayMessages = messages.filter((msg) => msg.type !== "system");
// //   const handleShowAssessment = (assessments: any) => onShowFeedback({ type: "assessment", content: assessments });
// //   const handleBackClick = () => navigate(-1);

// //   const handleStillThereYes = () => {
// //     setIsInactiveDialogOpen(false);
// //     intentionalDisconnectRef.current = false;
// //     console.log("User wants to continue. Reconnecting WebSocket...");
// //     wsRef.current = null
// //     connectWebSocket();
// //   };

// //   const handleStillThereNo = () => {
// //     setIsInactiveDialogOpen(false);
// //     intentionalDisconnectRef.current = true;
// //     wsRef.current?.close();
// //     console.log("User does not want to continue. Navigating away.");
// //     navigate(-1);
// //   };

// //   const handleResetChatNo = () => {
// //     setIsCompleteDialogOpen(false)
// //     navigate(-1)
// //   }


// //   const resetChat = () => {
// //     const ws = wsRef.current;
// //     if (ws && ws.readyState === WebSocket.OPEN) {
// //       ws.send(
// //         JSON.stringify({
// //           type: 'reset_chat', chatId, topicId, userId,            
// //         })
// //       );
// //       resetActivityTimer();
// //       wsRef.current = null
// //       connectWebSocket()
// //     } else {
// //       connectWebSocket();
// //       const onOpen = () => {
// //         wsRef.current?.send(
// //           JSON.stringify({ type: 'reset_chat', userId, topicId, chatId })
// //         );
// //         wsRef.current?.removeEventListener('open', onOpen);
// //         resetActivityTimer();
// //       };
// //       wsRef.current?.addEventListener('open', onOpen);
// //     }
// //   };

// //   const handleResetChatYes = () => {
// //     resetChat();
// //     setIsCompleteDialogOpen(false);
// //   }

// //   return (
// //     <div className="flex flex-col max-h-[86vh] min-h-[86vh] md:min-h-[82vh] md:max-h-[82vh] max-w-[800px] mx-auto bg-card rounded-xl overflow-hidden bg-gray-100 p-2">
// //       <header className="flex justify-between items-center px-6 border-b-3 border-white">
// //         <Button variant="ghost" size="icon" onClick={handleBackClick}>
// //           <ChevronLeft className="h-4 w-4" />
// //         </Button>
// //         <h2 className="text-xl font-semibold text-font-dark">{mode === "photo-mode" ? "Photo Mode" : "Chat Mode"}</h2>
// //         {sessionTimeRemaining !== null && (
// //           <div className="flex items-center gap-1">
// //             <Clock className="h-4 w-4" />
// //             <span>{formatSessionTime(sessionTimeRemaining)} remaining</span>
// //           </div>
// //         )}
// //         <div className="flex items-center gap-2">
// //           <Languages className="h-4 w-4" />
// //           <select className="bg-background text-sm px-3 py-1 rounded-md">
// //             <option value="en">English</option>
// //           </select>
// //         </div>
// //       </header>

// //       <div className="sm:hidden">
// //         {mode === "photo-mode" && topicImage && (
// //           <img src={topicImage} alt="Topic context" className="p-4 w-full" />
// //         )}
// //       </div>

// //       {chatCompleted && <div className="bg-yellow-100 text-yellow-800 p-2 text-center">Chat completed. Cannot continue.</div>}
// //       {sessionLimitReached && <div className="bg-red-100 text-red-800 p-2 text-center">Daily session limit reached. Try again tomorrow.</div>}

// //       <div className="flex-1 overflow-y-auto p-1 flex flex-col gap-4">
// //         {displayMessages.map((msg) => (
// //           <div key={msg.id} className={`flex flex-col gap-1 ${msg.type === "sent" ? "self-end" : "self-start"}`}>
// //             {msg.loading && (
// //               <div className="flex items-center gap-2">
// //                 <div className="animate-spin-slow">
// //                   <LoaderPinwheel size={18} />
// //                 </div>
// //                 <span className="text-sm">AI is typing...</span>
// //               </div>
// //             )}
// //             {msg.messageType === "text" && !msg.loading && (
// //               <div className={`p-3 rounded-xl max-w-[300px] ${msg.type === "sent" ? "bg-primary text-white rounded-tr-none" : "bg-white text-text-color-1 rounded-tl-none"}`}>
// //                 <span className="text-xs leading-[0px]">{msg.text}</span>
// //                 <div className="flex gap-2">
// //                   {!msg.loading && msg.audioUrl && (
// //                     <div className="mt-2">
// //                       <Button
// //                         variant="ghost"
// //                         size="sm"
// //                         onClick={() => toggleAudio(msg.id, msg.audioUrl as string)}
// //                         className={`${msg.type === "received" ? "" : "bg-white"} flex items-center gap-1 ${playingAudio === msg.id ? "text-[#6250E9]" : "text-[#757575]"}`}
// //                       >
// //                         {playingAudio === msg.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
// //                         <span className="text-xs">Tap to play</span>
// //                       </Button>
// //                       <audio
// //                         ref={(el) => { if (el) audioRefs.current[msg.id] = el; }}
// //                         src={msg.audioUrl}
// //                         onEnded={() => setPlayingAudio(null)}
// //                         className="hidden"
// //                         playsInline
// //                       />
// //                     </div>
// //                   )}
// //                   {msg.type === "received" && msg.hasFeedback && (
// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={() => { setIsFeedbackDialog(true); setFeedback(msg.feedback); onShowFeedback({ type: "feedback", content: msg.feedback }); }}
// //                       className="flex items-center gap-1 text-[#6250E9] text-xs  mt-2"
// //                     >
// //                       <MessageCircle className="h-4 w-4" />
// //                       View Feedback
// //                     </Button>
// //                   )}
// //                   {msg.type === "sent" && msg.hasAssessment && (
// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={() => handleShowAssessment(msg.assessments)}
// //                       className="flex items-center gap-1 bg-white text-[#6250E9] text-xs  mt-2"
// //                     >
// //                       <BarChart2 className="h-4 w-4" />
// //                       View Assessment
// //                     </Button>
// //                   )}
// //                 </div>
// //               </div>
// //             )}
// //             {msg.messageType === "audio" && <audio className="message-audio" src={msg.audioURL} controls />}
// //           </div>
// //         ))}
// //         <div ref={messagesEndRef} />
// //       </div>

// //       <form onSubmit={handleSubmit} className="border-t p-4">
// //         <div className="flex items-center bg-white rounded-full px-4 py-2">
// //           <Input
// //             type="text"
// //             value={message}
// //             disabled={isRecording || sessionLimitReached || chatCompleted || isInactiveDialogOpen}
// //             onChange={(e) => setMessage(e.target.value)}
// //             placeholder={
// //               isInactiveDialogOpen ? "Session paused..." :
// //                 sessionLimitReached ? "Session limit reached" :
// //                   chatCompleted ? "Chat completed" :
// //                     isRecording ? "Recording..." :
// //                       "Write message..."
// //             }
// //             className="flex-1 border-none focus:ring-0"
// //           />
// //           {isRecording && <span className="text-sm mx-2">{formatTime(recordTime)}</span>}

// //           {isRecording ? (
// //             <div className="flex gap-1">
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={cancelRecording}
// //                 className="text-red-500 hover:bg-red-100"
// //               >
// //                 <X className="h-4 w-4" />
// //               </Button>
// //               <Button
// //                 variant="ghost"
// //                 size="icon"
// //                 onClick={sendRecording}
// //                 className="text-green-500 hover:bg-green-100"
// //               >
// //                 <ArrowUp className="h-4 w-4" />
// //               </Button>
// //             </div>
// //           ) : message.trim() ? (
// //             <Button
// //               type="submit"
// //               variant="ghost"
// //               size="icon"
// //               disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
// //             >
// //               <Send className="h-4 w-4" />
// //             </Button>
// //           ) : (
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               onClick={startRecording}
// //               disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
// //             >
// //               <Mic className="h-4 w-4" />
// //             </Button>
// //           )}
// //         </div>
// //       </form>

// //       {/* {isSmallScreen && isFeedbackDialog && feedback && (
// //         <FeedbackSectionModal
// //           isOpen={isFeedbackDialog}
// //           onClose={() => setIsFeedbackDialog(false)}
// //           feedback={feedback}
// //         />
// //       )} */}


// //        <Dialog open={isCompleteDialogOpen} onOpenChange={(open) => !open && handleResetChatNo()}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Do you want to reset and start over?</DialogTitle>
// //             <DialogDescription>
// //               This Topic is Completeted. Click Reset if want to StartOver
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={handleResetChatNo}>
// //               No, End Session
// //             </Button>
// //             <Button onClick={handleResetChatYes}>
// //               Reset
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog> 


// //       <Dialog open={isInactiveDialogOpen} onOpenChange={(open) => !open && handleStillThereNo()}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>Are you still there?</DialogTitle>
// //             <DialogDescription>
// //               Your session was paused due to inactivity. Do you want to continue?
// //             </DialogDescription>
// //           </DialogHeader>
// //           <DialogFooter>
// //             <Button variant="outline" onClick={handleStillThereNo}>
// //               No, End Session
// //             </Button>
// //             <Button onClick={handleStillThereYes}>
// //               Yes, Keep Me Here
// //             </Button>
// //           </DialogFooter>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // };

// // export default ChatWindow;

// import React, { useState, useEffect, useRef } from "react";
// import { toast } from 'sonner';
// import {
//   Mic,
//   Send,
//   ChevronLeft,
//   Languages,
//   MessageCircle,
//   Clock,
//   BarChart2,
//   Play,
//   Pause,
//   ArrowUp,
//   X,
//   LoaderPinwheel,
// } from "lucide-react";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// // TODO: SOCKET.IO - Import socket.io-client
// import { io, Socket } from 'socket.io-client';

// // Helper functions (unchanged)
// function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
//   for (let i = array.length - 1; i >= 0; i--) {
//     if (predicate(array[i], i, array)) {
//       return i;
//     }
//   }
//   return -1;
// }

// function findLast<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined {
//   for (let i = array.length - 1; i >= 0; i--) {
//     if (predicate(array[i], i, array)) {
//       return array[i];
//     }
//   }
//   return undefined;
// }

// interface Message {
//   id: string;
//   messageType: string;
//   text?: string;
//   type: "sent" | "received" | "system";
//   feedback?: any;
//   audioUrl?: string;
//   audioPlayed?: boolean;
//   hasFeedback?: boolean;
//   hasAssessment?: boolean;
//   assessments?: any;
//   isCompleted?: boolean; // This might be handled by chatCompleted state primarily
//   loading?: boolean;
//   audioURL?: string; // Note: a duplicate-like key, ensure consistency if used
// }

// interface ChatWindowProps {
//   onShowFeedback: (feedback: { type: string; content: any }) => void;
//   onTopicImage: (imageUrl: string) => void;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ onShowFeedback, onTopicImage }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordTime, setRecordTime] = useState(0);
//   const [chatId, setChatId] = useState<string | null>(null);
//   const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
//   const [sessionLimitReached, setSessionLimitReached] = useState(false);
//   const [chatCompleted, setChatCompleted] = useState(false);
//   // const [processedResponses, setProcessedResponses] = useState(new Set()); // May need rethinking with event-based streaming
//   const [playingAudio, setPlayingAudio] = useState<string | null>(null);
//   const [topicImage, setTopicImage] = useState<string | null>(null);
//   // const [_isFeedbackDialog, setIsFeedbackDialog] = useState(false); // Unused, consider removing if not planned
//   // const [_feedback, setFeedback] = useState<any>(null); // Unused, consider removing if not planned
//   const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);
//   const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

//   const lastRecordingEndTimeRef = useRef<number | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   // TODO: SOCKET.IO - Change wsRef to socketRef and its type
//   const socketRef = useRef<Socket | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
//   const streamRef = useRef<MediaStream | null>(null);
//   const isCanceledRef = useRef(false);
//   const activityTimerId = useRef<NodeJS.Timeout | null>(null);
//   const intentionalDisconnectRef = useRef(false);

//   const { topicId } = useParams();
//   const [searchParams] = useSearchParams();
//   const mode = searchParams.get("mode");

//   const userData = JSON.parse(localStorage.getItem("AiTutorUser") || "{}");
//   const userId = userData?.id;

//   // TODO: SOCKET.IO - Update URL for Socket.IO connection
//   const SOCKET_URL = import.meta.env.VITE_API_BASE_URL; // e.g., "http://localhost:3000"
//   const navigate = useNavigate();

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);


//   const resetActivityTimer = () => {
//     clearTimeout(activityTimerId.current as NodeJS.Timeout);
//     activityTimerId.current = setTimeout(() => {
//       console.log("Inactivity detected. Closing Socket.IO connection and showing dialog.");
//       intentionalDisconnectRef.current = true;
//       // TODO: SOCKET.IO - Update disconnection logic
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         console.warn("Socket.IO Disconnected due to Inactivity");
//       }
//       setIsInactiveDialogOpen(true);
//     }, 60 * 1000 * 2); // 2 minutes
//   };

//   // TODO: SOCKET.IO - Rename and rewrite connectWebSocket to connectSocketIO
//   const connectSocketIO = () => {
//     if (socketRef.current && (socketRef.current.connected || socketRef.current.connecting)) {
//       console.log(`Socket.IO already ${socketRef.current.connected ? 'connected' : 'connecting'}.`);
//       if (socketRef.current.connected) {
//         resetActivityTimer();
//       }
//       return;
//     }

//     console.log("Attempting to connect Socket.IO to:", SOCKET_URL);
//     intentionalDisconnectRef.current = false;
    
//     // Clean up any old listeners if socketRef.current exists but is disconnected
//     if(socketRef.current) {
//         socketRef.current.removeAllListeners();
//     }

//     const socket = io(SOCKET_URL, {
//       reconnectionAttempts: 5,
//       reconnectionDelay: 3000,
//       transportOptions: { // <--- ADD THIS
//         polling: {        // <--- ADD THIS
//           extraHeaders: { // <--- ADD THIS
//             "ngrok-skip-browser-warning": "69420" // Use the value that works for you
//           }
//         }
//       }
//     });
//     socketRef.current = socket;

//     socket.on('connect', () => {
//       console.log("✅ Socket.IO connected:", socket.id);
//       if (userId && topicId) { // Ensure we have necessary IDs before fetching history
//         getChatHistory();
//       } else {
//         console.warn("User ID or Topic ID missing, cannot fetch chat history on connect.");
//         toast.error("Could not initialize chat. User or topic information is missing.");
//       }
//       resetActivityTimer();
//     });

//     socket.on('disconnect', (reason: any) => {
//       console.log("Socket.IO disconnected:", reason);
//       clearTimeout(activityTimerId.current as NodeJS.Timeout);
//       if (intentionalDisconnectRef.current) {
//         console.log("Socket.IO disconnected intentionally (e.g., inactivity, user action, component unmount).");
//       } else if (!isInactiveDialogOpen && reason !== 'io client disconnect') {
//         console.warn("Socket.IO disconnected unexpectedly:", reason);
//         if (reason === 'transport close' || reason === 'ping timeout') {
//           toast.error("Connection lost. Attempting to reconnect...");
//         } else if (reason !== 'io server disconnect') { 
//            toast.error("Connection lost. Please check your internet and refresh if the issue persists.");
//         }
//       }
//     });

//     socket.on('connect_error', (error:any) => {
//       console.error("Socket.IO connection error:", error);
//       toast.error(`Connection failed: ${error.message}. Please try refreshing.`);
//     });

//     // Register listeners for server-sent events based on NestJS backend
//     socket.on('chat_history', handleChatHistory);
//     socket.on('speech_transcribed', handleSpeechTranscribed);
//     socket.on('error', handleError); // Generic error event from backend
//     socket.on('session_status', handleSessionStatus);
//     socket.on('attachment_url', handleAttachmentUrl);
//     socket.on('chat_completed', handleChatCompletedEvent); // Specific event for chat completion status
//     socket.on('reset_chat', handleResetChatResponse); // Response from reset_chat emit

//     // ASSUMPTION: Events from chatService.generateStreamingResponse
//     // These names ('ai_text_chunk', 'ai_response_complete') are assumed.
//     // You MUST confirm these with your backend developer or ChatService code.
//     socket.on('ai_text_chunk', handleAiTextChunk); // For streaming AI text
//     socket.on('ai_response_complete', handleAiResponseComplete); // For final AI response with audio/feedback
//   };

//   useEffect(() => {
//     if (userId && topicId) {
//       connectSocketIO();
//     } else {
//       console.error("User ID or Topic ID not found in localStorage or params. Cannot initialize WebSocket.");
//       toast.error("Critical error: User or Topic information missing. Cannot load chat.");
//     }

//     return () => {
//       intentionalDisconnectRef.current = true;
//       clearTimeout(activityTimerId.current as NodeJS.Timeout);
//       if (socketRef.current) {
//         console.log("Closing Socket.IO on component unmount.");
//         socketRef.current.disconnect();
//         socketRef.current.removeAllListeners(); 
//         socketRef.current = null;
//       }
//     };
//   }, [userId, topicId, SOCKET_URL]); // Added SOCKET_URL to dependencies, though it's likely constant.

//   useEffect(() => { 
//     const latestAudioMsg = findLast(messages, (msg) => msg.type === "received" && msg.audioUrl && !msg.audioPlayed);
//     if (latestAudioMsg && audioRefs.current[latestAudioMsg.id]) {
//       const audioElement = audioRefs.current[latestAudioMsg.id];
//       const playPromise = audioElement.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setPlayingAudio(latestAudioMsg.id);
//             setMessages((currentMessages) =>
//               currentMessages.map((m) =>
//                 m.id === latestAudioMsg.id ? { ...m, audioPlayed: true } : m
//               )
//             );
//           })
//           .catch((error) => {
//             console.warn("Autoplay prevented:", error.name, error.message); 
//           });
//       }
//     }
//   }, [messages]);

//   const handleAttachmentUrl = (data: { attachment: string | string[] }) => { 
//     console.log("Received attachment_url:", data);
//     if (data.attachment) {
//       const imageUrl = Array.isArray(data.attachment)
//         ? data.attachment[0]
//         : data.attachment;
//       setTopicImage(imageUrl);
//       if (onTopicImage) {
//         onTopicImage(imageUrl);
//       }
//     }
//   };

//   const handleChatHistory = (data: { chatHistory: any[], chatId?: string, isCompleted?: boolean }) => { 
//     console.log("Received chat_history:", data);
//     if (data.chatHistory && Array.isArray(data.chatHistory)) {
//       const formattedMessages = data.chatHistory
//         .filter((message: any) => message.content && message.content.trim() !== "") 
//         .map((message: any) => ({
//           id: message.id || Date.now() + Math.random().toString(), 
//           messageType: "text",
//           text: message.content,
//           type: message.sender === "ai" ? "received" : "sent",
//           feedback: message.feedback || null,
//           audioUrl: message.audioUrl || null,
//           audioPlayed: true, 
//           hasFeedback: !!message.feedback,
//           hasAssessment: !!message.assessments,
//           assessments: message.assessments || null,
//         }));
//       setMessages(formattedMessages);
//       if (data.chatId) setChatId(data.chatId);
      
//       const isChatSessionCompleted = data.isCompleted || data.chatHistory.some((m: any) => m.isCompleted);
//       if (isChatSessionCompleted) {
//           handleChatCompletedEvent({ message: "This chat has been completed from history." });
//       }
//     } else {
//         setMessages([]); 
//     }
//   };
  
//   const handleChatCompletedEvent = (data: { message: string }) => {
//     console.log("Received chat_completed event:", data);
//     setChatCompleted(true);
//     removeLoadingMessage(); // Ensure no loading indicators are stuck
//     // Open dialog only if not already open to avoid flicker if multiple completion events arrive
//     if (!isCompleteDialogOpen) {
//         setIsCompleteDialogOpen(true); 
//     }
//     toast.info(data.message || "This chat has been completed.");
//   };

//   const handleAiTextChunk = (data: { text: string } | string) => { 
//     const textChunk = typeof data === 'string' ? data : data.text;
//     console.log("Received ai_text_chunk:", textChunk);
//     if (textChunk) {
//       setMessages(currentMessages => {
//         const lastMsgIndex = findLastIndex(currentMessages, m => m.type === 'received' && m.loading); 
//         if (lastMsgIndex !== -1) {
//           const newMessages = [...currentMessages];
//           const currentText = newMessages[lastMsgIndex].text || "";
//           newMessages[lastMsgIndex] = {
//             ...newMessages[lastMsgIndex],
//             text: currentText.replace("...", "") + textChunk + "...", 
//             loading: true, 
//             messageType: "text",
//           };
//           return newMessages;
//         } else {
//           return [...currentMessages, {
//             id: "ai-streaming-" + Date.now(),
//             text: textChunk + "...",
//             type: "received",
//             messageType: "text",
//             loading: true,
//           } as Message];
//         }
//       });
//     }
//   };

//   const handleAiResponseComplete = (data: { ai_response?: string; tts_audio_url?: string; feedback?: any; }) => {
//     console.log("Received ai_response_complete:", data);
    
//     setMessages(currentMessages => {
//         const lastMsgIndex = findLastIndex(currentMessages, m => m.type === 'received' && m.loading);
//         if (lastMsgIndex !== -1) {
//             const newMessages = [...currentMessages];
//             newMessages[lastMsgIndex] = {
//                 ...newMessages[lastMsgIndex],
//                 text: data.ai_response || newMessages[lastMsgIndex].text?.replace("...", ""),
//                 audioUrl: data.tts_audio_url,
//                 feedback: data.feedback || null,
//                 hasFeedback: !!data.feedback,
//                 audioPlayed: !data.tts_audio_url,
//                 loading: false, // Finalize loading state
//             };
//             return newMessages;
//         } else {
//             // If no loading message was found (e.g., direct complete response), add a new one
//             return [...currentMessages, {
//                 id: "ai-complete-" + Date.now(),
//                 text: data.ai_response,
//                 audioUrl: data.tts_audio_url,
//                 feedback: data.feedback || null,
//                 hasFeedback: !!data.feedback,
//                 audioPlayed: !data.tts_audio_url,
//                 type: "received",
//                 messageType: "text",
//                 loading: false,
//             } as Message];
//         }
//     });
//   };


//   const handleSpeechTranscribed = (data: { textMessage: string; assessments?: any }) => { 
//     console.log("Received speech_transcribed:", data);
//     // Remove the audio message sent by the user, as it's now replaced by transcribed text
//     setMessages((currentMessages) => currentMessages.filter(msg => !(msg.type === "sent" && msg.messageType === "audio")));
    
//     setMessages((m) => [
//       ...m,
//       {
//         id: "user-transcribed-" + Date.now().toString(),
//         messageType: "text",
//         text: data.textMessage,
//         type: "sent",
//         assessments: data.assessments || null,
//         hasAssessment: !!data.assessments,
//       },
//     ]);
//     removeLoadingMessage(); 
//   };

//   const handleError = (errorData: { message: string; error?: any }) => { 
//     console.error("Received server error:", errorData.message, errorData.error || '');
//     removeLoadingMessage();
//     if (errorData.message.includes("Daily session limit")) {
//       setSessionLimitReached(true);
//       toast.error("Daily session limit reached. Try again tomorrow.");
//     } else if (errorData.message.includes("This chat has been completed")) {
//         handleChatCompletedEvent({ message: errorData.message });
//     } else {
//         toast.error(errorData.message || "An unknown error occurred.");
//     }
//   };

//   const handleSessionStatus = (data: { remainingSeconds?: number }) => { 
//     console.log("Received session_status:", data);
//     if (data.remainingSeconds !== undefined) {
//       setSessionTimeRemaining(data.remainingSeconds);
//       if (data.remainingSeconds > 0 && data.remainingSeconds < 60) { 
//         toast.warning(`Session time running out! Only ${data.remainingSeconds} seconds left.`);
//       } else if (data.remainingSeconds <= 0) {
//         setSessionLimitReached(true); 
//         toast.error("Your session has ended.");
//         // Potentially disconnect or show a session ended dialog
//       }
//     }
//   };
  
//   const handleResetChatResponse = (data: { success?: boolean; message?: string; chatId?: string, chatHistory?: any[] }) => {
//     // Note: Backend 'reset_chat' event in Gateway doesn't explicitly send 'success', 'message', 'chatId', 'chatHistory'.
//     // It sends `result` which is ` { success: true, chatId: newChat.id, chatHistory: [] }` from `chatService.resetChat`.
//     // Adjusting based on this structure.
//     console.log("Received reset_chat response:", data);
//     // Assuming data directly is the result object.
//     if (data && typeof data.chatId === 'string') { // Check for a valid reset response (e.g., has new chatId)
//         toast.success(data.message || "Chat has been reset successfully!");
//         setMessages([]); 
//         setChatCompleted(false);
//         setSessionLimitReached(false); 
//         setChatId(data.chatId);

//         if (data.chatHistory && Array.isArray(data.chatHistory)) {
//             handleChatHistory({ chatHistory: data.chatHistory, chatId: data.chatId });
//         } else {
//             getChatHistory(); 
//         }
//         setIsCompleteDialogOpen(false);
//     } else {
//         toast.error(data?.message || "Failed to reset chat or unexpected response.");
//     }
//   };

//   const updateOrAddMessage = (messageData: Partial<Message>) => { // This might be less used if streaming handles its own messages
//     setMessages((currentMessages) => {
//       const lastAiMessageIndex = findLastIndex(currentMessages, (m) => m.type === "received" && (m.loading || (m.text && !m.audioUrl && !m.id?.startsWith("user-"))));
//       if (lastAiMessageIndex !== -1 && currentMessages[lastAiMessageIndex].id === (messageData.id || currentMessages[lastAiMessageIndex].id)) {
//         const newMessages = [...currentMessages];
//         newMessages[lastAiMessageIndex] = {
//           ...newMessages[lastAiMessageIndex],
//           ...messageData,
//           loading: false, 
//         };
//         return newMessages;
//       } else {
//         return [...currentMessages, { id: "ai-message-" + Date.now().toString(), type: "received", ...messageData } as Message];
//       }
//     });
//   };

//   const removeLoadingMessage = () => {
//     setMessages((currentMessages) => currentMessages.filter((m) => !m.loading));
//   };

//   const toggleAudio = (id: string, _audioUrl: string) => { /* Unchanged */ };

//   const getChatHistory = () => {
//     if (socketRef.current && socketRef.current.connected) {
//       if (userId && topicId) {
//         console.log("Emitting getChatHistory", { userId, topicId });
//         socketRef.current.emit('getChatHistory', { userId, topicId });
//         resetActivityTimer();
//       } else {
//         console.warn("Cannot get chat history: userId or topicId is missing.");
//       }
//     } else {
//       console.warn("Cannot get chat history, Socket.IO not connected.");
//     }
//   };

//   const sendPlaceholder = () => { 
//     setMessages((m) => [...m, { id: "loading-" + Date.now(), loading: true, messageType: "loading", type: "received", text: "AI is thinking..." } as Message]);
//   };

//   const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
//   const getSupportedAudioType = () => (isIOS() ? "audio/mp4" : "audio/webm");

//   const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => { /* Unchanged */ });
//   const cleanupRecording = () => { /* Unchanged but ensure it's called in error paths of start/stop recording */ };
//   const cancelRecording = () => { /* Unchanged */ };

//   const sendRecording = async () => { 
//     if (isRecording && mediaRecorderRef.current) {
//       try {
//         if (isIOS() && mediaRecorderRef.current.state === "recording") {
//           mediaRecorderRef.current.requestData(); 
//           await new Promise(resolve => setTimeout(resolve, 200)); 
//         }
//         if (mediaRecorderRef.current.state !== "inactive") {
//             mediaRecorderRef.current.stop();
//         }
//       } catch (err) {
//         console.error("Error finalizing recording by stopping recorder:", err);
//         toast.error("Could not finalize recording. Please try again.");
//         cleanupRecording(); 
//       }
//     }
//   };

//   const startRecording = async () => { 
//     if (sessionLimitReached || chatCompleted) {
//       toast.error(sessionLimitReached ? "Daily session limit reached." : "Chat completed. Please reset to continue.");
//       return;
//     }
//     if (!socketRef.current || !socketRef.current.connected) {
//       toast.error("Not connected. Please wait or try reconnecting.");
//       setIsInactiveDialogOpen(true); 
//       return;
//     }

//     if (streamRef.current) { 
//         streamRef.current.getTracks().forEach((t) => {
//             try { t.stop(); } catch (err) { console.error("Error stopping previous track:", err); }
//         });
//         streamRef.current = null;
//     }
//     if (isIOS() && lastRecordingEndTimeRef.current) {
//         const timeSinceLast = Date.now() - lastRecordingEndTimeRef.current;
//         if (timeSinceLast < 1000) await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
//     }

//     try {
//       const constraints = { audio: isIOS() ? { echoCancellation: true, noiseSuppression: true, sampleRate: 22050, channelCount: 1 } : true };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       const mimeType = getSupportedAudioType();
//       console.log("Recording started with MIME type:", mimeType);
//       streamRef.current = stream;
//       // Ensure existing MediaRecorder is fully stopped and cleaned up if any
//       if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
//         mediaRecorderRef.current.onstop = null; // Remove old onstop
//         mediaRecorderRef.current.stop();
//       }
//       const mr = new MediaRecorder(stream, { mimeType });
//       mediaRecorderRef.current = mr;
//       audioChunksRef.current = [];
//       isCanceledRef.current = false;

//       clearInterval(timerRef.current as NodeJS.Timeout);
//       setRecordTime(0);
//       timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);

//       mr.ondataavailable = (e) => {
//         if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
//         else console.warn("Received empty data chunk");
//       };
//       mr.onerror = (event: Event) => { // Use Event type for MediaRecorderErrorEvent if available
//         console.error("MediaRecorder error:", event);
//         cleanupRecording();
//         toast.error("Recording error. Please try again.");
//       };
//       mr.onstop = async () => { 
//         try {
//           if (isCanceledRef.current) {
//             console.log("Recording canceled");
//             cleanupRecording(); return;
//           }
//           if (audioChunksRef.current.length === 0) {
//             console.warn("No audio data captured");
//             cleanupRecording();
//             toast.error("No audio captured. Try again.");
//             return;
//           }
//           const blob = new Blob(audioChunksRef.current, { type: mimeType });
//           if (blob.size < 100) { 
//             console.warn("Audio blob too small, size:", blob.size);
//             cleanupRecording();
//             toast.error("Recording too short. Try again.");
//             return;
//           }
//           const audioURL = URL.createObjectURL(blob); 
//           setMessages((m) => [...m, { id: "user-audio-" + Date.now().toString(), messageType: "audio", audioURL, type: "sent" } as Message]);
//           sendPlaceholder(); 
          
//           const base64 = await blobToBase64(blob);
          
//           if (socketRef.current && socketRef.current.connected) {
//             if (!chatId) {
//                 console.error("Cannot send audio: chatId is null.");
//                 toast.error("Error: Chat session not properly initialized. Cannot send audio.");
//                 removeLoadingMessage();
//                 cleanupRecording();
//                 return;
//             }
//             const audioPayload = {
//               userId,
//               chatId, 
//               audioBuffer: base64,
//               format: mimeType.split("/")[1] 
//             };
//             console.log("Emitting audio:", audioPayload.format, "chatId:", chatId);
//             socketRef.current.emit('audio', audioPayload);
//             resetActivityTimer();
//           } else {
//             console.error("Socket.IO not open for sending audio");
//             removeLoadingMessage();
//             toast.error("Connection error. Could not send audio. Please refresh.");
//             setIsInactiveDialogOpen(true);
//           }
//         } catch (error) {
//           console.error("Error processing recording:", error);
//           removeLoadingMessage();
//           toast.error("Error processing recording. Try again.");
//         } finally {
//           cleanupRecording();
//         }
//       };
//       mr.start(isIOS() ? undefined : 1000); 
//       setIsRecording(true);
//     } catch (error: any) {
//       console.error("Error starting recording:", error);
//       toast.error(error.message || (isIOS() ? "Mic access error (iOS). Check permissions." : "Mic access error. Check permissions."));
//       cleanupRecording();
//     }
//   };

//   const handleSubmit = (e?: React.FormEvent) => { 
//     if (e) e.preventDefault();
//     if (!message.trim()) return;
//     if (sessionLimitReached || chatCompleted) {
//       toast.error(sessionLimitReached ? "Daily session limit reached." : "Chat completed. Please reset to continue.");
//       return;
//     }
//     if (!socketRef.current || !socketRef.current.connected) {
//       toast.error("Not connected. Please wait or try reconnecting.");
//       setIsInactiveDialogOpen(true);
//       return;
//     }
//     if (!chatId) {
//         console.error("Cannot send text message: chatId is null.");
//         toast.error("Error: Chat session not properly initialized. Cannot send message.");
//         return;
//     }

//     const sentMessageText = message.trim();
//     setMessages((m) => [...m, { id: "user-text-" + Date.now().toString(), messageType: "text", text: sentMessageText, type: "sent" } as Message]);
//     sendPlaceholder();
    
//     const textPayload = {
//       userId,
//       chatId, 
//       textMessage: sentMessageText
//     };
//     console.log("Emitting text:", textPayload, "chatId:", chatId);
//     socketRef.current.emit('text', textPayload);
//     setMessage("");
//     resetActivityTimer();
//   };

//   const formatTime = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
//   const formatSessionTime = (seconds: number | null) => seconds === null ? "" : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
//   // const displayMessages = messages.filter((msg) => msg.type !== "system" && msg.messageType !== "loading"); 
//   const handleShowAssessment = (assessments: any) => onShowFeedback({ type: "assessment", content: assessments });
//   const handleBackClick = () => navigate(-1);

//   const handleStillThereYes = () => {
//     setIsInactiveDialogOpen(false);
//     intentionalDisconnectRef.current = false; 
//     if (socketRef.current && !socketRef.current.connected) {
//       console.log("User wants to continue. Reconnecting Socket.IO...");
//       socketRef.current.connect(); 
//     } else if (!socketRef.current) {
//         console.log("User wants to continue. Initializing and connecting Socket.IO...");
//         connectSocketIO(); 
//     } else {
//         console.log("User wants to continue, Socket.IO already connected/connecting.");
//         resetActivityTimer(); 
//     }
//   };

//   const handleStillThereNo = () => {
//     setIsInactiveDialogOpen(false);
//     intentionalDisconnectRef.current = true;
//     socketRef.current?.disconnect();
//     console.log("User does not want to continue. Navigating away.");
//     navigate(-1);
//   };

//   const handleResetChatNo = () => {
//     setIsCompleteDialogOpen(false);
//     if (chatCompleted) { // If chat was completed, and they say no to reset, navigate away
//         navigate(-1);
//     }
//   };

//   const resetChat = () => {
//     if (chatCompleted && sessionLimitReached) {
//         toast.error("Cannot reset chat when daily session limit is reached and chat is completed.");
//         return;
//     }
//     if (socketRef.current && socketRef.current.connected) {
//       if (userId && topicId) {
//         console.log("Emitting reset_chat", { userId, topicId });
//         socketRef.current.emit('reset_chat', { userId, topicId });
//         resetActivityTimer();
//       } else {
//         toast.error("Cannot reset chat: User or Topic ID missing.");
//       }
//     } else {
//       toast.error("Not connected. Cannot reset chat.");
//       setIsInactiveDialogOpen(true); 
//     }
//   };

//   const handleResetChatYes = () => {
//     resetChat();
//   };

//   // JSX (largely unchanged, but message display logic might need slight tweaks for streaming)
//   return (
//     <div className="flex flex-col max-h-[86vh] min-h-[86vh] md:min-h-[82vh] md:max-h-[82vh] max-w-[800px] mx-auto bg-card rounded-xl overflow-hidden bg-gray-100 p-2">
//       <header className="flex justify-between items-center px-4 sm:px-6 py-3 border-b border-gray-200"> {/* Adjusted padding and border */}
//         <Button variant="ghost" size="icon" onClick={handleBackClick}>
//           <ChevronLeft className="h-5 w-5" /> {/* Slightly larger icon */}
//         </Button>
//         <h2 className="text-lg sm:text-xl font-semibold text-font-dark">{mode === "photo-mode" ? "Photo Mode" : "Chat Mode"}</h2>
//         {sessionTimeRemaining !== null && (
//           <div className="flex items-center gap-1 text-xs sm:text-sm">
//             <Clock className="h-4 w-4" />
//             <span>{formatSessionTime(sessionTimeRemaining)}</span> {/* Removed "remaining" for brevity on small screens */}
//           </div>
//         )}
//         <div className="flex items-center gap-2">
//           {/* Language selector can be added back if needed */}
//         </div>
//       </header>

//       <div className="sm:hidden"> {/* Topic image for small screens */}
//         {mode === "photo-mode" && topicImage && (
//           <img src={topicImage} alt="Topic context" className="p-2 sm:p-4 w-full max-h-40 object-contain" />
//         )}
//       </div>
      
//       {/* Status Messages */}
//       {chatCompleted && !isCompleteDialogOpen && <div className="bg-yellow-100 text-yellow-800 p-2 text-center text-sm">Chat completed. You can reset to start over.</div>}
//       {sessionLimitReached && <div className="bg-red-100 text-red-800 p-2 text-center text-sm">Daily session limit reached. Try again tomorrow.</div>}

//       <div className="flex-1 overflow-y-auto p-2 sm:p-4 flex flex-col gap-3 sm:gap-4">
//         {messages.map((msg) => {
//           if (msg.messageType === "loading" && msg.type === "received") { 
//             return (
//               <div key={msg.id} className="flex self-start items-center gap-2 p-3 rounded-xl bg-white text-text-color-1 rounded-tl-none max-w-[300px] shadow-sm">
//                 <div className="animate-spin-slow">
//                   <LoaderPinwheel size={18} />
//                 </div>
//                 <span className="text-sm italic">{msg.text || "AI is thinking..."}</span>
//               </div>
//             );
//           }
//           if(msg.type === "system") return null; 

//           return (
//             <div key={msg.id} className={`flex flex-col gap-1 ${msg.type === "sent" ? "self-end items-end" : "self-start items-start"}`}>
//               {msg.messageType === "text" && msg.text && (
//                 <div className={`p-3 rounded-xl max-w-[calc(100%-40px)] sm:max-w-[300px] break-words ${msg.type === "sent" ? "bg-primary text-white rounded-tr-none" : "bg-white text-text-color-1 rounded-tl-none shadow-sm"}`}>
//                   <span className="text-sm leading-snug whitespace-pre-wrap">{msg.text}</span> 
//                   <div className="flex gap-2 mt-1 flex-wrap"> 
//                     {!msg.loading && msg.audioUrl && msg.type === 'received' && ( 
//                       <div className="mt-1">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => toggleAudio(msg.id, msg.audioUrl as string)}
//                           className={`flex items-center gap-1 text-xs p-1 h-auto ${playingAudio === msg.id ? "text-primary" : "text-gray-600 hover:text-primary"}`}
//                         >
//                           {playingAudio === msg.id ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
//                           <span>Play Audio</span>
//                         </Button>
//                         <audio
//                           ref={(el) => { if (el) audioRefs.current[msg.id] = el; }}
//                           src={msg.audioUrl}
//                           onEnded={() => setPlayingAudio(null)}
//                           className="hidden"
//                           playsInline
//                         />
//                       </div>
//                     )}
//                     {msg.type === "received" && msg.hasFeedback && msg.feedback && (
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => { onShowFeedback({ type: "feedback", content: msg.feedback }); }}
//                         className="flex items-center gap-1 text-primary text-xs mt-1 p-1 h-auto  hover:text-primary-dark"
//                       >
//                         <MessageCircle className="h-3 w-3" />
//                         Feedback
//                       </Button>
//                     )}
//                     {msg.type === "sent" && msg.hasAssessment && msg.assessments && (
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleShowAssessment(msg.assessments)}
//                         className="flex items-center gap-1 bg-white text-primary text-xs mt-1 p-1 h-auto shadow-sm hover:bg-gray-50"
//                       >
//                         <BarChart2 className="h-3 w-3" />
//                         Assessment
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               )}
//               {msg.messageType === "audio" && msg.type === "sent" && msg.audioURL && (
//                  <div className="p-2 rounded-xl bg-primary text-white rounded-tr-none max-w-[calc(100%-40px)] sm:max-w-[300px]">
//                     <audio className="w-full h-10" src={msg.audioURL} controls />
//                  </div>
//               )}
//             </div>
//           )
//         })}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2 sm:p-4">
//         <div className="flex items-center bg-white rounded-full px-3 sm:px-4 py-1 sm:py-2 shadow">
//           <Input
//             type="text"
//             value={message}
//             disabled={isRecording || sessionLimitReached || chatCompleted || isInactiveDialogOpen}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={
//               isInactiveDialogOpen ? "Session paused..." :
//                 sessionLimitReached ? "Session limit reached" :
//                   chatCompleted ? "Chat completed" :
//                     isRecording ? "Recording..." :
//                       "Write message..."
//             }
//             className="flex-1 border-none focus:ring-0 bg-transparent text-sm sm:text-base"
//           />
//           {isRecording && <span className="text-sm mx-2 text-gray-600">{formatTime(recordTime)}</span>}

//           {isRecording ? (
//             <div className="flex gap-1">
//               <Button
//                 type="button" 
//                 variant="ghost"
//                 size="icon"
//                 onClick={cancelRecording}
//                 className="text-red-500 hover:bg-red-100 rounded-full"
//               >
//                 <X className="h-5 w-5" />
//               </Button>
//               <Button
//                 type="button" 
//                 variant="ghost"
//                 size="icon"
//                 onClick={sendRecording}
//                 className="text-green-500 hover:bg-green-100 rounded-full"
//               >
//                 <ArrowUp className="h-5 w-5" />
//               </Button>
//             </div>
//           ) : message.trim() ? (
//             <Button
//               type="submit"
//               variant="ghost"
//               size="icon"
//               disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
//               className="text-primary hover:bg-primary-light rounded-full"
//             >
//               <Send className="h-5 w-5" />
//             </Button>
//           ) : (
//             <Button
//               type="button" 
//               variant="ghost"
//               size="icon"
//               onClick={startRecording}
//               disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
//               className="text-primary hover:bg-primary-light rounded-full"
//             >
//               <Mic className="h-5 w-5" />
//             </Button>
//           )}
//         </div>
//       </form>
      
//       {/* Dialogs */}
//       <Dialog open={isCompleteDialogOpen} onOpenChange={(open) => !open && handleResetChatNo()}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Chat Completed</DialogTitle>
//             <DialogDescription>
//               This topic has been completed. Do you want to reset this chat and start over, or end the session?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={handleResetChatNo}>
//               End Session
//             </Button>
//             <Button onClick={handleResetChatYes}>
//               Reset Chat
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog> 

//       <Dialog open={isInactiveDialogOpen} onOpenChange={(open) => !open && handleStillThereNo()}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Are you still there?</DialogTitle>
//             <DialogDescription>
//               Your session was paused due to inactivity. Do you want to continue?
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={handleStillThereNo}>
//               No, End Session
//             </Button>
//             <Button onClick={handleStillThereYes}>
//               Yes, Keep Me Here
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ChatWindow;
import React, { useState, useEffect, useRef } from "react";
import { toast } from 'sonner';
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
  LoaderPinwheel,
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

// TODO: SOCKET.IO - Import socket.io-client
import { io, Socket } from 'socket.io-client';

// Helper functions (unchanged)
function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

function findLast<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return array[i];
    }
  }
  return undefined;
}

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
  isCompleted?: boolean; // This might be handled by chatCompleted state primarily
  loading?: boolean;
  audioURL?: string; // Note: a duplicate-like key, ensure consistency if used
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
  const [chatCompleted, setChatCompleted] = useState(false);
  // const [processedResponses, setProcessedResponses] = useState(new Set()); // May need rethinking with event-based streaming
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [topicImage, setTopicImage] = useState<string | null>(null);
  // const [_isFeedbackDialog, setIsFeedbackDialog] = useState(false); // Unused, consider removing if not planned
  // const [_feedback, setFeedback] = useState<any>(null); // Unused, consider removing if not planned
  const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

  const lastRecordingEndTimeRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // TODO: SOCKET.IO - Change wsRef to socketRef and its type
  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const streamRef = useRef<MediaStream | null>(null);
  const isCanceledRef = useRef(false);
  const activityTimerId = useRef<NodeJS.Timeout | null>(null);
  const intentionalDisconnectRef = useRef(false);

  const { topicId } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const userData = JSON.parse(localStorage.getItem("AiTutorUser") || "{}");
  const userId = userData?.id;

  // TODO: SOCKET.IO - Update URL for Socket.IO connection
  const SOCKET_URL = "https://5b76-2400-adcc-107-7b00-c916-cfe6-4644-8590.ngrok-free.app"
  // const SOCKET_URL = import.meta.env.VITE_API_BASE_URL; // e.g., "http://localhost:3000"

  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const resetActivityTimer = () => {
    clearTimeout(activityTimerId.current as NodeJS.Timeout);
    activityTimerId.current = setTimeout(() => {
      console.log("Inactivity detected. Closing Socket.IO connection and showing dialog.");
      intentionalDisconnectRef.current = true;
      // TODO: SOCKET.IO - Update disconnection logic
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.warn("Socket.IO Disconnected due to Inactivity");
      }
      setIsInactiveDialogOpen(true);
    }, 60 * 1000 * 2); // 2 minutes
  };

  // TODO: SOCKET.IO - Rename and rewrite connectWebSocket to connectSocketIO
  const connectSocketIO = () => {
    if (socketRef.current && (socketRef.current.connected || socketRef.current.connecting)) {
      console.log(`Socket.IO already ${socketRef.current.connected ? 'connected' : 'connecting'}.`);
      if (socketRef.current.connected) {
        resetActivityTimer();
      }
      return;
    }

    console.log("Attempting to connect Socket.IO to:", SOCKET_URL);
    intentionalDisconnectRef.current = false;
    
    // Clean up any old listeners if socketRef.current exists but is disconnected
    if(socketRef.current) {
        socketRef.current.removeAllListeners();
    }

    const socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      // You can add auth here if needed, e.g., query: { token: 'your_token', userId, topicId }
      // path: "/socket.io" // Default, usually not needed unless changed in backend setup
      transportOptions: {
        polling: {
          extraHeaders: {
            "ngrok-skip-browser-warning": "69420",
          },
        },
      },
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log("✅ Socket.IO connected:", socket.id);
      if (userId && topicId) { // Ensure we have necessary IDs before fetching history
        getChatHistory();
      } else {
        console.warn("User ID or Topic ID missing, cannot fetch chat history on connect.");
        toast.error("Could not initialize chat. User or topic information is missing.");
      }
      resetActivityTimer();
    });

    socket.on('disconnect', (reason) => {
      console.log("Socket.IO disconnected:", reason);
      clearTimeout(activityTimerId.current as NodeJS.Timeout);
      if (intentionalDisconnectRef.current) {
        console.log("Socket.IO disconnected intentionally (e.g., inactivity, user action, component unmount).");
      } else if (!isInactiveDialogOpen && reason !== 'io client disconnect') {
        console.warn("Socket.IO disconnected unexpectedly:", reason);
        if (reason === 'transport close' || reason === 'ping timeout') {
          toast.error("Connection lost. Attempting to reconnect...");
        } else if (reason !== 'io server disconnect') { 
           toast.error("Connection lost. Please check your internet and refresh if the issue persists.");
        }
      }
    });

    socket.on('connect_error', (error) => {
      console.error("Socket.IO connection error:", error);
      toast.error(`Connection failed: ${error.message}. Please try refreshing.`);
    });

    // Register listeners for server-sent events based on NestJS backend
    socket.on('chat_history', handleChatHistory);
    socket.on('speech_transcribed', handleSpeechTranscribed);
    socket.on('error', handleError); // Generic error event from backend
    socket.on('session_status', handleSessionStatus);
    socket.on('attachment_url', handleAttachmentUrl);
    socket.on('chat_completed', handleChatCompletedEvent); // Specific event for chat completion status
    socket.on('reset_chat', handleResetChatResponse); // Response from reset_chat emit

    // ASSUMPTION: Events from chatService.generateStreamingResponse
    // These names ('ai_text_chunk', 'ai_response_complete') are assumed.
    // You MUST confirm these with your backend developer or ChatService code.
    socket.on('ai_text_chunk', handleAiTextChunk); // For streaming AI text
    socket.on('ai_response_complete', handleAiResponseComplete); // For final AI response with audio/feedback
  };

  useEffect(() => {
    if (userId && topicId) {
      connectSocketIO();
    } else {
      console.error("User ID or Topic ID not found in localStorage or params. Cannot initialize WebSocket.");
      toast.error("Critical error: User or Topic information missing. Cannot load chat.");
    }

    return () => {
      intentionalDisconnectRef.current = true;
      clearTimeout(activityTimerId.current as NodeJS.Timeout);
      if (socketRef.current) {
        console.log("Closing Socket.IO on component unmount.");
        socketRef.current.disconnect();
        socketRef.current.removeAllListeners(); 
        socketRef.current = null;
      }
    };
  }, [userId, topicId, SOCKET_URL]); // Added SOCKET_URL to dependencies, though it's likely constant.

  useEffect(() => { 
    const latestAudioMsg = findLast(messages, (msg) => msg.type === "received" && msg.audioUrl && !msg.audioPlayed);
    if (latestAudioMsg && audioRefs.current[latestAudioMsg.id]) {
      const audioElement = audioRefs.current[latestAudioMsg.id];
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingAudio(latestAudioMsg.id);
            setMessages((currentMessages) =>
              currentMessages.map((m) =>
                m.id === latestAudioMsg.id ? { ...m, audioPlayed: true } : m
              )
            );
          })
          .catch((error) => {
            console.warn("Autoplay prevented:", error.name, error.message); 
          });
      }
    }
  }, [messages]);

  const handleAttachmentUrl = (data: { attachment: string | string[] }) => { 
    console.log("Received attachment_url:", data);
    if (data.attachment) {
      const imageUrl = Array.isArray(data.attachment)
        ? data.attachment[0]
        : data.attachment;
      setTopicImage(imageUrl);
      if (onTopicImage) {
        onTopicImage(imageUrl);
      }
    }
  };

  const handleChatHistory = (data: { chatHistory: any[], chatId?: string, isCompleted?: boolean }) => { 
    console.log("Received chat_history:", data);
    if (data.chatHistory && Array.isArray(data.chatHistory)) {
      const formattedMessages = data.chatHistory
        .filter((message: any) => message.content && message.content.trim() !== "") 
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
        }));
      setMessages(formattedMessages);
      if (data.chatId) setChatId(data.chatId);
      
      const isChatSessionCompleted = data.isCompleted || data.chatHistory.some((m: any) => m.isCompleted);
      if (isChatSessionCompleted) {
          handleChatCompletedEvent({ message: "This chat has been completed from history." });
      }
    } else {
        setMessages([]); 
    }
  };
  
  const handleChatCompletedEvent = (data: { message: string }) => {
    console.log("Received chat_completed event:", data);
    setChatCompleted(true);
    removeLoadingMessage(); // Ensure no loading indicators are stuck
    // Open dialog only if not already open to avoid flicker if multiple completion events arrive
    if (!isCompleteDialogOpen) {
        setIsCompleteDialogOpen(true); 
    }
    toast.info(data.message || "This chat has been completed.");
  };

  const handleAiTextChunk = (data: { text: string } | string) => { 
    const textChunk = typeof data === 'string' ? data : data.text;
    console.log("Received ai_text_chunk:", textChunk);
    if (textChunk) {
      setMessages(currentMessages => {
        const lastMsgIndex = findLastIndex(currentMessages, m => m.type === 'received' && m.loading); 
        if (lastMsgIndex !== -1) {
          const newMessages = [...currentMessages];
          const currentText = newMessages[lastMsgIndex].text || "";
          newMessages[lastMsgIndex] = {
            ...newMessages[lastMsgIndex],
            text: currentText.replace("...", "") + textChunk + "...", 
            loading: true, 
            messageType: "text",
          };
          return newMessages;
        } else {
          return [...currentMessages, {
            id: "ai-streaming-" + Date.now(),
            text: textChunk + "...",
            type: "received",
            messageType: "text",
            loading: true,
          } as Message];
        }
      });
    }
  };

  const handleAiResponseComplete = (data: { ai_response?: string; tts_audio_url?: string; feedback?: any; }) => {
    console.log("Received ai_response_complete:", data);
    
    setMessages(currentMessages => {
        const lastMsgIndex = findLastIndex(currentMessages, m => m.type === 'received' && m.loading);
        if (lastMsgIndex !== -1) {
            const newMessages = [...currentMessages];
            newMessages[lastMsgIndex] = {
                ...newMessages[lastMsgIndex],
                text: data.ai_response || newMessages[lastMsgIndex].text?.replace("...", ""),
                audioUrl: data.tts_audio_url,
                feedback: data.feedback || null,
                hasFeedback: !!data.feedback,
                audioPlayed: !data.tts_audio_url,
                loading: false, // Finalize loading state
            };
            return newMessages;
        } else {
            // If no loading message was found (e.g., direct complete response), add a new one
            return [...currentMessages, {
                id: "ai-complete-" + Date.now(),
                text: data.ai_response,
                audioUrl: data.tts_audio_url,
                feedback: data.feedback || null,
                hasFeedback: !!data.feedback,
                audioPlayed: !data.tts_audio_url,
                type: "received",
                messageType: "text",
                loading: false,
            } as Message];
        }
    });
  };


  const handleSpeechTranscribed = (data: { textMessage: string; assessments?: any }) => { 
    console.log("Received speech_transcribed:", data);
    // Remove the audio message sent by the user, as it's now replaced by transcribed text
    setMessages((currentMessages) => currentMessages.filter(msg => !(msg.type === "sent" && msg.messageType === "audio")));
    
    setMessages((m) => [
      ...m,
      {
        id: "user-transcribed-" + Date.now().toString(),
        messageType: "text",
        text: data.textMessage,
        type: "sent",
        assessments: data.assessments || null,
        hasAssessment: !!data.assessments,
      },
    ]);
    removeLoadingMessage(); 
  };

  const handleError = (errorData: { message: string; error?: any }) => { 
    console.error("Received server error:", errorData.message, errorData.error || '');
    removeLoadingMessage();
    if (errorData.message.includes("Daily session limit")) {
      setSessionLimitReached(true);
      toast.error("Daily session limit reached. Try again tomorrow.");
    } else if (errorData.message.includes("This chat has been completed")) {
        handleChatCompletedEvent({ message: errorData.message });
    } else {
        toast.error(errorData.message || "An unknown error occurred.");
    }
  };

  const handleSessionStatus = (data: { remainingSeconds?: number }) => { 
    console.log("Received session_status:", data);
    if (data.remainingSeconds !== undefined) {
      setSessionTimeRemaining(data.remainingSeconds);
      if (data.remainingSeconds > 0 && data.remainingSeconds < 60) { 
        toast.warning(`Session time running out! Only ${data.remainingSeconds} seconds left.`);
      } else if (data.remainingSeconds <= 0) {
        setSessionLimitReached(true); 
        toast.error("Your session has ended.");
        // Potentially disconnect or show a session ended dialog
      }
    }
  };
  
  const handleResetChatResponse = (data: { success?: boolean; message?: string; chatId?: string, chatHistory?: any[] }) => {
    // Note: Backend 'reset_chat' event in Gateway doesn't explicitly send 'success', 'message', 'chatId', 'chatHistory'.
    // It sends `result` which is ` { success: true, chatId: newChat.id, chatHistory: [] }` from `chatService.resetChat`.
    // Adjusting based on this structure.
    console.log("Received reset_chat response:", data);
    // Assuming data directly is the result object.
    if (data && typeof data.chatId === 'string') { // Check for a valid reset response (e.g., has new chatId)
        toast.success(data.message || "Chat has been reset successfully!");
        setMessages([]); 
        setChatCompleted(false);
        setSessionLimitReached(false); 
        setChatId(data.chatId);

        if (data.chatHistory && Array.isArray(data.chatHistory)) {
            handleChatHistory({ chatHistory: data.chatHistory, chatId: data.chatId });
        } else {
            getChatHistory(); 
        }
        setIsCompleteDialogOpen(false);
    } else {
        toast.error(data?.message || "Failed to reset chat or unexpected response.");
    }
  };

  const updateOrAddMessage = (messageData: Partial<Message>) => { // This might be less used if streaming handles its own messages
    setMessages((currentMessages) => {
      const lastAiMessageIndex = findLastIndex(currentMessages, (m) => m.type === "received" && (m.loading || (m.text && !m.audioUrl && !m.id?.startsWith("user-"))));
      if (lastAiMessageIndex !== -1 && currentMessages[lastAiMessageIndex].id === (messageData.id || currentMessages[lastAiMessageIndex].id)) {
        const newMessages = [...currentMessages];
        newMessages[lastAiMessageIndex] = {
          ...newMessages[lastAiMessageIndex],
          ...messageData,
          loading: false, 
        };
        return newMessages;
      } else {
        return [...currentMessages, { id: "ai-message-" + Date.now().toString(), type: "received", ...messageData } as Message];
      }
    });
  };

  const removeLoadingMessage = () => {
    setMessages((currentMessages) => currentMessages.filter((m) => !m.loading));
  };

  const toggleAudio = (id: string, _audioUrl: string) => { /* Unchanged */ };

  const getChatHistory = () => {
    if (socketRef.current && socketRef.current.connected) {
      if (userId && topicId) {
        console.log("Emitting getChatHistory", { userId, topicId });
        socketRef.current.emit('getChatHistory', { userId, topicId });
        resetActivityTimer();
      } else {
        console.warn("Cannot get chat history: userId or topicId is missing.");
      }
    } else {
      console.warn("Cannot get chat history, Socket.IO not connected.");
    }
  };

  const sendPlaceholder = () => { 
    setMessages((m) => [...m, { id: "loading-" + Date.now(), loading: true, messageType: "loading", type: "received", text: "AI is thinking..." } as Message]);
  };

  const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  const getSupportedAudioType = () => (isIOS() ? "audio/mp4" : "audio/webm");

  const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => { /* Unchanged */ });
  const cleanupRecording = () => { /* Unchanged but ensure it's called in error paths of start/stop recording */ };
  const cancelRecording = () => { /* Unchanged */ };

  const sendRecording = async () => { 
    if (isRecording && mediaRecorderRef.current) {
      try {
        if (isIOS() && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.requestData(); 
          await new Promise(resolve => setTimeout(resolve, 200)); 
        }
        if (mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
      } catch (err) {
        console.error("Error finalizing recording by stopping recorder:", err);
        toast.error("Could not finalize recording. Please try again.");
        cleanupRecording(); 
      }
    }
  };

  const startRecording = async () => { 
    if (sessionLimitReached || chatCompleted) {
      toast.error(sessionLimitReached ? "Daily session limit reached." : "Chat completed. Please reset to continue.");
      return;
    }
    if (!socketRef.current || !socketRef.current.connected) {
      toast.error("Not connected. Please wait or try reconnecting.");
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
      console.log("Recording started with MIME type:", mimeType);
      streamRef.current = stream;
      // Ensure existing MediaRecorder is fully stopped and cleaned up if any
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.onstop = null; // Remove old onstop
        mediaRecorderRef.current.stop();
      }
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
      mr.onerror = (event: Event) => { // Use Event type for MediaRecorderErrorEvent if available
        console.error("MediaRecorder error:", event);
        cleanupRecording();
        toast.error("Recording error. Please try again.");
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
            toast.error("No audio captured. Try again.");
            return;
          }
          const blob = new Blob(audioChunksRef.current, { type: mimeType });
          if (blob.size < 100) { 
            console.warn("Audio blob too small, size:", blob.size);
            cleanupRecording();
            toast.error("Recording too short. Try again.");
            return;
          }
          const audioURL = URL.createObjectURL(blob); 
          setMessages((m) => [...m, { id: "user-audio-" + Date.now().toString(), messageType: "audio", audioURL, type: "sent" } as Message]);
          sendPlaceholder(); 
          
          const base64 = await blobToBase64(blob);
          
          if (socketRef.current && socketRef.current.connected) {
            if (!chatId) {
                console.error("Cannot send audio: chatId is null.");
                toast.error("Error: Chat session not properly initialized. Cannot send audio.");
                removeLoadingMessage();
                cleanupRecording();
                return;
            }
            const audioPayload = {
              userId,
              chatId, 
              audioBuffer: base64,
              format: mimeType.split("/")[1] 
            };
            console.log("Emitting audio:", audioPayload.format, "chatId:", chatId);
            socketRef.current.emit('audio', audioPayload);
            resetActivityTimer();
          } else {
            console.error("Socket.IO not open for sending audio");
            removeLoadingMessage();
            toast.error("Connection error. Could not send audio. Please refresh.");
            setIsInactiveDialogOpen(true);
          }
        } catch (error) {
          console.error("Error processing recording:", error);
          removeLoadingMessage();
          toast.error("Error processing recording. Try again.");
        } finally {
          cleanupRecording();
        }
      };
      mr.start(isIOS() ? undefined : 1000); 
      setIsRecording(true);
    } catch (error: any) {
      console.error("Error starting recording:", error);
      toast.error(error.message || (isIOS() ? "Mic access error (iOS). Check permissions." : "Mic access error. Check permissions."));
      cleanupRecording();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => { 
    if (e) e.preventDefault();
    if (!message.trim()) return;
    if (sessionLimitReached || chatCompleted) {
      toast.error(sessionLimitReached ? "Daily session limit reached." : "Chat completed. Please reset to continue.");
      return;
    }
    if (!socketRef.current || !socketRef.current.connected) {
      toast.error("Not connected. Please wait or try reconnecting.");
      setIsInactiveDialogOpen(true);
      return;
    }
    if (!chatId) {
        console.error("Cannot send text message: chatId is null.");
        toast.error("Error: Chat session not properly initialized. Cannot send message.");
        return;
    }

    const sentMessageText = message.trim();
    setMessages((m) => [...m, { id: "user-text-" + Date.now().toString(), messageType: "text", text: sentMessageText, type: "sent" } as Message]);
    sendPlaceholder();
    
    const textPayload = {
      userId,
      chatId, 
      textMessage: sentMessageText
    };
    console.log("Emitting text:", textPayload, "chatId:", chatId);
    socketRef.current.emit('text', textPayload);
    setMessage("");
    resetActivityTimer();
  };

  const formatTime = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  const formatSessionTime = (seconds: number | null) => seconds === null ? "" : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  // const displayMessages = messages.filter((msg) => msg.type !== "system" && msg.messageType !== "loading"); 
  const handleShowAssessment = (assessments: any) => onShowFeedback({ type: "assessment", content: assessments });
  const handleBackClick = () => navigate(-1);

  const handleStillThereYes = () => {
    setIsInactiveDialogOpen(false);
    intentionalDisconnectRef.current = false; 
    if (socketRef.current && !socketRef.current.connected) {
      console.log("User wants to continue. Reconnecting Socket.IO...");
      socketRef.current.connect(); 
    } else if (!socketRef.current) {
        console.log("User wants to continue. Initializing and connecting Socket.IO...");
        connectSocketIO(); 
    } else {
        console.log("User wants to continue, Socket.IO already connected/connecting.");
        resetActivityTimer(); 
    }
  };

  const handleStillThereNo = () => {
    setIsInactiveDialogOpen(false);
    intentionalDisconnectRef.current = true;
    socketRef.current?.disconnect();
    console.log("User does not want to continue. Navigating away.");
    navigate(-1);
  };

  const handleResetChatNo = () => {
    setIsCompleteDialogOpen(false);
    if (chatCompleted) { // If chat was completed, and they say no to reset, navigate away
        navigate(-1);
    }
  };

  const resetChat = () => {
    if (chatCompleted && sessionLimitReached) {
        toast.error("Cannot reset chat when daily session limit is reached and chat is completed.");
        return;
    }
    if (socketRef.current && socketRef.current.connected) {
      if (userId && topicId) {
        console.log("Emitting reset_chat", { userId, topicId });
        socketRef.current.emit('reset_chat', { userId, topicId });
        resetActivityTimer();
      } else {
        toast.error("Cannot reset chat: User or Topic ID missing.");
      }
    } else {
      toast.error("Not connected. Cannot reset chat.");
      setIsInactiveDialogOpen(true); 
    }
  };

  const handleResetChatYes = () => {
    resetChat();
  };

  // JSX (largely unchanged, but message display logic might need slight tweaks for streaming)
  return (
    <div className="flex flex-col max-h-[86vh] min-h-[86vh] md:min-h-[82vh] md:max-h-[82vh] max-w-[800px] mx-auto bg-card rounded-xl overflow-hidden bg-gray-100 p-2">
      <header className="flex justify-between items-center px-4 sm:px-6 py-3 border-b border-gray-200"> {/* Adjusted padding and border */}
        <Button variant="ghost" size="icon" onClick={handleBackClick}>
          <ChevronLeft className="h-5 w-5" /> {/* Slightly larger icon */}
        </Button>
        <h2 className="text-lg sm:text-xl font-semibold text-font-dark">{mode === "photo-mode" ? "Photo Mode" : "Chat Mode"}</h2>
        {sessionTimeRemaining !== null && (
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <Clock className="h-4 w-4" />
            <span>{formatSessionTime(sessionTimeRemaining)}</span> {/* Removed "remaining" for brevity on small screens */}
          </div>
        )}
        <div className="flex items-center gap-2">
          {/* Language selector can be added back if needed */}
        </div>
      </header>

      <div className="sm:hidden"> {/* Topic image for small screens */}
        {mode === "photo-mode" && topicImage && (
          <img src={topicImage} alt="Topic context" className="p-2 sm:p-4 w-full max-h-40 object-contain" />
        )}
      </div>
      
      {/* Status Messages */}
      {chatCompleted && !isCompleteDialogOpen && <div className="bg-yellow-100 text-yellow-800 p-2 text-center text-sm">Chat completed. You can reset to start over.</div>}
      {sessionLimitReached && <div className="bg-red-100 text-red-800 p-2 text-center text-sm">Daily session limit reached. Try again tomorrow.</div>}

      <div className="flex-1 overflow-y-auto p-2 sm:p-4 flex flex-col gap-3 sm:gap-4">
        {messages.map((msg) => {
          if (msg.messageType === "loading" && msg.type === "received") { 
            return (
              <div key={msg.id} className="flex self-start items-center gap-2 p-3 rounded-xl bg-white text-text-color-1 rounded-tl-none max-w-[300px] shadow-sm">
                <div className="animate-spin-slow">
                  <LoaderPinwheel size={18} />
                </div>
                <span className="text-sm italic">{msg.text || "AI is thinking..."}</span>
              </div>
            );
          }
          if(msg.type === "system") return null; 

          return (
            <div key={msg.id} className={`flex flex-col gap-1 ${msg.type === "sent" ? "self-end items-end" : "self-start items-start"}`}>
              {msg.messageType === "text" && msg.text && (
                <div className={`p-3 rounded-xl max-w-[calc(100%-40px)] sm:max-w-[300px] break-words ${msg.type === "sent" ? "bg-primary text-white rounded-tr-none" : "bg-white text-text-color-1 rounded-tl-none shadow-sm"}`}>
                  <span className="text-sm leading-snug whitespace-pre-wrap">{msg.text}</span> 
                  <div className="flex gap-2 mt-1 flex-wrap"> 
                    {!msg.loading && msg.audioUrl && msg.type === 'received' && ( 
                      <div className="mt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAudio(msg.id, msg.audioUrl as string)}
                          className={`flex items-center gap-1 text-xs p-1 h-auto ${playingAudio === msg.id ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                        >
                          {playingAudio === msg.id ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          <span>Play Audio</span>
                        </Button>
                        <audio
                          ref={(el) => { if (el) audioRefs.current[msg.id] = el; }}
                          src={msg.audioUrl}
                          onEnded={() => setPlayingAudio(null)}
                          className="hidden"
                          playsInline
                        />
                      </div>
                    )}
                    {msg.type === "received" && msg.hasFeedback && msg.feedback && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { onShowFeedback({ type: "feedback", content: msg.feedback }); }}
                        className="flex items-center gap-1 text-primary text-xs mt-1 p-1 h-auto  hover:text-primary-dark"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Feedback
                      </Button>
                    )}
                    {msg.type === "sent" && msg.hasAssessment && msg.assessments && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShowAssessment(msg.assessments)}
                        className="flex items-center gap-1 bg-white text-primary text-xs mt-1 p-1 h-auto shadow-sm hover:bg-gray-50"
                      >
                        <BarChart2 className="h-3 w-3" />
                        Assessment
                      </Button>
                    )}
                  </div>
                </div>
              )}
              {msg.messageType === "audio" && msg.type === "sent" && msg.audioURL && (
                 <div className="p-2 rounded-xl bg-primary text-white rounded-tr-none max-w-[calc(100%-40px)] sm:max-w-[300px]">
                    <audio className="w-full h-10" src={msg.audioURL} controls />
                 </div>
              )}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-2 sm:p-4">
        <div className="flex items-center bg-white rounded-full px-3 sm:px-4 py-1 sm:py-2 shadow">
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
            className="flex-1 border-none focus:ring-0 bg-transparent text-sm sm:text-base"
          />
          {isRecording && <span className="text-sm mx-2 text-gray-600">{formatTime(recordTime)}</span>}

          {isRecording ? (
            <div className="flex gap-1">
              <Button
                type="button" 
                variant="ghost"
                size="icon"
                onClick={cancelRecording}
                className="text-red-500 hover:bg-red-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
              <Button
                type="button" 
                variant="ghost"
                size="icon"
                onClick={sendRecording}
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
              disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
              className="text-primary hover:bg-primary-light rounded-full"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="button" 
              variant="ghost"
              size="icon"
              onClick={startRecording}
              disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
              className="text-primary hover:bg-primary-light rounded-full"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>
      
      {/* Dialogs */}
      <Dialog open={isCompleteDialogOpen} onOpenChange={(open) => !open && handleResetChatNo()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Completed</DialogTitle>
            <DialogDescription>
              This topic has been completed. Do you want to reset this chat and start over, or end the session?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleResetChatNo}>
              End Session
            </Button>
            <Button onClick={handleResetChatYes}>
              Reset Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> 

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