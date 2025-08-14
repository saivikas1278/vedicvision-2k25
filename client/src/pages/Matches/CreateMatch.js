import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaFutbol, FaTableTennis, FaRunning, FaVolleyballBall, FaBasketballBall,
  FaArrowRight, FaBaseballBall
} from 'react-icons/fa';
import { GiWhistle } from 'react-icons/gi';

const CreateMatch = () => {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState(null);

  const sportsOptions = [
    { id: 'cricket', name: 'Cricket', icon: <FaBaseballBall className="h-8 w-8 text-green-600" />, color: 'bg-green-100' },
    { id: 'badminton', name: 'Badminton', icon: <FaTableTennis className="h-8 w-8 text-yellow-600" />, color: 'bg-yellow-100' },
    { id: 'kabaddi', name: 'Kabaddi', icon: <FaRunning className="h-8 w-8 text-orange-600" />, color: 'bg-orange-100' },
    { id: 'volleyball', name: 'Volleyball', icon: <FaVolleyballBall className="h-8 w-8 text-blue-600" />, color: 'bg-blue-100' },
    { id: 'basketball', name: 'Basketball', icon: <FaBasketballBall className="h-8 w-8 text-red-600" />, color: 'bg-red-100' },
  ];

  const handleSportSelect = (sportId) => {
    setSelectedSport(sportId);
    // After a short delay, navigate to the team selection page
    setTimeout(() => {
      navigate(`/matches/create/${sportId}/teams`);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Match</h1>
          <p className="text-gray-600">Select a sport to create a new match</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportsOptions.map((sport) => (
            <button
              key={sport.id}
              onClick={() => handleSportSelect(sport.id)}
              className={`p-6 rounded-lg shadow transition-all ${
                selectedSport === sport.id 
                  ? 'ring-2 ring-blue-500 transform scale-105' 
                  : 'hover:shadow-md hover:scale-105'
              } ${sport.color}`}
            >
              <div className="flex flex-col items-center">
                {sport.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-800">{sport.name}</h3>
                <div className={`mt-3 ${selectedSport === sport.id ? 'visible' : 'invisible'}`}>
                  <FaArrowRight className="text-blue-600" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            <GiWhistle className="inline-block mr-1" />
            Create a new match to track scores, player statistics and team performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;
