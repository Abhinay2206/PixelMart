import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, Trophy, Gamepad2, Download, Users } from 'lucide-react';

export default function HomePage() {
  const featuredGames = [
    {
      id: '1',
      title: 'Cyberpunk 2077',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$59.99',
      originalPrice: '$69.99',
      rating: 4.5,
      category: 'RPG'
    },
    {
      id: '2',
      title: 'The Witcher 3',
      image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$39.99',
      originalPrice: '$49.99',
      rating: 4.8,
      category: 'RPG'
    },
    {
      id: '4',
      title: 'Elden Ring',
      image: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '$59.99',
      originalPrice: '$69.99',
      rating: 4.9,
      category: 'Action'
    },
  ];

  return (
    <div className="min-h-screen bg-cyber-gradient text-white">
      {/* Hero Section */}
      <section className="relative bg-dark-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gaming-neon/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gaming-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gaming-accent/30 rounded-full blur-2xl animate-float"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-gaming-primary to-gaming-accent rounded-xl flex items-center justify-center animate-glow">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-gaming-neon font-bold text-lg tracking-wider">PIXELMART</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gaming-neon via-gaming-accent to-gaming-primary bg-clip-text text-transparent animate-gradient drop-shadow-lg">
                  LEVEL UP
                </span>
                <br />
                <span className="text-white gaming-text-shadow">YOUR GAME</span>
              </h1>
              
              <p className="text-xl text-white mb-8 leading-relaxed max-w-lg font-medium shadow-text bg-dark-900/70 backdrop-blur-sm p-4 rounded-xl border-l-4 border-gaming-neon">
                Discover the universe of gaming with our premium collection. From indie masterpieces to AAA blockbusters, embark on legendary adventures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/products"
                  className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-gaming-primary to-gaming-accent text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gaming-primary/50 overflow-hidden border border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gaming-accent to-gaming-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    <Zap className="mr-3 h-6 w-6" />
                    SHOP NOW
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <button className="group relative inline-flex items-center px-8 py-4 border-2 border-gaming-neon text-gaming-neon hover:bg-gaming-neon hover:text-dark-900 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden shadow-lg shadow-gaming-neon/20">
                  <div className="absolute inset-0 bg-gaming-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    <Trophy className="mr-3 h-6 w-6" />
                    WATCH TRAILER
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gaming-neon/30 mt-8 bg-dark-900/80 backdrop-blur-sm p-4 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-black text-gaming-gold drop-shadow-lg gaming-text-shadow">1000+</div>
                  <div className="text-white text-sm font-medium">Games</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gaming-neon drop-shadow-lg gaming-text-shadow">50k+</div>
                  <div className="text-white text-sm font-medium">Gamers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-gaming-primary drop-shadow-lg gaming-text-shadow">4.9★</div>
                  <div className="text-white text-sm font-medium">Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative lg:ml-16">
              <div className="relative">
                {/* Gaming Setup Image with Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon/30 to-gaming-primary/30 rounded-3xl blur-2xl animate-pulse-slow"></div>
                <img
                  src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Gaming Setup"
                  className="relative rounded-3xl shadow-2xl w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-700 border-2 border-gaming-neon/30"
                />
                
                {/* Floating Game Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-gaming-accent to-gaming-secondary rounded-2xl flex items-center justify-center shadow-2xl animate-float neon-glow">
                  <Gamepad2 className="h-10 w-10 text-white" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-gaming-primary to-gaming-gold rounded-xl flex items-center justify-center shadow-2xl animate-float neon-glow" style={{animationDelay: '1s'}}>
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon/10 via-transparent to-gaming-primary/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-dark-900/80 backdrop-blur-sm px-8 py-6 rounded-xl border border-gaming-neon/50 mb-6 shadow-xl">
              <h2 className="text-4xl font-black text-white mb-2">
                <span className="bg-gradient-to-r from-gaming-neon to-gaming-accent bg-clip-text text-transparent drop-shadow-lg">
                  WHY CHOOSE PIXELMART?
                </span>
              </h2>
              <p className="text-gray-200 text-lg max-w-2xl mx-auto font-medium">
                Experience gaming like never before with our premium service and unmatched quality
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-dark-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-gaming-neon/50 transition-all duration-500 transform hover:scale-105 border border-gaming-neon/50 gaming-card-border">
              <div className="absolute inset-0 bg-gradient-to-br from-gaming-neon/20 via-transparent to-gaming-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gaming-neon to-gaming-accent rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gaming-neon/40">
                  <Download className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gaming-neon transition-colors">Instant Download</h3>
                <p className="text-gray-200 leading-relaxed font-medium">Get your games instantly after purchase. No waiting, just pure gaming excitement.</p>
              </div>
            </div>
            
            <div className="group relative bg-dark-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-gaming-primary/50 transition-all duration-500 transform hover:scale-105 border border-gaming-primary/50 gaming-card-border">
              <div className="absolute inset-0 bg-gradient-to-br from-gaming-primary/20 via-transparent to-gaming-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gaming-primary to-gaming-accent rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gaming-primary/40">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gaming-primary transition-colors">Secure Gaming</h3>
                <p className="text-gray-200 leading-relaxed font-medium">Your transactions are protected with military-grade security protocols.</p>
              </div>
            </div>
            
            <div className="group relative bg-dark-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-gaming-gold/50 transition-all duration-500 transform hover:scale-105 border border-gaming-gold/50 gaming-card-border">
              <div className="absolute inset-0 bg-gradient-to-br from-gaming-gold/20 via-transparent to-gaming-neon/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gaming-gold to-yellow-400 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gaming-gold/40">
                  <Star className="h-8 w-8 text-dark-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gaming-gold transition-colors">Best Prices</h3>
                <p className="text-gray-200 leading-relaxed font-medium">Guaranteed competitive prices with exclusive deals for our gaming community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20 bg-dark-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gaming-primary/5 via-transparent to-gaming-neon/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-gaming-gold to-gaming-primary bg-clip-text text-transparent drop-shadow-md">
                  FEATURED GAMES
                </span>
              </h2>
              <p className="text-gray-200 text-lg font-medium shadow-text">Handpicked adventures with exclusive offers</p>
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center text-gaming-neon hover:text-gaming-primary font-bold text-lg transition-colors bg-dark-900/80 px-6 py-3 rounded-xl border-2 border-gaming-neon/50 hover:border-gaming-primary/50 shadow-lg shadow-gaming-neon/20"
            >
              View All Arsenal
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <div key={game.id} className="group relative bg-dark-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-gaming-neon/60 transition-all duration-500 transform hover:scale-105 border-2 border-gaming-neon/40 gaming-card-border">
                <div className="absolute inset-0 bg-gradient-to-br from-gaming-neon/20 via-transparent to-gaming-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gaming-primary to-gaming-accent text-white shadow-lg">
                      🔥 HOT DEAL
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-dark-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gaming-gold/50 shadow-lg shadow-gaming-gold/20">
                      <Star className="h-4 w-4 text-gaming-gold fill-current" />
                      <span className="text-white text-xs font-bold">{game.rating}</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent"></div>
                </div>
                
                <div className="relative p-6 bg-dark-900/90 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-gradient-to-r from-gaming-accent to-gaming-secondary text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                      {game.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gaming-neon transition-colors">{game.title}</h3>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-black text-gaming-gold drop-shadow-md gaming-text-shadow">{game.price}</span>
                      <span className="text-lg text-gray-400 line-through">{game.originalPrice}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-gaming-primary to-gaming-accent hover:from-gaming-accent hover:to-gaming-primary text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gaming-primary/50 border border-white/20">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-b from-dark-800 to-dark-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gaming-neon/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gaming-primary/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-dark-900/70 backdrop-blur-sm py-12 rounded-3xl border-2 border-gaming-neon/40 gaming-card-border shadow-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gaming-neon to-gaming-primary rounded-2xl mb-8 animate-glow shadow-lg shadow-gaming-neon/30">
            <Users className="h-10 w-10 text-white" />
          </div>
          
          <h2 className="text-4xl font-black mb-6">
            <span className="bg-gradient-to-r from-gaming-neon to-gaming-gold bg-clip-text text-transparent drop-shadow-lg">
              JOIN THE ELITE
            </span>
          </h2>
          <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto font-medium shadow-text">
            Get notified about legendary releases, exclusive deals, and epic gaming news before anyone else.
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your gamer tag email"
              className="flex-1 px-6 py-4 bg-dark-900/80 border-2 border-gaming-neon/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gaming-neon focus:border-gaming-neon transition-all duration-300 backdrop-blur-sm shadow-lg"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-gaming-neon to-gaming-accent hover:from-gaming-accent hover:to-gaming-neon text-dark-900 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gaming-neon/50 border border-white/20">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}