// // src/components/ChatWindow.tsx

// // Step 1: Make sure you have the client library installed
// // npm install socket.io-client
// // or
// // yarn add socket.io-client

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { toast } from 'sonner';
// import { io, Socket } from "socket.io-client";
// import {
//   Mic, Send, ChevronLeft, Languages, MessageCircle, Clock, BarChart2,
//   Play, Pause, ArrowUp, X, LoaderPinwheel,
// } from "lucide-react";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter,
// } from "@/components/ui/dialog";

// // --- Source of Truth for Event Names (from backend/constants/chat.event.ts) ---
// const ChatEvents = {
//   // Client to Server
//   RESET_CHAT: 'reset_chat',
//   GET_CHAT_HISTORY: 'getChatHistory',
//   AUDIO: 'audio',
//   TEXT: 'text',
//   SESSION_STATUS: 'session_status',

//   // Server to Client
//   ERROR: 'error',
//   AI_RESPONSE: 'AI_RESPONSE',
//   TTS_AUDIO_URL: 'TTS_AUDIO_URL',
//   CHAT_HISTORY: 'chat_history',
//   CHAT_COMPLETED: 'chat_completed',
//   ATTACHMENT_URL: 'attachment_url',
//   SPEECH_TRANSCRIBED: 'speech_transcribed',
//   STREAMING_COMPLETE: 'streaming_complete',
//   SESSION_STATUS_UPDATE: 'session_status',
// } as const;


// // --- Type Definitions for Socket Events (UPDATED) ---

// interface ServerToClientEvents {
//   connect: () => void;
//   disconnect: () => void;
//   connect_error: (err: Error) => void;

//   [ChatEvents.ERROR]: (payload: { message: string; error?: any }) => void;
//   [ChatEvents.RESET_CHAT]: (payload: { success: boolean; message: string }) => void;
//   [ChatEvents.CHAT_HISTORY]: (payload: { chatHistory: any[]; chatId: string }) => void;
//   [ChatEvents.CHAT_COMPLETED]: (payload: { message: string }) => void;
//   [ChatEvents.ATTACHMENT_URL]: (payload: { attachment: string }) => void;
//   [ChatEvents.SPEECH_TRANSCRIBED]: (payload: { textMessage: string; assessments: any }) => void;
//   [ChatEvents.SESSION_STATUS_UPDATE]: (payload: { remainingSeconds: number }) => void;

//   // --- NEW MULTI-STAGE RESPONSE EVENTS ---
//   [ChatEvents.AI_RESPONSE]: (payload: { ai_response: string; feedback: string }) => void;
//   [ChatEvents.TTS_AUDIO_URL]: (payload: { tts_audio_url: string }) => void;
//   [ChatEvents.STREAMING_COMPLETE]: (payload: { isCompleted: boolean; [key: string]: any }) => void;
// }

// interface ClientToServerEvents {
//   [ChatEvents.RESET_CHAT]: (payload: { userId: string; topicId: string }) => void;
//   [ChatEvents.GET_CHAT_HISTORY]: (payload: { userId: string; topicId: string }) => void;
//   [ChatEvents.AUDIO]: (payload: { userId: string; chatId: string | null; audioBuffer: string; format: string }) => void;
//   [ChatEvents.TEXT]: (payload: { userId: string; chatId: string | null; textMessage: string }) => void;
//   [ChatEvents.SESSION_STATUS]: (payload: { userId: string }) => void;
// }

// // --- Component Interfaces ---
// interface Message {
//   id: string;
//   messageType: 'text' | 'audio' | 'loading';
//   text?: string;
//   type: "sent" | "received";
//   feedback?: any;
//   audioUrl?: string;
//   audioPlayed?: boolean;
//   hasFeedback?: boolean;
//   hasAssessment?: boolean;
//   assessments?: any;
//   loading?: boolean;
// }

// interface ChatWindowProps {
//   onShowFeedback: (feedback: { type: string; content: any }) => void;
//   onTopicImage: (imageUrl: string) => void;
// }

// // Helper to find the last item in an array, useful for updating messages
// function findLastIndex<T>(array: T[], predicate: (value: T) => boolean): number {
//   for (let i = array.length - 1; i >= 0; i--) {
//     if (predicate(array[i])) {
//       return i;
//     }
//   }
//   return -1;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ onShowFeedback, onTopicImage }) => {
//   // --- State Management ---
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordTime, setRecordTime] = useState(0);
//   const [chatId, setChatId] = useState<string | null>(null);
//   const [sessionTimeRemaining, setSessionTimeRemaining] = useState<number | null>(null);
//   const [sessionLimitReached, setSessionLimitReached] = useState(false);
//   const [chatCompleted, setChatCompleted] = useState(false);
//   const [playingAudio, setPlayingAudio] = useState<string | null>(null);
//   const [topicImage, setTopicImage] = useState<string | null>(null);
//   const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);
//   const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
//   const [isSocketConnected, setIsSocketConnected] = useState(false);

