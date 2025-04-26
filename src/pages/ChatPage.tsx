
import { useState } from "react";
import { Message, generateDesignImage } from "@/utils/aiService";
import { toast } from "sonner";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

const ChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input } as Message;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await generateDesignImage(input);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast.error("Failed to generate design. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleQuery = (query: string) => {
    setInput(query);
    handleSend();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-secondary/5 bg-fixed">
      <ChatSidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        onSampleQuery={handleSampleQuery}
      />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <ChatHeader onOpenSidebar={() => setSidebarOpen(true)} />
        
        <ChatMessages 
          messages={messages}
          isLoading={isLoading}
          onSampleQuery={handleSampleQuery}
        />

        <ChatInput 
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatPage;
