
import { useRef, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/ChatMessage";
import { Message } from "@/utils/aiService";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onSampleQuery: (query: string) => void;
}

const ChatMessages = ({ messages, isLoading, onSampleQuery }: ChatMessagesProps) => {
  const { t } = useI18n();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 animate-fade-in">
            <div className="text-center space-y-4 max-w-md glass-panel p-8 hover-lift">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {t("welcome")}
              </h2>
              <p className="text-muted-foreground">{t("welcomeMessage")}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[t("sampleQuery1"), t("sampleQuery2")].map((query, index) => (
                  <div 
                    key={index}
                    className="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-secondary/50 hover-lift glass-panel"
                    onClick={() => onSampleQuery(query)}
                  >
                    <p>{query}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, i) => (
            <div key={i} className="message-animate-in" style={{animationDelay: `${i * 0.1}s`}}>
              <ChatMessage message={message} t={t} />
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-center space-x-2 bg-secondary/50 p-4 rounded-lg animate-pulse glass-panel">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>{t("typing")}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </main>
  );
};

export default ChatMessages;
