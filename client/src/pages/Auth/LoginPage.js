import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError, googleLogin } from '../../redux/slices/authSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(login(formData));
    
    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await dispatch(googleLogin());
    
    if (googleLogin.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl w-full flex rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Left side - Image and brand */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-primary-600 to-purple-700 p-12 relative">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2" fill="white" />
                </pattern>
              </defs>
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#dots)" />
            </svg>
          </div>
          
          <div className="relative z-10 h-full flex flex-col">
            <Link to="/" className="flex items-center space-x-2 mb-12">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text">SS</span>
              </div>
              <span className="text-3xl font-bold text-white">SportSphere</span>
            </Link>
            
            <div className="flex-grow flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-white mb-6">Welcome Back!</h2>
              <p className="text-white/80 text-lg mb-8">Sign in to continue your sports journey. Track tournaments, join teams, and connect with athletes.</p>
              
              <div className="space-y-4">
                <div className="flex items-center text-white/80">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Access real-time tournament updates</span>
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Connect with athletes worldwide</span>
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Track your sports performance</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <p className="text-white/80 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-white font-medium hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 animate-slide-up">
          <div className="md:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SS</span>
              </div>
              <span className="text-2xl font-bold gradient-text">SportSphere</span>
            </Link>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 md:hidden">
            Welcome Back!
          </h2>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to your account
          </h3>
          <p className="text-gray-600 mb-8">
            Enter your credentials to access your account
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-danger-50 border-l-4 border-danger-500 text-danger-700 p-4 rounded-md flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input pl-10 py-3 border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg transition duration-150"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input pl-10 py-3 pr-10 border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg transition duration-150"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-gray-700 transition duration-150"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Keep me signed in
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" color="white" />
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : 'Sign in'}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" color="gray" />
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="ml-2">Sign in with Google</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600 md:hidden">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Create a new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
