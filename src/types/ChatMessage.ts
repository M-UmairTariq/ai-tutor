export interface ChatMessage {
    id: string; // Unique message ID
    chatSessionId: string; // ID of the chat session this message belongs to
    text: string; // Content of the message
    sender: 'user' | 'bot' | string; // Differentiates between user, bot, or other senders
    timestamp: string; // ISO 8601 date string for when the message was sent/received
    // Optional: Add other properties like avatarUrl, messageStatus (sent, delivered, read), etc.
  }
  