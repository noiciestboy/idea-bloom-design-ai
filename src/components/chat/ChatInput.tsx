
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

const ChatInput = ({ input, isLoading, onInputChange, onSend }: ChatInputProps) => {
  const { t } = useI18n();

  return (
    <footer className="border-t p-4 bg-background/70 backdrop-blur-md transition-all duration-300">
      <div className="max-w-4xl mx-auto flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={t("placeholder")}
          className="flex-1 bg-background/80 border-secondary focus-visible:ring-primary transition-all duration-300"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <Button
          onClick={onSend}
          disabled={isLoading || !input.trim()}
          size="icon"
          className="rounded-full bg-primary hover:bg-primary/90 hover-lift transition-all duration-300"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">{t("send")}</span>
        </Button>
      </div>
    </footer>
  );
};

export default ChatInput;
