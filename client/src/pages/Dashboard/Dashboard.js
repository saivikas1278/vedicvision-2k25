import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaTrophy, FaUsers, FaVideo, FaRunning, FaBell, FaStar, FaBaseballBall } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
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
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-3">Welcome back, {user?.name || 'Athlete'}!</h1>
        <p className="text-lg opacity-90">Track your sports journey and stay connected with your teams.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">{stats.tournaments}</h3>
            <p className="text-sm">Tournaments</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">{stats.teams}</h3>
            <p className="text-sm">Teams</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">{stats.watchedVideos}</h3>
            <p className="text-sm">Videos Watched</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">{stats.completedWorkouts}</h3>
            <p className="text-sm">Workouts Completed</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-6 animate-slide-up">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link to="/tournaments" className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaTrophy className="text-blue-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Join Tournament</span>
              </Link>
              <Link to="/teams" className="bg-green-50 hover:bg-green-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaUsers className="text-green-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Create Team</span>
              </Link>
              <Link to="/videos" className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaVideo className="text-purple-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Watch Videos</span>
              </Link>
              <Link to="/fitness" className="bg-orange-50 hover:bg-orange-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaRunning className="text-orange-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Start Workout</span>
              </Link>
              <Link to="/cricket" className="bg-green-50 hover:bg-green-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaBaseballBall className="text-green-600 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Cricket Scorer</span>
              </Link>
            </div>
          </div>
          
          {/* Direct Cricket Match Button */}
          <div className="flex justify-center mt-4">
            <Link 
              to="/cricket/create-match" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-colors"
            >
              <FaBaseballBall className="mr-2" /> Create Cricket Match
            </Link>
          </div>
          
          {/* Cricket Dashboard */}
          <CricketDashboard />
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center p-3 border-b border-gray-100">
                    <div className="mr-4">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{activity.title}</h3>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">{activity.date}</span>
                        <span className="text-sm font-medium text-blue-600">{activity.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activities found</p>
            )}
            <div className="mt-4 text-center">
              <Link to="/profile" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Activities
              </Link>
            </div>
          </div>
          
          {/* Recommended Content */}
          <div className="bg-white rounded-xl shadow p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map(item => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    {getActivityIcon(item.type)}
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-800 mb-2">{item.title}</h3>
                  <Link 
                    to={`/${item.type}s`} 
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-8">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            </div>
            
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}
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
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            )}
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-medium text-gray-800">Team Practice</h3>
                <p className="text-sm text-gray-600">Tomorrow, 6:00 PM</p>
                <p className="text-xs text-gray-500 mt-1">Central City Basketball Court</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-800">Tournament: Summer Cup</h3>
                <p className="text-sm text-gray-600">Saturday, 10:00 AM</p>
                <p className="text-xs text-gray-500 mt-1">Sports Complex, Court #3</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/tournaments" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Calendar
              </Link>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow p-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Weekly Fitness Goal</span>
                  <span className="text-sm font-medium text-gray-700">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Tournament Wins</span>
                  <span className="text-sm font-medium text-gray-700">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Training Completion</span>
                  <span className="text-sm font-medium text-gray-700">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
