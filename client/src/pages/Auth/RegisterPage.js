import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../redux/slices/authSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { validatePassword } from '../../utils/helpers';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
  fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'player',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({});

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'password') {
      setPasswordValidation(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[RegisterPage] Form submit:', formData);
    if (formData.password !== formData.confirmPassword) {
      console.warn('[RegisterPage] Passwords do not match');
      return;
    }
    if (!formData.acceptTerms) {
      console.warn('[RegisterPage] Terms not accepted');
      return;
    }
    try {
      const result = await dispatch(register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }));
      console.log('[RegisterPage] Register result:', result);
      if (register.fulfilled.match(result)) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('[RegisterPage] Register error:', err);
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
              <h2 className="text-4xl font-bold text-white mb-6">Join the Community</h2>
              <p className="text-white/80 text-lg mb-8">Create an account to get access to tournaments, teams, and connect with athletes across the globe.</p>
              
              <div className="space-y-4">
                <div className="flex items-center text-white/80">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Organize and join tournaments</span>
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Create and manage teams</span>
                </div>
                <div className="flex items-center text-white/80">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Access exclusive sports content</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <p className="text-white/80 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-white font-medium hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side - Registration form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 overflow-y-auto max-h-screen animate-slide-up">
          <div className="md:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SS</span>
              </div>
              <span className="text-2xl font-bold gradient-text">SportSphere</span>
            </Link>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 md:hidden">
            Join the Community
          </h2>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Create your account
          </h3>
          <p className="text-gray-600 mb-6">
            Fill in your details to get started
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-danger-50 border-l-4 border-danger-500 text-danger-700 p-4 rounded-md flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="input pl-10 py-3 border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

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
                    className="input pl-10 py-3 border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I am a
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input pl-10 py-3 border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg"
                  >
                    <option value="player">Player</option>
                    <option value="organizer">Tournament Organizer</option>
                    <option value="fan">Sports Fan</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
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
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input pl-10 py-3 pr-10 border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg"
                    placeholder="Create a password"
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
                
                {formData.password && (
                  <div className="mt-3 text-xs grid grid-cols-2 gap-2">
                    <div className={`flex items-center ${passwordValidation.criteria?.minLength ? 'text-success-600' : 'text-gray-500'}`}>
                      <span className={`w-5 h-5 mr-1 rounded-full flex items-center justify-center ${passwordValidation.criteria?.minLength ? 'bg-success-100' : 'bg-gray-100'}`}>
                        {passwordValidation.criteria?.minLength ? '✓' : '○'}
                      </span>
                      At least 8 characters
                    </div>
                    <div className={`flex items-center ${passwordValidation.criteria?.hasUpperCase ? 'text-success-600' : 'text-gray-500'}`}>
                      <span className={`w-5 h-5 mr-1 rounded-full flex items-center justify-center ${passwordValidation.criteria?.hasUpperCase ? 'bg-success-100' : 'bg-gray-100'}`}>
                        {passwordValidation.criteria?.hasUpperCase ? '✓' : '○'}
                      </span>
                      One uppercase letter
                    </div>
                    <div className={`flex items-center ${passwordValidation.criteria?.hasLowerCase ? 'text-success-600' : 'text-gray-500'}`}>
                      <span className={`w-5 h-5 mr-1 rounded-full flex items-center justify-center ${passwordValidation.criteria?.hasLowerCase ? 'bg-success-100' : 'bg-gray-100'}`}>
                        {passwordValidation.criteria?.hasLowerCase ? '✓' : '○'}
                      </span>
                      One lowercase letter
                    </div>
                    <div className={`flex items-center ${passwordValidation.criteria?.hasNumbers ? 'text-success-600' : 'text-gray-500'}`}>
                      <span className={`w-5 h-5 mr-1 rounded-full flex items-center justify-center ${passwordValidation.criteria?.hasNumbers ? 'bg-success-100' : 'bg-gray-100'}`}>
                        {passwordValidation.criteria?.hasNumbers ? '✓' : '○'}
                      </span>
                      One number
                    </div>
                    <div className={`flex items-center ${passwordValidation.criteria?.hasSpecialChar ? 'text-success-600' : 'text-gray-500'}`}>
                      <span className={`w-5 h-5 mr-1 rounded-full flex items-center justify-center ${passwordValidation.criteria?.hasSpecialChar ? 'bg-success-100' : 'bg-gray-100'}`}>
                        {passwordValidation.criteria?.hasSpecialChar ? '✓' : '○'}
                      </span>
                      One special character
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input pl-10 py-3 border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-danger-500' : ''
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-sm text-danger-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !formData.acceptTerms || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
                className="btn-primary w-full py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" color="white" />
                    <span className="ml-2">Creating account...</span>
                  </div>
                ) : 'Create Account'}
              </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600 md:hidden">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
