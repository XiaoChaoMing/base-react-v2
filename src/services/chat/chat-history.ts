import { BaseService } from "../base/base";

// Define types for the history API response
export interface ChatHistoryItem {
  id: number;
  user_id: number;
  profile_id: string;
  chatgpt_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatHistoryResponse {
  message: string;
  user_id: string;
  history: {
    id: string;
    chatgpt_id: string;
    title: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface ChatHistory {
  id: string;
  chatgpt_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface CreateChatResponse {
  data: {
    id: string;
    chatgpt_id: string;
    title: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
  status: number;
}

export interface DeleteChatResponse {
  message: string;
  status: number;
}

export interface ChatHistoryDetail {
  id: string;
  chatgpt_id: string;
  title: string;
  messages: {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    timestamp: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface ChatHistoryDetailResponse {
  data: ChatHistoryDetail;
  message: string;
  status: number;
}

class ChatHistoryService extends BaseService {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  getChatHistories() {
    return this.get<ChatHistoryResponse>("/history");
  }
  
  getChatById(id: string) {
    return this.get<ChatHistoryDetailResponse>(`/history/${id}`);
  }
  
  createChat(title: string) {
    return this.post<CreateChatResponse>("/history", { title });
  }
  
  updateChatTitle(id: string, title: string) {
    return this.put<CreateChatResponse>(`/history/${id}`, { title });
  }
  
  deleteChat(id: string) {
    return this.delete<DeleteChatResponse>(`/history/${id}`);
  }
  
  clearAllChats() {
    return this.delete<DeleteChatResponse>("/history/clear");
  }
}

export const chatHistoryService = new ChatHistoryService(); 