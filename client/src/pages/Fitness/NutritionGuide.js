import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GiCricketBat, GiVolleyballBall, GiSoccerKick, GiRunningNinja } from 'react-icons/gi';
import { MdSportsTennis } from 'react-icons/md';
import { IoCalendarOutline } from 'react-icons/io5';

const NutritionGuide = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [selectedSeason, setSelectedSeason] = useState('offseason');

  const cricketNutrition = {
    offseason: [
      {
        category: "Lean Protein",
        foods: [
          {
            name: "Chicken Breast",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "High in protein, low in fat, supports muscle repair and growth during training."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Rich in protein and omega-3 fatty acids, reduces inflammation and supports recovery."
          },
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Complete protein with essential amino acids and healthy fats for muscle building."
          },
          {
            name: "Greek Yogurt",
            image: "/images/nutrition/greekyogurt.jpg",
            description: "Protein-dense dairy with probiotics that aid gut health and nutrient absorption."
          },
          {
            name: "Lentils",
            image: "/images/nutrition/lentils.jpg",
            description: "Plant-based protein, high in fiber, supports sustained energy throughout training."
          },
          {
            name: "Tofu",
            image: "/images/nutrition/tofu.jpg",
            description: "Plant protein rich in calcium and iron, versatile for various meal preparations."
          }
        ]
      },
      {
        category: "Complex Carbs (moderate)",
        foods: [
          {
            name: "Brown Rice",
            image: "/images/nutrition/brownrice.jpg",
            description: "Slowly digestible complex carbs, provides sustained energy for long training sessions."
          },
          {
            name: "Quinoa",
            image: "/images/nutrition/quinoa.jpg",
            description: "Complete protein source with complex carbs, gluten-free and nutrient-dense."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "High in fiber, stabilizes blood sugar, provides steady fuel for endurance training."
          },
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Rich in vitamins, minerals, and slow-release carbs for sustained performance."
          },
          {
            name: "Whole Wheat Bread",
            image: "/images/nutrition/bread.jpg",
            description: "Fiber-rich complex carbs, provides steady energy without blood sugar spikes."
          }
        ]
      },
      {
        category: "Healthy Fats",
        foods: [
          {
            name: "Mixed Nuts",
            image: "/images/nutrition/mixednuts.webp",
            description: "Contain healthy fats, support brain function and heart health during recovery."
          },
          {
            name: "Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Omega-3 rich seeds, aid muscle recovery and reduce exercise inflammation."
          },
          {
            name: "Olive Oil",
            image: "/images/nutrition/olive oil.jpeg",
            description: "Monounsaturated fats, supports heart health and reduces joint inflammation."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Nutrient-dense healthy fats, supports hormone balance and reduces inflammation."
          }
        ]
      },
      {
        category: "Fruits & Veggies",
        foods: [
          {
            name: "Berries",
            image: "/images/nutrition/berries.jpg",
            description: "Antioxidant-rich fruits, reduce exercise-induced oxidative stress and boost recovery."
          },
          {
            name: "Spinach",
            image: "/images/nutrition/spinach.jpg",
            description: "High in iron and magnesium, supports energy production and muscle function."
          },
          {
            name: "Carrots",
            image: "/images/nutrition/carrots.jpg",
            description: "Beta-carotene rich, supports immune system and eye health during training."
          },
          {
            name: "Broccoli",
            image: "/images/nutrition/brocli.jpg",
            description: "Rich in vitamins C & K, high fiber content aids detoxification and recovery."
          },
          {
            name: "Citrus Fruits",
            image: "/images/nutrition/citrus.jpg",
            description: "Vitamin C rich, boosts immunity and supports collagen synthesis for joint health."
          }
        ]
      },
      {
        category: "Hydration",
        foods: [
          {
            name: "Water",
            image: "/images/nutrition/water.webp",
            description: "Maintains fluid balance, supports metabolic processes and optimal muscle function."
          },
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolytes for rehydration after intense training sessions."
          },
          {
            name: "Herbal Tea",
            image: "/images/nutrition/herbaltea.jpg",
            description: "Hydration with antioxidants, aids digestion and supports recovery."
          }
        ]
      },
      {
        category: "Supplements (if needed)",
        foods: [
          {
            name: "Whey Protein",
            image: "/images/nutrition/protein-shake.webp",
            description: "Fast-digesting protein to meet increased daily requirements during training."
          },
          {
            name: "Vitamin D",
            image: "/images/nutrition/OIP (2).webp",
            description: "Supports bone health, immune function, and muscle performance."
          },
          {
            name: "Omega-3",
            image: "/images/nutrition/omega3.webp",
            description: "Anti-inflammatory fatty acids, supports heart, joint, and brain health."
          }
        ]
      }
    ],
    onseason: [
      {
        category: "High-GI Carbs (Pre-Match)",
        foods: [
          {
            name: "White Rice",
            image: "/images/nutrition/whiterice.webp",
            description: "Quick-digesting carbs for instant energy boost before matches and training."
          },
          {
            name: "Pasta",
            image: "/images/nutrition/pasta.webp",
            description: "High-carb meal for sustained energy during long matches and intense sessions."
          },
          {
            name: "Bananas",
            image: "/images/nutrition/banana.jpg",
            description: "Natural sugars and potassium for quick energy and muscle cramp prevention."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Fast carbs and electrolytes to maintain hydration and energy during play."
          }
        ]
      },
      {
        category: "Moderate/Low-GI Carbs (Post-Match)",
        foods: [
          {
            name: "Whole Wheat Bread",
            image: "/images/nutrition/bread.jpg",
            description: "Complex carbs with fiber to restore glycogen stores for the next game."
          },
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Slow-release carbs with vitamins to replenish energy without blood sugar spikes."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Fiber-rich complex carbs for steady glycogen restoration and muscle recovery."
          }
        ]
      },
      {
        category: "Protein",
        foods: [
          {
            name: "Lean Meat",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "High-quality protein for muscle repair and recovery after intense matches."
          },
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Complete protein with essential amino acids for optimal muscle rebuilding."
          },
          {
            name: "Lentils",
            image: "/images/nutrition/lentils.jpg",
            description: "Plant-based protein with iron for oxygen delivery and muscle repair."
          }
        ]
      },
      {
        category: "Hydration + Electrolytes",
        foods: [
          {
            name: "Water",
            image: "/images/nutrition/water.webp",
            description: "Essential hydration to prevent cramps and maintain focus during matches."
          },
          {
            name: "Electrolyte Drinks",
            image: "/images/nutrition/electrolyte.webp",
            description: "Replenishes sodium and potassium lost through sweat during play."
          },
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolyte source for quick hydration and cramp prevention."
          }
        ]
      },
      {
        category: "Healthy Fats (Small Amounts)",
        foods: [
          {
            name: "Nut Butter",
            image: "/images/nutrition/nutbutter.jpg",
            description: "Healthy fats for sustained energy without slowing digestion during matches."
          },
          {
            name: "Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Omega-3 rich seeds for joint health and reduced inflammation post-match."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Nutrient-dense healthy fats for sustained energy and muscle function."
          }
        ]
      },
      {
        category: "Micronutrients",
        foods: [
          {
            name: "Leafy Greens",
            image: "/images/nutrition/leafyveg.jpg",
            description: "Iron-rich vegetables boost immunity and reduce inflammation from intense play."
          },
          {
            name: "Citrus Fruits",
            image: "/images/nutrition/citrus.jpg",
            description: "Vitamin C rich fruits support immune function and collagen production."
          },
          {
            name: "Bell Peppers",
            image: "/images/nutrition/peppers.jpeg",
            description: "High vitamin C content for faster recovery and reduced muscle soreness."
          }
        ]
      }
    ]
  };

  const badmintonNutrition = {
    offseason: [
      {
        category: "Lean Protein",
        foods: [
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Rich in complete protein for muscle repair and recovery after training."
          },
          {
            name: "Chicken Breast",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Lean protein that supports muscle growth without adding excess fat."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "High-quality protein with omega-3s for joint health and reduced inflammation."
          },
          {
            name: "Paneer",
            image: "/images/nutrition/paneer.jpg",
            description: "Good source of slow-digesting protein for overnight muscle recovery."
          },
          {
            name: "Tofu",
            image: "/images/nutrition/tofu.jpg",
            description: "Plant-based protein that supports muscle repair while being low in fat."
          },
          {
            name: "Greek Yogurt",
            image: "/images/nutrition/greekyogurt.jpg",
            description: "Packed with protein and probiotics for muscle recovery and gut health."
          }
        ]
      },
      {
        category: "Complex Carbs (moderate)",
        foods: [
          {
            name: "Brown Rice",
            image: "/images/nutrition/brownrice.jpg",
            description: "Complex carbohydrate providing steady energy for long training sessions."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Slow-digesting carbs with fiber to keep energy levels stable during workouts."
          },
          {
            name: "Quinoa",
            image: "/images/nutrition/quinoa.jpg",
            description: "Complete plant protein and carb source to fuel muscles and repair tissue."
          },
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Rich in carbs and vitamin A for muscle glycogen replenishment and immune health."
          }
        ]
      }
    ],
    onseason: [
      {
        category: "High-GI Carbs (pre-match)",
        foods: [
          {
            name: "White Rice",
            image: "/images/nutrition/whiterice.webp",
            description: "Provides quick-digesting carbs for instant energy before matches."
          },
          {
            name: "Pasta",
            image: "/images/nutrition/pasta.webp",
            description: "High-carb meal for sustained energy during long matches."
          },
          {
            name: "Bananas",
            image: "/images/nutrition/banana.jpg",
            description: "Natural sugars and potassium to prevent cramps and boost energy."
          },
          {
            name: "Dates",
            image: "/images/nutrition/dates.jpg",
            description: "Rapid energy source with natural sugars for quick bursts of performance."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Supply fast carbs and electrolytes to maintain hydration and energy."
          }
        ]
      }
    ]
  };

  const seasons = [
    { id: 'offseason', name: 'Off Season', icon: <IoCalendarOutline className="w-6 h-6" /> },
    { id: 'onseason', name: 'On Season', icon: <IoCalendarOutline className="w-6 h-6" /> }
  ];

  const sports = [
    { id: 'cricket', name: 'Cricket', icon: <GiCricketBat className="w-6 h-6" /> },
    { id: 'badminton', name: 'Badminton', icon: <MdSportsTennis className="w-6 h-6" /> },
    { id: 'football', name: 'Football', icon: <GiSoccerKick className="w-6 h-6" /> },
    { id: 'volleyball', name: 'Volleyball', icon: <GiVolleyballBall className="w-6 h-6" /> },
    { id: 'kabaddi', name: 'Kabaddi', icon: <GiRunningNinja className="w-6 h-6" /> }
  ];

  const getCurrentNutrition = () => {
    if (selectedSport === 'cricket') {
      return cricketNutrition[selectedSeason] || [];
    } else if (selectedSport === 'badminton') {
      return badmintonNutrition[selectedSeason] || [];
    }
    // For other sports, show cricket nutrition as default
    return cricketNutrition[selectedSeason] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <button 
            onClick={() => navigate('/fitness')}
            className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Sports Nutrition Guide</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Sports</h2>
              <nav className="space-y-2">
                {sports.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSport(sport.id)}
                    className={
                      selectedSport === sport.id
                        ? "w-full flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-600 text-white"
                        : "w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }
                  >
                    <span className="mr-3">{sport.icon}</span>
                    <span className="font-medium">{sport.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Essential Sports Nutrition</h2>
              
              <div className="mb-6">
                <div className="flex space-x-4 mb-6">
                  {seasons.map((season) => (
                    <button
                      key={season.id}
                      onClick={() => setSelectedSeason(season.id)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        selectedSeason === season.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <span className="mr-2">{season.icon}</span>
                      <span className="font-medium">{season.name}</span>
                    </button>
                  ))}
                </div>
                
                <div className="space-y-8">
                  {getCurrentNutrition().map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-600">{group.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.foods.map((food, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 overflow-hidden">
                              <img
                                src={food.image}
                                alt={food.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = '/images/nutrition-placeholder.jpg';
                                }}
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-2 text-gray-800">{food.name}</h3>
                              <p className="text-gray-600 text-sm">{food.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NutritionGuide;
