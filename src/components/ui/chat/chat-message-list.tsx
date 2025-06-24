import * as React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollToBottom?: boolean;
}

const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ className, scrollToBottom = false, children, ...props }, ref) => {
    const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (scrollToBottom && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      }
    }, [children, scrollToBottom]);

    return (
      <div
        ref={(node) => {
          // Assign the ref to both the forwardRef and the scrollContainerRef
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          scrollContainerRef.current = node;
        }}
        className={cn("flex flex-col gap-4 overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList }; 