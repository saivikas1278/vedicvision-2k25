import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUsers, FaVideo, FaRunning, FaBell, FaBaseballBall } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import AnimatedCard from '../../components/UI/AnimatedCard';
import ScrollReveal from '../../components/UI/ScrollReveal';
import GradientButton from '../../components/UI/GradientButton';
import CricketDashboard from '../../components/Cricket/CricketDashboard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    tournaments: 0,
    teams: 0,
    watchedVideos: 0,
    completedWorkouts: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Simulate API calls with setTimeout
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, these would come from API calls
        setStats({
          tournaments: 5,
          teams: 2,
          watchedVideos: 12,
          completedWorkouts: 8
        });
        
        setRecentActivities([
          { id: 1, type: 'tournament', title: 'Summer Basketball League', date: '2025-08-10', status: 'Joined' },
          { id: 2, type: 'team', title: 'Eagles Basketball', date: '2025-08-08', status: 'Joined as Player' },
          { id: 3, type: 'video', title: 'Advanced Dribbling Techniques', date: '2025-08-05', status: 'Watched' },
          { id: 4, type: 'fitness', title: 'HIIT Workout for Basketball', date: '2025-08-02', status: 'Completed' }
        ]);
        
        setNotifications([
          { id: 1, text: 'Your team has a new match scheduled', time: '2 hours ago', isRead: false },
          { id: 2, text: 'New tournament registration open', time: '1 day ago', isRead: true },
          { id: 3, text: 'Your fitness goal achieved!', time: '2 days ago', isRead: true }
        ]);
        
        setRecommendations([
          { id: 1, type: 'tournament', title: 'Winter Basketball Challenge', rating: 4.8 },
          { id: 2, type: 'video', title: 'Shooting Form Masterclass', rating: 4.9 },
          { id: 3, type: 'fitness', title: 'Core Workout for Athletes', rating: 4.7 }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        showToast('Failed to load dashboard data', 'error');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'tournament': return <FaTrophy className="text-yellow-500" />;
      case 'team': return <FaUsers className="text-blue-500" />;
      case 'video': return <FaVideo className="text-purple-500" />;
      case 'fitness': return <FaRunning className="text-green-500" />;
      default: return null;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    showToast('All notifications marked as read', 'success');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="lg" />
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome back, {user?.name || 'Athlete'}!
              </h1>
              <p className="text-xl text-gray-200 mb-8">Track your sports journey and stay connected with your teams.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: stats.tournaments, label: 'Tournaments', icon: FaTrophy, color: 'from-yellow-400 to-orange-500' },
                  { value: stats.teams, label: 'Teams', icon: FaUsers, color: 'from-blue-400 to-cyan-500' },
                  { value: stats.watchedVideos, label: 'Videos Watched', icon: FaVideo, color: 'from-purple-400 to-pink-500' },
                  { value: stats.completedWorkouts, label: 'Workouts', icon: FaRunning, color: 'from-green-400 to-emerald-500' }
                ].map((stat, index) => (
                  <AnimatedCard key={index} className="bg-white/10 backdrop-blur-sm p-6 border border-white/20" hoverScale={true}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon className="text-white text-xl" />
                    </div>
                    <h3 className="font-bold text-2xl mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-300">{stat.label}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <ScrollReveal direction="up" duration={600} delay={100}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { to: "/tournaments", icon: FaTrophy, label: "Join Tournament", color: "blue" },
                    { to: "/teams", icon: FaUsers, label: "Create Team", color: "green" },
                    { to: "/videos", icon: FaVideo, label: "Watch Videos", color: "purple" },
                    { to: "/fitness", icon: FaRunning, label: "Start Workout", color: "orange" },
                    { to: "/cricket", icon: FaBaseballBall, label: "Cricket Scorer", color: "green" }
                  ].map((action, index) => (
                    <AnimatedCard 
                      key={index}
                      className={`bg-${action.color}-50 hover:bg-${action.color}-100 p-6 group border border-${action.color}-200/50`}
                      hoverScale={true}
                      glowEffect={true}
                    >
                      <Link to={action.to} className="flex flex-col items-center text-center space-y-3">
                        <div className={`w-12 h-12 bg-gradient-to-r from-${action.color}-400 to-${action.color}-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="text-white text-xl" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{action.label}</span>
                      </Link>
                    </AnimatedCard>
                  ))}
                </div>
              </AnimatedCard>
            </ScrollReveal>
            
            {/* Direct Cricket Match Button */}
            <ScrollReveal direction="up" duration={600} delay={200}>
              <div className="flex justify-center">
                <GradientButton 
                  as={Link}
                  to="/cricket/create-match"
                  size="lg"
                  variant="success"
                  className="transform hover:scale-110 transition-all duration-300"
                >
                  <FaBaseballBall className="mr-2" /> Create Cricket Match
                </GradientButton>
              </div>
            </ScrollReveal>
            
            {/* Cricket Dashboard */}
            <ScrollReveal direction="up" duration={600} delay={300}>
              <CricketDashboard />
            </ScrollReveal>
            
            {/* Recent Activity */}
            <ScrollReveal direction="up" duration={600} delay={400}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Activity</h2>
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <AnimatedCard key={activity.id} className="p-4 border border-gray-100 group" hoverScale={false}>
                        <div className="flex items-center">
                          <div className="mr-4 transform group-hover:scale-110 transition-transform duration-300">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{activity.title}</h3>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-gray-500">{activity.date}</span>
                              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{activity.status}</span>
                            </div>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No recent activities found</p>
                )}
                <div className="mt-6 text-center">
                  <Link to="/profile" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                    View All Activities
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </AnimatedCard>
            </ScrollReveal>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-8">
            {/* Notifications */}
            <ScrollReveal direction="right" duration={600} delay={100}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                  <button 
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                  >
                    Mark all as read
                  </button>
                </div>
                
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map(notification => (
                      <AnimatedCard 
                        key={notification.id} 
                        className={`p-4 ${notification.isRead ? 'bg-gray-50/80' : 'bg-blue-50/80'} border border-gray-200/50`}
                        hoverScale={false}
                      >
                        <div className="flex items-start">
                          <FaBell className={`mt-1 mr-3 ${notification.isRead ? 'text-gray-400' : 'text-blue-500'}`} />
                          <div className="flex-1">
                            <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                              {notification.text}
                            </p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No notifications</p>
                )}
              </AnimatedCard>
            </ScrollReveal>
            
            {/* Upcoming Events */}
            <ScrollReveal direction="right" duration={600} delay={200}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
                <h2 className="text-xl font-bold mb-6 text-gray-800">Upcoming Events</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-800">Team Practice</h3>
                    <p className="text-sm text-gray-600">Tomorrow, 6:00 PM</p>
                    <p className="text-xs text-gray-500 mt-1">Central City Basketball Court</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-800">Tournament: Summer Cup</h3>
                    <p className="text-sm text-gray-600">Saturday, 10:00 AM</p>
                    <p className="text-xs text-gray-500 mt-1">Sports Complex, Court #3</p>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link to="/tournaments" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                    View Calendar
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </AnimatedCard>
            </ScrollReveal>
            
            {/* Quick Stats */}
            <ScrollReveal direction="right" duration={600} delay={300}>
              <AnimatedCard className="bg-white/80 backdrop-blur-sm p-8 border border-gray-200/50" glowEffect={true}>
                <h2 className="text-xl font-bold mb-6 text-gray-800">Your Progress</h2>
                <div className="space-y-6">
                  {[
                    { label: "Weekly Fitness Goal", value: 75, color: "green" },
                    { label: "Tournament Wins", value: 40, color: "blue" },
                    { label: "Training Completion", value: 90, color: "purple" }
                  ].map((progress, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">{progress.label}</span>
                        <span className="text-sm font-bold text-gray-900">{progress.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`bg-gradient-to-r from-${progress.color}-400 to-${progress.color}-600 h-3 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${progress.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
