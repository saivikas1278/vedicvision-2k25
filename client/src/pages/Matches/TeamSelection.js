import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaUsers, FaPlus, FaUserPlus, FaSearch, FaCheck, FaTimes,
  FaSave, FaPlayCircle
} from 'react-icons/fa';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { showToast } from '../../utils/toast';

const TeamSelection = () => {
  const { sportId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [team1, setTeam1] = useState({ name: '', players: [] });
  const [team2, setTeam2] = useState({ name: '', players: [] });
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(1); // 1 for team1, 2 for team2
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  
  // Default configurations based on sport
  const sportConfigs = {
    cricket: { minPlayers: 11, maxPlayers: 15, title: 'Cricket Match' },
    badminton: { minPlayers: 1, maxPlayers: 2, title: 'Badminton Match' },
    kabaddi: { minPlayers: 7, maxPlayers: 10, title: 'Kabaddi Match' },
    volleyball: { minPlayers: 6, maxPlayers: 12, title: 'Volleyball Match' },
    basketball: { minPlayers: 5, maxPlayers: 12, title: 'Basketball Match' },
  };
  
  const currentConfig = sportConfigs[sportId] || { minPlayers: 5, maxPlayers: 10, title: 'Sports Match' };
  
  useEffect(() => {
    // Simulate fetching players from API
    const fetchPlayers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would come from your API
        const mockPlayers = [
          { id: 1, name: 'John Smith', avatar: null, sport: 'cricket', position: 'Batsman', rating: 4.5 },
          { id: 2, name: 'Maria Garcia', avatar: null, sport: 'cricket', position: 'Bowler', rating: 4.8 },
          { id: 3, name: 'David Johnson', avatar: null, sport: 'cricket', position: 'All-rounder', rating: 4.2 },
          { id: 4, name: 'Sarah Wilson', avatar: null, sport: 'badminton', position: 'Singles', rating: 4.7 },
          { id: 5, name: 'Michael Brown', avatar: null, sport: 'badminton', position: 'Doubles', rating: 4.1 },
          { id: 6, name: 'Jennifer Lee', avatar: null, sport: 'volleyball', position: 'Setter', rating: 4.6 },
          { id: 7, name: 'Robert Davis', avatar: null, sport: 'volleyball', position: 'Libero', rating: 4.3 },
          { id: 8, name: 'Lisa Anderson', avatar: null, sport: 'basketball', position: 'Point Guard', rating: 4.9 },
          { id: 9, name: 'James Thomas', avatar: null, sport: 'basketball', position: 'Center', rating: 4.4 },
          { id: 10, name: 'Patricia Moore', avatar: null, sport: 'kabaddi', position: 'Raider', rating: 4.2 },
          { id: 11, name: 'Kevin White', avatar: null, sport: 'kabaddi', position: 'Corner', rating: 4.5 },
          { id: 12, name: 'Alex Johnson', avatar: null, sport: 'cricket', position: 'Batsman', rating: 4.3 },
          { id: 13, name: 'Emma Wilson', avatar: null, sport: 'cricket', position: 'Bowler', rating: 4.6 },
          { id: 14, name: 'Ryan Garcia', avatar: null, sport: 'cricket', position: 'Wicket Keeper', rating: 4.7 },
          { id: 15, name: 'Sophia Martinez', avatar: null, sport: 'cricket', position: 'All-rounder', rating: 4.1 },
        ];
        
        // Filter players relevant to the selected sport
        const filteredPlayers = mockPlayers.filter(player => 
          player.sport === sportId || player.sport === 'all'
        );
        
        setAvailablePlayers(filteredPlayers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        showToast('Failed to load players', 'error');
        setLoading(false);
      }
    };
    
    fetchPlayers();
  }, [sportId]);
  
  const handlePlayerSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredPlayers = availablePlayers.filter(player => {
    // Don't show players already in either team
    const isInTeam1 = team1.players.some(p => p.id === player.id);
    const isInTeam2 = team2.players.some(p => p.id === player.id);
    
    if (isInTeam1 || isInTeam2) return false;
    
    // Filter by search term
    return player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (player.position && player.position.toLowerCase().includes(searchTerm.toLowerCase()));
  });
  
  const handleAddPlayer = (player) => {
    if (selectedTeam === 1) {
      if (team1.players.length >= currentConfig.maxPlayers) {
        showToast(`Team 1 already has maximum ${currentConfig.maxPlayers} players`, 'warning');
        return;
      }
      setTeam1({
        ...team1,
        players: [...team1.players, player]
      });
    } else {
      if (team2.players.length >= currentConfig.maxPlayers) {
        showToast(`Team 2 already has maximum ${currentConfig.maxPlayers} players`, 'warning');
        return;
      }
      setTeam2({
        ...team2,
        players: [...team2.players, player]
      });
    }
    setShowPlayerModal(false);
  };
  
  const handleRemovePlayer = (teamNum, playerId) => {
    if (teamNum === 1) {
      setTeam1({
        ...team1,
        players: team1.players.filter(p => p.id !== playerId)
      });
    } else {
      setTeam2({
        ...team2,
        players: team2.players.filter(p => p.id !== playerId)
      });
    }
  };
  
  const handleStartMatch = () => {
    // Validate teams before starting
    if (!team1.name || !team2.name) {
      showToast('Please enter names for both teams', 'error');
      return;
    }
    
    if (team1.players.length < currentConfig.minPlayers) {
      showToast(`Team 1 needs at least ${currentConfig.minPlayers} players`, 'error');
      return;
    }
    
    if (team2.players.length < currentConfig.minPlayers) {
      showToast(`Team 2 needs at least ${currentConfig.minPlayers} players`, 'error');
      return;
    }
    
    // Create match object
    const matchData = {
      sport: sportId,
      homeTeam: team1.id || 'mock-team-1', // In a real app, this would be the actual team ID
      awayTeam: team2.id || 'mock-team-2', // In a real app, this would be the actual team ID
      tournament: 'mock-tournament', // In a real app, this would be the tournament ID if applicable
      round: 'friendly', // Or would come from tournament structure
      matchNumber: 1,
      scheduledTime: new Date().toISOString(),
      venue: {
        name: 'Local Venue',
        city: 'Local City'
      },
      homeTeamData: team1, // Store complete team data for mock mode
      awayTeamData: team2, // Store complete team data for mock mode
      status: 'live'
    };
    
    // In a real app, you would dispatch this to Redux
    // dispatch(createMatch(matchData));
    
    // For now, store in localStorage for demo purposes
    const matchId = Date.now().toString();
    localStorage.setItem(`match_${matchId}`, JSON.stringify(matchData));
    
    // Show success message
    showToast('Match created successfully!', 'success');
    
    // Navigate to scoring page based on sport type
    if (sportId === 'cricket') {
      navigate(`/matches/score/cricket/${matchId}`);
    } else {
      // For other sports, we would have different scoring routes
      navigate(`/matches/score/${sportId}/${matchId}`);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentConfig.title} Setup</h1>
          <p className="text-gray-600">Select teams and players for your match</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team 1 */}
          <div className={`bg-white rounded-lg shadow-md p-6 ${selectedTeam === 1 ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Team 1</h2>
              <button
                onClick={() => { setSelectedTeam(1); setShowPlayerModal(true); }}
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                <FaUserPlus className="mr-1" />
                Add Player
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="team1-name" className="block text-sm font-medium text-gray-700 mb-1">
                Team Name *
              </label>
              <input
                id="team1-name"
                type="text"
                value={team1.name}
                onChange={(e) => setTeam1({ ...team1, name: e.target.value })}
                placeholder="Enter team name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Players ({team1.players.length}/{currentConfig.maxPlayers})</h3>
              {team1.players.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded border border-gray-200">
                  <FaUsers className="mx-auto text-gray-400 text-2xl mb-2" />
                  <p className="text-gray-500">No players added yet</p>
                  <button
                    onClick={() => { setSelectedTeam(1); setShowPlayerModal(true); }}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Add players
                  </button>
                </div>
              ) : (
                <ul className="space-y-2">
                  {team1.players.map((player) => (
                    <li 
                      key={player.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {player.avatar ? (
                            <img src={player.avatar} alt={player.name} className="w-full h-full rounded-full" />
                          ) : (
                            <span className="text-gray-500 font-medium">
                              {player.name.substring(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">{player.name}</p>
                          <p className="text-xs text-gray-500">{player.position}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemovePlayer(1, player.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Team 2 */}
          <div className={`bg-white rounded-lg shadow-md p-6 ${selectedTeam === 2 ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Team 2</h2>
              <button
                onClick={() => { setSelectedTeam(2); setShowPlayerModal(true); }}
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                <FaUserPlus className="mr-1" />
                Add Player
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="team2-name" className="block text-sm font-medium text-gray-700 mb-1">
                Team Name *
              </label>
              <input
                id="team2-name"
                type="text"
                value={team2.name}
                onChange={(e) => setTeam2({ ...team2, name: e.target.value })}
                placeholder="Enter team name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Players ({team2.players.length}/{currentConfig.maxPlayers})</h3>
              {team2.players.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 rounded border border-gray-200">
                  <FaUsers className="mx-auto text-gray-400 text-2xl mb-2" />
                  <p className="text-gray-500">No players added yet</p>
                  <button
                    onClick={() => { setSelectedTeam(2); setShowPlayerModal(true); }}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Add players
                  </button>
                </div>
              ) : (
                <ul className="space-y-2">
                  {team2.players.map((player) => (
                    <li 
                      key={player.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {player.avatar ? (
                            <img src={player.avatar} alt={player.name} className="w-full h-full rounded-full" />
                          ) : (
                            <span className="text-gray-500 font-medium">
                              {player.name.substring(0, 2).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">{player.name}</p>
                          <p className="text-xs text-gray-500">{player.position}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemovePlayer(2, player.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* Start Match Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleStartMatch}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
          >
            <FaPlayCircle className="mr-2" />
            Start Match
          </button>
        </div>
      </div>
      
      {/* Player Selection Modal */}
      {showPlayerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add Players to {selectedTeam === 1 ? team1.name || 'Team 1' : team2.name || 'Team 2'}
                </h3>
                <button 
                  onClick={() => setShowPlayerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search players by name or position"
                  value={searchTerm}
                  onChange={handlePlayerSearch}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto flex-grow">
              {filteredPlayers.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No players found</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredPlayers.map((player) => (
                    <li key={player.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {player.avatar ? (
                              <img src={player.avatar} alt={player.name} className="w-full h-full rounded-full" />
                            ) : (
                              <span className="text-gray-500 font-medium">
                                {player.name.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{player.name}</p>
                            <div className="flex items-center">
                              <p className="text-xs text-gray-500 mr-2">{player.position}</p>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(player.rating) 
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddPlayer(player)}
                          className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                          <FaPlus className="mr-1" />
                          Add
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPlayerModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSelection;
