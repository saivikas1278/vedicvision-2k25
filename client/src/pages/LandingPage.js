import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AnimatedCard from '../components/UI/AnimatedCard';
import ScrollReveal from '../components/UI/ScrollReveal';
import GradientButton from '../components/UI/GradientButton';
import MagneticButton from '../components/UI/MagneticButton';
import ParticleBackground from '../components/UI/ParticleBackground';
import FloatingElements from '../components/UI/FloatingElements';

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
    <div className="min-h-screen relative overflow-hidden">
      
        <ParticleBackground particleCount={30} color="#3b82f6" />
        <FloatingElements />
        
        
          <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
            <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
          <div className="text-center">
            <ScrollReveal direction="up" distance={100} duration={800}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SportSphere
          </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" distance={50} duration={800} delay={200}>
          <p className="text-2xl md:text-3xl mb-8 text-gray-200 font-light">
            Unified Multi-Sport Scoring & Fitness Hub
          </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" distance={30} duration={800} delay={400}>
          <p className="text-lg mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Connect, compete, and excel in your favorite sports with our comprehensive platform 
            for tournament management, live scoring, video sharing, and fitness tracking.
          </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" distance={20} duration={800} delay={600}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isAuthenticated ? (
              <Link to="/dashboard">
            <GradientButton 
              size="lg"
              className="transform hover:scale-110 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Go to Dashboard
            </GradientButton>
              </Link>
            ) : (
              <>
            <Link to="/register">
              <GradientButton 
                size="lg"
                className="transform hover:scale-110 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started Free
              </GradientButton>
            </Link>
            
            <Link to="/tournaments">
              <MagneticButton 
                className="px-8 py-4 border-2 border-white/30 text-white hover:border-white/60 rounded-xl backdrop-blur-sm bg-white/10 font-semibold transition-all duration-300"
              >
                Explore Tournaments
              </MagneticButton>
            </Link>
              </>
            )}
          </div>
            </ScrollReveal>
          </div>
            </div>
          </section>

          {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" duration={600}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedCard 
                  key={index} 
                  className="text-center p-8 bg-white/80 backdrop-blur-sm border border-gray-200/50"
                  tiltEffect={true}
                  glowEffect={true}
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </AnimatedCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" duration={800}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need for 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Sports Management</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                From organizing tournaments to tracking fitness goals, SportSphere provides 
                all the tools you need in one unified platform.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal 
                key={index} 
                direction="up" 
                duration={600} 
                delay={index * 100}
              >
                <AnimatedCard
                  className="h-full bg-white/70 backdrop-blur-sm border border-gray-200/50 p-8 group"
                  tiltEffect={true}
                  glowEffect={true}
                  hoverScale={true}
                  borderGlow={true}
                >
                  <div className="text-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" duration={800}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Multi-Sport <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Support</span>
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive support for all your favorite sports
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sports.map((sport, index) => (
              <ScrollReveal 
                key={index} 
                direction="up" 
                duration={400} 
                delay={index * 50}
              >
                <AnimatedCard 
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 text-center group border border-gray-200/50"
                  hoverScale={true}
                  glowEffect={true}
                >
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {sport}
                  </span>
                  <div className="mt-2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal direction="up" duration={800}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Get <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Started?</span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal direction="up" duration={800} delay={200}>
            <p className="text-xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Join thousands of athletes, teams, and organizers who are already using 
              SportSphere to manage their sports activities.
            </p>
          </ScrollReveal>
          
          {!isAuthenticated && (
            <ScrollReveal direction="up" duration={800} delay={400}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <GradientButton 
                  as={Link}
                  to="/register"
                  size="lg"
                  className="transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sign Up Free
                </GradientButton>
                
                <MagneticButton 
                  as={Link}
                  to="/contact"
                  className="px-8 py-4 border-2 border-white/30 text-white hover:border-white/60 rounded-xl backdrop-blur-sm bg-white/10 font-semibold transition-all duration-300"
                >
                  Contact Sales
                </MagneticButton>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
