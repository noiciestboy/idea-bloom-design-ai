import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Moon, Sun } from "lucide-react";

const Login = () => {
  const { t, language, setLanguage, languages } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (isAuthenticated && !isLoading) {
    navigate("/chat");
    return null;
  }

  const handleLogin = () => {
    setIsLoggingIn(true);
    login();
    setTimeout(() => {
      navigate("/chat");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/5 to-primary/5 transition-colors duration-300 bg-fixed">
      <header className="w-full p-4 flex justify-between items-center backdrop-blur-sm bg-background/40 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <span 
            className="text-2xl font-bold text-design-teal cursor-pointer" 
            onClick={() => navigate("/")}
          >
            {t("appName")}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage(lang.code)}
              >
                {lang.code.toUpperCase()}
              </Button>
            ))}
          </div>
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

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="glass-panel p-8 md:p-12 rounded-xl max-w-md w-full mx-auto shadow-lg animate-fadeIn hover-lift">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold">{t("login")}</h1>
            <p className="text-muted-foreground">{t("welcomeMessage")}</p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full flex items-center justify-center space-x-2 py-6"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span>
                {isLoggingIn ? 
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>{t("loginGoogle")}...</span>
                  </div> : 
                  t("loginGoogle")
                }
              </span>
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full p-4 text-center text-sm text-muted-foreground backdrop-blur-sm bg-background/40 border-t border-border/50">
        &copy; {new Date().getFullYear()} DesignMuse
      </footer>
    </div>
  );
};

export default Login;
