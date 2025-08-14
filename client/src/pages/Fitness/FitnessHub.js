import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaChartBar, FaTrophy, FaAppleAlt, FaStopwatch, FaPlus, FaFire } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const FitnessHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [weeklyProgress, setWeeklyProgress] = useState({});
  const [recentWorkouts, setRecentWorkouts] = useState([]);

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
          category: 'Strength Training'
        });

        setWeeklyProgress({
          workoutsCompleted: 4,
          totalWorkouts: 6,
          caloriesBurned: 1850,
          avgDuration: 42,
          streak: 7
        });

        setRecentWorkouts([
          { id: 1, name: 'Morning Cardio', date: '2025-08-12', duration: 30, calories: 320, type: 'Cardio' },
          { id: 2, name: 'Leg Day', date: '2025-08-11', duration: 55, calories: 480, type: 'Strength' },
          { id: 3, name: 'Yoga Flow', date: '2025-08-10', duration: 40, calories: 180, type: 'Flexibility' },
          { id: 4, name: 'HIIT Session', date: '2025-08-09', duration: 25, calories: 380, type: 'HIIT' }
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
          <Link 
            to="/fitness/workout-builder" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" /> Create Workout
          </Link>
        </div>
        <p className="text-gray-600 mt-2">Track your fitness journey, monitor progress, and achieve your goals</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Weekly Progress</h3>
              <p className="text-2xl font-bold">{weeklyProgress.workoutsCompleted}/{weeklyProgress.totalWorkouts}</p>
              <p className="text-sm opacity-90">Workouts Completed</p>
            </div>
            <FaChartBar size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Calories Burned</h3>
              <p className="text-2xl font-bold">{weeklyProgress.caloriesBurned}</p>
              <p className="text-sm opacity-90">This Week</p>
            </div>
            <FaFire size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Avg Duration</h3>
              <p className="text-2xl font-bold">{weeklyProgress.avgDuration}min</p>
              <p className="text-sm opacity-90">Per Workout</p>
            </div>
            <FaStopwatch size={32} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Streak</h3>
              <p className="text-2xl font-bold">{weeklyProgress.streak} days</p>
              <p className="text-sm opacity-90">Keep it up!</p>
            </div>
            <FaTrophy size={32} className="opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/fitness/workouts" className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaDumbbell className="text-blue-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Browse Workouts</span>
              </Link>
              <Link to="/fitness/nutrition" className="bg-green-50 hover:bg-green-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaAppleAlt className="text-green-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Track Nutrition</span>
              </Link>
              <Link to="/fitness/progress" className="bg-purple-50 hover:bg-purple-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaChartBar className="text-purple-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">View Progress</span>
              </Link>
              <Link to="/fitness/timer" className="bg-orange-50 hover:bg-orange-100 transition-colors p-4 rounded-lg flex flex-col items-center text-center">
                <FaStopwatch className="text-orange-500 text-2xl mb-2" />
                <span className="text-sm font-medium text-gray-700">Workout Timer</span>
              </Link>
            </div>
          </div>

          {/* Today's Workout */}
          {todayWorkout && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Recommended Workout</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{todayWorkout.name}</h3>
                    <p className="text-sm text-gray-600">{todayWorkout.category} • {todayWorkout.difficulty}</p>
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
                <Link 
                  to={`/fitness/workout/${todayWorkout.id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                >
                  Start Workout
                </Link>
              </div>
            </div>
          )}

          {/* Recent Workouts */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Workouts</h2>
              <Link to="/fitness/history" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentWorkouts.map(workout => (
                <div key={workout.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      workout.type === 'Cardio' ? 'bg-red-100 text-red-600' :
                      workout.type === 'Strength' ? 'bg-blue-100 text-blue-600' :
                      workout.type === 'Flexibility' ? 'bg-green-100 text-green-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <FaDumbbell size={16} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{workout.name}</h3>
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
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-8">
        </div>
      </div>
    </div>
  );
};

export default FitnessHub;
