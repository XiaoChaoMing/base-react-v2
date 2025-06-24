import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatInputService } from "@/services/chat/chat-input";
import { useParams, useLocation } from "react-router-dom";

export const useChatInput = () => {
  const queryClient = useQueryClient();
  const { chatId } = useParams();
  const location = useLocation();

  // Extract chatId from URL if not available from params
  const getChatIdFromUrl = (): string | undefined => {
    if (chatId) return chatId;
    
    // Extract from path if using a different router pattern
    const match = location.pathname.match(/\/chat\/([^\/]+)/);
    if (match && match[1]) {
      return match[1];
    }
    
    return undefined;
  };

  // Get the current chat ID
  const currentChatId = getChatIdFromUrl();

  // Send input mutation
  const sendInputMutation = useMutation({
    mutationFn: (textInput: string) => {
      // If chatId exists, use it as the token_chatgpt
      return chatInputService.sendInput(textInput, currentChatId);
    },
    onSuccess: (data) => {
      // Invalidate relevant queries to trigger refetches
      if (currentChatId) {
        // If we're in an existing chat, invalidate that chat's data
        queryClient.invalidateQueries({ queryKey: ["chatResponse", currentChatId] });
      } else if (data.data?.conversation_id) {
        // If it's a new chat, invalidate the chat histories list
        queryClient.invalidateQueries({ queryKey: ["chatHistories"] });
      }
    },
  });

  /**
   * Send user input to the chat API
   * @param textInput The user's input text
   * @returns Promise with the API response
   */
  const sendInput = async (textInput: string) => {
    return await sendInputMutation.mutateAsync(textInput);
  };

  return {
    sendInput,
    isLoading: sendInputMutation.isPending,
    error: sendInputMutation.error,
    data: sendInputMutation.data,
    currentChatId,
  };
}; 