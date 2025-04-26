
import { RefreshCw, Save, Share } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Message } from "../utils/aiService";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface ChatMessageProps {
  message: Message;
  t: (key: string) => string;
}

const ChatMessage = ({ message, t }: ChatMessageProps) => {
  const { user } = useAuth();
  const isUser = message.role === "user";
  const isAI = message.role === "assistant";

  const saveImage = () => {
    // In a real app, you would implement actual save functionality
    toast.success("Design saved to your collection");
  };

  const shareImage = () => {
    // In a real app, you would implement actual share functionality
    toast.success("Share link copied to clipboard");
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[85%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-start space-x-2 ${isUser ? "space-x-reverse" : ""}`}
      >
        <Avatar className={`h-8 w-8 mt-1 ${isUser ? 'ring-2 ring-primary/20' : ''}`}>
          {isUser ? (
            <>
              <AvatarImage src={user?.picture} />
              <AvatarFallback>U</AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-design-teal text-white">AI</AvatarFallback>
            </>
          )}
        </Avatar>

        <div
          className={`space-y-2 ${
            isUser
              ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
              : "glass-panel bg-secondary/50"
          } p-4 rounded-2xl ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"} shadow-sm`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {message.imageUrl && (
            <div className="mt-3 space-y-3">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={message.imageUrl}
                  alt="Generated interior design"
                  className="w-full h-auto object-cover rounded-lg hover:scale-[1.01] transition-transform duration-300"
                />
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={saveImage} className="bg-background/50 backdrop-blur-sm hover:bg-background/80 hover-lift">
                  <Save className="h-4 w-4 mr-1" />
                  {t("save")}
                </Button>
                <Button size="sm" variant="outline" onClick={shareImage} className="bg-background/50 backdrop-blur-sm hover:bg-background/80 hover-lift">
                  <Share className="h-4 w-4 mr-1" />
                  {t("share")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
