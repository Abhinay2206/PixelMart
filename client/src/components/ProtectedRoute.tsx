import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Gamepad2, Zap } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-gaming-neon to-gaming-primary rounded-2xl flex items-center justify-center animate-glow">
              <Gamepad2 className="h-10 w-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-gaming-primary to-gaming-accent rounded-2xl opacity-50 animate-ping"></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Zap className="h-5 w-5 text-gaming-neon animate-pulse" />
              <span className="text-gaming-neon font-bold text-lg">Loading...</span>
              <Zap className="h-5 w-5 text-gaming-neon animate-pulse" />
            </div>
            <p className="text-gray-400 text-sm">Preparing your gaming experience</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
}
