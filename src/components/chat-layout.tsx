import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

import { Sidebar } from "@/components/ui/Sidebar";
import { ChatMessages, Message } from "@/components/ui/chat/chat-messages";
import { Header } from "@/components/ui/Header";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useChatResponse, ProcessedMessage } from "@/hooks/useChatResponse";
import { useChatInput } from "@/hooks/useChatInput";
import { ChatInputDebounced, ChatInputDebouncedRef } from "@/components/ui/chat/ChatInputDebounced";

// Helper function to detect if a response is likely incomplete
const isLikelyIncompleteResponse = (content: string): boolean => {
  // Check for common indicators of incomplete responses
  const incompleteMarkers = [
    // Sentences that end abruptly
    /[^.!?]\s*$/,
    // Unfinished code blocks (opened but not closed)
    /```[^`]*$/,
    // Unfinished lists where the last item doesn't end with punctuation
    /\n\s*[-*]\s+[^.!?]+$/,
    // Sentences that end with ellipsis (might indicate more content coming)
    /\.\.\.\s*$/,
    // Numbered lists that seem to continue
    /\d+\.\s+[^.!?]+$/,
    // Incomplete parentheses or brackets
    /\([^)]*$/,
    /\[[^\]]*$/,
    /\{[^}]*$/,
  ];

  return incompleteMarkers.some(marker => marker.test(content));
};

