import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../Theme/ThemeToggle';
import { 
  FaHome, 
  FaTrophy, 
  FaDumbbell, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaBell,
  FaGamepad,
  FaNewspaper,
  FaFootballBall,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt
} from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FaHome, protected: true },
    { name: 'Matches', path: '/matches', icon: FaFootballBall, protected: false },
    { name: 'Tournaments', path: '/tournaments', icon: FaTrophy, protected: false },
    { name: 'Posts', path: '/posts', icon: FaNewspaper, protected: false },
    { name: 'Fitness', path: '/fitness', icon: FaDumbbell, protected: false },
  ];

  const isActivePath = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowProfileMenu(false);
  };

  // Filter nav items based on authentication status
  const visibleNavItems = navItems.filter(item => !item.protected || isAuthenticated);

  return (
    <>
      {/* Glassmorphism Navbar */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${isScrolled 
          ? isDark
            ? 'bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-700/50'
            : 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20'
          : isDark
            ? 'bg-gradient-to-r from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm'
            : 'bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm'
        }
      `}>
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`
            absolute -top-4 -left-4 w-24 h-24 rounded-full transition-all duration-1000
            ${isScrolled 
              ? isDark ? 'bg-cyan-400/10' : 'bg-blue-200/20'
              : 'bg-white/10'
            }
            animate-pulse
          `} />
          <div className={`
            absolute -top-2 right-20 w-16 h-16 rounded-full transition-all duration-1000 delay-300
            ${isScrolled 
              ? isDark ? 'bg-purple-400/10' : 'bg-purple-200/20'
              : 'bg-white/10'
            }
            animate-bounce
          `} />
          <div className={`
            absolute top-8 right-8 w-8 h-8 rounded-full transition-all duration-1000 delay-500
            ${isScrolled 
              ? isDark ? 'bg-pink-400/10' : 'bg-pink-200/20'
              : 'bg-white/10'
            }
            animate-ping
          `} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo with animated elements */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <FaTrophy className="text-white text-lg" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10" />
              </div>
              <div className="flex flex-col">
                <span className={`
                  text-xl font-bold transition-all duration-300
                  ${isScrolled 
                    ? isDark 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                    : 'text-white'
                  }
                `}>
                  SportSphere
                </span>
                <span className={`
                  text-xs font-medium opacity-75 transition-all duration-300
                  ${isScrolled 
                    ? isDark ? 'text-gray-400' : 'text-gray-500'
                    : 'text-white/80'
                  }
                `}>
                  Elite Sports Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {visibleNavItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative group"
                    onMouseEnter={() => setActiveHover(index)}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    <div className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : isScrolled 
                          ? isDark
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                          : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }
                      transform hover:scale-105
                    `}>
                      <Icon className={`
                        text-sm transition-all duration-300
                        ${activeHover === index ? 'animate-bounce' : ''}
                      `} />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full animate-pulse" />
                    )}
                    
                    {/* Hover glow effect */}
                    <div className={`
                      absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-600/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm
                    `} />
                  </Link>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Notifications - only show when authenticated */}
              {isAuthenticated && (
                <button className={`
                  relative p-2 rounded-xl transition-all duration-300 transform hover:scale-110
                  ${isScrolled 
                    ? isDark
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }
                `}>
                  <FaBell className="text-lg" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </button>
              )}

              {/* Theme Toggle */}
              <ThemeToggle variant="dropdown" />

              {/* Authentication Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`
                      flex items-center space-x-2 p-2 rounded-xl transition-all duration-300 transform hover:scale-110
                      ${isScrolled 
                        ? isDark
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.firstName || 'User'} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                    <span className="hidden sm:block text-sm font-medium">
                      {user?.firstName || 'Profile'}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className={`
                      absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50
                      ${isDark 
                        ? 'bg-gray-800 border border-gray-700' 
                        : 'bg-white border border-gray-200'
                      }
                    `}>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className={`
                            block px-4 py-2 text-sm transition-colors duration-200
                            ${isDark 
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                          `}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <FaUser className="inline mr-2" />
                          My Profile
                        </Link>
                        <Link
                          to="/settings"
                          className={`
                            block px-4 py-2 text-sm transition-colors duration-200
                            ${isDark 
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                            }
                          `}
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Settings
                        </Link>
                        <hr className={`my-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                        <button
                          onClick={handleLogout}
                          className={`
                            block w-full text-left px-4 py-2 text-sm transition-colors duration-200
                            ${isDark 
                              ? 'text-red-400 hover:bg-gray-700 hover:text-red-300' 
                              : 'text-red-600 hover:bg-gray-100'
                            }
                          `}
                        >
                          <FaSignOutAlt className="inline mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105
                      ${isScrolled 
                        ? isDark
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                      }
                    `}
                  >
                    <FaSignInAlt className="text-sm" />
                    <span className="hidden sm:block text-sm font-medium">Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105
                      bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl
                    `}
                  >
                    <FaUserPlus className="text-sm" />
                    <span className="hidden sm:block text-sm font-medium">Sign Up</span>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                className={`
                  md:hidden p-2 rounded-xl transition-all duration-300
                  ${isScrolled 
                    ? isDark
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                  }
                `}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden transition-all duration-300 ease-out overflow-hidden
          ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          ${isDark 
            ? 'bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/50'
            : 'bg-white/95 backdrop-blur-xl border-t border-white/20'
          }
        `}>
          <div className="px-4 py-4 space-y-2">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : isDark
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }
                    transform hover:translate-x-2
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile Auth Links */}
            {!isAuthenticated && (
              <>
                <hr className={`my-2 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                <Link
                  to="/login"
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isDark
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-cyan-400'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                    }
                    transform hover:translate-x-2
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaSignInAlt className="text-lg" />
                  <span className="font-medium">Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform hover:translate-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUserPlus className="text-lg" />
                  <span className="font-medium">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
