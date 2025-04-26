
import { useNavigate } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "../components/ui/button";
import { Moon, Sun, Settings } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Index = () => {
  const { t, language, setLanguage, languages } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-design-teal">{t("appName")}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">{t("settings")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">{t("language")}</p>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setLanguage(lang.code)}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">{t("theme")}</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl w-full text-center space-y-8 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t("welcome")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {t("welcomeMessage")}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="glass-panel p-6 flex flex-col items-center">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                alt="Modern interior"
                className="rounded-lg w-full h-40 object-cover mb-4"  
              />
              <h3 className="text-lg font-semibold mb-2">Modern Minimalist</h3>
              <p className="text-sm text-muted-foreground">Clean lines, neutral colors, and functional furniture</p>
            </div>
            <div className="glass-panel p-6 flex flex-col items-center">
              <img 
                src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" 
                alt="Scandinavian interior"
                className="rounded-lg w-full h-40 object-cover mb-4"  
              />
              <h3 className="text-lg font-semibold mb-2">Scandinavian</h3>
              <p className="text-sm text-muted-foreground">Cozy, natural materials with light wood tones</p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/login")}
            size="lg"
            className="mt-8 bg-design-teal hover:bg-opacity-90 text-white font-semibold"
          >
            {t("getStarted")}
          </Button>
        </div>
      </main>

      <footer className="w-full p-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} DesignMuse
      </footer>
    </div>
  );
};

export default Index;