//   // --- Refs ---
//   const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);
//   const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
//   const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const isCanceledRef = useRef(false);
//   const recordTimerRef = useRef<NodeJS.Timeout | null>(null);


//   // --- React Router & User Data ---
//   const { topicId } = useParams<{ topicId: string }>();
//   if (!topicId) throw new Error("Topic ID is required");
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const mode = searchParams.get("mode");
//   const userData = JSON.parse(localStorage.getItem("AiTutorUser") || "{}");
//   const userId = userData?.id;
//   const SOCKET_URL = "https://56ef-2400-adcc-107-7b00-6823-439d-706d-905c.ngrok-free.app";
//   // const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;


//   // --- Core Logic: Activity Timer ---
//   const resetActivityTimer = useCallback(() => {
//     if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
//     activityTimerRef.current = setTimeout(() => {
//       console.log("Inactivity detected. Disconnecting socket and showing dialog.");
//       socketRef.current?.disconnect();
//       setIsInactiveDialogOpen(true);
//     }, 2 * 60 * 1000);
//   }, []);

//   // --- Core Logic: Socket Connection and Event Handling ---
//   useEffect(() => {
//     if (!userId) {
//       toast.error("User information is missing. Cannot start chat.");
//       navigate(-1);
//       return;
//     }

//     // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);
//     const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
//       reconnectionAttempts: 5,
//       reconnectionDelay: 5000,
//       extraHeaders: {
//         "ngrok-skip-browser-warning": "true" 
//       }
//     });
    
//     socketRef.current = socket;

//     // --- System Event Listeners ---
//     socket.on("connect", () => {
//       console.log("✅ Socket connected:", socket.id);
//       setIsSocketConnected(true);
//       toast.success("Connection established.");
//       socket.emit(ChatEvents.GET_CHAT_HISTORY, { userId, topicId });
//       socket.emit(ChatEvents.SESSION_STATUS, { userId });
//       resetActivityTimer();
//     });

//     socket.on("disconnect", () => {
//       console.warn("🔌 Socket disconnected.");
//       setIsSocketConnected(false);
//       if (!isInactiveDialogOpen) {
//         toast.warning("Connection lost. Attempting to reconnect...");
//       }
//     });

//     socket.on("connect_error", (err) => console.error("Connection Error:", err.message));
    
//     // --- Application Event Listeners ---
//     socket.on(ChatEvents.CHAT_HISTORY, ({ chatHistory, chatId: newChatId }) => {
//       const formattedMessages: Message[] = chatHistory.map((msg: any) => ({
//         id: msg.id || crypto.randomUUID(), messageType: 'text', text: msg.content,
//         type: msg.sender === 'ai' ? 'received' : 'sent', audioUrl: msg.audioUrl,
//         audioPlayed: true, assessments: msg.assessments, hasAssessment: !!msg.assessments,
//         feedback: msg.feedback, hasFeedback: !!msg.feedback,
//       }));
//       setMessages(formattedMessages);
//       setChatId(newChatId);
//       const isCompleted = chatHistory.some((m: any) => m.isCompleted);
//       if (isCompleted) { setChatCompleted(true); setIsCompleteDialogOpen(true); }
//     });
    
//     socket.on(ChatEvents.SPEECH_TRANSCRIBED, ({ textMessage, assessments }) => {
//         removeLoadingMessage();
//         setMessages((prev) => [...prev, {
//             id: crypto.randomUUID(), type: 'sent', messageType: 'text', text: textMessage,
//             assessments, hasAssessment: !!assessments,
//         }]);
//     });
    
//     // --- REFACTORED AI RESPONSE HANDLING ---
//     socket.on(ChatEvents.AI_RESPONSE, ({ ai_response, feedback }) => {
//         setMessages(prev => {
//             const newMessages = [...prev];
//             const loadingIndex = findLastIndex(newMessages, msg => msg.loading === true);
//             if (loadingIndex !== -1) {
//                 newMessages[loadingIndex] = {
//                     ...newMessages[loadingIndex], id: crypto.randomUUID(), loading: false,
//                     messageType: 'text', type: 'received', text: ai_response,
//                     feedback, hasFeedback: !!feedback,
//                 };
//             }
//             return newMessages;
//         });
//     });

