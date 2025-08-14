import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GlareHover from '../components/UI/GlareHover';

const LandingPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Tournament Management',
      description: 'Create and manage tournaments with automatic bracket generation, live scoring, and real-time updates.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Video Sharing',
      description: 'Share highlight reels, training videos, and match recordings with the community.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fitness Tracking',
      description: 'Track workouts, monitor progress, and access personalized fitness content and nutrition guides.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Team Management',
      description: 'Build and manage teams, invite players, and coordinate team activities and schedules.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2" />
        </svg>
      ),
      title: 'Live Scoring',
      description: 'Real-time match scoring with live updates, statistics tracking, and instant notifications.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      title: 'Multi-Sport Support',
      description: 'Support for multiple sports including football, basketball, tennis, volleyball, and more.',
    },
  ];

  const sports = [
    'Football', 'Basketball', 'Tennis', 'Volleyball', 'Baseball', 'Soccer',
    'Cricket', 'Badminton', 'Table Tennis', 'Hockey', 'Rugby', 'Wrestling'
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Tournaments' },
    { number: '50+', label: 'Sports Supported' },
    { number: '1M+', label: 'Matches Played' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              SportSphere
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-fade-in animation-delay-200">
              Unified Multi-Sport Scoring, Match Management & Fitness Hub
            </p>
            <p className="text-lg mb-12 text-primary-100 max-w-3xl mx-auto animate-fade-in animation-delay-400">
              Connect, compete, and excel in your favorite sports with our comprehensive platform 
              for tournament management, live scoring, video sharing, and fitness tracking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn-primary btn bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary btn bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/tournaments"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600 transform hover:scale-105 transition-all duration-200"
                  >
                    Explore Tournaments
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Sports Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From organizing tournaments to tracking fitness goals, SportSphere provides 
              all the tools you need in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlareHover
                key={index}
                glareColor="#3B82F6"
                glareOpacity={0.2}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="h-full"
              >
                <div
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-primary-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </GlareHover>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multi-Sport Support
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive support for all your favorite sports
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sports.map((sport, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-purple-50 p-4 rounded-lg text-center hover:from-primary-100 hover:to-purple-100 transition-colors duration-300 animate-bounce-slow"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-sm font-medium text-gray-800">{sport}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of athletes, teams, and organizers who are already using 
            SportSphere to manage their sports activities.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn bg-white text-primary-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
              >
                Sign Up Free
              </Link>
              <Link
                to="/contact"
                className="btn border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                Contact Sales
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
