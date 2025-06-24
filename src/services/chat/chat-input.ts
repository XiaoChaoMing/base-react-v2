import { BaseService } from "../base/base";
import { AxiosRequestConfig } from "axios";

export interface ChatInputRequest {
  token_chatgpt?: string;
  text_input: string;
}

export interface ChatInputResponse {
  message: string;
  status: number;
  data: {
    conversation_id: string;
    title: string;
    create_time: number;
    update_time: number;
  };
}

class ChatInputService extends BaseService {
  constructor() {
    super({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      }
    });
  }

  /**
   * Send user input to the chat API
   * @param textInput The user's input text
   * @param tokenChatgpt Optional token for an existing chat (empty for new chats)
   * @returns Promise with chat input response data
   */
  async sendInput(textInput: string, tokenChatgpt?: string): Promise<ChatInputResponse> {
    try {
      // For new chats, don't include token_chatgpt in the query parameters
      const endpoint = tokenChatgpt 
        ? `/input?token_chatgpt=${encodeURIComponent(tokenChatgpt)}&text_input=${encodeURIComponent(textInput)}`
        : `/input?text_input=${encodeURIComponent(textInput)}`;
      
      // Set additional headers for this specific request
      const config: AxiosRequestConfig = {
        headers: {
          "Referrer-Policy": "strict-origin-when-cross-origin"
        }
      };
      
      // Send a POST request with query parameters in the URL and empty body
      return await this.post<ChatInputResponse>(endpoint, {}, config);
    } catch (error) {
      console.error("Failed to send chat input:", error);
      throw new Error("Failed to send chat input");
    }
  }
}

export const chatInputService = new ChatInputService();
