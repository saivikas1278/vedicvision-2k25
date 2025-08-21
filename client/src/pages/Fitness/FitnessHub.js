import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaChartBar, FaTrophy, FaAppleAlt, FaStopwatch, FaPlus, FaFire, FaUser, FaCalendarCheck, FaPlay } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Card from '../../components/UI/Card';
import GradientButton from '../../components/UI/GradientButton';

const FitnessHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState({});
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [quickStats, setQuickStats] = useState({});
  const [recommendedWorkouts, setRecommendedWorkouts] = useState([]);

  useEffect(() => {
    const fetchFitnessData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setTodayWorkout({
          id: 1,
          name: 'Upper Body Strength',
          duration: 45,
          exercises: 8,
          difficulty: 'Intermediate',
          category: 'Strength Training',
          thumbnail: '/images/workout-videos/video1.mp4',
          description: 'Build upper body strength with compound movements'
        });

        setQuickStats({
          totalWorkouts: 156,
          streakDays: 12,
          caloriesBurned: 24800,
          hoursExercised: 127,
          muscleGroups: 8,
          achievements: 23
        });

        setWeeklyProgress({
          workoutsCompleted: 5,
          totalWorkouts: 6,
          caloriesBurned: 2150,
          avgDuration: 42,
          streak: 12,
          completionRate: 83
        });

        setRecommendedWorkouts([
          {
            id: 2,
            name: 'HIIT Cardio Blast',
            duration: 30,
            difficulty: 'Advanced',
            category: 'Cardio',
            thumbnail: '/images/workout-videos/video2.mp4',
            calories: 450,
            exercises: 6
          },
          {
            id: 3,
            name: 'Core Strengthening',
            duration: 20,
            difficulty: 'Beginner',
            category: 'Core',
            thumbnail: '/images/workout-videos/video3.mp4',
            calories: 200,
            exercises: 8
          },
          {
            id: 4,
            name: 'Yoga Flow',
            duration: 35,
            difficulty: 'Intermediate',
            category: 'Flexibility',
            thumbnail: '/images/workout-videos/video4.mp4',
            calories: 180,
            exercises: 12
          }
        ]);

        setRecentWorkouts([
          { 
            id: 1, 
            name: 'Morning Cardio', 
            date: '2025-08-12', 
            duration: 30, 
            calories: 320, 
            type: 'Cardio',
            completed: true,
            thumbnail: '/images/workout-videos/video5.mp4'
          },
          { 
            id: 2, 
            name: 'Leg Day Power', 
            date: '2025-08-11', 
            duration: 55, 
            calories: 480, 
            type: 'Strength',
            completed: true,
            thumbnail: '/images/workout-videos/video6.mp4'
          },
          { 
            id: 3, 
            name: 'Yoga Flow', 
            date: '2025-08-10', 
            duration: 40, 
            calories: 180, 
            type: 'Flexibility',
            completed: true,
            thumbnail: '/images/workout-videos/video7.mp4'
          },
          { 
            id: 4, 
            name: 'HIIT Session', 
            date: '2025-08-09', 
            duration: 25, 
            calories: 380, 
            type: 'HIIT',
            completed: false,
            thumbnail: '/images/workout-videos/video8.mp4'
          }
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching fitness data:', error);
        showToast('Failed to load fitness data', 'error');
        setIsLoading(false);
      }
    };

    fetchFitnessData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaDumbbell className="mr-3 text-blue-600" /> Fitness Hub
          </h1>
          <div className="flex gap-3">
            <Link 
              to="/fitness/workout-builder" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" /> Create Workout
            </Link>
            <Link 
              to="/fitness/browse-workouts" 
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-colors"
            >
              <FaDumbbell className="mr-2" /> Browse All
            </Link>
          </div>
        </div>
        <p className="text-gray-600 mt-2">Track your fitness journey, monitor progress, and achieve your goals</p>
      </div>

      {/* Quick Overview Stats */}
      
  
        
        

      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/fitness/browse-workouts" className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaDumbbell className="text-blue-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Browse Workouts</span>
              </Link>
              <Link to="/fitness/nutrition" className="bg-green-50 hover:bg-green-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaAppleAlt className="text-green-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Track Nutrition</span>
              </Link>
              <Link to="/fitness/nutrition-guide" className="bg-orange-50 hover:bg-orange-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaAppleAlt className="text-orange-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Nutrition Guide</span>
              </Link>
              <Link to="/fitness/timer" className="bg-red-50 hover:bg-red-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaStopwatch className="text-red-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Workout Timer</span>
              </Link>
            </div>
          </Card>

          {/* Today's Workout */}
          {todayWorkout && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Recommended Workout</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <video 
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                      src={todayWorkout.thumbnail}
                      poster="/images/workout-placeholder.jpg"
                      muted
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{todayWorkout.name}</h3>
                      <p className="text-sm text-gray-600">{todayWorkout.category} • {todayWorkout.difficulty}</p>
                      <p className="text-xs text-gray-500 mt-1">{todayWorkout.description}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Recommended
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{todayWorkout.duration}</p>
                    <p className="text-sm text-gray-600">Minutes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{todayWorkout.exercises}</p>
                    <p className="text-sm text-gray-600">Exercises</p>
                  </div>
                </div>
                <GradientButton 
                  onClick={() => window.location.href = `/fitness/workout/${todayWorkout.id}`}
                  className="w-full"
                  variant="primary"
                >
                  <FaPlay className="mr-2" /> Start Workout
                </GradientButton>
              </div>
            </Card>
          )}

          {/* Recommended Workouts */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recommended for You</h2>
              <Link to="/fitness/browse-workouts" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedWorkouts.map(workout => (
                <div key={workout.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <video 
                    className="w-full h-32 object-cover"
                    src={workout.thumbnail}
                    poster="/images/workout-placeholder.jpg"
                    muted
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1">{workout.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{workout.category} • {workout.difficulty}</p>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>{workout.duration} min</span>
                      <span>{workout.calories} cal</span>
                      <span>{workout.exercises} exercises</span>
                    </div>
                    <Link 
                      to={`/fitness/workout/${workout.id}`}
                      className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors text-center block"
                    >
                      Start Workout
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <Link to="/fitness/history" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentWorkouts.map(workout => (
                <div key={workout.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <video 
                      className="w-12 h-12 rounded-lg object-cover mr-4"
                      src={workout.thumbnail}
                      poster="/images/workout-placeholder.jpg"
                      muted
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 flex items-center">
                        {workout.name}
                        {workout.completed && <FaCalendarCheck className="ml-2 text-green-500 text-sm" />}
                      </h3>
                      <p className="text-sm text-gray-600">{workout.date} • {workout.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{workout.duration}min</p>
                    <p className="text-sm text-gray-600">{workout.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-8">
          {/* Motivation Quote */}
          <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Daily Motivation</h3>
            <blockquote className="text-gray-700 italic mb-3">
              "The groundwork for all happiness is good health."
            </blockquote>
            <p className="text-sm text-gray-600">- Leigh Hunt</p>
          </Card>

          
          
          
        </div>
      </div>
    </div>
  );
};

export default FitnessHub;
