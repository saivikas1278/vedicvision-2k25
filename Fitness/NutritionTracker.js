import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GiCricketBat, GiVolleyballBall, GiSoccerKick, GiRunningNinja } from 'react-icons/gi';
import { MdSportsTennis } from 'react-icons/md';
import { IoCalendarOutline } from 'react-icons/io5';

const NutritionTracker = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [selectedSeason, setSelectedSeason] = useState('offseason');

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
      },
      {
        category: "Healthy Fats",
        foods: [
          {
            name: "Almonds",
            image: "/images/nutrition/almond.jpeg",
            description: "Healthy fats and vitamin E for muscle recovery and skin health."
          },
          {
            name: "Walnuts",
            image: "/images/nutrition/walnuts.jpeg",
            description: "Omega-3-rich nuts that reduce inflammation and support brain function."
          },
          {
            name: "Chia Seeds",
            image: "/images/nutrition/chia.jpeg",
            description: "Provide fiber, protein, and omega-3s for sustained energy and hydration."
          },
          {
            name: "Olive Oil",
            image: "/images/nutrition/olive oil.jpeg",
            description: "Heart-healthy fat that supports hormone production and reduces inflammation."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Healthy fats and potassium for muscle function and cramp prevention."
          }
        ]
      },
      {
        category: "Fruits & Veggies",
        foods: [
          {
            name: "Spinach",
            image: "/images/nutrition/spinach.jpg",
            description: "Rich in iron to support oxygen transport and energy production."
          },
          {
            name: "Broccoli",
            image: "/images/nutrition/brocli.jpg",
            description: "High in vitamin C and fiber to boost immunity and digestion."
          },
          {
            name: "Bell Peppers",
            image: "/images/nutrition/peppers.jpeg",
            description: "Packed with vitamin C for faster recovery and collagen production."
          },
          {
            name: "Citrus Fruits",
            image: "/images/nutrition/citrus.jpg",
            description: "Provide vitamin C and natural sugars for quick energy and immune defense."
          },
          {
            name: "Berries",
            image: "/images/nutrition/berries.jpg",
            description: "Antioxidants to fight muscle soreness and improve recovery speed."
          }
        ]
      },
      {
        category: "Hydration",
        foods: [
          {
            name: "Water",
            image: "/images/nutrition/water.webp",
            description: "Maintains hydration, muscle elasticity, and temperature regulation."
          },
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolytes to prevent cramps and dehydration."
          },
          {
            name: "Lemon Water",
            image: "/images/nutrition/lemonwater.jpg",
            description: "Vitamin C boost and helps maintain electrolyte balance."
          }
        ]
      },
      {
        category: "Supplements (if needed)",
        foods: [
          {
            name: "Whey Protein",
            image: "/images/nutrition/OIP (1).webp",
            description: "Fast-absorbing protein for immediate post-workout muscle repair."
          },
          {
            name: "Vitamin D",
            image: "/images/nutrition/OIP (2).webp",
            description: "Supports bone strength and muscle performance."
          },
          {
            name: "Omega-3",
            image: "/images/nutrition/omega3.webp",
            description: "Reduces inflammation and supports joint health."
          },
          {
            name: "Multivitamins",
            image: "/images/nutrition/multivitamins.webp",
            description: "Fill nutrient gaps for optimal overall health and recovery."
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
      },
      {
        category: "Low/Moderate-GI Carbs (post-match)",
        foods: [
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Slow-release carbs that restore glycogen without spiking blood sugar."
          },
          {
            name: "Whole Wheat Bread",
            image: "/images/nutrition/bread.jpg",
            description: "Provides steady energy and fiber to aid recovery."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Complex carbs with fiber and minerals for muscle recovery and endurance."
          }
        ]
      },
      {
        category: "Protein",
        foods: [
          {
            name: "Chicken",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Lean protein for muscle repair without adding excess fat."
          },
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Rich in protein and essential amino acids for muscle rebuilding."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Protein plus omega-3s to reduce inflammation and speed recovery."
          },
          {
            name: "Soy Milk",
            image: "/images/nutrition/Soymilk.jpg",
            description: "Plant-based protein with calcium for muscle and bone health."
          },
          {
            name: "Lentils",
            image: "/images/nutrition/lentils.jpg",
            description: "Protein and iron to repair muscles and improve oxygen delivery."
          }
        ]
      },
      {
        category: "Hydration + Electrolytes",
        foods: [
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolytes to replace minerals lost in sweat."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Provide fast hydration and replenish sodium, potassium, and carbs."
          },
          {
            name: "Lemon Water with Salt",
            image: "/images/nutrition/lemonwater.jpg",
            description: "Restores electrolyte balance and aids quick hydration."
          }
        ]
      },
      {
        category: "Micronutrients",
        foods: [
          {
            name: "Leafy Greens",
            image: "/images/nutrition/leafyveg.jpg",
            description: "Rich in iron and antioxidants to reduce fatigue and improve endurance."
          },
          {
            name: "Tomatoes",
            image: "/images/nutrition/tomato.webp",
            description: "High in lycopene and vitamin C to fight inflammation and support recovery."
          },
          {
            name: "Kiwi",
            image: "/images/nutrition/kiwi.jpeg",
            description: "Packed with vitamin C to boost immunity and aid tissue repair."
          },
          {
            name: "Carrots",
            image: "/images/nutrition/carrots.jpg",
            description: "Provide beta-carotene for antioxidant support and eye health."
          }
        ]
      },
      {
        category: "Healthy Fats (small portions)",
        foods: [
          {
            name: "Nut Butter",
            image: "/images/nutrition/nutbutter.jpg",
            description: "Healthy fats and protein for long-lasting energy."
          },
          {
            name: "Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Contain omega-3s and minerals to reduce inflammation and support muscle function."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Provides potassium and healthy fats to maintain muscle strength and prevent cramps."
          }
        ]
      }
    ]
  };

  const footballNutrition = {
    offseason: [
      {
        category: "Lean Protein",
        foods: [
          {
            name: "Chicken",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Lean, high-quality protein to repair muscles and support strength for sprints and tackles."
          },
          {
            name: "Turkey",
            image: "/images/nutrition/turkey.jpeg",
            description: "Low-fat protein source that aids muscle growth and keeps body weight lean."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Protein with omega-3 fatty acids to reduce inflammation and improve joint health."
          },
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Complete protein source with amino acids for muscle recovery and strength gains."
          },
          {
            name: "Greek Yogurt",
            image: "/images/nutrition/greekyogurt.jpg",
            description: "High-protein dairy product that also supports gut health with probiotics."
          },
          {
            name: "Cottage Cheese",
            image: "/images/nutrition/cottagecheese.jpeg",
            description: "Slow-digesting protein ideal for overnight muscle repair."
          }
        ]
      },
      {
        category: "Complex Carbs (moderate)",
        foods: [
          {
            name: "Brown Rice",
            image: "/images/nutrition/brownrice.jpg",
            description: "Complex carbohydrate for steady energy release during training sessions."
          },
          {
            name: "Quinoa",
            image: "/images/nutrition/quinoa.jpg",
            description: "Complete plant protein plus carbs to fuel workouts and aid recovery."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Slow-digesting carbs with fiber to maintain stable energy levels."
          },
          {
            name: "Whole Wheat Pasta",
            image: "/images/nutrition/wholewheatpasta.jpg",
            description: "Carbohydrate source with fiber to sustain energy without blood sugar spikes."
          }
        ]
      },
      {
        category: "Healthy Fats",
        foods: [
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Healthy fats and potassium to maintain muscle function and prevent cramps."
          },
          {
            name: "Nuts",
            image: "/images/nutrition/mixednuts.webp",
            description: "Provide protein, healthy fats, and vitamin E for muscle repair and joint health."
          },
          {
            name: "Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Rich in omega-3s and minerals to reduce inflammation and support recovery."
          },
          {
            name: "Olive Oil",
            image: "/images/nutrition/olive oil.jpeg",
            description: "Heart-healthy fat that helps reduce inflammation and supports hormone balance."
          }
        ]
      },
      {
        category: "Fruits & Veggies",
        foods: [
          {
            name: "Spinach",
            image: "/images/nutrition/spinach.jpg",
            description: "Iron-rich leafy green to improve oxygen delivery to muscles."
          },
          {
            name: "Kale",
            image: "/images/nutrition/kale.jpeg",
            description: "Packed with vitamins A, C, and K for recovery and bone strength."
          },
          {
            name: "Bell Peppers",
            image: "/images/nutrition/peppers.jpeg",
            description: "High in vitamin C to boost immunity and speed up recovery."
          },
          {
            name: "Berries",
            image: "/images/nutrition/berries.jpg",
            description: "Antioxidants to reduce muscle soreness and oxidative stress."
          },
          {
            name: "Oranges",
            image: "/images/nutrition/citrus.jpg",
            description: "Vitamin C and natural sugars for quick energy and immune defense."
          }
        ]
      },
      {
        category: "Hydration",
        foods: [
          {
            name: "Water",
            image: "/images/nutrition/water.webp",
            description: "Maintains hydration for optimal muscle function and temperature regulation."
          },
          {
            name: "Herbal Tea",
            image: "/images/nutrition/herbaltea.jpg",
            description: "Supports hydration and provides antioxidants for recovery."
          },
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural source of electrolytes to prevent cramps and dehydration."
          }
        ]
      },
      {
        category: "Supplements (if needed)",
        foods: [
          {
            name: "Whey Protein",
            image: "/images/nutrition/protein-shake.webp",
            description: "Fast-digesting protein to support immediate post-training muscle repair."
          },
          {
            name: "Omega-3",
            image: "/images/nutrition/omega3.webp",
            description: "Anti-inflammatory fatty acids for joint protection and faster recovery."
          },
          {
            name: "Vitamin D",
            image: "/images/nutrition/OIP (2).webp",
            description: "Supports bone health and muscle performance."
          },
          {
            name: "Magnesium",
            image: "/images/nutrition/magnesium.webp",
            description: "Essential mineral to prevent cramps and support muscle relaxation."
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
            image: "/images/nutrition/brownrice.jpg",
            description: "Easily digestible carb that provides a fast burst of energy before matches."
          },
          {
            name: "Pasta",
            image: "/images/nutrition/pasta.webp",
            description: "Rich in carbohydrates for quick glycogen replenishment and sustained play."
          },
          {
            name: "Potatoes",
            image: "/images/nutrition/potatoes.jpeg",
            description: "Starchy carb that gives rapid energy and provides potassium for muscle function."
          },
          {
            name: "Bananas",
            image: "/images/nutrition/banana.jpg",
            description: "Natural sugar source for quick energy and potassium to prevent cramps."
          },
          {
            name: "Energy Gels",
            image: "/images/nutrition/energygels.jpeg",
            description: "Concentrated carbs for immediate energy during intense moments."
          }
        ]
      },
      {
        category: "Low/Moderate-GI Carbs (post-match)",
        foods: [
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Slow-digesting carbs that help restore muscle glycogen while adding vitamins."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Fiber-rich carbs for steady energy release during recovery hours."
          },
          {
            name: "Whole Wheat Bread",
            image: "/images/nutrition/bread.jpg",
            description: "Complex carbs with fiber to restore glycogen and support digestion."
          }
        ]
      },
      {
        category: "Protein",
        foods: [
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Complete protein with all essential amino acids to rebuild muscle tissue."
          },
          {
            name: "Chicken",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Lean protein for muscle recovery without adding excess fat."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Protein plus omega-3 fatty acids to reduce muscle soreness and inflammation."
          },
          {
            name: "Tofu",
            image: "/images/nutrition/tofu.jpg",
            description: "Plant-based protein rich in iron for oxygen transport in the body."
          },
          {
            name: "Lentils",
            image: "/images/nutrition/lentils.jpg",
            description: "Protein and slow carbs for muscle repair and sustained energy."
          }
        ]
      },
      {
        category: "Healthy Fats (small portions)",
        foods: [
          {
            name: "Nut Butter",
            image: "/images/nutrition/nutbutter.jpg",
            description: "Healthy fats and protein to keep energy stable between meals."
          },
          {
            name: "Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Provide omega-3s, protein, and minerals for joint and muscle health."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Rich in healthy fats and potassium for endurance and recovery."
          }
        ]
      },
      {
        category: "Hydration + Electrolytes",
        foods: [
          {
            name: "Water",
            image: "/images/nutrition/water.webp",
            description: "Maintains hydration and regulates body temperature during play."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Provide quick electrolytes and carbs to sustain stamina in matches."
          },
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolyte drink to replace minerals lost through sweat."
          },
          {
            name: "Lemon Water with Salt",
            image: "/images/nutrition/lemonwater.jpg",
            description: "Quick hydration boost with electrolytes for cramp prevention."
          }
        ]
      },
      {
        category: "Micronutrients",
        foods: [
          {
            name: "Leafy Greens",
            image: "/images/nutrition/leafyveg.jpg",
            description: "Provide iron, vitamins, and antioxidants for recovery and endurance."
          },
          {
            name: "Tomatoes",
            image: "/images/nutrition/tomato.webp",
            description: "Rich in lycopene and vitamin C to reduce inflammation."
          },
          {
            name: "Kiwi",
            image: "/images/nutrition/kiwi.jpeg",
            description: "High vitamin C content for immunity and muscle repair."
          },
          {
            name: "Carrots",
            image: "/images/nutrition/carrots.jpg",
            description: "Provide beta-carotene for vision health and antioxidant recovery support."
          }
        ]
      }
    ]
  };

  const volleyballNutrition = {
    offseason: [
      {
        category: "Lean Protein",
        foods: [
          {
            name: "Chicken Breast",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Lean, high-quality protein with minimal fat to repair and grow muscle fibers."
          },
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Complete protein source with vitamins and healthy fats to support strength gains."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Rich in protein and omega-3 fatty acids to reduce joint inflammation."
          },
          {
            name: "Paneer",
            image: "/images/nutrition/paneer.jpg",
            description: "Protein-rich dairy option with calcium for strong bones."
          },
          {
            name: "Tofu",
            image: "/images/nutrition/tofu.jpg",
            description: "Plant-based protein with iron for better oxygen delivery to muscles."
          },
          {
            name: "Greek Yogurt",
            image: "/images/nutrition/greekyogurt.jpg",
            description: "High-protein dairy that also aids digestion with probiotics."
          }
        ]
      },
      {
        category: "Complex Carbs (moderate)",
        foods: [
          {
            name: "Brown Rice",
            image: "/images/nutrition/brownrice.jpg",
            description: "Slow-release energy to fuel long training sessions."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Rich in fiber and steady carbs to sustain energy without spikes."
          },
          {
            name: "Quinoa",
            image: "/images/nutrition/quinoa.jpg",
            description: "High-protein grain with all essential amino acids for recovery."
          },
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Complex carbs with potassium to support muscle contractions."
          },
          {
            name: "Whole Wheat Roti",
            image: "/images/nutrition/roti.jpeg",
            description: "Whole grain carbs for energy and digestive health."
          }
        ]
      },
      {
        category: "Healthy Fats",
        foods: [
          {
            name: "Almonds",
            image: "/images/nutrition/almond.jpeg",
            description: "Vitamin E and healthy fats for muscle repair and skin health."
          },
          {
            name: "Walnuts",
            image: "/images/nutrition/walnuts.jpeg",
            description: "Omega-3 fatty acids to reduce inflammation in joints."
          },
          {
            name: "Chia Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Provide omega-3s, fiber, and minerals for energy and endurance."
          },
          {
            name: "Olive Oil",
            image: "/images/nutrition/olive oil.jpeg",
            description: "Heart-healthy fat that supports hormone production."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Healthy fats and potassium for sustained energy and recovery."
          }
        ]
      },
      {
        category: "Fruits & Veggies",
        foods: [
          {
            name: "Spinach",
            image: "/images/nutrition/spinach.jpg",
            description: "Iron-rich leafy green to boost endurance and reduce fatigue."
          },
          {
            name: "Broccoli",
            image: "/images/nutrition/brocli.jpg",
            description: "Packed with vitamin C and fiber for immunity and digestion."
          },
          {
            name: "Carrots",
            image: "/images/nutrition/carrots.jpg",
            description: "Beta-carotene for eye health and antioxidants for recovery."
          },
          {
            name: "Beetroot",
            image: "/images/nutrition/beetroots.webp",
            description: "Improves blood flow and oxygen delivery to muscles."
          },
          {
            name: "Citrus Fruits",
            image: "/images/nutrition/citrus.jpg",
            description: "Vitamin C-rich fruits to boost immunity and collagen production."
          }
        ]
      },
      {
        category: "Hydration",
        foods: [
          {
            name: "Water",
            image: "/images/nutrition/water.webp",
            description: "Maintains hydration and optimal muscle function."
          },
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolyte source for quick hydration."
          },
          {
            name: "Lemon Water",
            image: "/images/nutrition/lemonwater.jpg",
            description: "Refreshing hydration with vitamin C and mild electrolyte content."
          }
        ]
      },
      {
        category: "Supplements (if needed)",
        foods: [
          {
            name: "Whey Protein",
            image: "/images/nutrition/OIP (1).webp",
            description: "Convenient protein source to meet daily recovery needs."
          },
          {
            name: "Omega-3",
            image: "/images/nutrition/omega3.webp",
            description: "Supports joint health and reduces exercise-related inflammation."
          },
          {
            name: "Vitamin D",
            image: "/images/nutrition/OIP (2).webp",
            description: "Improves bone strength and muscle function."
          },
          {
            name: "Magnesium",
            image: "/images/nutrition/magnesium.webp",
            description: "Reduces cramps and supports muscle relaxation."
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
            image: "/images/nutrition/brownrice.jpg",
            description: "Fast-digesting carb that quickly boosts blood sugar for immediate energy during rallies."
          },
          {
            name: "Pasta",
            image: "/images/nutrition/pasta.webp",
            description: "Provides quick energy stores for explosive movements like spikes and jumps."
          },
          {
            name: "Bananas",
            image: "/images/nutrition/banana.jpg",
            description: "Natural quick carb with potassium to prevent cramps mid-match."
          },
          {
            name: "Dates",
            image: "/images/nutrition/dates.jpg",
            description: "Compact energy source packed with natural sugars and minerals for quick bursts."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Supplies simple carbs and electrolytes to keep performance high under fatigue."
          }
        ]
      },
      {
        category: "Low/Moderate-GI Carbs (post-match)",
        foods: [
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Complex carb that restores glycogen while providing potassium for muscle recovery."
          },
          {
            name: "Whole Wheat Bread",
            image: "/images/nutrition/bread.jpg",
            description: "Replenishes energy steadily while providing fiber for digestion."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Slow-digesting carb with beta-glucan to stabilize blood sugar after matches."
          }
        ]
      },
      {
        category: "Protein",
        foods: [
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "High-quality protein with essential amino acids for fast muscle repair."
          },
          {
            name: "Chicken",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Lean protein source to rebuild muscle tissue after repeated physical effort."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Protein plus omega-3s to reduce post-match inflammation."
          },
          {
            name: "Tofu",
            image: "/images/nutrition/tofu.jpg",
            description: "Plant-based protein rich in iron for oxygen delivery during recovery."
          },
          {
            name: "Lentils",
            image: "/images/nutrition/lentils.jpg",
            description: "Protein and complex carbs combined for muscle repair and sustained energy."
          }
        ]
      },
      {
        category: "Healthy Fats (small portions)",
        foods: [
          {
            name: "Nut Butter",
            image: "/images/nutrition/nutbutter.jpg",
            description: "Energy-dense fat for prolonged stamina without weighing down digestion."
          },
          {
            name: "Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Provide omega-3s and minerals to aid muscle contraction and recovery."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Potassium-rich healthy fat for smooth nerve and muscle function."
          }
        ]
      },
      {
        category: "Hydration + Electrolytes",
        foods: [
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolyte drink to replace salts lost in sweat."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Balanced electrolytes and carbs to maintain peak performance."
          },
          {
            name: "Lemon Water with Salt",
            image: "/images/nutrition/lemonwater.jpg",
            description: "Light hydration option with vitamin C and sodium to keep muscles firing."
          }
        ]
      },
      {
        category: "Micronutrients",
        foods: [
          {
            name: "Leafy Greens",
            image: "/images/nutrition/leafyveg.jpg",
            description: "Iron and antioxidants to keep endurance high and inflammation low."
          },
          {
            name: "Tomatoes",
            image: "/images/nutrition/tomato.webp",
            description: "Rich in lycopene to reduce oxidative stress from intense play."
          },
          {
            name: "Kiwi",
            image: "/images/nutrition/kiwi.jpeg",
            description: "High vitamin C content to support collagen and recovery."
          },
          {
            name: "Carrots",
            image: "/images/nutrition/carrots.jpg",
            description: "Beta-carotene for eye health and antioxidants for faster healing."
          }
        ]
      }
    ]
  };

  const kabaddiNutrition = {
    offseason: [
      {
        category: "Lean Protein",
        foods: [
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Complete protein with all essential amino acids to repair muscles after strength training."
          },
          {
            name: "Chicken Breast",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Low-fat, high-protein meat for building lean muscle without excess weight."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Rich in protein and omega-3s to reduce inflammation from heavy tackles."
          },
          {
            name: "Paneer",
            image: "/images/nutrition/paneer.jpg",
            description: "Slow-digesting protein that helps maintain muscle mass overnight."
          },
          {
            name: "Tofu",
            image: "/images/nutrition/tofu.jpg",
            description: "Plant-based protein rich in iron for sustained energy and oxygen delivery."
          },
          {
            name: "Greek Yogurt",
            image: "/images/nutrition/greekyogurt.jpg",
            description: "Protein plus probiotics for gut health and better nutrient absorption."
          }
        ]
      },
      {
        category: "Complex Carbs (moderate)",
        foods: [
          {
            name: "Brown Rice",
            image: "/images/nutrition/brownrice.jpg",
            description: "Complex carb for long-lasting energy during off-season gym sessions."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "High in fiber for steady energy release and better digestion."
          },
          {
            name: "Quinoa",
            image: "/images/nutrition/quinoa.jpg",
            description: "Contains both carbs and complete protein for recovery and muscle building."
          },
          {
            name: "Whole Wheat Roti",
            image: "/images/nutrition/roti.jpeg",
            description: "Complex carb source to refuel glycogen without blood sugar spikes."
          }
        ]
      },
      {
        category: "Healthy Fats",
        foods: [
          {
            name: "Almonds",
            image: "/images/nutrition/almond.jpeg",
            description: "Packed with vitamin E and healthy fats to protect joints."
          },
          {
            name: "Walnuts",
            image: "/images/nutrition/walnuts.jpeg",
            description: "Omega-3 fatty acids to reduce inflammation and improve recovery."
          },
          {
            name: "Flax Seeds",
            image: "/images/nutrition/flaxseeds.jpg",
            description: "Plant-based omega-3 source that supports heart and joint health."
          },
          {
            name: "Olive Oil",
            image: "/images/nutrition/olive oil.jpeg",
            description: "Healthy monounsaturated fat to support hormone production."
          }
        ]
      },
      {
        category: "Fruits & Veggies",
        foods: [
          {
            name: "Spinach",
            image: "/images/nutrition/leafyveg.jpg",
            description: "Rich in iron and magnesium for stamina and muscle function."
          },
          {
            name: "Broccoli",
            image: "/images/nutrition/brocli.jpg",
            description: "Antioxidant-rich and high in vitamin C to strengthen immunity."
          },
          {
            name: "Carrots",
            image: "/images/nutrition/carrots.jpg",
            description: "Beta-carotene to support vision and recovery from oxidative stress."
          },
          {
            name: "Citrus Fruits",
            image: "/images/nutrition/citrus.jpg",
            description: "High in vitamin C for faster healing and collagen production."
          },
          {
            name: "Berries",
            image: "/images/nutrition/berries.jpg",
            description: "Potent antioxidants to reduce soreness and boost recovery."
          }
        ]
      },
      {
        category: "Hydration",
        foods: [
          {
            name: "Water",
            image: "/images/nutrition/water.webp",
            description: "Maintains fluid balance for muscle contraction and flexibility."
          },
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolytes to prevent cramps during training."
          },
          {
            name: "Lemon Water",
            image: "/images/nutrition/lemonwater.jpg",
            description: "Hydrating with added vitamin C for immune support."
          }
        ]
      },
      {
        category: "Supplements (if needed)",
        foods: [
          {
            name: "Whey Protein",
            image: "/images/nutrition/OIP (1).webp",
            description: "Quick-digesting protein to aid post-workout recovery."
          },
          {
            name: "Omega-3",
            image: "/images/nutrition/omega3.webp",
            description: "Supports joint health and reduces inflammation."
          },
          {
            name: "Vitamin D",
            image: "/images/nutrition/OIP (2).webp",
            description: "Essential for bone strength and muscle function."
          },
          {
            name: "Calcium",
            image: "/images/nutrition/calicium.webp",
            description: "Maintains bone density and prevents injuries from high-impact play."
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
            image: "/images/nutrition/brownrice.jpg",
            description: "Easily digestible carb, quickly broken down into glucose for instant match energy."
          },
          {
            name: "Bananas",
            image: "/images/nutrition/banana.jpg",
            description: "Portable, quick sugar boost with potassium to prevent muscle cramps."
          },
          {
            name: "Dates",
            image: "/images/nutrition/dates.jpg",
            description: "Natural sugar source with some fiber; great for a pre-match snack without heaviness."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Rapid hydration plus glucose and electrolytes for quick energy release."
          }
        ]
      },
      {
        category: "Low/Moderate-GI Carbs (post-match)",
        foods: [
          {
            name: "Sweet Potatoes",
            image: "/images/nutrition/sweetpotato.jpg",
            description: "Complex carbs with vitamin A; steady energy release to aid muscle glycogen recovery."
          },
          {
            name: "Oats",
            image: "/images/nutrition/oats.jpg",
            description: "Slow-digesting carbs with fiber; supports steady refueling without sugar spikes."
          },
          {
            name: "Whole Wheat Bread",
            image: "/images/nutrition/bread.jpg",
            description: "Contains complex carbs and B vitamins to help energy metabolism post-game."
          }
        ]
      },
      {
        category: "Protein",
        foods: [
          {
            name: "Chicken",
            image: "/images/nutrition/chickenbreast.jpg",
            description: "Lean source of complete protein for repairing muscle fibers after tackles and sprints."
          },
          {
            name: "Eggs",
            image: "/images/nutrition/egg.jpg",
            description: "Contains all essential amino acids plus healthy fats for recovery."
          },
          {
            name: "Fish",
            image: "/images/nutrition/fish.jpg",
            description: "Rich in protein and omega-3 fats to reduce post-match inflammation."
          },
          {
            name: "Soy",
            image: "/images/nutrition/tofu.jpg",
            description: "Plant-based complete protein, good for vegetarian players to aid muscle repair."
          },
          {
            name: "Lentils",
            image: "/images/nutrition/lentils.jpg",
            description: "High-protein legumes with iron to support oxygen delivery to muscles."
          }
        ]
      },
      {
        category: "Healthy Fats (small portions)",
        foods: [
          {
            name: "Peanut Butter",
            image: "/images/nutrition/nutbutter.jpg",
            description: "Healthy fat source for sustained energy; pairs well with carbs for balanced recovery snacks."
          },
          {
            name: "Seeds",
            image: "/images/nutrition/seeds.jpeg",
            description: "Provide omega-3s and minerals; help joint health and reduce inflammation."
          },
          {
            name: "Avocado",
            image: "/images/nutrition/avacado.webp",
            description: "Rich in monounsaturated fats and potassium; helps maintain fluid balance and endurance."
          }
        ]
      },
      {
        category: "Hydration + Electrolytes",
        foods: [
          {
            name: "Coconut Water",
            image: "/images/nutrition/coconut.jpg",
            description: "Natural electrolytes, especially potassium, to prevent cramps."
          },
          {
            name: "Lemon Water with Salt",
            image: "/images/nutrition/lemonwater.jpg",
            description: "Restores sodium lost in sweat and boosts hydration without heavy sugar."
          },
          {
            name: "Sports Drinks",
            image: "/images/nutrition/sportsdrinks.jpg",
            description: "Replenish fluids and electrolytes quickly after intense play."
          }
        ]
      },
      {
        category: "Micronutrients",
        foods: [
          {
            name: "Leafy Greens",
            image: "/images/nutrition/leafyveg.jpg",
            description: "High in iron, magnesium, and antioxidants for stamina and faster recovery."
          },
          {
            name: "Beetroot",
            image: "/images/nutrition/beetroots.webp",
            description: "Nitrates improve blood flow and oxygen delivery to muscles for better performance."
          },
          {
            name: "Tomatoes",
            image: "/images/nutrition/tomato.webp",
            description: "Rich in vitamin C and antioxidants to combat muscle inflammation post-match."
          },
          {
            name: "Citrus Fruits",
            image: "/images/nutrition/citrus.jpg",
            description: "Vitamin C boosts immunity and collagen production for joint health."
          }
        ]
      }
    ]
  };

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

  const nutritionData = [
    {
      name: "Oatmeal with Honey",
      image: "/images/nutrition/oatmeal.jpg",
      description: "Complex carbs for sustained energy throughout the day."
    },
    {
      name: "Bananas",
      image: "/images/nutrition/banana.jpg",
      description: "Quick energy and potassium for muscle function."
    },
    {
      name: "Salmon",
      image: "/images/nutrition/salmon.jpg",
      description: "Omega-3 rich protein for heart and brain health."
    },
    {
      name: "Lean Beef",
      image: "/images/nutrition/beef.jpg",
      description: "Iron-rich protein for muscle strength."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1b26] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <button 
            onClick={() => navigate('/fitness')}
            className="mr-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Go back"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Sports Nutrition Guide</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-[#24283b] rounded-xl shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4 px-2">Sports</h2>
              <nav className="space-y-1">
                {sports.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSport(sport.id)}
                    className={
                      selectedSport === sport.id
                        ? "w-full flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-600 text-white"
                        : "w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-[#1a1b26] hover:text-white"
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
            <div className="bg-[#24283b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Essential Sports Nutrition</h2>
              
              {selectedSport === 'cricket' ? (
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    {seasons.map((season) => (
                      <button
                        key={season.id}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          selectedSeason === season.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#1a1b26] text-gray-300 hover:bg-opacity-80 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{season.icon}</span>
                        <span className="font-medium">{season.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedSeason === 'offseason' ? (
                    <div className="space-y-8">
                      {cricketNutrition.offseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {cricketNutrition.onseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : selectedSport === 'badminton' ? (
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    {seasons.map((season) => (
                      <button
                        key={season.id}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          selectedSeason === season.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#1a1b26] text-gray-300 hover:bg-opacity-80 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{season.icon}</span>
                        <span className="font-medium">{season.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedSeason === 'offseason' ? (
                    <div className="space-y-8">
                      {badmintonNutrition.offseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {badmintonNutrition.onseason && badmintonNutrition.onseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : selectedSport === 'football' ? (
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    {seasons.map((season) => (
                      <button
                        key={season.id}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          selectedSeason === season.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#1a1b26] text-gray-300 hover:bg-opacity-80 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{season.icon}</span>
                        <span className="font-medium">{season.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedSeason === 'offseason' ? (
                    <div className="space-y-8">
                      {footballNutrition.offseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {footballNutrition.onseason && footballNutrition.onseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : selectedSport === 'volleyball' ? (
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    {seasons.map((season) => (
                      <button
                        key={season.id}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          selectedSeason === season.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#1a1b26] text-gray-300 hover:bg-opacity-80 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{season.icon}</span>
                        <span className="font-medium">{season.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedSeason === 'offseason' ? (
                    <div className="space-y-8">
                      {volleyballNutrition.offseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {volleyballNutrition.onseason && volleyballNutrition.onseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : selectedSport === 'kabaddi' ? (
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    {seasons.map((season) => (
                      <button
                        key={season.id}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          selectedSeason === season.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#1a1b26] text-gray-300 hover:bg-opacity-80 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{season.icon}</span>
                        <span className="font-medium">{season.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  {selectedSeason === 'offseason' ? (
                    <div className="space-y-8">
                      {kabaddiNutrition.offseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {kabaddiNutrition.onseason && kabaddiNutrition.onseason.map((group, groupIndex) => (
                        <div key={groupIndex} className="space-y-4">
                          <h3 className="text-lg font-semibold text-blue-400">{group.category}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {group.foods.map((food, index) => (
                              <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                <div className="h-48 overflow-hidden">
                                  <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4">
                                  <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                                  <p className="text-gray-400 text-sm">{food.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {nutritionData.map((food, index) => (
                    <div key={index} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-white">{food.name}</h3>
                        <p className="text-gray-400 text-sm">{food.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;
