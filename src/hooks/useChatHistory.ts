import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatHistoryService, ChatHistoryResponse, CreateChatResponse } from "@/services/chat/chat-history";

export const useChatHistory = () => {
  const queryClient = useQueryClient();

  // Get all chat histories
  const { data: chatHistories, isLoading, error, refetch } = useQuery({
    queryKey: ["chatHistories"],
    queryFn: () => chatHistoryService.getChatHistories(),
    staleTime: 30000, // 30 seconds
  });

  // Get a specific chat by ID
  const getChatByIdQuery = (id: string) => 
    useQuery({
      queryKey: ["chat", id],
      queryFn: () => chatHistoryService.getChatById(id),
      enabled: !!id, // Only run if id is provided
      staleTime: 30000,
    });

  // Create a new chat
  const createChatMutation = useMutation({
    mutationFn: (title: string) => chatHistoryService.createChat(title),
    onSuccess: () => {
      // Invalidate the chat histories query to refetch
      queryClient.invalidateQueries({ queryKey: ["chatHistories"] });
    },
  });

  // Update chat title
  const updateChatTitleMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => 
      chatHistoryService.updateChatTitle(id, title),
    onSuccess: (_, variables) => {
      // Invalidate both the specific chat and the chat histories
      queryClient.invalidateQueries({ queryKey: ["chat", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["chatHistories"] });
    },
  });

  // Delete a chat
  const deleteChatMutation = useMutation({
    mutationFn: (id: string) => chatHistoryService.deleteChat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistories"] });
    },
  });

  // Clear all chats
  const clearAllChatsMutation = useMutation({
    mutationFn: () => chatHistoryService.clearAllChats(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatHistories"] });
    },
  });

  // Helper function to create a new chat with options
  const createChat = async (title: string, options?: { 
    onSuccess?: (data: CreateChatResponse['data']) => void 
  }) => {
    try {
      const response = await createChatMutation.mutateAsync(title);
      if (options?.onSuccess && response.data) {
        options.onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };

  return {
    chatHistories: chatHistories?.history || [],
    isLoading,
    error,
    refetch,
    getChatByIdQuery,
    createChat,
    updateChatTitle: updateChatTitleMutation.mutate,
    deleteChat: deleteChatMutation.mutate,
    clearAllChats: clearAllChatsMutation.mutate,
    isCreating: createChatMutation.isPending,
    isUpdating: updateChatTitleMutation.isPending,
    isDeleting: deleteChatMutation.isPending,
    isClearing: clearAllChatsMutation.isPending,
  };
}; 