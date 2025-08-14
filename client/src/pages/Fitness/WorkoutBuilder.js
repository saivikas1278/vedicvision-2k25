import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDumbbell, FaArrowLeft, FaPlus, FaMinus, FaClock, FaFire } from 'react-icons/fa';
import { showToast } from '../../utils/toast';

const WorkoutBuilder = () => {
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState({
    name: '',
    description: '',
    category: 'Strength Training',
    difficulty: 'Beginner',
    estimatedDuration: 30,
    exercises: []
  });

  const [exerciseDatabase] = useState([
    // Upper Body
    { id: 1, name: 'Push-ups', category: 'Upper Body', equipment: 'Bodyweight', primaryMuscle: 'Chest' },
    { id: 2, name: 'Pull-ups', category: 'Upper Body', equipment: 'Pull-up Bar', primaryMuscle: 'Back' },
    { id: 3, name: 'Bench Press', category: 'Upper Body', equipment: 'Barbell', primaryMuscle: 'Chest' },
    { id: 4, name: 'Shoulder Press', category: 'Upper Body', equipment: 'Dumbbells', primaryMuscle: 'Shoulders' },
    { id: 5, name: 'Bicep Curls', category: 'Upper Body', equipment: 'Dumbbells', primaryMuscle: 'Biceps' },
    
    // Lower Body
    { id: 6, name: 'Squats', category: 'Lower Body', equipment: 'Bodyweight', primaryMuscle: 'Quadriceps' },
    { id: 7, name: 'Deadlifts', category: 'Lower Body', equipment: 'Barbell', primaryMuscle: 'Hamstrings' },
    { id: 8, name: 'Lunges', category: 'Lower Body', equipment: 'Bodyweight', primaryMuscle: 'Quadriceps' },
    { id: 9, name: 'Calf Raises', category: 'Lower Body', equipment: 'Bodyweight', primaryMuscle: 'Calves' },
    
    // Core
    { id: 10, name: 'Plank', category: 'Core', equipment: 'Bodyweight', primaryMuscle: 'Core' },
    { id: 11, name: 'Crunches', category: 'Core', equipment: 'Bodyweight', primaryMuscle: 'Abs' },
    { id: 12, name: 'Russian Twists', category: 'Core', equipment: 'Bodyweight', primaryMuscle: 'Obliques' },
    
    // Cardio
    { id: 13, name: 'Jumping Jacks', category: 'Cardio', equipment: 'Bodyweight', primaryMuscle: 'Full Body' },
    { id: 14, name: 'Burpees', category: 'Cardio', equipment: 'Bodyweight', primaryMuscle: 'Full Body' },
    { id: 15, name: 'Mountain Climbers', category: 'Cardio', equipment: 'Bodyweight', primaryMuscle: 'Core' }
  ]);

  const [selectedExerciseCategory, setSelectedExerciseCategory] = useState('All');
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  const categories = ['All', 'Upper Body', 'Lower Body', 'Core', 'Cardio'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addExercise = (exercise) => {
    const newExercise = {
      ...exercise,
      sets: 3,
      reps: 10,
      weight: 0,
      duration: 30,
      restTime: 60,
      notes: ''
    };
    
    setWorkoutData(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
    
    setShowExerciseModal(false);
    showToast('Exercise added to workout', 'success');
  };

  const removeExercise = (index) => {
    setWorkoutData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const updateExercise = (index, field, value) => {
    setWorkoutData(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) => 
        i === index ? { ...exercise, [field]: value } : exercise
      )
    }));
  };

  const calculateEstimatedCalories = () => {
    const baseCaloriesPerMinute = {
      'Strength Training': 6,
      'Cardio': 10,
      'HIIT': 12,
      'Flexibility': 3,
      'Sports': 8
    };
    
    return Math.round(workoutData.estimatedDuration * (baseCaloriesPerMinute[workoutData.category] || 6));
  };

  const handleSaveWorkout = async () => {
    if (!workoutData.name.trim()) {
      showToast('Please enter a workout name', 'error');
      return;
    }

    if (workoutData.exercises.length === 0) {
      showToast('Please add at least one exercise', 'error');
      return;
    }

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Workout saved successfully!', 'success');
      navigate('/fitness');
    } catch (error) {
      showToast('Failed to save workout', 'error');
    }
  };

  const filteredExercises = selectedExerciseCategory === 'All' 
    ? exerciseDatabase 
    : exerciseDatabase.filter(ex => ex.category === selectedExerciseCategory);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/fitness')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaDumbbell className="mr-3 text-blue-600" /> Workout Builder
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Workout Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={workoutData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Upper Body Strength"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={workoutData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Strength Training">Strength Training</option>
                  <option value="Cardio">Cardio</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={workoutData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Duration (minutes)
                </label>
                <input
                  type="number"
                  name="estimatedDuration"
                  value={workoutData.estimatedDuration}
                  onChange={handleInputChange}
                  min="10"
                  max="180"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={workoutData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Describe your workout..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Exercises */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Exercises</h2>
              <button
                onClick={() => setShowExerciseModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FaPlus className="mr-2" size={14} /> Add Exercise
              </button>
            </div>

            {workoutData.exercises.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaDumbbell size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No exercises added yet. Click "Add Exercise" to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workoutData.exercises.map((exercise, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-800">{exercise.name}</h3>
                        <p className="text-sm text-gray-600">{exercise.primaryMuscle} • {exercise.equipment}</p>
                      </div>
                      <button
                        onClick={() => removeExercise(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaMinus />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Sets</label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                          min="1"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Reps</label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value))}
                          min="1"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Weight (kg)</label>
                        <input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => updateExercise(index, 'weight', parseFloat(e.target.value))}
                          min="0"
                          step="0.5"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Rest (sec)</label>
                        <input
                          type="number"
                          value={exercise.restTime}
                          onChange={(e) => updateExercise(index, 'restTime', parseInt(e.target.value))}
                          min="0"
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                      <input
                        type="text"
                        value={exercise.notes}
                        onChange={(e) => updateExercise(index, 'notes', e.target.value)}
                        placeholder="Exercise notes..."
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Workout Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium flex items-center">
                  <FaClock className="mr-1 text-blue-600" size={12} />
                  {workoutData.estimatedDuration} min
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Exercises:</span>
                <span className="font-medium">{workoutData.exercises.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Est. Calories:</span>
                <span className="font-medium flex items-center">
                  <FaFire className="mr-1 text-orange-600" size={12} />
                  {calculateEstimatedCalories()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className={`font-medium ${
                  workoutData.difficulty === 'Beginner' ? 'text-green-600' :
                  workoutData.difficulty === 'Intermediate' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {workoutData.difficulty}
                </span>
              </div>
            </div>

            <button
              onClick={handleSaveWorkout}
              className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Workout
            </button>
          </div>
        </div>
      </div>

      {/* Exercise Selection Modal */}
      {showExerciseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Exercise</h3>
              <button
                onClick={() => setShowExerciseModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedExerciseCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedExerciseCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExercises.map(exercise => (
                <div
                  key={exercise.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => addExercise(exercise)}
                >
                  <h4 className="font-medium text-gray-800 mb-1">{exercise.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{exercise.primaryMuscle}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{exercise.category}</span>
                    <span>{exercise.equipment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutBuilder;
