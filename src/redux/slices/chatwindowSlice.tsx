import apiClient from '@/config/ApiConfig'; // Your configured Axios instance or API client
import { ChatMessage } from '@/types/ChatMessage';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// Make sure to import ChatMessage if it's in a separate types.ts file
// import { ChatMessage } from './types';

// Define the state interface for the chat window
export interface ChatWindowState {
  messages: ChatMessage[]; // Array to hold all messages for the current session
  currentInput: string; // Current text in the message input field
  isOpen: boolean; // Controls the visibility of the chat window (especially if used as a modal)
  isLoading: boolean; // True when fetching messages or sending a new one
  isSending: boolean; // True specifically when a message is being sent
  error: string | null; // Holds any error messages
  currentChatSessionId: string | null; // ID of the currently active chat session
}

// Define the initial state
const initialState: ChatWindowState = {
  messages: [],
  currentInput: '',
  isOpen: false, // Chat window is closed by default
  isLoading: false,
  isSending: false,
  error: null,
  currentChatSessionId: null,
};

// --- Async Thunks ---

/**
 * Async thunk for fetching chat messages for a given session.
 * Assumes your API endpoint is '/get-chat-messages' and expects a 'chatSessionId'.
 * Adjust the endpoint and payload/response structure as needed.
 */
export const fetchChatMessages = createAsyncThunk<
  ChatMessage[], // Return type of the fulfilled action payload
  { chatSessionId: string }, // Argument type for the thunk
  { rejectValue: string } // Type for the rejected action payload (error message)
>(
  'chatWindow/fetchChatMessages',
  async ({ chatSessionId }, { rejectWithValue }) => {
    try {
      // Replace with your actual API call
      const response = await apiClient.post('/get-chat-messages', { chatSessionId });
      // Assuming the API returns something like: { success: true, data: { messages: ChatMessage[] } }
      if (response.data && response.data.data && Array.isArray(response.data.data.messages)) {
        return response.data.data.messages as ChatMessage[];
      }
      return rejectWithValue('Invalid response structure when fetching messages.');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message || 'Failed to fetch chat messages.');
    }
  }
);

/**
 * Async thunk for sending a chat message.
 * Assumes your API endpoint is '/send-chat-message'.
 * Adjust the endpoint and payload/response structure as needed.
 */
export const sendChatMessage = createAsyncThunk<
  ChatMessage, // Return type: the message confirmed by the backend
  { chatSessionId: string; text: string; sender: string }, // Argument type
  { rejectValue: string } // Type for rejection
>(
  'chatWindow/sendChatMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      // Replace with your actual API call
      const response = await apiClient.post('/send-chat-message', messageData);
      // Assuming API returns: { success: true, data: { message: ChatMessage } }
      if (response.data && response.data.data && response.data.data.message) {
        return response.data.data.message as ChatMessage;
      }
      return rejectWithValue('Invalid response structure when sending message.');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message || 'Failed to send chat message.');
    }
  }
);

// Create the chatWindow slice
const chatWindowSlice = createSlice({
  name: 'chatWindow',
  initialState,
  reducers: {
    // Action to open the chat window and set the active session
    openChatWindow: (state, action: PayloadAction<{ chatSessionId: string }>) => {
      state.isOpen = true;
      state.currentChatSessionId = action.payload.chatSessionId;
      state.messages = []; // Clear previous messages or fetch new ones (handled by thunk)
      state.error = null; // Clear any previous errors
    },
    // Action to close the chat window
    closeChatWindow: (state) => {
      state.isOpen = false;
      state.currentInput = '';
      // Optionally clear messages or session ID based on requirements
      // state.messages = [];
      // state.currentChatSessionId = null;
    },
    // Action to update the text in the message input field
    updateCurrentInput: (state, action: PayloadAction<string>) => {
      state.currentInput = action.payload;
    },
    // Action to add a message optimistically to the UI before backend confirmation
    // Useful for instant feedback, but ensure to handle potential send failures
    addMessageOptimistic: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    // Action to clear any displayed error messages
    clearChatError: (state) => {
      state.error = null;
    },
    // Action to manually clear all chat messages from the state
    clearChatMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchChatMessages lifecycle
      .addCase(fetchChatMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action: PayloadAction<ChatMessage[]>) => {
        state.isLoading = false;
        state.messages = action.payload; // Replace current messages with fetched ones
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Handle sendChatMessage lifecycle
      .addCase(sendChatMessage.pending, (state) => {
        state.isSending = true; // Specific flag for sending
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action: PayloadAction<ChatMessage>) => {
        state.isSending = false;
        // Add the successfully sent message (confirmed by backend) to the list
        // If not using optimistic updates, or to replace an optimistic message with the real one
        const existingOptimisticIndex = state.messages.findIndex(m => m.id === `optimistic_${action.payload.timestamp}`); // Example optimistic ID
        if (existingOptimisticIndex > -1) {
            state.messages[existingOptimisticIndex] = action.payload;
        } else {
            state.messages.push(action.payload);
        }
        state.currentInput = ''; // Clear input field after successful send
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isSending = false;
        state.error = action.payload as string;
        // Optionally, handle the failed message in the UI (e.g., mark it as 'failed to send')
        // For example, find an optimistically added message and mark it as failed.
      });
  },
});

// Export actions
export const {
  openChatWindow,
  closeChatWindow,
  updateCurrentInput,
  addMessageOptimistic,
  clearChatError,
  clearChatMessages,
} = chatWindowSlice.actions;

// Export the reducer
export default chatWindowSlice.reducer;