// // ChatWindow.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
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
//   Loader2
// } from "lucide-react";
// import { 
//   Button,
//   Alert,
//   AlertDescription,
// } from "@/components/ui";
// import { 
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { 
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Input } from "@/components/ui/input";
// import { 
//   connectWebSocket,
//   closeWebSocket,
//   sendTextMessage,
//   sendAudioMessage,
//   getChatHistory,
//   resetActivityTimer,
// } from "@/redux/slices/chatWindowSlice";

// const ChatWindow = ({ onShowFeedback, onTopicImage }) => {
//   // Local state
//   const [message, setMessage] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordTime, setRecordTime] = useState(0);
//   const [playingAudio, setPlayingAudio] = useState(null);
//   const [isInactiveDialogOpen, setIsInactiveDialogOpen] = useState(false);
//   const [showError, setShowError] = useState(false);

//   // Redux state
//   const dispatch = useDispatch();
//   const { 
//     messages, 
//     chatId, 
//     sessionTimeRemaining, 
//     sessionLimitReached, 
//     chatCompleted, 
//     errorMessage, 
//     topicImage, 
//     wsConnected,
//     processedResponses
//   } = useSelector(state => state.chatWindow);
  
//   const userData = useSelector(state => state.auth.userData);
//   const userId = userData?.id;

//   // Refs
//   const messagesEndRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const timerRef = useRef(null);
//   const streamRef = useRef(null);
//   const isCanceledRef = useRef(false);
//   const lastRecordingEndTimeRef = useRef(null);
//   const audioRefs = useRef({});
//   const intentionalDisconnectRef = useRef(false);

//   // Router
//   const { topicId } = useParams();
//   const [searchParams] = useSearchParams();
//   const mode = searchParams.get("mode");
//   const navigate = useNavigate();

//   // Auto-scroll to bottom
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Initial connection and chat history load
//   useEffect(() => {
//     if (userId && topicId) {
//       dispatch(connectWebSocket());
//       dispatch(getChatHistory({ userId, topicId }));
//     }
    
//     return () => {
//       intentionalDisconnectRef.current = true;
//       clearTimeout(timerRef.current);
//       dispatch(closeWebSocket());
//     };
//   }, [userId, topicId, dispatch]);

//   // Auto-play new audio when added
//   useEffect(() => {
//     const latestAudioMsg = messages.findLast(
//       (msg) => msg.type === "received" && msg.audioUrl && !msg.audioPlayed
//     );

//     if (latestAudioMsg && audioRefs.current[latestAudioMsg.id]) {
//       const audioElement = audioRefs.current[latestAudioMsg.id];
//       const playPromise = audioElement.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => {
//             setPlayingAudio(latestAudioMsg.id);
//             // Update audio played state in Redux would go here
//           })
//           .catch((error) => {
//             console.log("Autoplay prevented:", error);
//             setPlayingAudio(latestAudioMsg.id); // Still mark for UI
//           });
//       }
//     }
//   }, [messages]);

//   // Handle topic image
//   useEffect(() => {
//     if (topicImage && onTopicImage) {
//       onTopicImage(topicImage);
//     }
//   }, [topicImage, onTopicImage]);

//   const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  
//   const getSupportedAudioType = () => (isIOS() ? "audio/mp4" : "audio/webm");

//   const blobToBase64 = (blob) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(",")[1]);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });

//   const cleanupRecording = () => {
//     clearInterval(timerRef.current);
//     setRecordTime(0);
//     setIsRecording(false);
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => {
//         try { t.stop(); } catch (err) { console.error("Error stopping track:", err); }
//       });
//       streamRef.current = null;
//     }
//     mediaRecorderRef.current = null;
//     audioChunksRef.current = [];
//     lastRecordingEndTimeRef.current = Date.now();
//   };

//   const cancelRecording = () => {
//     if (isRecording && mediaRecorderRef.current) {
//       isCanceledRef.current = true;
//       try {
//         if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
//       } catch (err) { console.error("Error stopping recorder:", err); }
//       cleanupRecording();
//     }
//   };

//   const sendRecording = async () => {
//     if (isRecording && mediaRecorderRef.current) {
//       try {
//         if (isIOS() && mediaRecorderRef.current.state === "recording") {
//           mediaRecorderRef.current.requestData();
//           await new Promise(resolve => setTimeout(resolve, 200));
//         }
//         if (mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
//       } catch (err) {
//         console.error("Error finalizing recording:", err);
//         cleanupRecording();
//       }
//     }
//   };
  
//   const startRecording = async () => {
//     if (sessionLimitReached || chatCompleted) {
//       setShowError(true);
//       return;
//     }
    
//     if (!wsConnected) {
//       setShowError(true);
//       setIsInactiveDialogOpen(true);
//       return;
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => {
//         try { t.stop(); } catch (err) { console.error("Error stopping previous track:", err); }
//       });
//       streamRef.current = null;
//     }
    
//     if (isIOS() && lastRecordingEndTimeRef.current) {
//       const timeSinceLast = Date.now() - lastRecordingEndTimeRef.current;
//       if (timeSinceLast < 1000) await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
//     }

//     try {
//       const constraints = { audio: isIOS() ? { echoCancellation: true, noiseSuppression: true, sampleRate: 22050, channelCount: 1 } : true };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       const mimeType = getSupportedAudioType();
//       streamRef.current = stream;
//       const mr = new MediaRecorder(stream, { mimeType });
//       mediaRecorderRef.current = mr;
//       audioChunksRef.current = [];
//       isCanceledRef.current = false;

//       clearInterval(timerRef.current);
//       setRecordTime(0);
//       timerRef.current = setInterval(() => setRecordTime((t) => t + 1), 1000);

//       mr.ondataavailable = (e) => {
//         if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
//         else console.warn("Received empty data chunk");
//       };
      
//       mr.onerror = (event) => {
//         console.error("MediaRecorder error:", event);
//         cleanupRecording();
//         setShowError(true);
//       };
      
//       mr.onstop = async () => {
//         try {
//           if (isCanceledRef.current) {
//             console.log("Recording canceled");
//             cleanupRecording(); 
//             return;
//           }
          
//           if (audioChunksRef.current.length === 0) {
//             console.warn("No audio data captured");
//             cleanupRecording();
//             setShowError(true); 
//             return;
//           }
          
//           const blob = new Blob(audioChunksRef.current, { type: mimeType });
//           if (blob.size < 100) {
//             console.warn("Audio blob too small");
//             cleanupRecording();
//             setShowError(true); 
//             return;
//           }
          
//           const base64 = await blobToBase64(blob);
//           dispatch(sendAudioMessage({
//             userId,
//             topicId,
//             chatId,
//             format: mimeType.split("/")[1],
//             audioBuffer: base64,
//             mimeType
//           }));
          
//           dispatch(resetActivityTimer());
//         } catch (error) {
//           console.error("Error processing recording:", error);
//           setShowError(true);
//         } finally {
//           cleanupRecording();
//         }
//       };
      
//       mr.start(1000);
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error starting recording:", error);
//       setShowError(true);
//       cleanupRecording();
//     }
//   };

//   const handleSubmit = (e) => {
//     if (e) e.preventDefault();
//     if (!message.trim()) return;
    
//     if (sessionLimitReached || chatCompleted) {
//       setShowError(true);
//       return;
//     }
    
//     if (!wsConnected) {
//       setShowError(true);
//       setIsInactiveDialogOpen(true);
//       return;
//     }

//     dispatch(sendTextMessage({
//       userId, 
//       topicId, 
//       chatId, 
//       textMessage: message.trim()
//     }));
    
//     setMessage("");
//     dispatch(resetActivityTimer());
//   };

//   const toggleAudio = (id, audioUrl) => {
//     const audioElement = audioRefs.current[id];
//     if (!audioElement) return;
    
//     if (playingAudio === id) {
//       audioElement.pause();
//       setPlayingAudio(null);
//     } else {
//       if (playingAudio && audioRefs.current[playingAudio]) {
//         audioRefs.current[playingAudio].pause();
//       }
//       audioElement.play().then(() => setPlayingAudio(id)).catch(console.error);
//     }
//   };

//   const handleShowAssessment = (assessments) => {
//     if (onShowFeedback) {
//       onShowFeedback({ type: "assessment", content: assessments });
//     }
//   };

//   const handleShowFeedback = (feedback) => {
//     if (onShowFeedback) {
//       onShowFeedback({ type: "feedback", content: feedback });
//     }
//   };

//   const handleStillThereYes = () => {
//     setIsInactiveDialogOpen(false);
//     intentionalDisconnectRef.current = false;
//     dispatch(connectWebSocket());
//   };

//   const handleStillThereNo = () => {
//     setIsInactiveDialogOpen(false);
//     intentionalDisconnectRef.current = true;
//     dispatch(closeWebSocket());
//     navigate(-1);
//   };

//   const handleBackClick = () => navigate(-1);
  
//   const formatTime = (sec:number) => `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
//   const formatSessionTime = (seconds:any) => seconds === null ? "" : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
//   const displayMessages = messages.filter((msg:any) => msg.type !== "system");

//   return (
//     <div className="chat-window flex flex-col h-full">
//       <header className="bg-white dark:bg-gray-800 border-b p-4 flex items-center justify-between">
//         <button 
//           onClick={handleBackClick}
//           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
//         >
//           <ChevronLeft className="h-5 w-5" />
//         </button>
        
//         <h2 className="text-lg font-medium">{mode === "photo-mode" ? "Photo Mode" : "Chat Mode"}</h2>
        
//         {sessionTimeRemaining !== null && (
//           <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//             <Clock className="h-4 w-4 mr-1" />
//             <span>{formatSessionTime(sessionTimeRemaining)} remaining</span>
//           </div>
//         )}
        
//         <div className="flex items-center">
//           <Languages className="h-4 w-4 mr-1" />
//           <select className="bg-transparent text-sm border-none">
//             <option value="en">English</option>
//           </select>
//         </div>
//       </header>

//       <div className="md:hidden block">
//         {mode === "photo-mode" && topicImage && (
//           <img src={topicImage} alt="Topic context" className="p-4 w-full" />
//         )}
//       </div>

//       {chatCompleted && (
//         <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-2 text-center text-sm">
//           Chat completed. Cannot continue.
//         </div>
//       )}
      
//       {sessionLimitReached && (
//         <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-2 text-center text-sm">
//           Daily session limit reached. Try again tomorrow.
//         </div>
//       )}

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {displayMessages.map((msg) => (
//           <div 
//             key={msg.id} 
//             className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
//           >
//             <div className={`max-w-[75%] rounded-2xl p-3 ${
//               msg.loading 
//                 ? "bg-gray-100 dark:bg-gray-800" 
//                 : msg.type === "sent" 
//                   ? "bg-blue-600 text-white" 
//                   : "bg-gray-100 dark:bg-gray-800"
//             }`}
//             >
//               {msg.loading && (
//                 <div className="flex items-center gap-2">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <span className="text-sm">AI is typing...</span>
//                 </div>
//               )}
              
//               {msg.messageType === "text" && !msg.loading && (
//                 <div className="space-y-2">
//                   <div className="text-sm">{msg.text}</div>
                  
//                   <div className="flex gap-2 items-center mt-2">
//                     {!msg.loading && msg.audioUrl && (
//                       <>
//                         <button 
//                           onClick={() => toggleAudio(msg.id, msg.audioUrl)} 
//                           className={`flex items-center text-xs px-2 py-1 rounded ${
//                             playingAudio === msg.id 
//                               ? "bg-indigo-100 text-indigo-700" 
//                               : "bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {playingAudio === msg.id 
//                             ? <Pause className="h-3 w-3 mr-1" /> 
//                             : <Play className="h-3 w-3 mr-1" />}
//                           <span>Tap to play</span>
//                         </button>
//                         <audio 
//                           ref={(el) => { if (el) audioRefs.current[msg.id] = el; }} 
//                           src={msg.audioUrl} 
//                           onEnded={() => setPlayingAudio(null)} 
//                           className="hidden" 
//                         />
//                       </>
//                     )}
                    
//                     {msg.type === "received" && msg.hasFeedback && (
//                       <button 
//                         onClick={() => handleShowFeedback(msg.feedback)} 
//                         className="flex items-center text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700"
//                       >
//                         <MessageCircle className="h-3 w-3 mr-1" />
//                         View Feedback
//                       </button>
//                     )}
                    
//                     {msg.type === "sent" && msg.hasAssessment && (
//                       <button 
//                         onClick={() => handleShowAssessment(msg.assessments)} 
//                         className="flex items-center text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-700"
//                       >
//                         <BarChart2 className="h-3 w-3 mr-1" />
//                         View Assessment
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
              
//               {msg.messageType === "audio" && (
//                 <audio className="w-full" src={msg.audioURL} controls />
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="border-t p-4">
//         <div className="flex items-center gap-2 relative">
//           <Input
//             type="text"
//             value={message}
//             disabled={isRecording || sessionLimitReached || chatCompleted || isInactiveDialogOpen}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder={
//               isInactiveDialogOpen ? "Session paused..." :
//               sessionLimitReached ? "Session limit reached" :
//               chatCompleted ? "Chat completed" :
//               isRecording ? "Recording..." :
//               "Write message..."
//             }
//             className="flex-1 pl-4 pr-12"
//           />
          
//           {isRecording && (
//             <span className="absolute right-12 text-sm text-gray-500">
//               {formatTime(recordTime)}
//             </span>
//           )}

//           {isRecording ? (
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 onClick={cancelRecording}
//                 className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//               <button
//                 type="button"
//                 onClick={sendRecording}
//                 className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
//               >
//                 <ArrowUp className="h-4 w-4" />
//               </button>
//             </div>
//           ) : message.trim() ? (
//             <button
//               type="submit"
//               disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
//               className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300"
//             >
//               <Send className="h-4 w-4" />
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={startRecording}
//               disabled={sessionLimitReached || chatCompleted || isInactiveDialogOpen}
//               className="p-2 text-gray-500 hover:bg-gray-100 rounded-full disabled:text-gray-300"
//             >
//               <Mic className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </form>

//       {showError && (
//         <Alert variant="destructive" className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 max-w-[90%]">
//           <AlertDescription>
//             {errorMessage}
//           </AlertDescription>
//         </Alert>
//       )}

//       {/* Feedback Modal would go here */}
//       {/* 
//       <FeedbackModal 
//         open={isFeedbackModalOpen}
//         onClose={() => setIsFeedbackModalOpen(false)}
//         feedbackData={selectedFeedback}
//       />
//       */}

//       <Dialog open={isInactiveDialogOpen} onClose={(event: any) => {
//         // Prevent closing on backdrop click
//         return false;
//       }}>
//         <DialogContent className="sm:max-w-md">
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
import React, { useEffect, useRef, FormEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// If you created typed hooks:
// import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchChatMessages,
  sendChatMessage,
  updateCurrentInput,
  // openChatWindow, // Use if this component doesn't control its own opening trigger
  closeChatWindow,
  addMessageOptimistic, // For optimistic updates
} from '@/redux/slices/chatwindowSlice'; // Adjust path as needed

// Shadcn/UI Components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // ScrollBar for horizontal if needed
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // For error display

// Icons from lucide-react
import { Send, X, AlertCircle, MessageSquare, Loader2 } from 'lucide-react';
import { AppDispatch, RootState } from '@/redux/store';
import { ChatMessage } from '@/types/ChatMessage';

// Import ChatMessage type if not already available
// import { ChatMessage } from '@/features/chatWindow/types';

interface ChatWindowComponentProps {
  // If the chat window is always tied to a specific session passed via props:
  // chatSessionIdProp?: string;
  // If the component should manage its own visibility based on Redux state:
  // (This is assumed by the current Redux slice design with `isOpen`)
}

const ChatWindowComponent: React.FC<ChatWindowComponentProps> = (/* { chatSessionIdProp } */) => {
  const dispatch: AppDispatch = useDispatch();
  // Select state from Redux store
  const {
    messages,
    currentInput,
    isLoading,
    isSending,
    error,
    currentChatSessionId,
    isOpen, 
  } = useSelector((state: RootState) => state.chatWindow);

  const scrollViewportRef = useRef<HTMLDivElement>(null); // Ref for the ScrollArea's viewport
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the message input field

  // Effect to fetch messages when the chat session ID changes or chat opens
  useEffect(() => {
    if (isOpen && currentChatSessionId) {
      dispatch(fetchChatMessages({ chatSessionId: currentChatSessionId }));
    }
  }, [isOpen, currentChatSessionId, dispatch]);

  // Effect to scroll to the bottom of the message list when new messages are added or chat opens
  const scrollToBottom = useCallback(() => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    // Focus input when chat opens and is ready
    if (isOpen && !isLoading && !isSending) {
        inputRef.current?.focus();
    }
  }, [messages, isOpen, isLoading, isSending, scrollToBottom]);


  // Handler for submitting the message form
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && currentChatSessionId && !isSending) {
      const optimisticMessage: ChatMessage = {
        // Use a temporary ID for optimistic updates, perhaps prefixed
        id: `optimistic_${Date.now()}`, 
        chatSessionId: currentChatSessionId,
        text: currentInput.trim(),
        sender: 'user', // Assuming the sender is always 'user' from this client
        timestamp: new Date().toISOString(),
      };
      // Optimistically add message to UI
      dispatch(addMessageOptimistic(optimisticMessage));
      // Dispatch action to send message to backend
      dispatch(sendChatMessage({
        chatSessionId: currentChatSessionId,
        text: currentInput.trim(),
        sender: 'user',
      }));
      // Input is cleared in the slice upon successful sendChatMessage.fulfilled
      // or you can clear it here: dispatch(updateCurrentInput(''));
    }
  };

  // If the chat window's visibility is controlled by Redux `isOpen` state
  if (!isOpen) {
    return null; // Don't render anything if the chat is not open
    // Or, return a button/trigger to open the chat:
    // return <Button onClick={() => dispatch(openChatWindow({ chatSessionId: "some_default_or_new_session" }))}>Open Chat</Button>;
  }

  return (
    <Card className="w-full max-w-md h-[calc(100vh-4rem)] max-h-[700px] flex flex-col shadow-2xl rounded-lg border"> {/* Responsive sizing */}
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg font-semibold">Support Chat</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={() => dispatch(closeChatWindow())} aria-label="Close chat">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-grow p-0 overflow-hidden">
        {/* <ScrollArea className="h-full w-full" viewportRef={scrollViewportRef}> */}
        <ScrollArea className="h-full w-full">
          <div className="p-4 space-y-4">
            {isLoading && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>Loading messages...</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive" className="my-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && messages.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MessageSquare className="h-12 w-12 mb-2" />
                <p>No messages yet. Say hello!</p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end space-x-2 group ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Avatar for 'bot' or other non-user senders */}
                {msg.sender !== 'user' && (
                  <Avatar className="h-8 w-8 self-start">
                    <AvatarImage src={`https://api.dicebear.com/8.x/bottts/svg?seed=${msg.sender}&radius=50`} alt={msg.sender} />
                    <AvatarFallback>{msg.sender.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                
                {/* Message bubble */}
                <div
                  className={`max-w-[75%] p-3 rounded-xl shadow-md transition-all duration-200 ease-out
                    ${ msg.id.startsWith('optimistic_') ? 'opacity-70' : 'opacity-100' }
                    ${ msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-primary-foreground/80 text-right' : 'text-muted-foreground/80 text-left'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Avatar for 'user' */}
                {msg.sender === 'user' && (
                  <Avatar className="h-8 w-8 self-start">
                    <AvatarImage src="https://api.dicebear.com/8.x/lorelei/svg?seed=User&flip=true" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t bg-slate-50 dark:bg-slate-800">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            value={currentInput}
            onChange={(e) => dispatch(updateCurrentInput(e.target.value))}
            className="flex-grow"
            disabled={isSending || isLoading} // Disable input while loading initial messages or sending
            autoComplete="off"
          />
          <Button type="submit" disabled={isSending || !currentInput.trim()} aria-label="Send message">
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatWindowComponent;
