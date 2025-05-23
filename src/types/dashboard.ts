export interface UserInfo {
  firstName: string;
  lastName: string;
  schoolName: string;
  class: string;
  cefrLevel: string;
  aiCefrLevel: string;
}

export interface UsageRecord {
  date: string;
  duration: number;
}

export interface CompletedTopics {
  [key: string]: number;
}

export interface DashboardData {
  userInfo: UserInfo;
  dailyUsage: number;
  usageRecords: UsageRecord[];
  streak: number;
  longestStreak: number;
  completedTopics: CompletedTopics;
}

export interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
}