//     socket.on(ChatEvents.TTS_AUDIO_URL, ({ tts_audio_url }) => {
//         setMessages(prev => {
//             const newMessages = [...prev];
//             const lastAiMsgIndex = findLastIndex(newMessages, msg => msg.type === 'received');
//             if (lastAiMsgIndex !== -1) {
//                 newMessages[lastAiMsgIndex] = {
//                     ...newMessages[lastAiMsgIndex],
//                     audioUrl: tts_audio_url, audioPlayed: false,
//                 };
//             }
//             return newMessages;
//         });
//     });

//     // socket.on(ChatEvents.STREAMING_COMPLETE, (payload) => {
//     //     console.log("AI response cycle complete.", payload);
//     //     if (payload.isCompleted) {
//     //         setChatCompleted(true);
//     //         setIsCompleteDialogOpen(true);
//     //     }
//     //     removeLoadingMessage(); 
//     // });
//     socket.on(ChatEvents.STREAMING_COMPLETE, (payload) => {
//       // logBackendReceive(ChatEvents.STREAMING_COMPLETE, payload);
//       const { ai_response, feedback, ttsAudioUrl, isCompleted } = payload;
    
//       // This is the fix: Ensure the message is displayed using the final payload.
//       // This acts as a fallback if the AI_RESPONSE event was missed.
//       setMessages(prev => {
//         const newMessages = [...prev];
//         // Find the loading spinner placeholder
//         const loadingIndex = findLastIndex(newMessages, msg => msg.loading === true);
    
//         if (loadingIndex !== -1) {
//           // Replace the placeholder with the final, complete message data
//           newMessages[loadingIndex] = {
//             id: newMessages[loadingIndex].id, // Keep the original temp ID to avoid key issues
//             loading: false,
//             messageType: 'text',
//             type: 'received',
//             text: ai_response,
//             feedback: feedback,
//             hasFeedback: !!feedback,
//             audioUrl: ttsAudioUrl,
//             audioPlayed: false, // Set to false to enable autoplay
//           };
//         }
//         // If no placeholder was found, do nothing, to avoid adding a duplicate message.
//         return newMessages;
//       });
    
//       if (isCompleted) {
//         setChatCompleted(true);
//         setIsCompleteDialogOpen(true);
//       }
//     });
//     // --- END OF REFACTORED LOGIC ---

//     socket.on(ChatEvents.SESSION_STATUS_UPDATE, ({ remainingSeconds }) => {
//         setSessionTimeRemaining(remainingSeconds);
//         if (remainingSeconds <= 0) { setSessionLimitReached(true); }
//     });

//     socket.on(ChatEvents.ERROR, ({ message }) => {
//         toast.error(message);
//         if (message.includes("Daily session limit")) { setSessionLimitReached(true); }
//         removeLoadingMessage();
//     });

//     socket.on(ChatEvents.CHAT_COMPLETED, ({ message }) => {
//         setChatCompleted(true);
//         setIsCompleteDialogOpen(true);
//         toast.info(message);
//     });

//     socket.on(ChatEvents.ATTACHMENT_URL, ({ attachment }) => {
//         setTopicImage(attachment);
//         onTopicImage(attachment);
//     });
    
//     return () => {
//       if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
//       socket.disconnect();
//     };
//   }, [userId, topicId, navigate, resetActivityTimer, onTopicImage]);

//   // --- Message & UI Helpers ---
//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   useEffect(scrollToBottom, [messages]);
  
//   const sendPlaceholder = () => {
//     setMessages((prev) => [...prev, { id: `loading-${Date.now()}`, loading: true, messageType: "loading", type: "received" }]);
//   };
//   const removeLoadingMessage = () => setMessages((prev) => prev.filter((m) => !m.loading));

//   // --- Media & Recording ---
//   const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => reader.result ? resolve((reader.result as string).split(",")[1]) : reject("Blob read failed");
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
  
//   const startRecording = async () => {
//     if (!isSocketConnected || sessionLimitReached || chatCompleted) return;
//     try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         streamRef.current = stream;
//         const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/webm';
//         const recorder = new MediaRecorder(stream, { mimeType });
//         mediaRecorderRef.current = recorder;
//         audioChunksRef.current = [];
//         isCanceledRef.current = false;

//         recorder.ondataavailable = (event) => {
//             if (event.data.size > 0) audioChunksRef.current.push(event.data);
//         };
//         recorder.onstop = async () => {
//             cleanupRecording();
//             if (isCanceledRef.current || audioChunksRef.current.length === 0) return;
//             const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
//             const audioBase64 = await blobToBase64(audioBlob);
//             const format = mimeType.split('/')[1];
//             sendPlaceholder();
//             socketRef.current?.emit(ChatEvents.AUDIO, { userId, chatId, audioBuffer: audioBase64, format });
//             resetActivityTimer();
//         };
//         recorder.start();
//         setIsRecording(true);
//         recordTimerRef.current = setInterval(() => setRecordTime(t => t + 1), 1000);
//     } catch (err) {
//         toast.error("Microphone access denied.");
//         cleanupRecording();
//     }
//   };
  
