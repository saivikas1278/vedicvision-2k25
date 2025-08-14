import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBaseballBall, FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const CricketCreateMatch = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    matchTitle: '',
    matchType: 'T20',
    overs: 20,
    venue: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    team1: '',
    team2: '',
    team1Players: Array(11).fill({ name: '', role: 'Batsman' }),
    team2Players: Array(11).fill({ name: '', role: 'Batsman' }),
    customTeam1Name: '',
    customTeam2Name: '',
    useCustomTeams: false
  });

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        setTeams([
          { id: '1', name: 'Super Kings' },
          { id: '2', name: 'Royal Challengers' },
          { id: '3', name: 'Mumbai Indians' },
          { id: '4', name: 'Delhi Capitals' },
          { id: '5', name: 'Kolkata Knight Riders' },
          { id: '6', name: 'Rajasthan Royals' },
          { id: '7', name: 'Punjab Kings' },
          { id: '8', name: 'Sunrisers' }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        showToast('Failed to load teams', 'error');
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handlePlayerChange = (teamKey, index, field, value) => {
    setFormData(prevData => {
      const updatedPlayers = [...prevData[teamKey]];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        [field]: value
      };
      return {
        ...prevData,
        [teamKey]: updatedPlayers
      };
    });
  };

  const addPlayer = (teamKey) => {
    setFormData(prevData => ({
      ...prevData,
      [teamKey]: [...prevData[teamKey], { name: '', role: 'Batsman' }]
    }));
  };

  const removePlayer = (teamKey, index) => {
    if (formData[teamKey].length <= 11) {
      showToast('A team must have at least 11 players', 'warning');
      return;
    }
    
    setFormData(prevData => {
      const updatedPlayers = [...prevData[teamKey]];
      updatedPlayers.splice(index, 1);
      return {
        ...prevData,
        [teamKey]: updatedPlayers
      };
    });
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.matchTitle) {
      showToast('Match title is required', 'error');
      return false;
    }
    
    if (!formData.venue) {
      showToast('Venue is required', 'error');
      return false;
    }
    
    if (formData.useCustomTeams) {
      if (!formData.customTeam1Name) {
        showToast('First team name is required', 'error');
        return false;
      }
      
      if (!formData.customTeam2Name) {
        showToast('Second team name is required', 'error');
        return false;
      }
      
      // Check if all players have names
      const team1HasEmptyPlayers = formData.team1Players.some(player => !player.name);
      const team2HasEmptyPlayers = formData.team2Players.some(player => !player.name);
      
      if (team1HasEmptyPlayers) {
        showToast('All players in first team must have names', 'error');
        return false;
      }
      
      if (team2HasEmptyPlayers) {
        showToast('All players in second team must have names', 'error');
        return false;
      }
    } else {
      if (!formData.team1) {
        showToast('Please select the first team', 'error');
        return false;
      }
      
      if (!formData.team2) {
        showToast('Please select the second team', 'error');
        return false;
      }
      
      if (formData.team1 === formData.team2) {
        showToast('Please select different teams', 'error');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful creation
      showToast('Cricket match created successfully', 'success');
      navigate('/cricket');
    } catch (error) {
      console.error('Error creating match:', error);
      showToast('Failed to create match', 'error');
      setIsSubmitting(false);
    }
  };

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
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/cricket')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaBaseballBall className="mr-3 text-green-600" /> Create Cricket Match
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="matchTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Match Title*
              </label>
              <input
                type="text"
                id="matchTitle"
                name="matchTitle"
                value={formData.matchTitle}
                onChange={handleInputChange}
                placeholder="e.g., Super Kings vs Royal Challengers"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
                Venue*
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="e.g., Central Stadium"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label htmlFor="matchType" className="block text-sm font-medium text-gray-700 mb-1">
                Match Type
              </label>
              <select
                id="matchType"
                name="matchType"
                value={formData.matchType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="T20">T20</option>
                <option value="ODI">ODI</option>
                <option value="Test">Test</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label htmlFor="overs" className="block text-sm font-medium text-gray-700 mb-1">
                Overs
              </label>
              <input
                type="number"
                id="overs"
                name="overs"
                value={formData.overs}
                onChange={handleInputChange}
                min="1"
                max="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="useCustomTeams"
                name="useCustomTeams"
                checked={formData.useCustomTeams}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="useCustomTeams" className="ml-2 text-sm font-medium text-gray-700">
                Create custom teams (with players)
              </label>
            </div>

            {formData.useCustomTeams ? (
              <div className="space-y-6">
                {/* Team 1 Custom */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Team 1</h3>
                  
                  <div className="mb-4">
                    <label htmlFor="customTeam1Name" className="block text-sm font-medium text-gray-700 mb-1">
                      Team Name*
                    </label>
                    <input
                      type="text"
                      id="customTeam1Name"
                      name="customTeam1Name"
                      value={formData.customTeam1Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required={formData.useCustomTeams}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Players*</h4>
                    
                    {formData.team1Players.map((player, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-8 text-center text-sm text-gray-500">{index + 1}.</div>
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => handlePlayerChange('team1Players', index, 'name', e.target.value)}
                          placeholder="Player name"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          required={formData.useCustomTeams}
                        />
                        <select
                          value={player.role}
                          onChange={(e) => handlePlayerChange('team1Players', index, 'role', e.target.value)}
                          className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="Batsman">Batsman</option>
                          <option value="Bowler">Bowler</option>
                          <option value="All-rounder">All-rounder</option>
                          <option value="Wicket-keeper">Wicket-keeper</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removePlayer('team1Players', index)}
                          className="p-2 text-red-500 hover:text-red-700"
                          aria-label="Remove player"
                        >
                          <FaMinus size={14} />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => addPlayer('team1Players')}
                      className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                    >
                      <FaPlus className="mr-2" size={12} /> Add Player
                    </button>
                  </div>
                </div>
                
                {/* Team 2 Custom */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Team 2</h3>
                  
                  <div className="mb-4">
                    <label htmlFor="customTeam2Name" className="block text-sm font-medium text-gray-700 mb-1">
                      Team Name*
                    </label>
                    <input
                      type="text"
                      id="customTeam2Name"
                      name="customTeam2Name"
                      value={formData.customTeam2Name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required={formData.useCustomTeams}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Players*</h4>
                    
                    {formData.team2Players.map((player, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-8 text-center text-sm text-gray-500">{index + 1}.</div>
                        <input
                          type="text"
                          value={player.name}
                          onChange={(e) => handlePlayerChange('team2Players', index, 'name', e.target.value)}
                          placeholder="Player name"
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          required={formData.useCustomTeams}
                        />
                        <select
                          value={player.role}
                          onChange={(e) => handlePlayerChange('team2Players', index, 'role', e.target.value)}
                          className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="Batsman">Batsman</option>
                          <option value="Bowler">Bowler</option>
                          <option value="All-rounder">All-rounder</option>
                          <option value="Wicket-keeper">Wicket-keeper</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removePlayer('team2Players', index)}
                          className="p-2 text-red-500 hover:text-red-700"
                          aria-label="Remove player"
                        >
                          <FaMinus size={14} />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => addPlayer('team2Players')}
                      className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                    >
                      <FaPlus className="mr-2" size={12} /> Add Player
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team 1 Select */}
                <div>
                  <label htmlFor="team1" className="block text-sm font-medium text-gray-700 mb-1">
                    Team 1*
                  </label>
                  <select
                    id="team1"
                    name="team1"
                    value={formData.team1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required={!formData.useCustomTeams}
                  >
                    <option value="">Select Team 1</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Team 2 Select */}
                <div>
                  <label htmlFor="team2" className="block text-sm font-medium text-gray-700 mb-1">
                    Team 2*
                  </label>
                  <select
                    id="team2"
                    name="team2"
                    value={formData.team2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    required={!formData.useCustomTeams}
                  >
                    <option value="">Select Team 2</option>
                    {teams.map(team => (
                      <option 
                        key={team.id} 
                        value={team.id}
                        disabled={team.id === formData.team1}
                      >
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/cricket')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Creating...
                </span>
              ) : (
                'Create Match'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CricketCreateMatch;
