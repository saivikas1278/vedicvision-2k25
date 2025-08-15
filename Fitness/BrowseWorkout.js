import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDumbbell, FaClock, FaFire, FaHeart, FaPlay } from 'react-icons/fa';
import { GiCricketBat, GiVolleyballBall, GiSoccerKick, GiRunningNinja } from 'react-icons/gi';
import { MdSportsTennis } from 'react-icons/md';
import { IoFitnessOutline } from 'react-icons/io5';

const BrowseWorkout = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [videoErrors, setVideoErrors] = useState({});
  const videoRefs = useRef({});

  // Handle video play/pause based on hover state
  useEffect(() => {
    Object.keys(videoRefs.current).forEach(workoutId => {
      const video = videoRefs.current[workoutId];
      if (video) {
        if (hoveredVideo === parseInt(workoutId)) {
          video.play().catch(() => {
            // Silently handle play errors
          });
        } else {
          video.pause();
        }
      }
    });

    // Cleanup function to pause all videos when component unmounts
    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
        }
      });
    };
  }, [hoveredVideo]);

  const sports = [
    { id: 'all', name: 'All Sports', icon: <IoFitnessOutline className="w-6 h-6" /> },
    { id: 'cricket', name: 'Cricket', icon: <GiCricketBat className="w-6 h-6" /> },
    { id: 'badminton', name: 'Badminton', icon: <MdSportsTennis className="w-6 h-6" /> },
    { id: 'football', name: 'Football', icon: <GiSoccerKick className="w-6 h-6" /> },
    { id: 'volleyball', name: 'Volleyball', icon: <GiVolleyballBall className="w-6 h-6" /> },
    { id: 'kabaddi', name: 'Kabaddi', icon: <GiRunningNinja className="w-6 h-6" /> }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', color: 'text-gray-400' },
    { id: 'beginner', name: 'Beginner', color: 'text-green-400' },
    { id: 'intermediate', name: 'Intermediate', color: 'text-yellow-400' },
    { id: 'advanced', name: 'Advanced', color: 'text-red-400' }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: <FaDumbbell className="w-4 h-4" /> },
    { id: 'strength', name: 'Strength Training', icon: <FaDumbbell className="w-4 h-4" /> },
    { id: 'cardio', name: 'Cardio', icon: <FaFire className="w-4 h-4" /> },
    { id: 'flexibility', name: 'Flexibility', icon: <IoFitnessOutline className="w-4 h-4" /> },
    { id: 'hiit', name: 'HIIT', icon: <FaFire className="w-4 h-4" /> },
    { id: 'sports-specific', name: 'Sports Specific', icon: <MdSportsTennis className="w-4 h-4" /> }
  ];

  const cricketWorkouts = {
    beginner: [
      {
        id: 1,
        name: "Cricket Basics - Upper Body",
        sport: "cricket",
        difficulty: "beginner",
        category: "strength",
        duration: 30,
        calories: 180,
        exercises: 8,
        description: "Focus on building basic upper body strength for batting and bowling.",
        videoUrl: "/images/workout%20videos/video1.mp4",
        tags: ["Upper Body", "Strength", "Beginner"]
      },
      {
        id: 2,
        name: "Cricket Cardio Foundation",
        sport: "cricket",
        difficulty: "beginner",
        category: "cardio",
        duration: 25,
        calories: 200,
        exercises: 6,
        description: "Basic cardio exercises to improve stamina and endurance for cricket.",
        videoUrl: "/images/workout%20videos/video18.mp4",
        tags: ["Cardio", "Endurance", "Beginner"]
      }
    ],
    intermediate: [
      {
        id: 3,
        name: "Cricket Power Training",
        sport: "cricket",
        difficulty: "intermediate",
        category: "strength",
        duration: 45,
        calories: 270,
        exercises: 10,
        description: "Advanced strength training focusing on power and explosive movements.",
        videoUrl: "/images/workout%20videos/video3.mp4",
        tags: ["Power", "Strength", "Intermediate"]
      },
      {
        id: 4,
        name: "Cricket Agility & Speed",
        sport: "cricket",
        difficulty: "intermediate",
        category: "hiit",
        duration: 35,
        calories: 280,
        exercises: 8,
        description: "HIIT workout to improve agility, speed, and quick reflexes.",
        videoUrl: "/images/workout%20videos/video4.mp4",
        tags: ["HIIT", "Agility", "Intermediate"]
      }
    ],
    advanced: [
      {
        id: 5,
        name: "Elite Cricket Performance",
        sport: "cricket",
        difficulty: "advanced",
        category: "sports-specific",
        duration: 60,
        calories: 400,
        exercises: 12,
        description: "Comprehensive workout combining strength, power, and cricket-specific movements.",
        videoUrl: "/images/workout%20videos/video5.mp4",
        tags: ["Performance", "Advanced", "Sports Specific"]
      }
    ]
  };

  const badmintonWorkouts = {
    beginner: [
      {
        id: 6,
        name: "Badminton Fundamentals",
        sport: "badminton",
        difficulty: "beginner",
        category: "strength",
        duration: 30,
        calories: 180,
        exercises: 7,
        description: "Basic strength training focusing on badminton-specific muscle groups.",
        videoUrl: "/images/workout%20videos/video6.mp4",
        tags: ["Fundamentals", "Strength", "Beginner"]
      }
    ],
    intermediate: [
      {
        id: 7,
        name: "Badminton Power & Speed",
        sport: "badminton",
        difficulty: "intermediate",
        category: "hiit",
        duration: 40,
        calories: 320,
        exercises: 9,
        description: "HIIT workout to improve power, speed, and court movement.",
        videoUrl: "/images/workout%20videos/video7.mp4",
        tags: ["Power", "Speed", "Intermediate"]
      }
    ],
    advanced: [
      {
        id: 8,
        name: "Professional Badminton Training",
        sport: "badminton",
        difficulty: "advanced",
        category: "sports-specific",
        duration: 55,
        calories: 440,
        exercises: 11,
        description: "Advanced training program for professional badminton players.",
        videoUrl: "/images/workout%20videos/video8.mp4",
        tags: ["Professional", "Advanced", "Sports Specific"]
      }
    ]
  };

  const footballWorkouts = {
    beginner: [
      {
        id: 9,
        name: "Football Basics - Lower Body",
        sport: "football",
        difficulty: "beginner",
        category: "strength",
        duration: 35,
        calories: 210,
        exercises: 8,
        description: "Basic lower body strength training for football players.",
        videoUrl: "/images/workout%20videos/video9.mp4",
        tags: ["Lower Body", "Strength", "Beginner"]
      }
    ],
    intermediate: [
      {
        id: 10,
        name: "Football Endurance & Power",
        sport: "football",
        difficulty: "intermediate",
        category: "cardio",
        duration: 45,
        calories: 360,
        exercises: 10,
        description: "Cardio and strength combination for improved football performance.",
        videoUrl: "/images/workout%20videos/video10.mp4",
        tags: ["Endurance", "Power", "Intermediate"]
      }
    ],
    advanced: [
      {
        id: 11,
        name: "Elite Football Conditioning",
        sport: "football",
        difficulty: "advanced",
        category: "sports-specific",
        duration: 65,
        calories: 520,
        exercises: 13,
        description: "Advanced conditioning program for elite football performance.",
        videoUrl: "/images/workout%20videos/video11.mp4",
        tags: ["Elite", "Conditioning", "Advanced"]
      }
    ]
  };

  const volleyballWorkouts = {
    beginner: [
      {
        id: 12,
        name: "Volleyball Jump Training",
        sport: "volleyball",
        difficulty: "beginner",
        category: "strength",
        duration: 30,
        calories: 180,
        exercises: 7,
        description: "Basic jump training and lower body strength for volleyball.",
        videoUrl: "/images/workout%20videos/video12.mp4",
        tags: ["Jump Training", "Strength", "Beginner"]
      }
    ],
    intermediate: [
      {
        id: 13,
        name: "Volleyball Power & Agility",
        sport: "volleyball",
        difficulty: "intermediate",
        category: "hiit",
        duration: 40,
        calories: 320,
        exercises: 9,
        description: "HIIT workout focusing on power, agility, and vertical jump.",
        videoUrl: "/images/workout%20videos/video13.mp4",
        tags: ["Power", "Agility", "Intermediate"]
      }
    ],
    advanced: [
      {
        id: 14,
        name: "Professional Volleyball Training",
        sport: "volleyball",
        difficulty: "advanced",
        category: "sports-specific",
        duration: 60,
        calories: 480,
        exercises: 12,
        description: "Advanced training program for professional volleyball players.",
        videoUrl: "/images/workout%20videos/video14.mp4",
        tags: ["Professional", "Advanced", "Sports Specific"]
      }
    ]
  };

  const kabaddiWorkouts = {
    beginner: [
      {
        id: 15,
        name: "Kabaddi Core Strength",
        sport: "kabaddi",
        difficulty: "beginner",
        category: "strength",
        duration: 30,
        calories: 180,
        exercises: 7,
        description: "Core strength training essential for kabaddi players.",
        videoUrl: "/images/workout%20videos/video15.mp4",
        tags: ["Core", "Strength", "Beginner"]
      }
    ],
    intermediate: [
      {
        id: 16,
        name: "Kabaddi Power & Stamina",
        sport: "kabaddi",
        difficulty: "intermediate",
        category: "cardio",
        duration: 45,
        calories: 360,
        exercises: 10,
        description: "Cardio and strength training for improved kabaddi performance.",
        videoUrl: "/images/workout%20videos/video16.mp4",
        tags: ["Power", "Stamina", "Intermediate"]
      }
    ],
    advanced: [
      {
        id: 17,
        name: "Elite Kabaddi Conditioning",
        sport: "kabaddi",
        difficulty: "advanced",
        category: "sports-specific",
        duration: 55,
        calories: 440,
        exercises: 11,
        description: "Advanced conditioning program for elite kabaddi players.",
        videoUrl: "/images/workout%20videos/video17.mp4",
        tags: ["Elite", "Conditioning", "Advanced"]
      }
    ]
  };

  const allWorkouts = [
    ...Object.values(cricketWorkouts).flat(),
    ...Object.values(badmintonWorkouts).flat(),
    ...Object.values(footballWorkouts).flat(),
    ...Object.values(volleyballWorkouts).flat(),
    ...Object.values(kabaddiWorkouts).flat()
  ];

  const getFilteredWorkouts = () => {
    return allWorkouts.filter(workout => {
      const sportMatch = selectedSport === 'all' || workout.sport === selectedSport;
      const difficultyMatch = selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty;
      const categoryMatch = selectedCategory === 'all' || workout.category === selectedCategory;
      
      return sportMatch && difficultyMatch && categoryMatch;
    });
  };

  const filteredWorkouts = getFilteredWorkouts();

  const handleWorkoutSelect = (workout) => {
    // Navigate to workout details or start workout
    navigate(`/fitness/workout/${workout.id}`, { state: { workout } });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'strength': return <FaDumbbell className="w-4 h-4" />;
      case 'cardio': return <FaFire className="w-4 h-4" />;
      case 'flexibility': return <IoFitnessOutline className="w-4 h-4" />;
      case 'hiit': return <FaFire className="w-4 h-4" />;
      case 'sports-specific': return <MdSportsTennis className="w-4 h-4" />;
      default: return <FaDumbbell className="w-4 h-4" />;
    }
  };

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
          <h1 className="text-2xl font-bold">Browse Workouts</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="space-y-6">
              {/* Sports Filter */}
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

              {/* Difficulty Filter */}
              <div className="bg-[#24283b] rounded-xl shadow-lg p-4">
                <h2 className="text-xl font-semibold mb-4 px-2">Difficulty Level</h2>
                <nav className="space-y-1">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={
                        selectedDifficulty === difficulty.id
                          ? "w-full flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-600 text-white"
                          : "w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-[#1a1b26] hover:text-white"
                      }
                    >
                      <span className={`mr-3 ${difficulty.color}`}>●</span>
                      <span className="font-medium">{difficulty.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Category Filter */}
              <div className="bg-[#24283b] rounded-xl shadow-lg p-4">
                <h2 className="text-xl font-semibold mb-4 px-2">Categories</h2>
                <nav className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={
                        selectedCategory === category.id
                          ? "w-full flex items-center px-4 py-3 rounded-lg transition-colors bg-blue-600 text-white"
                          : "w-full flex items-center px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-[#1a1b26] hover:text-white"
                      }
                    >
                      <span className="mr-3">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-[#24283b] rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Available Workouts</h2>
                <div className="text-gray-400">
                  {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
                </div>
              </div>
              
              {filteredWorkouts.length === 0 ? (
                <div className="text-center py-12">
                  <FaDumbbell size={64} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-400 mb-2">No workouts found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more workouts.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredWorkouts.map((workout) => (
                    <div key={workout.id} className="bg-[#1a1b26] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                      {/* Video Preview */}
                      {workout.videoUrl && !videoErrors[workout.id] ? (
                        <div 
                          className="h-48 overflow-hidden"
                          onMouseEnter={() => setHoveredVideo(workout.id)}
                          onMouseLeave={() => setHoveredVideo(null)}
                        >
                          <video
                            ref={(el) => {
                              if (el) {
                                videoRefs.current[workout.id] = el;
                              }
                            }}
                            className="w-full h-full object-cover"
                            preload="metadata"
                            poster="/images/workout/video-poster.jpg"
                            muted
                            loop
                            onError={(e) => {
                              // Handle video loading errors gracefully
                              console.warn(`Failed to load video: ${workout.videoUrl}`);
                              setVideoErrors(prev => ({ ...prev, [workout.id]: true }));
                            }}
                          >
                            <source src={workout.videoUrl} type="video/mp4" />
                          </video>
                        </div>
                      ) : workout.videoUrl && videoErrors[workout.id] ? (
                        // Fallback for failed videos
                        <div className="h-48 bg-gray-800 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <FaDumbbell size={32} className="mx-auto mb-2" />
                            <p className="text-sm">Video unavailable</p>
                          </div>
                        </div>
                      ) : null}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{workout.name}</h3>
                          <span className={`text-sm font-medium px-2 py-1 rounded-full ${getDifficultyColor(workout.difficulty)} bg-opacity-20 bg-current`}>
                            {workout.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-3">{workout.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-gray-400 text-sm">
                            <FaClock className="mr-1" />
                            {workout.duration} min
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <FaFire className="mr-1" />
                            {workout.calories} cal
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <FaDumbbell className="mr-1" />
                            {workout.exercises} ex
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {workout.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-blue-600 bg-opacity-20 text-blue-400 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => handleWorkoutSelect(workout)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                        >
                          <FaPlay className="mr-2" size={12} />
                          Start Workout
                        </button>
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

export default BrowseWorkout; 