import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { token, initialized, loading, initAuth } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initAuth();
    }
  }, [initialized, initAuth]);

  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-brand-700">
        Загрузка...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
