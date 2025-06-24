import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { chatResponseService, ChatNode } from "@/services/chat/chat-response";

export interface ProcessedMessage {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
  isLoading?: boolean;
}

export const useChatResponse = (chatId?: string) => {
  const [processedMessages, setProcessedMessages] = useState<ProcessedMessage[]>([]);
  const [currentTitle, setCurrentTitle] = useState<string>("New chat");

  // Fetch chat response data
  const { 
    data: responseData, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["chatResponse", chatId],
    queryFn: () => chatId ? chatResponseService.getChatResponse(chatId) : Promise.reject("No chat ID provided"),
    enabled: !!chatId, // Only run the query if chatId is provided
    retry: 1,
    staleTime: 30000, // Consider data fresh for 30 seconds
  });


  // Process the chat response data to extract messages
  useEffect(() => {
    if (responseData?.data) {
      const { mapping, current_node, title } = responseData.data;
      
      // Set the chat title
      setCurrentTitle(title || "New chat");
      
      // Process the messages from the mapping
      const messages = processMessagesFromMapping(mapping, current_node);
      setProcessedMessages(messages);
    }
  }, [responseData]);

  // Function to process messages from the mapping
  const processMessagesFromMapping = (mapping: Record<string, ChatNode>, currentNodeId: string): ProcessedMessage[] => {
    const messages: ProcessedMessage[] = [];
    const processedIds = new Set<string>();
    
    // Helper function to recursively traverse the message tree
    const traverseMessages = (nodeId: string): void => {
      // Prevent processing the same node twice
      if (processedIds.has(nodeId)) return;
      processedIds.add(nodeId);
      
      const node = mapping[nodeId];
      if (!node) return;
      
      // Process the current node's message if it exists and is not a system message
      if (node.message && 
          node.message.author.role !== "system" && 
          node.message.content.content_type === "text" &&
          node.message.content.parts && 
          node.message.content.parts.length > 0) {
        
        const content = node.message.content.parts.join("\n");
        
        // Skip empty messages
        if (content.trim()) {
          messages.push({
            id: node.message.id,
            content,
            role: node.message.author.role as "user" | "assistant" | "system",
            timestamp: node.message.create_time ? new Date(node.message.create_time * 1000) : new Date(),
          });
        }
      }
      
      // Process parent node first to maintain chronological order
      if (node.parent && node.parent !== "client-created-root") {
        traverseMessages(node.parent);
      }
      
      // Process children nodes
      for (const childId of node.children) {
        traverseMessages(childId);
      }
    };
    
    // Start traversal from the current node
    traverseMessages(currentNodeId);
    
    // Sort messages by timestamp to ensure correct order
    return messages
      .filter((msg, index, self) => 
        // Remove duplicates based on ID
        index === self.findIndex((m) => m.id === msg.id))
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  // Extract conversation data
  const conversationData = useMemo(() => {
    if (!responseData?.data) return null;
    
    return {
      id: responseData.data.conversation_id,
      title: responseData.data.title,
      createTime: new Date(responseData.data.create_time * 1000),
      updateTime: new Date(responseData.data.update_time * 1000),
      currentNodeId: responseData.data.current_node,
      modelSlug: responseData.data.default_model_slug,
    };
  }, [responseData]);



  return {
    messages: processedMessages,
    isLoading,
    error,
    refetch,
    conversationData,
    title: currentTitle,
  };
}; 