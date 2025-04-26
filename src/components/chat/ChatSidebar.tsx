
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Moon, Sun } from "lucide-react";
import { toast } from "sonner";

interface ChatSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSampleQuery: (query: string) => void;
}

const ChatSidebar = ({ open, onOpenChange, onSampleQuery }: ChatSidebarProps) => {
  const { t, language, setLanguage, languages } = useI18n();
  const { theme, toggleTheme } = useTheme();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[340px] p-0 border-r-0 bg-background/95 backdrop-blur-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t("appName")}
            </h2>
            <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <Button
              variant="outline"
              className="w-full justify-start mb-4 hover-lift bg-background/80 backdrop-blur-sm"
              onClick={() => {
                toast.success("Started a new chat");
              }}
            >
              {t("newChat")}
            </Button>

            <div className="space-y-2 mt-6">
              <h3 className="text-sm font-medium">{t("sampleQueries")}</h3>
              <div className="space-y-2">
                {[t("sampleQuery1"), t("sampleQuery2"), t("sampleQuery3")].map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left whitespace-normal h-auto hover:bg-primary/5 transition-all duration-200"
                    onClick={() => onSampleQuery(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t bg-gradient-to-r from-transparent to-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "ghost"}
                    size="sm"
                    className={`w-8 h-8 p-0 ${
                      language === lang.code
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary/80"
                    }`}
                    onClick={() => setLanguage(lang.code)}
                  >
                    {lang.code.toUpperCase()}
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 rounded-full hover:bg-secondary/80"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSidebar;
