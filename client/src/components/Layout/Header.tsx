
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Gamepad2, LogOut, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { state } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cartItemsCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-dark-900/90 shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b-2 border-gaming-neon/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-dark-900 to-dark-800 rounded-xl flex items-center justify-center border border-gaming-neon/30 neon-glow">
                <Gamepad2 className="h-7 w-7 text-gaming-neon group-hover:text-gaming-primary transition-all duration-300 drop-shadow-lg" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white group-hover:text-gaming-neon transition-all duration-300 tracking-tight gaming-text-shadow">
                PIXEL
              </span>
              <span className="text-sm font-bold text-gaming-primary -mt-1 tracking-widest">
                MART
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            <Link
              to="/products"
              className={`relative px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                isActive('/products')
                  ? 'text-gaming-neon bg-gradient-to-r from-dark-900 to-dark-800 shadow-lg border border-gaming-neon/50 gaming-text-shadow'
                  : 'text-white hover:text-gaming-neon hover:bg-dark-900/70 hover:shadow-lg hover:border hover:border-gaming-neon/30'
              }`}
            >
              <span className="relative z-10">Games</span>
              {isActive('/products') && (
                <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon/20 to-gaming-accent/20 rounded-lg animate-pulse"></div>
              )}
            </Link>
            {user?.isAdmin && (
              <Link
                to="/admin"
                className={`relative px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  isActive('/admin')
                    ? 'text-gaming-purple bg-gradient-to-r from-dark-900 to-dark-800 shadow-lg border border-gaming-purple/50 gaming-text-shadow'
                    : 'text-white hover:text-gaming-purple hover:bg-dark-900/70 hover:shadow-lg hover:border hover:border-gaming-purple/30'
                }`}
              >
                <Zap className="inline h-4 w-4 mr-2" />
                <span className="relative z-10">Admin</span>
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gaming-neon group-focus-within:text-gaming-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for your next adventure..."
                className="block w-full pl-12 pr-4 py-3 bg-dark-900/80 border border-gaming-neon/40 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gaming-neon/50 focus:border-gaming-neon/50 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gaming-neon/15 via-transparent to-gaming-primary/15 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-3 text-white hover:text-gaming-neon transition-all duration-300 transform hover:scale-110 group bg-dark-900/50 rounded-xl border border-gaming-neon/20 hover:border-gaming-neon/50"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gaming-primary to-gaming-accent text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg border border-white/20">
                  {cartItemsCount}
                </span>
              )}
              <div className="absolute inset-0 rounded-xl bg-gaming-neon/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3 bg-dark-900/50 px-4 py-2 rounded-lg border border-gaming-neon/20">
                  <div className="w-9 h-9 bg-gradient-to-r from-gaming-primary to-gaming-accent rounded-full flex items-center justify-center shadow-lg shadow-gaming-primary/20">
                    <span className="text-white font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-white hover:text-gaming-primary transition-all duration-300 transform hover:scale-110 bg-dark-900/70 border border-gaming-primary/30 rounded-lg hover:border-gaming-primary/50"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gaming-primary to-gaming-accent text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gaming-primary/40 border border-white/10"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:block">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}