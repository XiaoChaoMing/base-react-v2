import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlusCircle, MessageSquare, Trash2, MoreVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useChatHistory } from "@/hooks/useChatHistory";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  const { 
    chatHistories, 
    isLoading, 
    deleteChat, 
    clearAllChats 
  } = useChatHistory();

  const handleCreateNewChat = async () => {
    try {

     
        navigate(`/`);
      
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleDeleteChat = (id: string) => {
    if (confirmDelete === id) {
      deleteChat(id);
      setConfirmDelete(null);
      setIsDeleting(null);
      
      // If we're deleting the current chat, navigate to the home page
      if (chatId === id) {
        navigate("/");
      }
    } else {
      setConfirmDelete(id);
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const handleClearAllChats = () => {
    if (window.confirm("Are you sure you want to clear all chats? This action cannot be undone.")) {
      clearAllChats();
      navigate("/");
    }
  };

  return (
    <div className={cn("w-[250px] border-r bg-background", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold tracking-tight">
              Lazy Chats
            </h2>
            <Button
              onClick={handleCreateNewChat}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="New Chat"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="sr-only">New Chat</span>
            </Button>
          </div>
          <div className="space-y-1">
            {isLoading ? (
              <div className="flex items-center px-3 py-2">
                <div className="w-full h-6 bg-muted animate-pulse rounded"></div>
              </div>
            ) : chatHistories && chatHistories.length > 0 ? (
              chatHistories.map((chat) => (
                <div
                  key={chat.chatgpt_id}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                    chatId === chat.chatgpt_id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  )}
                >
                  <Link
                    to={`/chat/${chat.chatgpt_id}`}
                    className="flex items-center gap-2 truncate flex-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="truncate">{chat.title || "New chat"}</span>
                  </Link>
                  {isDeleting === chat.chatgpt_id ? (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-6 w-6",
                          confirmDelete === chat.chatgpt_id && "text-destructive"
                        )}
                        onClick={() => handleDeleteChat(chat.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setIsDeleting(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100"
                      onClick={() => setIsDeleting(chat.chatgpt_id)}
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No chats yet. Create a new one!
              </div>
            )}
          </div>
          {chatHistories && chatHistories.length > 0 && (
            <Button
              onClick={handleClearAllChats}
              variant="ghost"
              size="sm"
              className="w-full mt-4 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear all chats
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 