//   const stopRecording = (cancel = false) => {
//     isCanceledRef.current = cancel;
//     if (mediaRecorderRef.current?.state === 'recording') {
//         mediaRecorderRef.current.stop();
//     } else {
//         cleanupRecording(); // Cleanup even if not recording, to be safe
//     }
//   };
  
//   const cleanupRecording = () => {
//     if (recordTimerRef.current) clearInterval(recordTimerRef.current);
//     if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
//     setIsRecording(false);
//     setRecordTime(0);
//     streamRef.current = null;
//     mediaRecorderRef.current = null;
//   };

//   // --- Event Handlers (User Actions) ---
//   const handleSubmit = (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (!message.trim() || !isSocketConnected) return;
//     setMessages((prev) => [...prev, { id: crypto.randomUUID(), type: 'sent', messageType: 'text', text: message.trim() }]);
//     sendPlaceholder();
//     // The backend's TextMessageDto only requires userId, chatId, and textMessage.
//     socketRef.current?.emit(ChatEvents.TEXT, { userId, chatId, textMessage: message.trim() });
//     setMessage("");
//     resetActivityTimer();
//   };

//   const handleResetChat = () => {
//     if (!isSocketConnected) {
//         toast.error("Not connected. Cannot reset chat.");
//         return;
//     }
//     socketRef.current?.emit(ChatEvents.RESET_CHAT, { userId, topicId });
//     setMessages([]);
//     setChatCompleted(false);
//     setIsCompleteDialogOpen(false);
//     toast.success("Chat has been reset.");
//   };

//   const handleStillThere = (isContinuing: boolean) => {
//     setIsInactiveDialogOpen(false);
//     if (isContinuing) {
//       socketRef.current?.connect(); // Reconnect the existing socket instance
//     } else {
//       navigate(-1);
//     }
//   };

//   // --- AUTOPLAY AUDIO ---
//    useEffect(() => {
//     const latestAudioMsg = messages.find(msg => msg.type === "received" && msg.audioUrl && !msg.audioPlayed);
//     if (latestAudioMsg && audioRefs.current[latestAudioMsg.id]) {
//       const audioElement = audioRefs.current[latestAudioMsg.id];
//       audioElement.play().then(() => {
//         setPlayingAudio(latestAudioMsg.id);
//         setMessages(currentMessages =>
//           currentMessages.map(m =>
//             m.id === latestAudioMsg.id ? { ...m, audioPlayed: true } : m
//           )
//         );
//       }).catch(error => console.log("Autoplay prevented:", error));
//     }
//    }, [messages]);

//    const toggleAudio = (id: string) => {
//      // ... Omitted for brevity, this logic is UI-specific and doesn't need to change
//    };

//   // --- JSX & Rendering ---
//   return (
//     <div className="flex flex-col max-h-[86vh] min-h-[86vh] md:min-h-[82vh] md:max-h-[82vh] max-w-[800px] mx-auto bg-card rounded-xl overflow-hidden bg-gray-100 p-2">
//       <header className="flex justify-between items-center px-6 border-b-3 border-white">
//         {/* Header content... */}
//       </header>

//       {/* Status Banners, Message Area, etc... */}
//       <div className="flex-1 overflow-y-auto p-1 flex flex-col gap-4">
//         {messages.map((msg) => (
//           <div key={msg.id} className={`flex flex-col gap-1 ${msg.type === "sent" ? "self-end" : "self-start"}`}>
//             {msg.loading ? (
//               <div className="flex items-center gap-2">
//                 <LoaderPinwheel size={18} className="animate-spin-slow" />
//                 <span className="text-sm">AI is thinking...</span>
//               </div>
//             ) : (
//               <div className={`p-3 rounded-xl max-w-[300px] ${msg.type === "sent" ? "bg-primary text-white rounded-tr-none" : "bg-white text-text-color-1 rounded-tl-none"}`}>
//                 <p className="text-sm">{msg.text}</p>
//                 {/* Audio player ref and buttons for feedback/assessment would go here */}
//                 {msg.audioUrl && (
//                     <audio
//                         ref={(el) => { if (el) audioRefs.current[msg.id] = el; }}
//                         src={msg.audioUrl}
//                         onEnded={() => setPlayingAudio(null)}
//                         className="hidden"
//                         playsInline
//                     />
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Form */}
//       <form onSubmit={handleSubmit} className="border-t p-4">
//         <div className="flex items-center bg-white rounded-full px-4 py-2">
//           <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
//             placeholder={isRecording ? `Recording... ${new Date(recordTime * 1000).toISOString().substr(14, 5)}` : "Write a message..."}
//             disabled={isRecording || chatCompleted || sessionLimitReached || !isSocketConnected}
//             className="flex-1 border-none focus:ring-0"
//           />
//           {isRecording ? (
//             <div className="flex gap-1">
//                 <Button type="button" variant="ghost" size="icon" onClick={() => stopRecording(true)} className="text-red-500 hover:bg-red-100"><X className="h-4 w-4" /></Button>
//                 <Button type="button" variant="ghost" size="icon" onClick={() => stopRecording(false)} className="text-green-500 hover:bg-green-100"><ArrowUp className="h-4 w-4" /></Button>
//             </div>
//           ) : message.trim() ? (
//             <Button type="submit" variant="ghost" size="icon" disabled={!isSocketConnected || chatCompleted}><Send className="h-4 w-4" /></Button>
//           ) : (
//             <Button type="button" variant="ghost" size="icon" onClick={startRecording} disabled={!isSocketConnected || chatCompleted}><Mic className="h-4 w-4" /></Button>
//           )}
//         </div>
//       </form>
      
