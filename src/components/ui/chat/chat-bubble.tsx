import * as React from "react";
import { Copy, Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

const ChatBubbleVariants = cva(
  "group relative flex min-w-[100px] flex-col items-start justify-start gap-2 rounded-lg px-3 py-2 text-left",
  {
    variants: {
      variant: {
        sent: "",
        received: "",
      },
      layout: {
        default: "",
        ai: "top-0 w-full max-w-full rounded-none py-4 sm:top-16 xl:pl-52 2xl:pl-80",
      },
    },
    compoundVariants: [
      {
        variant: "sent",
        layout: "default",
        className: "bg-primary text-primary-foreground",
      },
      {
        variant: "received",
        layout: "default",
        className: "bg-secondary",
      },
    ],
    defaultVariants: {
      variant: "received",
      layout: "default",
    },
  }
);

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ChatBubbleVariants> {}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, layout, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(ChatBubbleVariants({ variant, layout, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

interface ChatBubbleMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  isDarkTheme?: boolean;
}

const ChatBubbleMessage = React.forwardRef<
  HTMLDivElement,
  ChatBubbleMessageProps
>(({ className, isLoading, isDarkTheme = true, children, ...props }, ref) => {
  // Get the current code style based on theme
  const codeStyle = isDarkTheme ? vscDarkPlus : vs;

  // Define Markdown components with proper TypeScript types and syntax highlighting
  const markdownComponents: Components = {
    code({ className, children, node, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const isInline = !match && (props as any).inline;
      
      if (isInline) {
        return (
          <code
            className={cn(
              "bg-muted px-1.5 py-0.5 rounded text-xs font-mono",
              className
            )}
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <div className="rounded-md overflow-hidden my-3">
          <SyntaxHighlighter
            language={language}
            style={codeStyle}
            customStyle={{
              margin: 0,
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              padding: '0.75rem'
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      );
    },
    // Add customizations for other markdown elements
    p({ children }) {
      return <p className="mb-2">{children}</p>;
    },
    ul({ children }) {
      return <ul className="list-disc pl-5 mb-2">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal pl-5 mb-2">{children}</ol>;
    },
    li({ children }) {
      return <li className="mb-1">{children}</li>;
    },
    h1({ children }) {
      return <h1 className="text-xl font-bold mb-2 mt-4">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>;
    },
    h3({ children }) {
      return <h3 className="text-base font-bold mb-1 mt-3">{children}</h3>;
    },
    blockquote({ children }) {
      return <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic">{children}</blockquote>;
    },
    a({ children, href }) {
      return <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>;
    }
  };

  return (
    <div
      ref={ref}
      className={cn("w-full text-sm", className)}
      {...props}
    >
      {isLoading ? <MessageLoading /> : (
        typeof children === 'string' ? (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={markdownComponents}
            >
              {children}
            </ReactMarkdown>
          </div>
        ) : children
      )}
    </div>
  );
});

ChatBubbleMessage.displayName = "ChatBubbleMessage";

interface ChatBubbleAvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
}

const ChatBubbleAvatar = ({
  src,
  fallback,
  className,
  ...props
}: ChatBubbleAvatarProps) => {
  return (
    <Avatar className={cn("h-8 w-8", className)} {...props}>
      {src && <AvatarImage src={src} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

interface ChatBubbleActionProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  
}

const ChatBubbleAction = ({
  icon = <Copy className="h-3.5 w-3.5" />,
  onClick,
  className,
}: ChatBubbleActionProps) => {
  return (
    <button
      className={cn(
        "absolute right-1 top-1 z-10 h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-muted p-1 opacity-0 transition-opacity hover:bg-muted/80 group-hover:opacity-100",
        className
      )}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

const MessageLoading = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 px-2">
      <div className="flex">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
      </div>
      <span className="text-xs text-muted-foreground">
        Generating response...
      </span>
    </div>
  );
};

export {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleAvatar,
  ChatBubbleAction,
}; 