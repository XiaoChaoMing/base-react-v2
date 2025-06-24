import { BaseService } from "../base/base";

// Types for the chat response API
export interface ChatAuthor {
  role: "system" | "user" | "assistant";
  name: string | null;
  metadata: Record<string, any>;
}

export interface ChatContent {
  content_type: string;
  parts?: string[];
  model_set_context?: string;
  repository?: any;
  repo_summary?: any;
  structured_context?: any;
}

export interface ChatMessage {
  id: string;
  author: ChatAuthor;
  create_time: number | null;
  update_time: number | null;
  content: ChatContent;
  status: string;
  end_turn: boolean | null;
  weight: number;
  metadata: Record<string, any>;
  recipient: string;
  channel: any;
}

export interface ChatNode {
  id: string;
  message: ChatMessage | null;
  parent: string | null;
  children: string[];
}

export interface ChatData {
  title: string;
  create_time: number;
  update_time: number;
  mapping: Record<string, ChatNode>;
  moderation_results: any[];
  current_node: string;
  plugin_ids: any;
  conversation_id: string;
  conversation_template_id: any;
  gizmo_id: any;
  gizmo_type: any;
  is_archived: boolean;
  is_starred: any;
  safe_urls: any[];
  blocked_urls: any[];
  default_model_slug: string;
  conversation_origin: any;
  voice: any;
  async_status: any;
  disabled_tool_ids: any[];
  is_do_not_remember: boolean;
  memory_scope: string;
  sugar_item_id: any;
}

export interface ChatResponseData {
  message: string;
  username: string;
  token_chatgpt: string;
  data: ChatData;
}

interface ChatResponseRequest {
  token_chatgpt: string;
}


class ChatResponseService extends BaseService {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_API_URL,
    });
  }

  /**
   * Get chat response data for a specific chat
   * @param chatId The chat ID to get response data for
   * @returns Promise with chat response data
   */
  async getChatResponse(chatId: string): Promise<ChatResponseData> {
    try {
      const request: ChatResponseRequest = {
        token_chatgpt: chatId
      };
      
      return await this.post<ChatResponseData>("/response", request);
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
      throw new Error("Failed to fetch chat response");
    }
  }
}

export const chatResponseService = new ChatResponseService(); 