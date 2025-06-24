import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "../textarea";

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Memoized ChatInput component to prevent unnecessary rerenders
const ChatInput = React.memo(
  React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
    ({ className, ...props }, ref) => {
      return (
        <div className="relative flex w-full items-center">
          <Textarea
            ref={ref}
            rows={1}
            placeholder="Write a message..."
            className={cn(
              "min-h-10 resize-none bg-background py-3 pr-12 scrollbar-thin scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-800",
              className
            )}
            {...props}
          />
        </div>
      );
    }
  )
);

ChatInput.displayName = "ChatInput";

export { ChatInput }; 