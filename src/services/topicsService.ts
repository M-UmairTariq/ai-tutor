import apiClient from '@/config/ApiConfig';
import { Topic } from '@/redux/slices/topicsSlice';

export interface TopicsResponse {
  status: string;
  message: string;
  data: {
    topics: Topic[];
  };
}

export const TopicService = {
  getTopics: (userId: string, topicMode: string) => {
    return apiClient.post<TopicsResponse>('/get-topics', {
      userId,
      topicMode
    });
  },
  
  getTopicById: (topicId: string) => {
    return apiClient.get<{status: string; data: Topic}>(`/topics/${topicId}`);
  },
  
};

export default TopicService;