//       {/* Dialogs */}
//       <Dialog open={isCompleteDialogOpen} onOpenChange={(open) => !open && navigate(-1)}>
//           <DialogContent>
//               <DialogHeader><DialogTitle>Chat Completed</DialogTitle></DialogHeader>
//               <DialogDescription>This conversation has ended. Would you like to start over?</DialogDescription>
//               <DialogFooter>
//                   <Button variant="outline" onClick={() => navigate(-1)}>End Session</Button>
//                   <Button onClick={handleResetChat}>Reset Chat</Button>
//               </DialogFooter>
//           </DialogContent>
//       </Dialog>
      
//       <Dialog open={isInactiveDialogOpen} onOpenChange={(open) => !open && handleStillThere(false)}>
//           <DialogContent>
//               <DialogHeader><DialogTitle>Are you still there?</DialogTitle></DialogHeader>
//               <DialogDescription>Your session was paused due to inactivity. Do you want to continue?</DialogDescription>
//               <DialogFooter>
//                   <Button variant="outline" onClick={() => handleStillThere(false)}>No, End Session</Button>
//                   <Button onClick={() => handleStillThere(true)}>Yes, I'm Here</Button>
//               </DialogFooter>
//           </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ChatWindow;
// src/components/ChatWindow.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from 'sonner';
import { io, Socket } from "socket.io-client";
import {
  Mic, Send, ChevronLeft, Languages, MessageCircle, Clock, BarChart2,
  Play, Pause, ArrowUp, X, LoaderPinwheel,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";

// --- Event Names, Types, and Interfaces ---
const ChatEvents = {
  RESET_CHAT: 'reset_chat', GET_CHAT_HISTORY: 'getChatHistory', AUDIO: 'audio',
  TEXT: 'text', SESSION_STATUS: 'session_status', ERROR: 'error',
  AI_RESPONSE: 'AI_RESPONSE', TTS_AUDIO_URL: 'TTS_AUDIO_URL', CHAT_HISTORY: 'chat_history',
  CHAT_COMPLETED: 'chat_completed', ATTACHMENT_URL: 'attachment_url',
  SPEECH_TRANSCRIBED: 'speech_transcribed', STREAMING_COMPLETE: 'streaming_complete',
  SESSION_STATUS_UPDATE: 'session_status',
} as const;

interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  connect_error: (err: Error) => void;
  [ChatEvents.ERROR]: (payload: { message: string; error?: any }) => void;
  [ChatEvents.RESET_CHAT]: (payload: { success: boolean; message: string }) => void;
  [ChatEvents.CHAT_HISTORY]: (payload: { chatHistory: any[]; chatId: string }) => void;
  [ChatEvents.CHAT_COMPLETED]: (payload: { message: string }) => void;
  [ChatEvents.ATTACHMENT_URL]: (payload: { attachment: string }) => void;
  [ChatEvents.SPEECH_TRANSCRIBED]: (payload: { textMessage: string; assessments: any }) => void;
  [ChatEvents.SESSION_STATUS_UPDATE]: (payload: { remainingSeconds: number }) => void;
  [ChatEvents.AI_RESPONSE]: (payload: { ai_response: string; feedback: string }) => void;
  [ChatEvents.TTS_AUDIO_URL]: (payload: { tts_audio_url: string }) => void;
  [ChatEvents.STREAMING_COMPLETE]: (payload: { isCompleted: boolean; ai_response: string; feedback: string; ttsAudioUrl: string; [key: string]: any }) => void;
}

