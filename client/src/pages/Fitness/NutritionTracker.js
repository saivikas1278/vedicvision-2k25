import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAppleAlt, FaArrowLeft, FaPlus, FaSearch, FaWater, FaUtensils, FaCalculator } from 'react-icons/fa';

const NutritionTracker = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyIntake, setDailyIntake] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    water: 0
  });
  const [goals, setGoals] = useState({
    calories: 2200,
    protein: 165,
    carbs: 275,
    fat: 73,
    water: 8
  });
  const [meals, setMeals] = useState([]);
  const [showAddFood, setShowAddFood] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);

  const foodDatabase = [
    { id: 1, name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: 2, name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { id: 3, name: 'Broccoli (1 cup)', calories: 25, protein: 3, carbs: 5, fat: 0.3 },
    { id: 4, name: 'Banana (1 medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { id: 5, name: 'Greek Yogurt (1 cup)', calories: 130, protein: 23, carbs: 9, fat: 0.4 },
    { id: 6, name: 'Almonds (28g)', calories: 161, protein: 6, carbs: 6, fat: 14 },
    { id: 7, name: 'Oats (1 cup)', calories: 154, protein: 5.3, carbs: 28, fat: 3 },
    { id: 8, name: 'Eggs (2 large)', calories: 140, protein: 12, carbs: 1, fat: 10 },
    { id: 9, name: 'Sweet Potato (1 medium)', calories: 112, protein: 2, carbs: 26, fat: 0.1 },
    { id: 10, name: 'Salmon (100g)', calories: 208, protein: 25, carbs: 0, fat: 12 },
    { id: 11, name: 'Avocado (1/2 medium)', calories: 160, protein: 2, carbs: 8.5, fat: 15 },
    { id: 12, name: 'Spinach (1 cup)', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1 },
    { id: 13, name: 'Quinoa (1 cup)', calories: 222, protein: 8, carbs: 39, fat: 3.6 },
    { id: 14, name: 'Turkey Breast (100g)', calories: 135, protein: 30, carbs: 0, fat: 1 },
    { id: 15, name: 'Apple (1 medium)', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 }
  ];

  useEffect(() => {
    calculateDailyIntake();
  }, [meals]);

  const calculateDailyIntake = () => {
    const totals = meals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    setDailyIntake({ ...totals, water: waterIntake });
  };

  const addFoodToMeal = (food, quantity = 1) => {
    const mealEntry = {
      id: Date.now(),
      ...food,
      calories: food.calories * quantity,
      protein: food.protein * quantity,
      carbs: food.carbs * quantity,
      fat: food.fat * quantity,
      quantity,
      meal: selectedMeal,
      date: selectedDate
    };

    setMeals([...meals, mealEntry]);
    setShowAddFood(false);
    setSearchQuery('');
  };

  const removeFoodFromMeal = (mealId) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
  };

  const addWater = (glasses) => {
    setWaterIntake(prev => Math.min(prev + glasses, 12));
  };

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMealsByType = (mealType) => {
    return meals.filter(meal => meal.meal === mealType);
  };

  const getMealCalories = (mealType) => {
    return getMealsByType(mealType).reduce((total, meal) => total + meal.calories, 0);
  };

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
    { id: 'lunch', name: 'Lunch', icon: '☀️' },
    { id: 'dinner', name: 'Dinner', icon: '🌙' },
    { id: 'snacks', name: 'Snacks', icon: '🍎' }
  ];

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
          <FaAppleAlt className="mr-3 text-green-600" /> Nutrition Tracker
        </h1>
      </div>

      {/* Date Selector */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          onClick={() => setShowAddFood(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaPlus className="mr-2" /> Add Food
        </button>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Calories</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-blue-600">{Math.round(dailyIntake.calories)}</span>
            <span className="text-sm text-gray-500">/ {goals.calories}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage(dailyIntake.calories, goals.calories)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Protein (g)</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-red-600">{Math.round(dailyIntake.protein)}</span>
            <span className="text-sm text-gray-500">/ {goals.protein}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage(dailyIntake.protein, goals.protein)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Carbs (g)</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-yellow-600">{Math.round(dailyIntake.carbs)}</span>
            <span className="text-sm text-gray-500">/ {goals.carbs}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage(dailyIntake.carbs, goals.carbs)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Fat (g)</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-purple-600">{Math.round(dailyIntake.fat)}</span>
            <span className="text-sm text-gray-500">/ {goals.fat}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage(dailyIntake.fat, goals.fat)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Water (glasses)</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-cyan-600">{waterIntake}</span>
            <span className="text-sm text-gray-500">/ {goals.water}</span>
          </div>
          <div className="flex space-x-1 mt-2">
            <button
              onClick={() => addWater(1)}
              className="flex-1 px-2 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 text-xs rounded transition-colors"
            >
              +1
            </button>
            <button
              onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
              className="flex-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded transition-colors"
            >
              -1
            </button>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {mealTypes.slice(0, 2).map(mealType => (
            <div key={mealType.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2 text-2xl">{mealType.icon}</span>
                  {mealType.name}
                </h2>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">{Math.round(getMealCalories(mealType.id))} cal</p>
                  <button
                    onClick={() => {
                      setSelectedMeal(mealType.id);
                      setShowAddFood(true);
                    }}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Add Food
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {getMealsByType(mealType.id).map(meal => (
                  <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{meal.name}</p>
                      <p className="text-sm text-gray-600">
                        {Math.round(meal.calories)} cal • {Math.round(meal.protein)}g protein
                      </p>
                    </div>
                    <button
                      onClick={() => removeFoodFromMeal(meal.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                {getMealsByType(mealType.id).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No foods added yet</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {mealTypes.slice(2).map(mealType => (
            <div key={mealType.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="mr-2 text-2xl">{mealType.icon}</span>
                  {mealType.name}
                </h2>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-800">{Math.round(getMealCalories(mealType.id))} cal</p>
                  <button
                    onClick={() => {
                      setSelectedMeal(mealType.id);
                      setShowAddFood(true);
                    }}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Add Food
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {getMealsByType(mealType.id).map(meal => (
                  <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{meal.name}</p>
                      <p className="text-sm text-gray-600">
                        {Math.round(meal.calories)} cal • {Math.round(meal.protein)}g protein
                      </p>
                    </div>
                    <button
                      onClick={() => removeFoodFromMeal(meal.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                {getMealsByType(mealType.id).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No foods added yet</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Food Modal */}
      {showAddFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Food to {mealTypes.find(m => m.id === selectedMeal)?.name}
              </h2>
              <button
                onClick={() => setShowAddFood(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredFoods.map(food => (
                <div key={food.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{food.name}</p>
                    <p className="text-sm text-gray-600">
                      {food.calories} cal • {food.protein}g protein
                    </p>
                  </div>
                  <button
                    onClick={() => addFoodToMeal(food)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionTracker;
