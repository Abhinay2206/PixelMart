import { Gamepad2, Mail, Phone, Zap, Trophy, Users, Star } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gaming-neon/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gaming-primary/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gaming-gold/20 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-dark-900/70 backdrop-blur-md rounded-2xl border-2 border-gaming-neon/30 mt-8 mb-8 shadow-xl gaming-card-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-dark-900 to-dark-800 rounded-xl flex items-center justify-center border border-gaming-neon/50 neon-glow">
                  <Gamepad2 className="h-7 w-7 text-gaming-neon animate-glow" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white gaming-text-shadow">PIXEL</span>
                <span className="text-sm font-bold text-gaming-primary -mt-1 tracking-widest">MART</span>
              </div>
            </div>
            <p className="text-white leading-relaxed bg-dark-900/50 p-3 rounded-lg border-l-4 border-gaming-neon/50">
              Your ultimate gaming destination. Discover legendary adventures, join elite communities, and experience gaming like never before.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gaming-neon/30 rounded-lg border border-gaming-neon/30">
                  <Mail className="h-4 w-4 text-gaming-neon" />
                </div>
                <span className="text-sm text-white">support@pixelmart.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gaming-primary/30 rounded-lg border border-gaming-primary/30">
                  <Phone className="h-4 w-4 text-gaming-primary" />
                </div>
                <span className="text-sm text-white">+1 (555) GAMING</span>
              </div>
            </div>
          </div>

          {/* Gaming Categories */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center bg-dark-900/50 px-3 py-2 rounded-lg border-l-4 border-gaming-accent">
              <Zap className="h-5 w-5 text-gaming-accent mr-2" />
              Game Arsenal
            </h3>
            <ul className="space-y-3 pl-2">
              <li><a href="/products" className="text-sm text-white hover:text-gaming-neon transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">🎮 All Games</a></li>
              <li><a href="/products?category=RPG" className="text-sm text-white hover:text-gaming-primary transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">⚔️ RPG Adventures</a></li>
              <li><a href="/products?category=FPS" className="text-sm text-white hover:text-gaming-accent transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">🔫 FPS Battles</a></li>
              <li><a href="/products?category=Sports" className="text-sm text-white hover:text-gaming-secondary transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">🏆 Sports Arena</a></li>
              <li><a href="/products?category=Racing" className="text-sm text-white hover:text-gaming-gold transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">🏎️ Racing Legends</a></li>
            </ul>
          </div>

          {/* Player Support */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center bg-dark-900/50 px-3 py-2 rounded-lg border-l-4 border-gaming-primary">
              <Users className="h-5 w-5 text-gaming-primary mr-2" />
              Player Hub
            </h3>
            <ul className="space-y-3 pl-2">
              <li><a href="#" className="text-sm text-white hover:text-gaming-neon transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">💬 Support Center</a></li>
              <li><a href="#" className="text-sm text-white hover:text-gaming-primary transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">🎫 Contact Squad</a></li>
              <li><a href="#" className="text-sm text-white hover:text-gaming-accent transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">↩️ Returns & Refunds</a></li>
              <li><a href="#" className="text-sm text-white hover:text-gaming-secondary transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">📦 Delivery Info</a></li>
              <li><a href="#" className="text-sm text-white hover:text-gaming-gold transition-colors duration-300 hover:translate-x-1 transform inline-block hover:pl-2">❓ Gaming FAQ</a></li>
            </ul>
          </div>

          {/* Gaming Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center bg-dark-900/50 px-3 py-2 rounded-lg border-l-4 border-gaming-gold">
              <Trophy className="h-5 w-5 text-gaming-gold mr-2" />
              Elite Updates
            </h3>
            <p className="text-sm mb-6 text-white bg-dark-900/50 p-3 rounded-lg">
              Join the elite. Get legendary releases, secret deals, and exclusive gaming intel.
            </p>
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your gamer email"
                  className="flex-1 px-4 py-3 bg-dark-900/70 border border-gaming-neon/40 rounded-l-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gaming-neon/50 focus:border-gaming-neon/50 transition-all duration-300 backdrop-blur-sm"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-gaming-neon to-gaming-accent hover:from-gaming-accent hover:to-gaming-neon text-dark-900 font-bold rounded-r-xl transition-all duration-300 transform hover:scale-105 border border-white/10">
                  JOIN
                </button>
              </div>
              
              {/* Gaming Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gaming-neon/30">
                <div className="text-center bg-dark-900/50 p-2 rounded-lg">
                  <div className="text-lg font-black text-gaming-gold">50K+</div>
                  <div className="text-xs text-white">Elite Gamers</div>
                </div>
                <div className="text-center bg-dark-900/50 p-2 rounded-lg">
                  <div className="text-lg font-black text-gaming-neon">1000+</div>
                  <div className="text-xs text-white">Epic Games</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gaming Social & Legal */}
        <div className="border-t border-gaming-neon/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-white bg-dark-900/50 px-4 py-2 rounded-lg border border-gaming-neon/20">© 2024 PixelMart Gaming Empire. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-white bg-dark-900/50 px-4 py-2 rounded-lg border border-gaming-neon/20">
                <Star className="h-4 w-4 text-gaming-gold" />
                <span>🔒 Secure Gaming</span>
                <span>✓ Money Back Guarantee</span>
                <span>⚡ Instant Download</span>
              </div>
            </div>
          </div>
          
          {/* Gaming Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gaming-neon/30">
            <div className="flex items-center space-x-2 text-xs text-white bg-dark-900/70 px-3 py-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-gaming-neon to-gaming-accent rounded-lg flex items-center justify-center border border-white/10">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <span>Award Winning Platform</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-white bg-dark-900/70 px-3 py-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-gaming-primary to-gaming-gold rounded-lg flex items-center justify-center border border-white/10">
                <Users className="h-4 w-4 text-white" />
              </div>
              <span>Gaming Community</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-white bg-dark-900/70 px-3 py-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-gaming-secondary to-gaming-neon rounded-lg flex items-center justify-center border border-white/10">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span>Lightning Fast</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}