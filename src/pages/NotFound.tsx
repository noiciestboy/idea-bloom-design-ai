
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-6 animate-fadeIn">
        <h1 className="text-7xl font-bold mb-4 text-design-teal">404</h1>
        <p className="text-xl text-muted-foreground mb-6">{t("notFound")}</p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-design-teal hover:bg-opacity-90 text-white"
        >
          {t("backToHome")}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
