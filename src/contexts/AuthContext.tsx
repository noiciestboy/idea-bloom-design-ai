
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { useI18n } from "./I18nContext";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Google authentication functionality
// In a real app, you would implement actual Google OAuth
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useI18n();

  // Initialize auth state
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("user");
      }
    }
    
    setIsLoading(false);
  }, []);

  // Mock Google login
  const login = () => {
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      const mockUser: AuthUser = {
        id: "user123",
        name: "Demo User",
        email: "user@example.com",
        picture: "https://ui-avatars.com/api/?name=Demo+User&background=2A9D8F&color=fff",
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setIsLoading(false);
      toast.success(t("loginSuccess"));
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success(t("logoutSuccess"));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