interface ClientToServerEvents {
  [ChatEvents.RESET_CHAT]: (payload: { userId: string; topicId: string }) => void;
  [ChatEvents.GET_CHAT_HISTORY]: (payload: { userId: string; topicId: string }) => void;
  [ChatEvents.AUDIO]: (payload: { userId: string; chatId: string | null; audioBuffer: string; format: string }) => void;
  [ChatEvents.TEXT]: (payload: { userId: string; chatId: string | null; textMessage: string }) => void;
  [ChatEvents.SESSION_STATUS]: (payload: { userId: string }) => void;
}

interface Message {
  id: string;
  messageType: 'text' | 'audio' | 'loading';
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

function findLastIndex<T>(array: T[], predicate: (value: T) => boolean): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) return i;
  }
  return -1;
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
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [topicImage, setTopicImage] = useState<string | null>(null);
  const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
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
  const SOCKET_URL = "https://56ef-2400-adcc-107-7b00-6823-439d-706d-905c.ngrok-free.app";

  const resetActivityTimer = useCallback(() => {
    if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
    activityTimerRef.current = setTimeout(() => {
      socketRef.current?.disconnect();
      setIsInactiveDialogOpen(true);
    }, 2 * 60 * 1000);
  }, []);

  useEffect(() => {
    if (!userId) {
      toast.error("User information is missing.");
      navigate(-1);
      return;
    }

    const socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      extraHeaders: { "ngrok-skip-browser-warning": "true" }
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsSocketConnected(true);
      toast.success("Connection established.");
      socket.emit(ChatEvents.GET_CHAT_HISTORY, { userId, topicId });
      socket.emit(ChatEvents.SESSION_STATUS, { userId });
      resetActivityTimer();
    });

    socket.on("disconnect", () => {
      setIsSocketConnected(false);
      if (!isInactiveDialogOpen) toast.warning("Connection lost...");
    });

    socket.on("connect_error", (err) => toast.error(`Connection failed: ${err.message}`));

    socket.on(ChatEvents.CHAT_HISTORY, ({ chatHistory, chatId: newChatId }) => {
      const formatted = chatHistory.map((msg: any) => ({
        id: msg.id, messageType: 'text', text: msg.content,
        type: msg.sender === 'ai' ? 'received' : 'sent', audioUrl: msg.audioUrl,
        audioPlayed: true, assessments: msg.assessments, hasAssessment: !!msg.assessments,
        feedback: msg.feedback, hasFeedback: !!msg.feedback,
      }));
      setMessages(formatted);
      setChatId(newChatId);
      if (chatHistory.some((m: any) => m.isCompleted)) {
        setChatCompleted(true);
        setIsCompleteDialogOpen(true);
      }
    });

    socket.on(ChatEvents.SPEECH_TRANSCRIBED, ({ textMessage, assessments }) => {
      removeLoadingMessage();
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(), type: 'sent', messageType: 'text', text: textMessage,
        assessments, hasAssessment: !!assessments,
      }]);
    });

    socket.on(ChatEvents.AI_RESPONSE, ({ ai_response, feedback }) => {
      setMessages(prev => {
        const newMessages = [...prev];
        const i = findLastIndex(newMessages, msg => msg.loading === true);
        if (i !== -1) {
          newMessages[i] = { ...newMessages[i], loading: false, messageType: 'text', type: 'received', text: ai_response, feedback, hasFeedback: !!feedback };
        }
        return newMessages;
      });
    });

    socket.on(ChatEvents.TTS_AUDIO_URL, ({ tts_audio_url }) => {
      setMessages(prev => {
        const newMessages = [...prev];
        const i = findLastIndex(newMessages, msg => msg.type === 'received');
        if (i !== -1) {
          newMessages[i] = { ...newMessages[i], audioUrl: tts_audio_url, audioPlayed: false };
        }
        return newMessages;
      });
    });

    socket.on(ChatEvents.STREAMING_COMPLETE, (payload) => {
      const { ai_response, feedback, ttsAudioUrl, isCompleted } = payload;
      setMessages(prev => {
        const newMessages = [...prev];
        const i = findLastIndex(newMessages, msg => msg.loading === true);
        if (i !== -1) {
          newMessages[i] = { id: newMessages[i].id, loading: false, messageType: 'text', type: 'received', text: ai_response, feedback, hasFeedback: !!feedback, audioUrl: ttsAudioUrl, audioPlayed: false };
        }
        return newMessages;
      });
      if (isCompleted) {
        setChatCompleted(true);
        setIsCompleteDialogOpen(true);
      }
    });

    socket.on(ChatEvents.SESSION_STATUS_UPDATE, ({ remainingSeconds }) => setSessionTimeRemaining(remainingSeconds));
    socket.on(ChatEvents.ERROR, ({ message }) => toast.error(message));
    socket.on(ChatEvents.CHAT_COMPLETED, ({ message }) => { setChatCompleted(true); setIsCompleteDialogOpen(true); toast.info(message); });
    socket.on(ChatEvents.ATTACHMENT_URL, ({ attachment }) => { setTopicImage(attachment); onTopicImage(attachment); });
    
    return () => {
      if (activityTimerRef.current) clearTimeout(activityTimerRef.current);
      socket.disconnect();
    };
  }, [userId, topicId, navigate, resetActivityTimer, onTopicImage]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const sendPlaceholder = () => setMessages(prev => [...prev, { id: `loading-${Date.now()}`, loading: true, messageType: "loading", type: "received" }]);
  const removeLoadingMessage = () => setMessages(prev => prev.filter(m => !m.loading));

  const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => reader.result ? resolve((reader.result as string).split(",")[1]) : reject("Blob read failed");
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  const cleanupRecording = () => {
    if (recordTimerRef.current) clearInterval(recordTimerRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    setRecordTime(0);
    streamRef.current = null;
    mediaRecorderRef.current = null;
  };

  const startRecording = async () => {
    if (!isSocketConnected || sessionLimitReached || chatCompleted) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = 'audio/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      isCanceledRef.current = false;
      recorder.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data) };
      recorder.onstop = async () => {
        const wasCanceled = isCanceledRef.current;
        cleanupRecording();
        if (wasCanceled || audioChunksRef.current.length === 0) return;
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const audioURL = URL.createObjectURL(audioBlob);
        setMessages(prev => [...prev, { id: crypto.randomUUID(), messageType: 'audio', audioURL, type: 'sent' }]);
        const audioBase64 = await blobToBase64(audioBlob);
        const format = mimeType.split('/')[1];
        sendPlaceholder();
        socketRef.current?.emit(ChatEvents.AUDIO, { userId, chatId, audioBuffer: audioBase64, format });
        resetActivityTimer();
      };
      recorder.start();
      setIsRecording(true);
      recordTimerRef.current = setInterval(() => setRecordTime(t => t + 1), 1000);
    } catch (err) {
      toast.error("Microphone access denied.");
      cleanupRecording();
    }
  };

  const stopRecording = (cancel = false) => {
    isCanceledRef.current = cancel;
    if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
    else cleanupRecording();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || !isSocketConnected) return;
    setMessages(prev => [...prev, { id: crypto.randomUUID(), type: 'sent', messageType: 'text', text: message.trim() }]);
    sendPlaceholder();
    socketRef.current?.emit(ChatEvents.TEXT, { userId, chatId, textMessage: message.trim() });
    setMessage("");
    resetActivityTimer();
  };

  const handleResetChat = () => {
    if (!isSocketConnected) return toast.error("Not connected.");
    socketRef.current?.emit(ChatEvents.RESET_CHAT, { userId, topicId });
    setMessages([]);
    setChatCompleted(false);
    setIsCompleteDialogOpen(false);
    toast.success("Chat has been reset.");
  };

  const handleStillThere = (isContinuing: boolean) => {
    setIsInactiveDialogOpen(false);
    if (isContinuing) socketRef.current?.connect();
    else navigate(-1);
  };

  useEffect(() => {
    const audioMsg = messages.find(msg => msg.type === "received" && msg.audioUrl && !msg.audioPlayed);
    if (audioMsg && audioRefs.current[audioMsg.id]) {
      audioRefs.current[audioMsg.id].play()
        .then(() => {
          setPlayingAudio(audioMsg.id);
          setMessages(current => current.map(m => m.id === audioMsg.id ? { ...m, audioPlayed: true } : m));
        })
        .catch(e => console.log("Autoplay prevented:", e));
    }
  }, [messages]);

  const handleShowAssessment = (assessments: any) => onShowFeedback({ type: "assessment", content: assessments });

  const toggleAudio = (id: string) => {
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

  const formatTime = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col max-h-[86vh] min-h-[86vh] md:min-h-[82vh] md:max-h-[82vh] max-w-[800px] mx-auto bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ChevronLeft className="h-5 w-5" /></Button>
        <h2 className="text-lg font-semibold">{mode === "photo-mode" ? "Photo Mode" : "Chat Mode"}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{sessionTimeRemaining ? formatTime(sessionTimeRemaining) : '...'}</span>
        </div>
      </header>

      {mode === "photo-mode" && topicImage && (
        <div className="p-4 bg-black"><img src={topicImage} alt="Topic context" className="w-full rounded-lg object-contain max-h-48" /></div>
      )}

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col gap-1 ${msg.type === "sent" ? "self-end items-end" : "self-start items-start"}`}>
            {msg.loading ? (
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm"><LoaderPinwheel size={18} className="animate-spin text-primary" /><span className="text-sm text-gray-500">AI is thinking...</span></div>
            ) : msg.messageType === 'audio' && msg.audioURL ? (
              <div className="p-2 bg-primary rounded-xl shadow"><audio src={msg.audioURL} controls className="message-audio h-10" /></div>
            ) : (
              <div className={`p-3 rounded-xl max-w-md shadow-sm ${msg.type === "sent" ? "bg-primary text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none"}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div className="flex gap-2 items-center mt-2 flex-wrap">
                  {/* {msg.type === "received" && msg.audioUrl && (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => toggleAudio(msg.id)} className={`flex items-center gap-1 p-1 h-auto ${playingAudio === msg.id ? "text-primary font-semibold" : "text-gray-500"}`}><{playingAudio === msg.id ? Pause : Play} className="h-4 w-4" /><span className="text-xs">Tap to play</span></Button>
                      <audio ref={el => { if (el) audioRefs.current[msg.id] = el }} src={msg.audioUrl} onEnded={() => setPlayingAudio(null)} className="hidden" playsInline />
                    </>
                  )} */}
                  {msg.type === "received" && msg.audioUrl && (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => toggleAudio(msg.id)} className={`flex items-center gap-1 p-1 h-auto ${playingAudio === msg.id ? "text-primary font-semibold" : "text-gray-500"}`}>
                        {/* This is the corrected syntax */}
                        {playingAudio === msg.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        <span className="text-xs">Tap to play</span>
                      </Button>
                      <audio ref={el => { if (el) audioRefs.current[msg.id] = el }} src={msg.audioUrl} onEnded={() => setPlayingAudio(null)} className="hidden" playsInline />
                    </>
                  )}
                  {msg.type === "received" && msg.hasFeedback && (
                    <Button variant="ghost" size="sm" onClick={() => onShowFeedback({ type: "feedback", content: msg.feedback })} className="flex items-center gap-1 text-primary text-xs p-1 h-auto"><MessageCircle className="h-4 w-4" />View Feedback</Button>
                  )}
                  {msg.type === "sent" && msg.hasAssessment && (
                    <Button variant="ghost" size="sm" onClick={() => handleShowAssessment(msg.assessments)} className="flex items-center gap-1 bg-white text-primary text-xs p-1 h-auto rounded-md shadow-sm border"><BarChart2 className="h-4 w-4" />View Assessment</Button>
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
          <Input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder={isRecording ? `Recording... ${formatTime(recordTime)}` : "Write a message or press mic..."} disabled={isRecording || chatCompleted || sessionLimitReached || !isSocketConnected} className="flex-1 border-none focus:ring-0 bg-transparent" />
          {isRecording ? (
            <div className="flex items-center gap-1"><Button type="button" variant="ghost" size="icon" onClick={() => stopRecording(true)} className="text-red-500 hover:bg-red-100 rounded-full"><X className="h-5 w-5" /></Button><Button type="button" variant="ghost" size="icon" onClick={() => stopRecording(false)} className="text-green-500 hover:bg-green-100 rounded-full"><ArrowUp className="h-5 w-5" /></Button></div>
          ) : message.trim() ? (
            <Button type="submit" variant="ghost" size="icon" className="text-primary" disabled={!isSocketConnected || chatCompleted}><Send className="h-5 w-5" /></Button>
          ) : (
            <Button type="button" variant="ghost" size="icon" className="text-primary" onClick={startRecording} disabled={!isSocketConnected || chatCompleted}><Mic className="h-5 w-5" /></Button>
          )}
        </div>
      </form>

      <Dialog open={isCompleteDialogOpen} onOpenChange={open => !open && navigate(-1)}>
        <DialogContent><DialogHeader><DialogTitle>Chat Completed</DialogTitle><DialogDescription>This conversation has ended. Would you like to start over?</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => navigate(-1)}>End Session</Button><Button onClick={handleResetChat}>Reset Chat</Button></DialogFooter></DialogContent>
      </Dialog>
      <Dialog open={isInactiveDialogOpen} onOpenChange={open => !open && handleStillThere(false)}>
        <DialogContent><DialogHeader><DialogTitle>Are you still there?</DialogTitle><DialogDescription>Your session was paused due to inactivity. Do you want to continue?</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={() => handleStillThere(false)}>No, End Session</Button><Button onClick={() => handleStillThere(true)}>Yes, I'm Here</Button></DialogFooter></DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatWindow;