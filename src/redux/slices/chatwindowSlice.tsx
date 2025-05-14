// // // import apiClient from '@/config/ApiConfig'; // Your configured Axios instance or API client
// // // import { ChatMessage } from '@/types/ChatMessage';
// // // import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// // // // Make sure to import ChatMessage if it's in a separate types.ts file
// // // // import { ChatMessage } from './types';

// // // // Define the state interface for the chat window
// // // export interface ChatWindowState {
// // //   messages: ChatMessage[]; // Array to hold all messages for the current session
// // //   currentInput: string; // Current text in the message input field
// // //   isOpen: boolean; // Controls the visibility of the chat window (especially if used as a modal)
// // //   isLoading: boolean; // True when fetching messages or sending a new one
// // //   isSending: boolean; // True specifically when a message is being sent
// // //   error: string | null; // Holds any error messages
// // //   currentChatSessionId: string | null; // ID of the currently active chat session
// // // }

// // // // Define the initial state
// // // const initialState: ChatWindowState = {
// // //   messages: [],
// // //   currentInput: '',
// // //   isOpen: false, // Chat window is closed by default
// // //   isLoading: false,
// // //   isSending: false,
// // //   error: null,
// // //   currentChatSessionId: null,
// // // };

// // // // --- Async Thunks ---

// // // /**
// // //  * Async thunk for fetching chat messages for a given session.
// // //  * Assumes your API endpoint is '/get-chat-messages' and expects a 'chatSessionId'.
// // //  * Adjust the endpoint and payload/response structure as needed.
// // //  */
// // // export const fetchChatMessages = createAsyncThunk<
// // //   ChatMessage[], // Return type of the fulfilled action payload
// // //   { chatSessionId: string }, // Argument type for the thunk
// // //   { rejectValue: string } // Type for the rejected action payload (error message)
// // // >(
// // //   'chatWindow/fetchChatMessages',
// // //   async ({ chatSessionId }, { rejectWithValue }) => {
// // //     try {
// // //       // Replace with your actual API call
// // //       const response = await apiClient.post('/get-chat-messages', { chatSessionId });
// // //       // Assuming the API returns something like: { success: true, data: { messages: ChatMessage[] } }
// // //       if (response.data && response.data.data && Array.isArray(response.data.data.messages)) {
// // //         return response.data.data.messages as ChatMessage[];
// // //       }
// // //       return rejectWithValue('Invalid response structure when fetching messages.');
// // //     } catch (error: any) {
// // //       if (error.response && error.response.data && error.response.data.message) {
// // //         return rejectWithValue(error.response.data.message);
// // //       }
// // //       return rejectWithValue(error.message || 'Failed to fetch chat messages.');
// // //     }
// // //   }
// // // );

// // // /**
// // //  * Async thunk for sending a chat message.
// // //  * Assumes your API endpoint is '/send-chat-message'.
// // //  * Adjust the endpoint and payload/response structure as needed.
// // //  */
// // // export const sendChatMessage = createAsyncThunk<
// // //   ChatMessage, // Return type: the message confirmed by the backend
// // //   { chatSessionId: string; text: string; sender: string }, // Argument type
// // //   { rejectValue: string } // Type for rejection
// // // >(
// // //   'chatWindow/sendChatMessage',
// // //   async (messageData, { rejectWithValue }) => {
// // //     try {
// // //       // Replace with your actual API call
// // //       const response = await apiClient.post('/send-chat-message', messageData);
// // //       // Assuming API returns: { success: true, data: { message: ChatMessage } }
// // //       if (response.data && response.data.data && response.data.data.message) {
// // //         return response.data.data.message as ChatMessage;
// // //       }
// // //       return rejectWithValue('Invalid response structure when sending message.');
// // //     } catch (error: any) {
// // //       if (error.response && error.response.data && error.response.data.message) {
// // //         return rejectWithValue(error.response.data.message);
// // //       }
// // //       return rejectWithValue(error.message || 'Failed to send chat message.');
// // //     }
// // //   }
// // // );

