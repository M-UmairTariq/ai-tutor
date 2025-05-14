export interface ChatMessage {
  id: string;
  messageType: "text" | "audio" | "loading";
  text?: string;
  audioUrl?: string;
  audioPlayed?: boolean;
  type: "sent" | "received";
  feedback?: any;
  assessments?: any;
  hasFeedback?: boolean;
  hasAssessment?: boolean;
  isCompleted?: boolean;
  loading?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isRecording: boolean;
  recordTime: number;
  chatId: string | null;
  sessionTimeRemaining: number | null;
  sessionLimitReached: boolean;
  errorMessage: string;
  showError: boolean;
  chatCompleted: boolean;
  topicImage: string | null;
  isFeedbackDialogOpen: boolean;
  feedback: any | null;
  processedResponses: Set<string>;
  playingAudio: string | null;
  isInactiveDialogOpen: boolean;
  isWebSocketConnected: boolean;
}