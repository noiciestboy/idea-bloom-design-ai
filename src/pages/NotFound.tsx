
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "../contexts/I18nContext";
import { Button } from "../components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/5 transition-colors duration-300 bg-fixed">
      <div className="glass-panel p-8 rounded-xl text-center animate-fadeIn hover-lift">
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{t("404")}</h1>
        <p className="text-xl text-muted-foreground mb-6">{t("notFound")}</p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-opacity-90 text-primary-foreground hover-lift"
        >
          {t("backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
