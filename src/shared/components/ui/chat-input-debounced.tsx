import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Send, Loader2 } from "lucide-react";
import { ChatInput } from "./chat-input";

export interface ChatInputDebouncedProps {
  onDebouncedChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
  className?: string;
}

export interface ChatInputDebouncedRef {
  clearInput: () => void;
  setValue: (value: string) => void;
}

export const ChatInputDebounced = React.memo(
  forwardRef<ChatInputDebouncedRef, ChatInputDebouncedProps>(function ChatInputDebounced(
    {
      onDebouncedChange,
      onSubmit,
      isLoading,
      placeholder = "Message ChatGPT...",
      className
    },
    ref
  ) {
    const [localValue, setLocalValue] = useState("");
    
    // Expose methods to parent components
    useImperativeHandle(ref, () => ({
      clearInput: () => {
        setLocalValue("");
      },
      setValue: (value: string) => {
        setLocalValue(value);
      }
    }));

    // Apply debounce effect
    useEffect(() => {
      const timer = setTimeout(() => {
        onDebouncedChange(localValue);
      }, 500); // 500ms debounce delay

      return () => clearTimeout(timer);
    }, [localValue, onDebouncedChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isLoading) {
          e.preventDefault();
          onSubmit();
        }
      },
      [onSubmit, isLoading]
    );

    const handleChange = useCallback((value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalValue(typeof value === "string" ? value : value.target.value);
    }, []);

    return (
      <div className="flex items-center gap-2 w-full">
        <ChatInput
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={placeholder}
          className={`bg-transparent ${className || ""}`}
        />
        <button
          onClick={onSubmit}
          disabled={!localValue.trim() || isLoading}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
          <span className="sr-only">Send message</span>
        </button>
      </div>
    );
  })
);