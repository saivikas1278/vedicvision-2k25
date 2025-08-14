import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaFilter, FaSearch, FaBaseballBall, FaTableTennis, FaRunning, FaVolleyballBall, FaBasketballBall } from 'react-icons/fa';
import { GiWhistle } from 'react-icons/gi';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const sportIcons = {
  cricket: <FaBaseballBall className="text-green-600" />,
  badminton: <FaTableTennis className="text-yellow-600" />,
  kabaddi: <FaRunning className="text-orange-600" />,
  volleyball: <FaVolleyballBall className="text-blue-600" />,
  basketball: <FaBasketballBall className="text-red-600" />
};

const statusColors = {
  live: 'bg-red-500',
  completed: 'bg-green-500',
  scheduled: 'bg-blue-500',
  cancelled: 'bg-gray-500',
  postponed: 'bg-yellow-500'
};

const MatchCard = ({ match }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {sportIcons[match.sport] || <GiWhistle className="text-gray-600" />}
            <span className="ml-2 text-sm font-medium text-gray-500">{match.sport}</span>
          </div>
          <div className={`${statusColors[match.status] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
            {match.status}
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-3">
          {match.teams.team1.name} vs {match.teams.team2.name}
        </h3>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm">
            <div className="text-gray-600">{formatDate(match.date)}</div>
            <div className="text-gray-600">{match.venue?.name || "Local Venue"}</div>
          </div>
          
          {match.status === 'completed' ? (
            <div className="text-right">
              <div className="font-bold">
                {match.teams.team1.score}-{match.teams.team1.wickets} ({match.teams.team1.overs})
              </div>
              <div className="font-bold">
                {match.teams.team2.score}-{match.teams.team2.wickets} ({match.teams.team2.overs})
              </div>
              <div className="text-sm text-gray-600">
                {match.result.winningTeam}
              </div>
            </div>
          ) : match.status === 'live' ? (
            <div className="text-right">
              <div className="font-bold text-red-600">
                LIVE: {match.teams.team1.score}-{match.teams.team1.wickets} ({match.teams.team1.overs})
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600 text-right">
              {match.format || 'Standard Format'}
            </div>
          )}
        </div>
        
        <Link
          to={
            match.status === 'live' ? `/matches/score/${match.sport}/${match.id}` :
            match.status === 'completed' ? `/matches/${match.id}` :
            `/matches/${match.id}`
          }
          className="inline-block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {match.status === 'live' ? 'Go to Scoring' : 
          match.status === 'completed' ? 'View Scorecard' : 
          'Match Details'}
        </Link>
      </div>
    </div>
  );
};

const MatchesHub = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    sport: ''
  });
  
  useEffect(() => {
    // In a real app, you would fetch from API or Redux
    // dispatch(fetchMatches());
    
    // For demo purposes, get from localStorage
    const fetchMatches = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
        
        // Get all keys from localStorage that match our pattern
        const matchKeys = Object.keys(localStorage).filter(key => 
          key.startsWith('match_') && (key.endsWith('_completed') || !key.includes('_'))
        );
        
        const matchesData = [];
        
        // Process each match
        matchKeys.forEach(key => {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            const completedData = key.endsWith('_completed') ? 
              data : 
              JSON.parse(localStorage.getItem(`${key}_completed`) || null);
            
            if (completedData) {
              // This is a completed match
              matchesData.push({
                ...completedData,
                status: 'completed'
              });
            } else if (data) {
              // This is a match in progress or scheduled
              // Check if we have a summary for live match
              const summaryData = JSON.parse(localStorage.getItem(`${key}_summary`) || null);
              
              if (summaryData) {
                // This match has started scoring
                matchesData.push({
                  id: data.id || key.replace('match_', ''),
                  sport: data.sport || 'cricket',
                  teams: {
                    team1: {
                      name: data.homeTeamData?.name || data.team1?.name || 'Team 1',
                      score: summaryData.innings?.[1]?.score || 0,
                      wickets: summaryData.innings?.[1]?.wickets || 0,
                      overs: summaryData.innings?.[1]?.overs || 0
                    },
                    team2: {
                      name: data.awayTeamData?.name || data.team2?.name || 'Team 2',
                      score: summaryData.innings?.[2]?.score || 0,
                      wickets: summaryData.innings?.[2]?.wickets || 0,
                      overs: summaryData.innings?.[2]?.overs || 0
                    }
                  },
                  venue: data.venue || { name: 'Local Venue' },
                  date: data.scheduledTime || data.date || new Date().toISOString(),
                  format: data.format || 'T20',
                  status: 'live',
                  lastUpdated: summaryData.lastUpdated
                });
              } else {
                // This is a scheduled match
                matchesData.push({
                  id: data.id || key.replace('match_', ''),
                  sport: data.sport || 'cricket',
                  teams: {
                    team1: {
                      name: data.homeTeamData?.name || data.team1?.name || 'Team 1',
                      score: 0,
                      wickets: 0,
                      overs: 0
                    },
                    team2: {
                      name: data.awayTeamData?.name || data.team2?.name || 'Team 2',
                      score: 0,
                      wickets: 0,
                      overs: 0
                    }
                  },
                  venue: data.venue || { name: 'Local Venue' },
                  date: data.scheduledTime || data.date || new Date().toISOString(),
                  format: data.format || 'T20',
                  status: 'scheduled'
                });
              }
            }
          } catch (e) {
            console.error(`Error processing match key ${key}:`, e);
          }
        });
        
        // Sort matches: live first, then scheduled, then completed by date (newest first)
        matchesData.sort((a, b) => {
          // Status priority: live > scheduled > completed
          const statusPriority = { live: 0, scheduled: 1, completed: 2 };
          
          if (statusPriority[a.status] !== statusPriority[b.status]) {
            return statusPriority[a.status] - statusPriority[b.status];
          }
          
          // Then by date (newest first)
          return new Date(b.date) - new Date(a.date);
        });
        
        setMatches(matchesData);
        setFilteredMatches(matchesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setLoading(false);
      }
    };
    
    fetchMatches();
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...matches];
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(match => match.status === filters.status);
    }
    
    // Apply sport filter
    if (filters.sport) {
      result = result.filter(match => match.sport === filters.sport);
    }
    
    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(match => 
        match.teams.team1.name.toLowerCase().includes(search) ||
        match.teams.team2.name.toLowerCase().includes(search) ||
        match.venue?.name?.toLowerCase().includes(search)
      );
    }
    
    setFilteredMatches(result);
  }, [matches, filters, searchTerm]);
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
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
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Matches</h1>
            <p className="text-gray-600">View all matches, create new ones, or score live games</p>
          </div>
          
          <Link
            to="/matches/create"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Create Match
          </Link>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by team or venue"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="live">Live</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
              </div>
              
              <div className="relative">
                <select
                  value={filters.sport}
                  onChange={(e) => handleFilterChange('sport', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Sports</option>
                  <option value="cricket">Cricket</option>
                  <option value="football">Football</option>
                  <option value="badminton">Badminton</option>
                  <option value="kabaddi">Kabaddi</option>
                  <option value="volleyball">Volleyball</option>
                  <option value="basketball">Basketball</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Match List */}
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <GiWhistle className="text-gray-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filters.status || filters.sport ? 
                'Try changing your filters or search terms' : 
                'Create your first match to get started'}
            </p>
            <Link
              to="/matches/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Match
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesHub;
