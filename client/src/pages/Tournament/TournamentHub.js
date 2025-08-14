import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaSearch, FaFilter, FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTournaments } from '../../redux/slices/tournamentSlice';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { showToast } from '../../utils/toast';

const TournamentHub = () => {
  const dispatch = useDispatch();
  const { tournaments, loading } = useSelector((state) => state.tournaments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('');

  useEffect(() => {
    // Fetch tournaments from Redux
    dispatch(fetchTournaments());
  }, [dispatch]);

  // If Redux doesn't have tournaments yet, use mock data
  useEffect(() => {
    // Debug: log the tournaments from Redux
    console.log('Tournaments in Redux store:', tournaments);
    
    if (!tournaments || tournaments.length === 0) {
      // Mock data is handled by the fetchTournaments reducer
      // It will populate the store with sample data
    }
  }, [tournaments]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle tournament registration
  const handleRegister = (tournamentId, tournamentName) => {
    // In a real app, this would dispatch a register action
    showToast(`Registration request sent for ${tournamentName}`, 'success');
    console.log('Registering for tournament:', tournamentId);
  };

  const filteredTournaments = tournaments ? tournaments.filter(tournament => {
    const name = tournament.name || tournament.tournamentName || '';
    const location = tournament.location || tournament.venueName || '';
    const organizer = tournament.organizerName || '';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        organizer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSport = filterSport === '' || tournament.sport === filterSport;
    
    return matchesSearch && matchesSport;
  }) : [];

  const sportOptions = ['Basketball', 'Soccer', 'Volleyball', 'Tennis', 'Cricket'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournament Hub</h1>
          <p className="text-gray-600">Browse, join, or organize tournaments</p>
        </div>
        
        <Link 
          to="/tournaments/create" 
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Organize Tournament
        </Link>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tournaments..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
            >
              <option value="">All Sports</option>
              {sportOptions.map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <div key={tournament._id || tournament.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{tournament.name || tournament.tournamentName}</h2>
                <div className="mb-4">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    tournament.status === 'active' || tournament.registrationOpen
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tournament.status === 'active' ? 'Active Tournament' : tournament.status || 'Registration Open'}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">{tournament.teamCount || 0} Teams</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start">
                    <FaTrophy className="mt-1 mr-2 text-blue-500" />
                    <span>Sport: {tournament.sport}</span>
                  </div>
                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-2 text-blue-500" />
                    <div>
                      <div>Start: {formatDate(tournament.startDate)}</div>
                      <div>End: {formatDate(tournament.endDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mt-1 mr-2 text-blue-500" />
                    <span>{tournament.location || tournament.venueName}</span>
                  </div>
                </div>
              </div>
              
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-600">By {tournament.organizerName}</span>
                <div className="flex space-x-2">
                  {(tournament.status === 'active' || tournament.registrationOpen) && (
                    <button
                      onClick={() => handleRegister(tournament._id || tournament.id, tournament.name || tournament.tournamentName)}
                      className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
                    >
                      <FaUserPlus className="mr-1" size={12} />
                      Register Here
                    </button>
                  )}
                  <Link 
                    to={`/tournaments/${tournament._id || tournament.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FaTrophy className="mx-auto text-gray-300 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Tournaments Found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search criteria or create your own tournament</p>
          <Link 
            to="/tournaments/create" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            Organize Tournament
          </Link>
        </div>
      )}
    </div>
  );
};

export default TournamentHub;
