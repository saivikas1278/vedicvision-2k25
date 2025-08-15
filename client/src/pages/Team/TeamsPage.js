import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaUsers, 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaTrophy,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaStar,
  FaEye
} from 'react-icons/fa';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import GradientButton from '../../components/UI/GradientButton';
import MyTeams from '../../components/Team/MyTeams';
import teamService from '../../services/teamService';
import { showToast } from '../../utils/toast';

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const { user } = useSelector(state => state.auth);

  const sports = ['all', 'Basketball', 'Soccer', 'Cricket', 'Tennis', 'Badminton', 'Volleyball'];
  const locations = ['all', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune'];

  useEffect(() => {
    if (activeTab === 'browse') {
      fetchTeams();
    }
  }, [activeTab, selectedSport, selectedLocation]);

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (selectedSport !== 'all') params.sport = selectedSport;
      if (selectedLocation !== 'all') params.location = selectedLocation;
      
      // For now, using mock data until backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTeams = [
        {
          id: 1,
          name: 'Mumbai Warriors',
          sport: 'Basketball',
          location: 'Mumbai',
          members: 12,
          maxMembers: 15,
          logo: null,
          description: 'Competitive basketball team looking for skilled players.',
          wins: 18,
          losses: 6,
          rating: 4.5,
          isPublic: true,
          captain: 'Rohit Sharma',
          founded: '2023-01-15',
          achievements: ['City Championship 2023', 'League Winners 2024']
        },
        {
          id: 2,
          name: 'Delhi Thunder',
          sport: 'Soccer',
          location: 'Delhi',
          members: 18,
          maxMembers: 22,
          logo: null,
          description: 'Professional soccer team participating in state-level tournaments.',
          wins: 24,
          losses: 8,
          rating: 4.7,
          isPublic: true,
          captain: 'Virat Singh',
          founded: '2022-08-20',
          achievements: ['State Cup Runners-up 2023', 'Regional Champions 2024']
        },
        {
          id: 3,
          name: 'Bangalore Blasters',
          sport: 'Cricket',
          location: 'Bangalore',
          members: 16,
          maxMembers: 20,
          logo: null,
          description: 'Cricket team focused on developing young talent.',
          wins: 15,
          losses: 10,
          rating: 4.2,
          isPublic: true,
          captain: 'MS Dhoni Jr',
          founded: '2023-03-10',
          achievements: ['Youth League Champions 2024']
        },
        {
          id: 4,
          name: 'Chennai Challengers',
          sport: 'Tennis',
          location: 'Chennai',
          members: 8,
          maxMembers: 12,
          logo: null,
          description: 'Tennis club for intermediate to advanced players.',
          wins: 12,
          losses: 4,
          rating: 4.6,
          isPublic: true,
          captain: 'Sania Mirza Jr',
          founded: '2023-06-05',
          achievements: ['Doubles Championship 2024']
        },
        {
          id: 5,
          name: 'Kolkata Knights',
          sport: 'Badminton',
          location: 'Kolkata',
          members: 10,
          maxMembers: 14,
          logo: null,
          description: 'Badminton team with focus on competitive play.',
          wins: 20,
          losses: 5,
          rating: 4.8,
          isPublic: true,
          captain: 'Saina Nehwal Jr',
          founded: '2022-12-01',
          achievements: ['State Championship 2024', 'National Qualifiers 2024']
        }
      ];

      setTeams(mockTeams);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      showToast('Failed to load teams', 'error');
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async (teamId) => {
    try {
      // await teamService.joinTeam(teamId);
      showToast('Join request sent successfully!', 'success');
      // Refresh teams data
      fetchTeams();
    } catch (error) {
      console.error('Error joining team:', error);
      showToast('Failed to send join request', 'error');
    }
  };

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
                <p className="mt-2 text-gray-600">
                  Find teams to join or manage your existing teams
                </p>
              </div>
              <GradientButton as={Link} to="/teams/create" className="flex items-center space-x-2">
                <FaPlus className="text-sm" />
                <span>Create Team</span>
              </GradientButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Browse Teams
            </button>
            <button
              onClick={() => setActiveTab('myteams')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'myteams'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Teams
            </button>
          </nav>
        </div>

        {/* Browse Teams Tab */}
        {activeTab === 'browse' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Teams
                  </label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, sport, or location"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sport
                  </label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sports.map(sport => (
                      <option key={sport} value={sport}>
                        {sport === 'all' ? 'All Sports' : sport}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location === 'all' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={fetchTeams}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FaFilter className="mr-2" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Teams Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTeams.map(team => (
                  <div key={team.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border">
                    <div className="p-6">
                      {/* Team Header */}
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                          {team.logo ? (
                            <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full" />
                          ) : (
                            <FaUsers className="text-white text-lg" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{team.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600 mr-2">{team.sport}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-sm text-gray-600 ml-2 flex items-center">
                              <FaMapMarkerAlt className="mr-1" />
                              {team.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Team Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-center mb-1">
                            {renderStars(team.rating)}
                          </div>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-3">
                          <p className="text-lg font-semibold text-gray-900">
                            {team.wins}W - {team.losses}L
                          </p>
                          <p className="text-sm text-gray-600">Record</p>
                        </div>
                      </div>

                      {/* Team Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <FaUserFriends className="mr-2 text-gray-400" />
                          <span>{team.members}/{team.maxMembers} Members</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaCalendarAlt className="mr-2 text-gray-400" />
                          <span>Founded {formatDate(team.founded)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaTrophy className="mr-2 text-gray-400" />
                          <span>Captain: {team.captain}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {team.description}
                      </p>

                      {/* Achievements */}
                      {team.achievements && team.achievements.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Recent Achievements:</p>
                          <div className="space-y-1">
                            {team.achievements.slice(0, 2).map((achievement, index) => (
                              <p key={index} className="text-xs text-gray-600 bg-yellow-50 px-2 py-1 rounded">
                                🏆 {achievement}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Team Actions */}
                    <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
                      <Link
                        to={`/teams/${team.id}`}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <FaEye className="mr-1" />
                        View Details
                      </Link>
                      <button
                        onClick={() => handleJoinTeam(team.id)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Request to Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredTeams.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <FaUsers className="mx-auto text-gray-300 text-5xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Teams Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or create a new team.
                </p>
                <GradientButton as={Link} to="/teams/create">
                  Create Your Team
                </GradientButton>
              </div>
            )}
          </div>
        )}

        {/* My Teams Tab */}
        {activeTab === 'myteams' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">My Teams</h2>
              <p className="text-gray-600">Teams you're a member or captain of</p>
            </div>
            <MyTeams />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