// // // // Create the chatWindow slice
// // // const chatWindowSlice = createSlice({
// // //   name: 'chatWindow',
// // //   initialState,
// // //   reducers: {
// // //     // Action to open the chat window and set the active session
// // //     openChatWindow: (state, action: PayloadAction<{ chatSessionId: string }>) => {
// // //       state.isOpen = true;
// // //       state.currentChatSessionId = action.payload.chatSessionId;
// // //       state.messages = []; // Clear previous messages or fetch new ones (handled by thunk)
// // //       state.error = null; // Clear any previous errors
// // //     },
// // //     // Action to close the chat window
// // //     closeChatWindow: (state) => {
// // //       state.isOpen = false;
// // //       state.currentInput = '';
// // //       // Optionally clear messages or session ID based on requirements
// // //       // state.messages = [];
// // //       // state.currentChatSessionId = null;
// // //     },
// // //     // Action to update the text in the message input field
// // //     updateCurrentInput: (state, action: PayloadAction<string>) => {
// // //       state.currentInput = action.payload;
// // //     },
// // //     // Action to add a message optimistically to the UI before backend confirmation
// // //     // Useful for instant feedback, but ensure to handle potential send failures
// // //     addMessageOptimistic: (state, action: PayloadAction<ChatMessage>) => {
// // //       state.messages.push(action.payload);
// // //     },
// // //     // Action to clear any displayed error messages
// // //     clearChatError: (state) => {
// // //       state.error = null;
// // //     },
// // //     // Action to manually clear all chat messages from the state
// // //     clearChatMessages: (state) => {
// // //       state.messages = [];
// // //     },
// // //   },
// // //   extraReducers: (builder) => {
// // //     builder
// // //       // Handle fetchChatMessages lifecycle
// // //       .addCase(fetchChatMessages.pending, (state) => {
// // //         state.isLoading = true;
// // //         state.error = null;
// // //       })
// // //       .addCase(fetchChatMessages.fulfilled, (state, action: PayloadAction<ChatMessage[]>) => {
// // //         state.isLoading = false;
// // //         state.messages = action.payload; // Replace current messages with fetched ones
// // //       })
// // //       .addCase(fetchChatMessages.rejected, (state, action) => {
// // //         state.isLoading = false;
// // //         state.error = action.payload as string;
// // //       })
// // //       // Handle sendChatMessage lifecycle
// // //       .addCase(sendChatMessage.pending, (state) => {
// // //         state.isSending = true; // Specific flag for sending
// // //         state.error = null;
// // //       })
// // //       .addCase(sendChatMessage.fulfilled, (state, action: PayloadAction<ChatMessage>) => {
// // //         state.isSending = false;
// // //         // Add the successfully sent message (confirmed by backend) to the list
// // //         // If not using optimistic updates, or to replace an optimistic message with the real one
// // //         const existingOptimisticIndex = state.messages.findIndex(m => m.id === `optimistic_${action.payload.timestamp}`); // Example optimistic ID
// // //         if (existingOptimisticIndex > -1) {
// // //             state.messages[existingOptimisticIndex] = action.payload;
// // //         } else {
// // //             state.messages.push(action.payload);
// // //         }
// // //         state.currentInput = ''; // Clear input field after successful send
// // //       })
// // //       .addCase(sendChatMessage.rejected, (state, action) => {
// // //         state.isSending = false;
// // //         state.error = action.payload as string;
// // //         // Optionally, handle the failed message in the UI (e.g., mark it as 'failed to send')
// // //         // For example, find an optimistically added message and mark it as failed.
// // //       });
// // //   },
// // // });

// // // // Export actions
// // // export const {
// // //   openChatWindow,
// // //   closeChatWindow,
// // //   updateCurrentInput,
// // //   addMessageOptimistic,
// // //   clearChatError,
// // //   clearChatMessages,
// // // } = chatWindowSlice.actions;

// // // // Export the reducer
// // // export default chatWindowSlice.reducer;

// // // src/features/chat/chatSlice.ts
// // import { ChatMessage, ChatState } from '@/types/ChatMessage';
// // import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // const initialState: ChatState = {
// //   messages: [],
// //   isRecording: false,
// //   recordTime: 0,
// //   chatId: null,
// //   sessionTimeRemaining: null,
// //   sessionLimitReached: false,
// //   errorMessage: '',
// //   showError: false,
// //   chatCompleted: false,
// //   topicImage: null,
// //   isFeedbackDialogOpen: false,
// //   feedback: null,
// //   processedResponses: new Set(),
// //   playingAudio: null,
// //   isInactiveDialogOpen: false,
// //   isWebSocketConnected: false
// // };

// // const chatSlice = createSlice({
// //   name: 'chat',
// //   initialState,
// //   reducers: {
// //     addMessage: (state, action: PayloadAction<ChatMessage>) => {
// //       state.messages.push(action.payload);
// //     },
// //     updateOrAddMessage: (state, action: PayloadAction<ChatMessage>) => {
// //       const lastAiIndex = state.messages.findLastIndex(
// //         (m:any) => m.type === "received" && (m.loading || m.text?.endsWith("..."))
// //       );
// //       if (lastAiIndex !== -1) {
// //         state.messages[lastAiIndex] = {
// //           ...state.messages[lastAiIndex],
// //           ...action.payload,
// //           id: state.messages[lastAiIndex].id,
// //           loading: false
// //         };
// //       } else {
// //         state.messages.push(action.payload);
// //       }
// //     },
// //     updateOrAddAudioUrl: (state, action: PayloadAction<{ id: string; audioUrl: string }>) => {
// //       const idx = state.messages.findIndex((m:any) => m.id === action.payload.id);
// //       if (idx !== -1) {
// //         state.messages[idx] = {
// //           ...state.messages[idx],
// //           audioUrl: action.payload.audioUrl,
// //           audioPlayed: false
// //         };
// //       }
// //     },
// //     removeLoadingMessage: (state) => {
// //       state.messages = state.messages.filter((m: any) => !m.loading);
// //     },
// //     setRecording: (state, action: PayloadAction<boolean>) => {
// //       state.isRecording = action.payload;
// //     },
// //     incrementRecordTime: (state) => {
// //       state.recordTime += 1;
// //     },
// //     resetRecordTime: (state) => {
// //       state.recordTime = 0;
// //     },
// //     updateSessionTime: (state, action: PayloadAction<number | null>) => {
// //       state.sessionTimeRemaining = action.payload;
// //     },
// //     setSessionLimitReached: (state, action: PayloadAction<boolean>) => {
// //       state.sessionLimitReached = action.payload;
// //     },
// //     setErrorMessage: (state, action: PayloadAction<string>) => {
// //       state.errorMessage = action.payload;
// //     },
// //     setShowError: (state, action: PayloadAction<boolean>) => {
// //       state.showError = action.payload;
// //     },
// //     setChatCompleted: (state, action: PayloadAction<boolean>) => {
// //       state.chatCompleted = action.payload;
// //     },
// //     setTopicImage: (state, action: PayloadAction<string | null>) => {
// //       state.topicImage = action.payload;
// //     },
// //     setFeedbackDialogOpen: (state, action: PayloadAction<boolean>) => {
// //       state.isFeedbackDialogOpen = action.payload;
// //     },
// //     setFeedback: (state, action: PayloadAction<any | null>) => {
// //       state.feedback = action.payload;
// //     },
// //     addProcessedResponse: (state, action: PayloadAction<string>) => {
// //       state.processedResponses.add(action.payload);
// //     },
// //     setPlayingAudio: (state, action: PayloadAction<string | null>) => {
// //       state.playingAudio = action.payload;
// //     },
// //     openInactiveDialog: (state) => {
// //       state.isInactiveDialogOpen = true;
// //     },
// //     closeInactiveDialog: (state) => {
// //       state.isInactiveDialogOpen = false;
// //     },
// //     setWebSocketConnected: (state, action: PayloadAction<boolean>) => {
// //       state.isWebSocketConnected = action.payload;
// //     }
// //   }
// // });

// // export const {
// //   addMessage,
// //   updateOrAddMessage,
// //   updateOrAddAudioUrl,
// //   removeLoadingMessage,
// //   setRecording,
// //   incrementRecordTime,
// //   resetRecordTime,
// //   updateSessionTime,
// //   setSessionLimitReached,
// //   setErrorMessage,
// //   setShowError,
// //   setChatCompleted,
// //   setTopicImage,
// //   setFeedbackDialogOpen,
// //   setFeedback,
// //   addProcessedResponse,
// //   setPlayingAudio,
// //   openInactiveDialog,
// //   closeInactiveDialog,
// //   setWebSocketConnected
// // } = chatSlice.actions;

// // export default chatSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// // Define types for messages and other states
// export interface Message {
//   id: string;
//   messageType: 'text' | 'audio' | 'loading';
//   text?: string;
//   type: 'sent' | 'received' | 'system';
//   loading?: boolean;
//   audioURL?: string;
//   audioUrl?: string;
//   audioPlayed?: boolean;
//   feedback?: any;
//   hasFeedback?: boolean;
//   assessments?: any;
//   hasAssessment?: boolean;
//   isCompleted?: boolean;
// }

// export interface ChatWindowState {
//   messages: Message[];
//   chatId: string | null;
//   isRecording: boolean;
//   recordTime: number;
//   sessionTimeRemaining: number | null;
//   sessionLimitReached: boolean;
//   errorMessage: string;
//   showError: boolean;
//   chatCompleted: boolean;
//   processedResponses: string[];
//   playingAudio: string | null;
//   topicImage: string | null;
//   isInactiveDialogOpen: boolean;
//   wsConnected: boolean;
// }

// export interface RootState {
//   chatWindow: ChatWindowState;
//   // other slices would be added here
// }

// // Initial state
// const initialState: ChatWindowState = {
//   messages: [],
//   chatId: null,
//   isRecording: false,
//   recordTime: 0,
//   sessionTimeRemaining: null,
//   sessionLimitReached: false,
//   errorMessage: '',
//   showError: false,
//   chatCompleted: false,
//   processedResponses: [],
//   playingAudio: null,
//   topicImage: null,
//   isInactiveDialogOpen: false,
//   wsConnected: false,
// };

// // WebSocket instance will be stored here (outside redux)
// let ws: WebSocket | null = null;
// let mediaRecorder: MediaRecorder | null = null;
// let audioChunks: Blob[] = [];
// let streamRef: MediaStream | null = null;
// let timerRef: NodeJS.Timeout | null = null;
// let activityTimerId: NodeJS.Timeout | null = null;
// let isCanceled = false;
// let lastRecordingEndTime: number | null = null;
// let intentionalDisconnect = false;

// // Helper functions
// const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || 
//   (navigator.platform === "MacIntel" && "navigator" in window && "maxTouchPoints" in navigator && navigator.maxTouchPoints > 1) || 
//   (navigator.userAgent.includes("Mac") && "ontouchend" in document);

// const getSupportedAudioType = () => (isIOS() ? "audio/mp4" : "audio/webm");

// const blobToBase64 = (blob: Blob): Promise<string> => new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.onloadend = () => {
//     const result = reader.result as string;
//     resolve(result.split(",")[1]);
//   }
//   reader.onerror = reject;
//   reader.readAsDataURL(blob);
// });

// // Async Thunks
// export const getChatHistory = createAsyncThunk(
//   'chatWindow/getChatHistory',
//   async ({ userId, topicId }: { userId: string; topicId: string }, { dispatch, rejectWithValue }) => {
//     try {
//       if (ws && ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ type: "getChatHistory", userId, topicId }));
//         return true;
//       } else {
//         return rejectWithValue("WebSocket not connected");
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to get chat history');
//     }
//   }
// );

// export const sendTextMessage = createAsyncThunk(
//   'chatWindow/sendTextMessage',
//   async ({ userId, topicId, chatId, textMessage }: 
//     { userId: string; topicId: string; chatId: string | null; textMessage: string }, 
//     { dispatch, rejectWithValue }
//   ) => {
//     try {
//       if (ws && ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ 
//           userId, 
//           topicId, 
//           chatId, 
//           type: "text", 
//           payload: { textMessage } 
//         }));
//         dispatch(resetActivityTimer());
//         return true;
//       } else {
//         return rejectWithValue("WebSocket not connected");
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to send message');
//     }
//   }
// );

// export const sendAudioMessage = createAsyncThunk(
//   'chatWindow/sendAudioMessage',
//   async ({ userId, topicId, chatId, audioBuffer, format }: 
//     { userId: string; topicId: string; chatId: string | null; audioBuffer: string; format: string }, 
//     { dispatch, rejectWithValue }
//   ) => {
//     try {
//       if (ws && ws.readyState === WebSocket.OPEN) {
//         ws.send(JSON.stringify({ 
//           userId, 
//           topicId, 
//           chatId, 
//           format: format.split("/")[1], 
//           type: "audio", 
//           payload: { audioBuffer, format } 
//         }));
//         dispatch(resetActivityTimer());
//         return true;
//       } else {
//         return rejectWithValue("WebSocket not connected");
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to send audio');
//     }
//   }
// );

// const chatWindowSlice = createSlice({
//   name: 'chatWindow',
//   initialState,
//   reducers: {
//     // Connection actions
//     connectWebSocket: (state) => {
//       // This doesn't actually connect the WebSocket (that's done in the middleware)
//       // It just updates the state to indicate we want to connect
//       state.isInactiveDialogOpen = false;
//       intentionalDisconnect = false;
//     },
//     disconnectWebSocket: (state) => {
//       intentionalDisconnect = true;
//       if (ws) {
//         ws.close();
//         ws = null;
//       }
//       state.wsConnected = false;
//     },
//     setWsConnected: (state, action: PayloadAction<boolean>) => {
//       state.wsConnected = action.payload;
//     },
    
//     // Activity timer actions
//     resetActivityTimer: (state) => {
//       if (activityTimerId) {
//         clearTimeout(activityTimerId);
//       }
//       // Note: The actual timer is set in the middleware
//     },
    
//     // Message actions
//     updateMessages: (state, action: PayloadAction<Message[]>) => {
//       state.messages = action.payload;
//     },
//     addMessage: (state, action: PayloadAction<Message>) => {
//       state.messages.push(action.payload);
//     },
//     addLoadingMessage: (state) => {
//       state.messages.push({ 
//         id: "loading-" + Date.now(), 
//         loading: true, 
//         messageType: "loading", 
//         type: "received" 
//       });
//     },
//     removeLoadingMessage: (state) => {
//       state.messages = state.messages.filter(m => !m.loading);
//     },
//     updateOrAddMessage: (state, action: PayloadAction<Message>) => {
//       const lastAiMessageIndex = state.messages.findLastIndex(
//         (m:any) => m.type === "received" && (m.loading || m.text?.endsWith("..."))
//       );
      
//       if (lastAiMessageIndex !== -1) {
//         const newMessage = {
//           ...state.messages[lastAiMessageIndex],
//           ...action.payload,
//           id: state.messages[lastAiMessageIndex].id,
//           loading: false,
//         };
//         state.messages[lastAiMessageIndex] = newMessage;
//       } else {
//         state.messages.push({ id: Date.now().toString, ...action.payload });
//       }
//     },
//     updateOrAddAudioUrl: (state, action: PayloadAction<string>) => {
//       const lastAiMessageIndex = state.messages.findLastIndex((m:any) => m.type === "received");
//       if (lastAiMessageIndex !== -1) {
//         state.messages[lastAiMessageIndex] = {
//           ...state.messages[lastAiMessageIndex],
//           audioUrl: action.payload,
//           audioPlayed: false,
//         };
//       }
//     },
//     updateMessageAudioPlayed: (state, action: PayloadAction<string>) => {
//       const index = state.messages.findIndex(m => m.id === action.payload);
//       if (index !== -1) {
//         state.messages[index].audioPlayed = true;
//       }
//     },
    
//     // Recording actions
//     startRecording: (state) => {
//       // The actual recording logic is handled in the middleware
//       // This just updates the state to indicate we're recording
//       state.isRecording = true;
//     },
//     stopRecording: (state) => {
//       state.isRecording = false;
//       state.recordTime = 0;
//     },
//     updateRecordTime: (state, action: PayloadAction<number>) => {
//       state.recordTime = action.payload;
//     },
    
//     // Audio playback actions
//     setPlayingAudio: (state, action: PayloadAction<string | null>) => {
//       state.playingAudio = action.payload;
//     },
    
//     // Chat state actions
//     setChatId: (state, action: PayloadAction<string>) => {
//       state.chatId = action.payload;
//     },
//     setChatCompleted: (state, action: PayloadAction<boolean>) => {
//       state.chatCompleted = action.payload;
//     },
//     setSessionLimitReached: (state, action: PayloadAction<boolean>) => {
//       state.sessionLimitReached = action.payload;
//     },
//     setSessionTimeRemaining: (state, action: PayloadAction<number | null>) => {
//       state.sessionTimeRemaining = action.payload;
//     },
    
//     // UI state actions
//     setErrorMessage: (state, action: PayloadAction<string>) => {
//       state.errorMessage = action.payload;
//     },
//     setShowError: (state, action: PayloadAction<boolean>) => {
//       state.showError = action.payload;
//     },
//     clearError: (state) => {
//       state.errorMessage = '';
//       state.showError = false;
//     },
//     setIsInactiveDialogOpen: (state, action: PayloadAction<boolean>) => {
//       state.isInactiveDialogOpen = action.payload;
//     },
//     setTopicImage: (state, action: PayloadAction<string>) => {
//       state.topicImage = action.payload;
//     },
    
//     // WebSocket message handlers (these will be triggered by the middleware)
//     handleChatHistory: (state, action: PayloadAction<any>) => {
//       const msg = action.payload;
//       if (msg.chatHistory && Array.isArray(msg.chatHistory)) {
//         const formattedMessages = msg.chatHistory
//           .filter((message: any) => message.content.trim() !== "")
//           .map((message: any) => ({
//             id: message.id || Date.now() + Math.random().toString(),
//             messageType: "text",
//             text: message.content,
//             type: message.sender === "ai" ? "received" : "sent",
//             feedback: message.feedback || null,
//             audioUrl: message.audioUrl || null,
//             audioPlayed: true,
//             hasFeedback: !!message.feedback,
//             hasAssessment: !!message.assessments,
//             assessments: message.assessments || null,
//             isCompleted: message.isCompleted || false,
//           }));
//         state.messages = formattedMessages;
//         if (msg.chatId) state.chatId = msg.chatId;
//         const isCompleted = msg.chatHistory.some((m: any) => m.isCompleted);
//         state.chatCompleted = isCompleted;
//       }
//     },
//     handleStreamingResponse: (state, action: PayloadAction<any>) => {
//       const msg = action.payload;
//       // This is simplified - the actual implementation would track processed responses
//       // to avoid duplicates in a more Redux-friendly way
      
//       if (msg.data.ai_response) {
//         const lastAiMessageIndex = state.messages.findLastIndex(
//           (m) => m.type === "received" && (m.loading || m.text?.endsWith("..."))
//         );
        
//         if (lastAiMessageIndex !== -1) {
//           state.messages[lastAiMessageIndex] = {
//             ...state.messages[lastAiMessageIndex],
//             messageType: "text",
//             text: msg.data.ai_response,
//             feedback: msg.data.feedback || null,
//             type: "received",
//             hasFeedback: !!msg.data.feedback,
//             loading: false,
//           };
//         } else {
//           state.messages.push({
//             id: Date.now().toString(),
//             messageType: "text",
//             text: msg.data.ai_response,
//             feedback: msg.data.feedback || null,
//             type: "received",
//             hasFeedback: !!msg.data.feedback,
//           });
//         }
//       }
      
//       if (msg.data.tts_audio_url) {
//         const lastAiMessageIndex = state.messages.findLastIndex((m:any) => m.type === "received");
//         if (lastAiMessageIndex !== -1) {
//           state.messages[lastAiMessageIndex] = {
//             ...state.messages[lastAiMessageIndex],
//             audioUrl: msg.data.tts_audio_url,
//             audioPlayed: false,
//           };
//         }
//       }
//     },
//     handleSpeechTranscribed: (state, action: PayloadAction<any>) => {
//       const msg = action.payload;
//       state.messages.push({
//         id: Date.now().toString(),
//         messageType: "text",
//         text: msg.textMessage,
//         type: "sent",
//         assessments: msg.assessments || null,
//         hasAssessment: !!msg.assessments,
//       });
//       // Also remove any loading messages
//       state.messages = state.messages.filter(m => !m.loading);
//     },
//     handleTextChunk: (state, action: PayloadAction<any>) => {
//       const msg = action.payload;
//       const lastAiMessageIndex = state.messages.findLastIndex(
//         (m:any) => m.type === "received" && (m.loading || m.text?.endsWith("..."))
//       );
      
//       if (lastAiMessageIndex !== -1) {
//         state.messages[lastAiMessageIndex] = {
//           ...state.messages[lastAiMessageIndex],
//           messageType: "text",
//           text: msg.data,
//           type: "received",
//           loading: false,
//         };
//       } else {
//         state.messages.push({
//           id: Date.now().toString(),
//           messageType: "text",
//           text: msg.data,
//           type: "received",
//         });
//       }
//     },
//     handleError: (state, action: PayloadAction<any>) => {
//       const msg = action.payload;
//       state.errorMessage = msg.message;
//       state.showError = true;
//       if (msg.message.includes("Daily session limit")) state.sessionLimitReached = true;
//       if (msg.message.includes("This chat has been completed")) state.chatCompleted = true;
//       // Remove loading messages
//       state.messages = state.messages.filter(m => !m.loading);
//     },
//     handleSessionStatus: (state, action: PayloadAction<any>) => {
//       const msg = action.payload;
//       if (msg.remainingSeconds !== undefined) {
//         state.sessionTimeRemaining = msg.remainingSeconds;
//       }
//     },
//     handleAttachmentUrl: (state, action: PayloadAction<any>) => {
//       const msg = action.payload;
//       if (msg.data.attachment) {
//         const imageUrl = Array.isArray(msg.data.attachment)
//           ? msg.data.attachment[0]
//           : msg.data.attachment;
//         state.topicImage = imageUrl;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     // Handle any async thunk results if needed
//     builder
//       .addCase(getChatHistory.rejected, (state, action) => {
//         state.errorMessage = action.payload as string;
//         state.showError = true;
//       })
//       .addCase(sendTextMessage.rejected, (state, action) => {
//         state.errorMessage = action.payload as string;
//         state.showError = true;
//       })
//       .addCase(sendAudioMessage.rejected, (state, action) => {
//         state.errorMessage = action.payload as string;
//         state.showError = true;
//       });
//   }
// });

// export const {
//   connectWebSocket,
//   disconnectWebSocket,
//   setWsConnected,
//   resetActivityTimer,
//   updateMessages,
//   addMessage,
//   addLoadingMessage,
//   removeLoadingMessage,
//   updateOrAddMessage,
//   updateOrAddAudioUrl,
//   updateMessageAudioPlayed,
//   startRecording,
//   stopRecording,
//   updateRecordTime,
//   setPlayingAudio,
//   setChatId,
//   setChatCompleted,
//   setSessionLimitReached,
//   setSessionTimeRemaining,
//   setErrorMessage,
//   setShowError,
//   clearError,
//   setIsInactiveDialogOpen,
//   setTopicImage,
//   handleChatHistory,
//   handleStreamingResponse,
//   handleSpeechTranscribed,
//   handleTextChunk,
//   handleError,
//   handleSessionStatus,
//   handleAttachmentUrl
// } = chatWindowSlice.actions;

// // Create a middleware to handle WebSocket and recording
// export const chatWindowMiddleware = (store: any) => (next: any) => (action: any) => {
//   const WS_URL = import.meta.env.VITE_API_BASE_URL?.replace(/^http/, "ws") || "";
  
//   // Let the action go through first
//   const result = next(action);
  
//   // Then handle WebSocket and recording based on the action
//   if (action.type === 'chatWindow/connectWebSocket') {
//     if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
//       console.log(`WebSocket already ${ws.readyState === WebSocket.OPEN ? 'open' : 'connecting'}.`);
//       return result;
//     }
    
//     console.log("Attempting to connect WebSocket...");
//     intentionalDisconnect = false;
//     const newWs = new WebSocket(WS_URL);
//     ws = newWs;
    
//     newWs.onopen = () => {
//       console.log("✅ WS connected");
//       store.dispatch(setWsConnected(true));
//       store.dispatch(setErrorMessage(""));
//       store.dispatch(setShowError(false));
      
//       // Get chat history now that we're connected
//       const state = store.getState().chatWindow;
//       if (state.chatId) {
//         const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//         const urlParams = new URL(window.location.href).pathname.split('/');
//         const topicId = urlParams[urlParams.length - 1];
//         if (userData.id && topicId) {
//           store.dispatch(getChatHistory({ userId: userData.id, topicId }));
//         }
//       }
      
//       // Start inactivity timer
//       store.dispatch(resetActivityTimer());
//     };
    
//     newWs.onerror = (err) => {
//       console.error("WS error", err);
//       store.dispatch(setErrorMessage("WebSocket connection error. Please try refreshing."));
//       store.dispatch(setShowError(true));
//       store.dispatch(setWsConnected(false));
//     };
    
//     newWs.onclose = () => {
//       console.log("WS closed.");
//       store.dispatch(setWsConnected(false));
//       if (activityTimerId) {
//         clearTimeout(activityTimerId);
//       }
      
//       if (intentionalDisconnect) {
//         console.log("WS closed intentionally.");
//       } else {
//         console.warn("WS closed unexpectedly.");
//         store.dispatch(setErrorMessage("Connection lost. Please check your internet and refresh if the issue persists."));
//         store.dispatch(setShowError(true));
//       }
//     };
    
//     newWs.onmessage = (ev) => {
//       const msg = JSON.parse(ev.data);
//       console.log("WS message type:", msg.type);
      
//       switch (msg.type) {
//         case "chat_history":
//           store.dispatch(handleChatHistory(msg));
//           break;
//         case "streaming_response":
//           store.dispatch(handleStreamingResponse(msg));
//           break;
//         case "speech_transcribed":
//           store.dispatch(handleSpeechTranscribed(msg));
//           break;
//         case "text":
//           store.dispatch(handleTextChunk(msg));
//           break;
//         case "error":
//           store.dispatch(handleError(msg));
//           break;
//         case "session_status":
//           store.dispatch(handleSessionStatus(msg));
//           break;
//         case "attachment_url":
//           store.dispatch(handleAttachmentUrl(msg));
//           break;
//         default:
//           console.log("Unknown message type:", msg.type);
//       }
//     };
//   }
  
//   if (action.type === 'chatWindow/resetActivityTimer') {
//     if (activityTimerId) {
//       clearTimeout(activityTimerId);
//     }
    
//     activityTimerId = setTimeout(() => {
//       console.log("Inactivity detected. Closing WebSocket and showing dialog.");
//       store.dispatch(setErrorMessage("You've been inactive. Closing connection."));
//       store.dispatch(setShowError(true));
//       intentionalDisconnect = true;
//       if (ws) {
//         ws.close();
//         ws = null;
//       }
//       store.dispatch(setIsInactiveDialogOpen(true));
//     }, 60 * 1000 * 1); // 1 minute
//   }
  
//   if (action.type === 'chatWindow/startRecording') {
//     const startRecordingImpl = async () => {
//       const state = store.getState().chatWindow;
      
//       if (state.sessionLimitReached || state.chatCompleted) {
//         store.dispatch(setErrorMessage(state.sessionLimitReached ? "Daily session limit reached." : "Chat completed."));
//         store.dispatch(setShowError(true));
//         return;
//       }
      
//       if (!ws || ws.readyState !== WebSocket.OPEN) {
//         store.dispatch(setErrorMessage("Not connected. Please wait or try reconnecting."));
//         store.dispatch(setShowError(true));
//         store.dispatch(setIsInactiveDialogOpen(true)); // Prompt to reconnect
//         return;
//       }
      
//       // Stop any existing stream
//       if (streamRef) {
//         streamRef.getTracks().forEach((t) => {
//           try { t.stop(); } catch (err) { console.error("Error stopping previous track:", err); }
//         });
//         streamRef = null;
//       }
      
//       // On iOS, we need to wait a bit between recordings to avoid issues
//       if (isIOS() && lastRecordingEndTime) {
//         const timeSinceLast = Date.now() - lastRecordingEndTime;
//         if (timeSinceLast < 1000) await new Promise(resolve => setTimeout(resolve, 1000 - timeSinceLast));
//       }
      
//       try {
//         const constraints = { audio: isIOS() 
//           ? { echoCancellation: true, noiseSuppression: true, sampleRate: 22050, channelCount: 1 } 
//           : true 
//         };
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         const mimeType = getSupportedAudioType();
//         streamRef = stream;
        
//         const mr = new MediaRecorder(stream, { mimeType });
//         mediaRecorder = mr;
//         audioChunks = [];
//         isCanceled = false;
        
//         if (timerRef) {
//           clearInterval(timerRef);
//         }
        
//         store.dispatch(updateRecordTime(0));
        
//         let recordTime = 0;
//         timerRef = setInterval(() => {
//           recordTime += 1;
//           store.dispatch(updateRecordTime(recordTime));
//         }, 1000);
        
//         mr.ondataavailable = (e) => {
//           if (e.data && e.data.size > 0) audioChunks.push(e.data);
//           else console.warn("Received empty data chunk");
//         };
        
//         mr.onerror = (event) => {
//           console.error("MediaRecorder error:", event);
//           cleanupRecording(store);
//           store.dispatch(setErrorMessage("Recording error. Please try again."));
//           store.dispatch(setShowError(true));
//         };
        
//         mr.onstop = async () => {
//           try {
//             if (isCanceled) {
//               console.log("Recording canceled");
//               cleanupRecording(store);
//               return;
//             }
            
//             if (audioChunks.length === 0) {
//               console.warn("No audio data captured");
//               cleanupRecording(store);
//               store.dispatch(setErrorMessage("No audio captured. Try again."));
//               store.dispatch(setShowError(true));
//               return;
//             }
            
//             const blob = new Blob(audioChunks, { type: mimeType });
//             if (blob.size < 100) {
//               console.warn("Audio blob too small");
//               cleanupRecording(store);
//               store.dispatch(setErrorMessage("Recording too short. Try again."));
//               store.dispatch(setShowError(true));
//               return;
//             }
            
//             const audioURL = URL.createObjectURL(blob);
//             store.dispatch(addMessage({
//               id: Date.now().toString(),
//               messageType: "audio",
//               audioURL,
//               type: "sent"
//             }));
            
