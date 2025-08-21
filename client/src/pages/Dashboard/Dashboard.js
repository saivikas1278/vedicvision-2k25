import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUsers, FaVideo, FaRunning, FaBell, FaBaseballBall, FaSync } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import AnimatedCard from '../../components/UI/AnimatedCard';
import ScrollReveal from '../../components/UI/ScrollReveal';
import GradientButton from '../../components/UI/GradientButton';
import dashboardService from '../../services/dashboardService';
import fitnessService from '../../services/fitnessService';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    tournaments: 0,
    teams: 0,
    watchedVideos: 0,
    completedWorkouts: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Function to refresh dashboard data
  const refreshDashboard = async () => {
    if (!isAuthenticated || !user) return;
    
    try {
      setIsLoading(true);
      const statsResponse = await dashboardService.getDashboardStats();
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
      const activitiesResponse = await dashboardService.getRecentActivities();
      if (activitiesResponse.success) {
        setRecentActivities(activitiesResponse.data);
      }
      showToast('Dashboard refreshed successfully', 'success');
    } catch (error) {
      showToast('Failed to refresh dashboard', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch real data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Fetch dashboard stats
        const statsResponse = await dashboardService.getDashboardStats();
        if (statsResponse.success) {
          setStats(statsResponse.data);
        }

        // Fetch recent activities
        const activitiesResponse = await dashboardService.getRecentActivities();
        if (activitiesResponse.success) {
          setRecentActivities(activitiesResponse.data);
        }

        // Fetch notifications
        try {
          const notificationsResponse = await dashboardService.getNotifications();
          if (notificationsResponse.success) {
            setNotifications(notificationsResponse.data);
          }
        } catch (error) {
          // Notifications endpoint might not exist yet, so don't show error
          console.log('Notifications not available yet');
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user]);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-md mx-auto text-center">
            <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTrophy className="text-white text-3xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Dashboard Access Required</h2>
              <p className="text-gray-600 mb-8">Please sign in to access your personalized dashboard and track your sports journey.</p>
              <div className="space-y-4">
                <GradientButton as={Link} to="/login" size="lg" className="w-full">
                  Sign In to Continue
                </GradientButton>
                <p className="text-sm text-gray-500">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                    Sign up here
                  </Link>
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <ScrollReveal direction="up" duration={800}>
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-float"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome back, {user?.firstName || user?.name || 'Athlete'}!
                  </h1>
                  <p className="text-xl text-gray-200 mb-8">Track your sports journey and stay connected with your teams.</p>
                </div>
                <button
                  onClick={refreshDashboard}
                  disabled={isLoading}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                  title="Refresh Dashboard"
                >
                  <FaSync className={`text-white text-lg ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { 
                    value: stats.tournaments, 
                    label: 'Tournaments', 
                    icon: FaTrophy, 
                    color: 'from-yellow-400 to-orange-500',
                    link: '/tournaments' 
                  },
                  { 
                    value: stats.teams, 
                    label: 'Teams', 
                    icon: FaUsers, 
                    color: 'from-blue-400 to-cyan-500',
                    link: '/teams' 
                  },
                  { 
                    value: stats.watchedVideos, 
                    label: 'Videos Watched', 
                    icon: FaVideo, 
                    color: 'from-purple-400 to-pink-500',
                    link: '/posts' 
                  },
                  { 
                    value: stats.completedWorkouts, 
                    label: 'Workouts', 
                    icon: FaRunning, 
                    color: 'from-green-400 to-emerald-500',
                    link: '/fitness' 
                  }
                ].map((stat, index) => (
                  <AnimatedCard key={index} className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 cursor-pointer group" hoverScale={true}>
                    <Link to={stat.link} className="block">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="text-white text-xl" />
                      </div>
                      <h3 className="font-bold text-2xl mb-1 group-hover:text-blue-200 transition-colors">{stat.value}</h3>
                      <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors">{stat.label}</p>
                    </Link>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <ScrollReveal direction="up" duration={600} delay={100}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { to: "/tournaments", icon: FaTrophy, label: "Join Tournament" },
                    { to: "/teams", icon: FaUsers, label: "Create Team" },
                    { to: "/posts", icon: FaVideo, label: "View Posts" },
                    { to: "/fitness", icon: FaRunning, label: "Start Workout" }
                  ].map((action, index) => (
                    <AnimatedCard 
                      key={index}
                      className="bg-gray-50 hover:bg-gray-100 p-6 group border border-gray-200/50"
                      hoverScale={true}
                      glowEffect={true}
                    >
                      <Link to={action.to} className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <action.icon className="text-white text-xl" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{action.label}</span>
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>
              </AnimatedCard>
            </ScrollReveal>
            
            {/* Recent Activity */}
            <ScrollReveal direction="up" duration={600} delay={400}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Activity</h2>
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                              {activity.icon === 'FaTrophy' && <FaTrophy className="text-white text-sm" />}
                              {activity.icon === 'FaBaseballBall' && <FaBaseballBall className="text-white text-sm" />}
                              {activity.icon === 'FaUsers' && <FaUsers className="text-white text-sm" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                              <p className="text-sm text-gray-500">{activity.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                              activity.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                              activity.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {activity.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No recent activities yet</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <GradientButton as={Link} to="/tournaments" size="sm">
                        Join Tournament
                      </GradientButton>
                      <GradientButton as={Link} to="/teams" size="sm" variant="secondary">
                        Create Team
                      </GradientButton>
                      <GradientButton as={Link} to="/fitness" size="sm" variant="outline">
                        Start Workout
                      </GradientButton>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            </ScrollReveal>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Notifications */}
            <ScrollReveal direction="left" duration={600} delay={500}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-6 border border-gray-200/50" glowEffect={true}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <FaBell className="mr-2 text-blue-500" />
                    Notifications
                    {notifications.length > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {notifications.length}
                      </span>
                    )}
                  </h3>
                  <Link to="/notifications" className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    View All
                  </Link>
                </div>
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notification, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <p className="text-sm text-gray-800">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-2">No notifications yet</p>
                    <p className="text-xs text-gray-400">Stay tuned for updates!</p>
                  </div>
                )}
              </AnimatedCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
