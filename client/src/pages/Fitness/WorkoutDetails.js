import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaDumbbell, FaClock, FaFire, FaPlay, FaPause, FaStop, FaCheck } from 'react-icons/fa';
import { showToast } from '../../utils/toast';

const WorkoutDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [workout, setWorkout] = useState(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Get workout data from location state or mock data
    if (location.state?.workout) {
      // Ensure the workout has the correct structure
      const workoutData = location.state.workout;
      if (!Array.isArray(workoutData.exercises)) {
        workoutData.exercises = [];
      }
      setWorkout(workoutData);
    } else {
      // Fallback to mock data if no state
      setWorkout({
        id: id,
        name: "Sample Workout",
        sport: "cricket",
        difficulty: "intermediate",
        category: "strength",
        duration: 45,
        calories: 270,
        description: "A comprehensive workout for cricket players focusing on strength and power.",
        tags: ["Strength", "Power", "Intermediate"],
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: 15,
            rest: 60,
            description: "Standard push-ups to build chest and tricep strength",
            videoUrl: "/images/workout-videos/video1.mp4"
          },
          {
            name: "Pull-ups",
            sets: 3,
            reps: 8,
            rest: 90,
            description: "Pull-ups to strengthen back and biceps",
            videoUrl: "/images/workout-videos/video2.mp4"
          },
          {
            name: "Squats",
            sets: 4,
            reps: 20,
            rest: 60,
            description: "Bodyweight squats for leg strength and stability",
            videoUrl: "/images/workout-videos/video3.mp4"
          },
          {
            name: "Plank",
            sets: 3,
            duration: 45,
            rest: 60,
            description: "Hold plank position to strengthen core",
            videoUrl: "/images/workout-videos/video4.mp4"
          }
        ]
      });
    }
  }, [id, location.state]);

  const startWorkout = () => {
    if (exercises.length === 0) {
      showToast('No exercises available for this workout', 'error');
      return;
    }
    setIsWorkoutActive(true);
    setCurrentExerciseIndex(0);
    setTimeRemaining(exercises[0]?.duration || 60);
    showToast('Workout started!', 'success');
  };

  const pauseWorkout = () => {
    setIsPaused(!isPaused);
    showToast(isPaused ? 'Workout resumed' : 'Workout paused', 'info');
  };

  const stopWorkout = () => {
    setIsWorkoutActive(false);
    setCurrentExerciseIndex(0);
    setTimeRemaining(0);
    setIsPaused(false);
    showToast('Workout stopped', 'info');
  };

  const nextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setTimeRemaining(workout.exercises[currentExerciseIndex + 1]?.duration || 60);
    } else {
      // Workout completed
      setIsWorkoutActive(false);
      showToast('Workout completed! Great job!', 'success');
    }
  };

  const completeExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      nextExercise();
    } else {
      setIsWorkoutActive(false);
      showToast('Workout completed! Great job!', 'success');
    }
  };

  if (!workout) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workout...</p>
        </div>
      </div>
    );
  }

  // Safety check for exercises array
  if (!Array.isArray(workout.exercises)) {
    workout.exercises = [];
  }

  // Ensure exercises is always an array
  const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <button 
            onClick={() => navigate('/fitness/browse-workouts')}
            className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{workout.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Workout Details</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  workout.difficulty === 'beginner' ? 'bg-green-100 text-green-600' :
                  workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {workout.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{workout.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FaClock className="text-blue-500 mr-2" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{workout.duration}</p>
                  <p className="text-sm text-gray-600">Minutes</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FaFire className="text-orange-500 mr-2" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{workout.calories}</p>
                  <p className="text-sm text-gray-600">Calories</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <FaDumbbell className="text-purple-500 mr-2" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{exercises.length}</p>
                  <p className="text-sm text-gray-600">Exercises</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {workout.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Workout Controls */}
            {exercises.length > 0 && (
              !isWorkoutActive ? (
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Ready to Start?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Click "Start Workout" to begin and see exercise videos
                  </p>
                  <button
                    onClick={startWorkout}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center text-lg font-medium"
                  >
                    <FaPlay className="mr-2" />
                    Start Workout
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Workout in Progress</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={pauseWorkout}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FaPause className="mr-2" />
                      {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <button
                      onClick={stopWorkout}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <FaStop className="mr-2" />
                      Stop
                    </button>
                  </div>
                </div>
              )
            )}

            {/* Current Exercise */}
            {isWorkoutActive && currentExercise && exercises.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Exercise</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">{currentExercise.name}</h4>
                  <p className="text-gray-600 mb-4">{currentExercise.description}</p>
                  
                  {/* Video Player */}
                  {currentExercise.videoUrl && (
                    <div className="mb-4">
                      <video
                        className="w-full h-64 rounded-lg object-cover"
                        controls
                        preload="metadata"
                        onError={(e) => console.error('Video error:', e)}
                        onLoadStart={() => console.log('Video loading started')}
                        onCanPlay={() => console.log('Video can play')}
                      >
                        <source src={currentExercise.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-500">
                        {currentExercise.sets || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">Sets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">
                        {currentExercise.reps || currentExercise.duration || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentExercise.reps ? 'Reps' : 'Seconds'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={completeExercise}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <FaCheck className="mr-2" />
                    Complete Exercise
                  </button>
                </div>
              </div>
            )}

            {/* Exercise List */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Exercise List</h3>
              {exercises.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FaDumbbell size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No exercises available for this workout.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {exercises.map((exercise, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg transition-colors ${
                        isWorkoutActive && index === currentExerciseIndex 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                          <p className="text-sm text-gray-600">{exercise.description}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          {exercise.sets && exercise.reps ? (
                            <span>{exercise.sets} × {exercise.reps}</span>
                          ) : (
                            <span>{exercise.duration}s</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Video Player for each exercise */}
                      {exercise.videoUrl && (
                        <div className="mt-3">
                          <video
                            className="w-full h-48 rounded-lg object-cover"
                            controls
                            preload="none"
                            onError={(e) => console.error('Exercise video error:', exercise.name, e)}
                          >
                            <source src={exercise.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-gray-800">
                    {isWorkoutActive ? currentExerciseIndex : 0} / {exercises.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-gray-800">
                    {isWorkoutActive ? exercises.length - currentExerciseIndex : exercises.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${isWorkoutActive && exercises.length > 0 ? (currentExerciseIndex / exercises.length) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/fitness/workout-builder')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Create Custom Workout
                </button>
                <button
                  onClick={() => navigate('/fitness/timer')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Use Workout Timer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