//             store.dispatch(addLoadingMessage());
            
//             const base64 = await blobToBase64(blob);
            
//             if (ws && ws.readyState === WebSocket.OPEN) {
//               const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//               const urlParams = new URL(window.location.href).pathname.split('/');
//               const topicId = urlParams[urlParams.length - 1];
              
//               ws.send(JSON.stringify({ 
//                 userId: userData.id, 
//                 topicId, 
//                 chatId: state.chatId, 
//                 format: mimeType.split("/")[1], 
//                 type: "audio", 
//                 payload: { audioBuffer: base64, format: mimeType } 
//               }));
              
//               store.dispatch(resetActivityTimer());
//             } else {
//               console.error("WebSocket not open for sending audio");
//               store.dispatch(setErrorMessage("Connection error. Refresh page."));
//               store.dispatch(setShowError(true));
//               store.dispatch(setIsInactiveDialogOpen(true)); // Prompt to reconnect
//             }
//           } catch (error) {
//             console.error("Error processing recording:", error);
//             store.dispatch(setErrorMessage("Error processing recording. Try again."));
//             store.dispatch(setShowError(true));
//           } finally {
//             cleanupRecording(store);
//           }
//         };
        
//         mr.start(1000);
        
//       } catch (error) {
//         console.error("Error starting recording:", error);
//         store.dispatch(setErrorMessage(isIOS() ? "Mic access error (iOS). Check permissions." : "Mic access error. Check permissions."));
//         store.dispatch(setShowError(true));
//         cleanupRecording(store);
//       }
//     };
    
//     startRecordingImpl();
//   }
  
//   if (action.type === 'chatWindow/cancelRecording') {
//     if (mediaRecorder && streamRef) {
//       isCanceled = true;
//       try {
//         if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
//       } catch (err) { 
//         console.error("Error stopping recorder:", err); 
//       }
//       cleanupRecording(store);
//     }
//   }
  
//   if (action.type === 'chatWindow/sendRecording') {
//     const sendRecordingImpl = async () => {
//       if (mediaRecorder && streamRef) {
//         try {
//           if (isIOS() && mediaRecorder.state === "recording") {
//             mediaRecorder.requestData();
//             await new Promise(resolve => setTimeout(resolve, 200));
//           }
//           if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
//         } catch (err) {
//           console.error("Error finalizing recording:", err);
//           cleanupRecording(store);
//         }
//       }
//     };
    
//     sendRecordingImpl();
//   }
  
//   return result;
// };

// // Helper to clean up recording resources
// function cleanupRecording(store: any) {
//   if (timerRef) {
//     clearInterval(timerRef);
//     timerRef = null;
//   }
  
//   store.dispatch(updateRecordTime(0));
//   store.dispatch(stopRecording());
  
//   if (streamRef) {
//     streamRef.getTracks().forEach((t) => {
//       try { t.stop(); } catch (err) { console.error("Error stopping track:", err); }
//     });
//     streamRef = null;
//   }
  
//   mediaRecorder = null;
//   audioChunks = [];
//   lastRecordingEndTime = Date.now();
// }

// export default chatWindowSlice.reducer;
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

export interface ChatMessage {
  id: string;
  text?: string;
  audioUrl?: string;
  type: 'sent' | 'received';
  loading?: boolean;
  hasFeedback?: boolean;
  hasAssessment?: boolean;
  audioPlayed?: boolean;
  isCompleted?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  isRecording: boolean;
  recordTime: number;
  chatId: string | null;
  sessionTimeRemaining: number | null;
  sessionLimitReached: boolean;
  error: string | null;
  chatCompleted: boolean;
  topicImage: string | null;
}

const initialState: ChatState = {
  messages: [],
  isRecording: false,
  recordTime: 0,
  chatId: null,
  sessionTimeRemaining: null,
  sessionLimitReached: false,
  error: null,
  chatCompleted: false,
  topicImage: null,
};

export const initializeChat = createAsyncThunk(
  'chat/initialize',
  async ({ userId, topicId }: { userId: string; topicId: string }, { dispatch }) => {
    // WebSocket initialization logic here
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action: PayloadAction<Partial<ChatMessage>>) => {
      const index = state.messages.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.messages[index] = { ...state.messages[index], ...action.payload };
      }
    },
    setRecording: (state, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    incrementRecordTime: (state) => {
      state.recordTime += 1;
    },
    resetRecordTime: (state) => {
      state.recordTime = 0;
    },
    setSessionTime: (state, action: PayloadAction<number | null>) => {
      state.sessionTimeRemaining = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setChatCompleted: (state, action: PayloadAction<boolean>) => {
      state.chatCompleted = action.payload;
    },
    setTopicImage: (state, action: PayloadAction<string | null>) => {
      state.topicImage = action.payload;
    },
    resetChat: () => initialState,
  },
});

export const {
  addMessage,
  updateMessage,
  setRecording,
  incrementRecordTime,
  resetRecordTime,
  setSessionTime,
  setError,
  setChatCompleted,
  setTopicImage,
  resetChat,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;

export default chatSlice.reducer;