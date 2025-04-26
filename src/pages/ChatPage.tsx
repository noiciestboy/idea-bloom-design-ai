
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { 
  Send, 
  UserRound, 
  Moon, 
  Sun, 
  Menu,
  Settings,
  LogOut,
  RefreshCw,
  Save,
  Share
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import ChatMessage from "../components/ChatMessage";
import { Message, generateDesignImage } from "../utils/aiService";

const ChatPage = () => {
  const { t, language, setLanguage, languages } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input } as Message;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Generate AI response with image
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
    <div className="flex h-screen overflow-hidden bg-background">
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] sm:w-[340px] p-0 border-r-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-transparent">
              <h2 className="text-lg font-semibold text-design-teal">{t("appName")}</h2>
              <p className="text-sm text-muted-foreground">{t("tagline")}</p>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <Button
                variant="outline"
                className="w-full justify-start mb-4 hover-lift bg-background/80 backdrop-blur-sm"
                onClick={() => {
                  setMessages([]);
                  toast.success("Started a new chat");
                }}
              >
                {t("newChat")}
              </Button>

              <div className="space-y-2 mt-6">
                <h3 className="text-sm font-medium">{t("sampleQueries")}</h3>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left whitespace-normal h-auto hover:bg-primary/5 transition-all duration-200"
                    onClick={() => handleSampleQuery(t("sampleQuery1"))}
                  >
                    {t("sampleQuery1")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left whitespace-normal h-auto hover:bg-primary/5 transition-all duration-200"
                    onClick={() => handleSampleQuery(t("sampleQuery2"))}
                  >
                    {t("sampleQuery2")}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left whitespace-normal h-auto hover:bg-primary/5 transition-all duration-200"
                    onClick={() => handleSampleQuery(t("sampleQuery3"))}
                  >
                    {t("sampleQuery3")}
                  </Button>
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
                      className={`w-8 h-8 p-0 ${language === lang.code ? "bg-primary text-primary-foreground" : "hover:bg-secondary/80"}`}
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

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="border-b p-4 bg-background/70 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSidebarOpen(true)}
                className="rounded-full hover:bg-secondary/80"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open sidebar</span>
              </Button>
              <h1 className="text-lg font-semibold ml-2 bg-gradient-to-r from-design-teal to-primary bg-clip-text text-transparent">{t("appName")}</h1>
            </div>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/80">
                    <Avatar className="h-8 w-8 ring-2 ring-background">
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback>
                        <UserRound className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 backdrop-blur-md bg-background/95">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                    {theme === "light" ? (
                      <Moon className="h-4 w-4 mr-2" />
                    ) : (
                      <Sun className="h-4 w-4 mr-2" />
                    )}
                    {t(theme === "light" ? "dark" : "light")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    {t("settings")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }} 
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 animate-fadeIn">
                <div className="text-center space-y-4 max-w-md glass-panel p-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-design-teal to-primary bg-clip-text text-transparent">{t("welcome")}</h2>
                  <p className="text-muted-foreground">{t("welcomeMessage")}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div 
                      className="border rounded-lg p-4 cursor-pointer hover:bg-secondary/50 transition-colors hover-lift bg-background/50 backdrop-blur-sm"
                      onClick={() => handleSampleQuery(t("sampleQuery1"))}
                    >
                      <p>{t("sampleQuery1")}</p>
                    </div>
                    <div 
                      className="border rounded-lg p-4 cursor-pointer hover:bg-secondary/50 transition-colors hover-lift bg-background/50 backdrop-blur-sm"
                      onClick={() => handleSampleQuery(t("sampleQuery2"))}
                    >
                      <p>{t("sampleQuery2")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message, i) => (
                <div key={i} className="message-animate-in" style={{animationDelay: `${i * 0.1}s`}}>
                  <ChatMessage 
                    message={message} 
                    t={t} 
                  />
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

        <footer className="border-t p-4 bg-background/70 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 bg-background/80 border-secondary focus-visible:ring-primary"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 hover-lift"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">{t("send")}</span>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatPage;
