import { useRef, useEffect } from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleAvatar,
  ChatBubbleAction
} from "./chat-bubble";

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  role: "user" | "assistant";
  isLoading?: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  userAvatar?: string;
  assistantAvatar?: string;
  onCopyMessage?: (content: string) => void;
  className?: string;
  scrollBehavior?: "auto" | "smooth";
  isDarkTheme?: boolean;
}

export function ChatMessages({
  messages,
  userAvatar = "https://images.freeimages.com/images/large-previews/971/basic-shape-avatar-1632968.jpg?fmt=webp&h=350",
  onCopyMessage = (content) => navigator.clipboard.writeText(content),
  className,
  scrollBehavior = "smooth",
  isDarkTheme = true,
}: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll to bottom that uses both scrollIntoView and scrollTop
  const scrollToBottom = () => {
    if (containerRef.current) {
      // Set timeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        if (containerRef.current) {
          // Method 1: Use scrollTop to scroll to the bottom
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          
          // Method 2: Use scrollIntoView as a backup
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
              behavior: scrollBehavior,
              block: 'end'
            });
          }
        }
      }, 10);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollBehavior]);

  // Also scroll on component mount
  useEffect(() => {
    scrollToBottom();
    
    // Add event listener for window resize to ensure proper scrolling
    const handleResize = () => scrollToBottom();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Empty state when no messages
  if (messages.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold">How can I help you today?</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ask me anything and I'll do my best to assist you!
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col gap-4 overflow-y-auto h-full pb-4 pt-4 scroll-smooth", 
        className
      )}
      style={{ 
        overflowAnchor: 'none',
      }}
    >
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={cn(
            "flex w-full", 
            message.role === "user" ? "justify-end" : "justify-start max-w-[100%]"
          )}
        >
          <ChatBubble
            variant={message.role === "user" ? "sent" : "received"}
            className={cn(
              "max-w-[80%] sm:max-w-[70%] items-end",
              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
            )}
          >
            {/* Only show avatar for AI messages on the left */}
            {message.role === "user" && (
              <ChatBubbleAvatar
                src={userAvatar}
                fallback="User"
              />
            )}
            
            <ChatBubbleMessage 
              isLoading={message.isLoading}
              isDarkTheme={isDarkTheme}
            >
              {message.content}
            </ChatBubbleMessage>
            
            <div className="mt-1 text-xs text-muted-foreground">
              {format(message.timestamp, "h:mm a")}
            </div>
            
            {!message.isLoading && (
              <ChatBubbleAction
                className={`${message.role === "user" ? "right-auto left-1 bg-transparent hover:bg-transparent" : "right-1"}`}
                onClick={() => onCopyMessage(message.content)}
              />
            )}
          </ChatBubble>
        </div>
      ))}
      <div ref={messagesEndRef} style={{ height: '1px', opacity: 0 }} />
    </div>
  );
} 