// Memoize the ChatLayout component to prevent unnecessary rerenders from parent components
export const ChatLayout = memo(function ChatLayout() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { createChat } = useChatHistory();
  const { 
    messages: chatResponseMessages, 
    isLoading: isLoadingChatResponse,
    title: chatTitle,
    refetch: refetchChatResponse,
  } = useChatResponse(chatId);

  const { sendInput, isLoading: isInputLoading } = useChatInput();

  // Create ref for the chat input
  const chatInputRef = useRef<ChatInputDebouncedRef>(null);

  // Main component state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  // Polling state
  const [isPollActive, setIsPollActive] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageContentRef = useRef<string>("");
  const unchangedCountRef = useRef(0);
  
  const POLL_INTERVAL = 2000; // Poll every 2 seconds
  const MAX_POLL_COUNT = 6; // Poll up to 15 times (30 seconds total)
  const UNCHANGED_THRESHOLD = 3; // Stop if content is unchanged for 3 consecutive polls

  // Add a state to track if the latest response might be incomplete
  const [latestResponseMayBeIncomplete, setLatestResponseMayBeIncomplete] = useState(false);

  // Check if dark mode is enabled in the document
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkTheme(isDark);
  }, []);

  // Convert chatResponseMessages to our Message format
  useEffect(() => {
    if (chatResponseMessages && chatResponseMessages.length > 0) {
      const formattedMessages = chatResponseMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        timestamp: msg.timestamp,
        role: msg.role === "assistant" ? "assistant" : "user" as "assistant" | "user",
        isLoading: false
      }));
      setMessages(formattedMessages);
      
      // Log the latest assistant message when messages are updated
      const latestAssistantMessage = chatResponseMessages
        .filter(msg => msg.role === "assistant")
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
      
      if (latestAssistantMessage) {
        console.log("Latest assistant response:", latestAssistantMessage.content);
        
        // Check if the response has changed
        const latestContent = latestAssistantMessage.content;
        
        // Check if the response appears incomplete
        const seemsIncomplete = isLikelyIncompleteResponse(latestContent);
        setLatestResponseMayBeIncomplete(seemsIncomplete);
        
        if (seemsIncomplete) {
          console.log("Response appears incomplete, continuing polling");
          unchangedCountRef.current = 0; // Reset unchanged counter if response seems incomplete
        }
        
        if (isPollActive) {
          if (latestContent === lastMessageContentRef.current) {
            // Only increment the unchanged counter if the response doesn't seem incomplete
            if (!seemsIncomplete) {
              unchangedCountRef.current += 1;
              console.log(`Response unchanged (${unchangedCountRef.current}/${UNCHANGED_THRESHOLD})`);
              
              // If content hasn't changed for several polls, stop polling
              if (unchangedCountRef.current >= UNCHANGED_THRESHOLD) {
                stopPolling();
                console.log("Polling stopped: Response stabilized");
              }
            } else {
              console.log("Response unchanged but seems incomplete, continuing to poll");
            }
          } else {
            // Content changed, reset the unchanged counter
            unchangedCountRef.current = 0;
            lastMessageContentRef.current = latestContent;
            console.log("Response updated, continuing to poll");
          }
        }
      }
    } else if (!isLoadingChatResponse && !chatId) {
      // New chat, just show welcome message
      setMessages([
        {
          id: "welcome",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date(),
          role: "assistant"
        }
      ]);
      setLatestResponseMayBeIncomplete(false);
    }
  }, [chatResponseMessages, isLoadingChatResponse, chatId, isPollActive]);

  // Update loading state when isSending changes
  useEffect(() => {
    setIsLoading(isInputLoading);
  }, [isInputLoading]);

  // Polling mechanism
  const startPolling = useCallback(() => {
    // Reset polling state
    setPollCount(0);
    unchangedCountRef.current = 0;
    lastMessageContentRef.current = "";
    setIsPollActive(true);
    
    console.log("Starting polling for response updates");
    
    // Clear any existing interval
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    
    // Track consecutive errors
    let consecutiveErrorCount = 0;
    const MAX_CONSECUTIVE_ERRORS = 3;
    
    // Track response length to detect very long responses
    let previousResponseLength = 0;
    let growthRate = 0;
    
    // Start new polling interval
    pollIntervalRef.current = setInterval(async () => {
      setPollCount(prev => {
        const newCount = prev + 1;
        console.log(`Polling attempt ${newCount}/${MAX_POLL_COUNT}`);
        
        // Stop polling if we've reached the maximum number of attempts
        if (newCount >= MAX_POLL_COUNT) {
          stopPolling();
          console.log("Polling stopped: Maximum attempts reached");
        }
        
        return newCount;
      });
      
      // Fetch latest response
      try {
        const result = await refetchChatResponse();
        consecutiveErrorCount = 0; // Reset error count on success
        
        // Check for very long responses by tracking growth rate
        if (result.data?.data) {
          const { mapping, current_node } = result.data.data;
          const latestNode = mapping[current_node];
          
          if (latestNode?.message?.content?.parts) {
            const currentContent = latestNode.message.content.parts.join("\n");
            const currentLength = currentContent.length;
            
            // Calculate growth rate
            if (previousResponseLength > 0) {
              growthRate = currentLength - previousResponseLength;
              console.log(`Response growth: +${growthRate} characters`);
              
              // If response is growing rapidly, extend polling
              if (growthRate > 500) { // More than 500 chars added since last poll
                console.log("Large response detected, extending polling");
                unchangedCountRef.current = 0; // Reset unchanged counter
              }
            }
            
            previousResponseLength = currentLength;
          }
        }
      } catch (error) {
        console.error("Error during polling:", error);
        consecutiveErrorCount++;
        
        // Stop polling if we hit too many consecutive errors
        if (consecutiveErrorCount >= MAX_CONSECUTIVE_ERRORS) {
          console.log(`Stopping polling due to ${MAX_CONSECUTIVE_ERRORS} consecutive errors`);
          stopPolling();
        }
      }
    }, POLL_INTERVAL);
  }, [refetchChatResponse]);
  
  // Add a function to manually force polling to continue
  const forceExtendPolling = useCallback(() => {
    if (!isPollActive) {
      startPolling();
    } else {
      // Reset the counter to extend existing polling
      unchangedCountRef.current = 0;
      setPollCount(0);
      console.log("Polling manually extended");
    }
  }, [isPollActive, startPolling]);
  
  // Stop polling
  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setIsPollActive(false);
  }, []);
  
  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Memoize constants to prevent unnecessary rerenders
  const userAvatar = React.useMemo(() => "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350", []);
  const aiAvatar = React.useMemo(() => "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4", []);

  // Memoize the chat input handlers
  const handleSetInputValue = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  // Memoize send message handler
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      timestamp: new Date(),
      role: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add AI loading message
    const loadingMessageId = `ai-${Date.now()}`;
    const loadingMessage: Message = {
      id: loadingMessageId,
      content: "",
      timestamp: new Date(),
      role: "assistant",
      isLoading: true
    };
    
    setMessages(prev => [...prev, loadingMessage]);
    
    // Lưu trữ nội dung tin nhắn trước khi xóa input
    const messageContent = inputValue;
    
    // Clear the input using the ref
    if (chatInputRef.current) {
      chatInputRef.current.clearInput();
    }

    try {
      // If we don't have a chatId yet, create a new chat
      if (!chatId) {
        await createChat("New chat", {
          onSuccess: async (data) => {
            // Navigate to the new chat
            if (data && data.chatgpt_id) {
              navigate(`/chat/${data.chatgpt_id}`);
              // We'll send the message after navigation in the useEffect
            }
          }
        });
      } else {
        // Send the message to the API
        try {
          await sendInput(messageContent);
          
          // Update loading message with a temporary response
          setMessages(prev => prev.map(msg => 
            msg.id === loadingMessageId 
              ? { 
                  ...msg, 
                  content: "Processing your request...", 
                  isLoading: false 
                }
              : msg
          ));
          
          // Start polling for updates instead of a single refetch
          startPolling();
          
          // Initial fetch after a short delay
          setTimeout(() => {
            console.log("Initial response fetch");
            refetchChatResponse();
          }, 1000);
        } catch (error) {
          console.error("Error sending message:", error);
          
          // Update loading message to show error
          setMessages(prev => prev.map(msg => 
            msg.id === loadingMessageId 
              ? { 
                  ...msg, 
                  content: "Sorry, there was an error sending your message. Please try again.", 
                  isLoading: false 
                }
              : msg
          ));
        }
      }
    } catch (error) {
      console.error("Error handling message:", error);
      
      // Update loading message to show error
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessageId 
          ? { 
              ...msg, 
              content: "Sorry, there was an error processing your request. Please try again.", 
              isLoading: false 
            }
          : msg
      ));
    }
  }, [chatId, createChat, inputValue, isLoading, navigate, refetchChatResponse, sendInput, startPolling]);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground relative">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar className="hidden md:flex " />
      
      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Title */}
        {chatTitle && chatTitle !== "New chat" && (
          <div className="text-center py-2 border-b border-border">
            <h1 className="text-lg font-medium">{chatTitle}</h1>
          </div>
        )}
        
        {/* Messages */}
        <div className="flex-1 overflow-hidden p-4">
          {isLoadingChatResponse && messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <ChatMessages
                messages={messages}
                userAvatar={userAvatar}
                assistantAvatar={aiAvatar}
                className="mx-auto max-w-3xl"
                isDarkTheme={isDarkTheme}
              />
              
              {/* Polling indicator */}
              {isPollActive ? (
                <div className="text-sm text-muted-foreground mt-2 text-center animate-pulse">
                  Đang cập nhật phản hồi...
                </div>
              ) : latestResponseMayBeIncomplete && messages.length > 0 ? (
                <div className="flex justify-center mt-2">
                  <button 
                    onClick={forceExtendPolling}
                    className="text-sm flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                    title="Tiếp tục cập nhật phản hồi"
                  >
                    <RefreshCw size={14} />
                    <span>Cập nhật thêm phản hồi</span>
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>

        {/* Input - Using our new ChatInputDebounced component */}
        <div className="border-1 mb-2 border-border p-7 mx-auto w-full max-w-4xl rounded-lg bg-muted">
          <ChatInputDebounced
            ref={chatInputRef}
            onDebouncedChange={handleSetInputValue}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
            placeholder="Message ChatGPT..."
          />
        </div>
      </div>
    </div>
  );
}); 