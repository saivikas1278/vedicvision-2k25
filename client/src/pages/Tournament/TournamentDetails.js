import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTournamentById, registerForTournament } from '../../redux/slices/tournamentSlice';
import { loadUser } from '../../redux/slices/authSlice';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUserPlus, FaClock, FaInfoCircle, FaMedal, FaTimes, FaSearch, FaTrash, FaCheck } from 'react-icons/fa';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { showToast } from '../../utils/toast';
import userService from '../../services/userService';
import teamService from '../../services/teamService';

// Helper function to safely render eligibility object
const renderEligibility = (eligibility) => {
  if (!eligibility) return 'Open to all eligible teams';
  if (typeof eligibility === 'string') return eligibility;
  
  const skillLevel = eligibility.skillLevel || 'All skill levels';
  const genderRestriction = eligibility.genderRestriction === 'none' ? 
    'Open to all genders' : 
    eligibility.genderRestriction || 'Mixed';
  
  return `${skillLevel}, ${genderRestriction}`;
};

const TournamentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentTournament, loading } = useSelector((state) => state.tournaments);
  const { user } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [teamData, setTeamData] = useState({
    name: '',
    shortName: '',
    description: ''
  });
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [userTeam, setUserTeam] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchTournamentById(id));
    }
  }, [dispatch, id]);

  // Check if user is already registered for this tournament
  const checkUserRegistration = useCallback(async () => {
    if (!user || !currentTournament) return;

    console.log('Debug - checkUserRegistration called with:', {
      userId: user.id,
      currentTeam: user.currentTeam,
      registeredTeams: currentTournament.registeredTeams
    });

    try {
      // Reset state first
      setUserRegistered(false);
      setUserTeam(null);

      // Check through all registered teams to find if user is a member
      if (currentTournament.registeredTeams && currentTournament.registeredTeams.length > 0) {
        console.log(`Debug - Checking ${currentTournament.registeredTeams.length} registered teams for user ${user.id}`);
        
        for (const teamId of currentTournament.registeredTeams) {
          try {
            console.log('Debug - Checking team:', teamId, 'type:', typeof teamId);
            
            // Validate teamId format
            const teamIdString = String(teamId);
            if (!teamIdString || !teamIdString.match(/^[0-9a-fA-F]{24}$/)) {
              console.error('Invalid teamId format:', teamId);
              continue;
            }
            
            console.log('Debug - Fetching team data for:', teamIdString);
            
            const teamResponse = await teamService.getTeam(teamIdString);
            if (teamResponse.success && teamResponse.data) {
              const team = teamResponse.data;
              console.log('Debug - Team data received:', {
                teamId: team._id,
                teamName: team.name,
                players: team.players?.map(p => ({ 
                  userId: p.user?._id || p.user, 
                  role: p.role 
                }))
              });
              
              // Check if current user is in the team's players array
              const isUserInTeam = team.players?.some(player => {
                const playerId = player.user?._id || player.user;
                const match = playerId === user.id;
                console.log(`Debug - Comparing player ${playerId} with user ${user.id}: ${match}`);
                return match;
              });
              
              // Also check if user is the captain
              const isUserCaptain = team.captain?._id === user.id || team.captain === user.id;
              console.log(`Debug - Is user captain: ${isUserCaptain}`);
              
              if (isUserInTeam || isUserCaptain) {
                console.log(`Debug - User found in team: ${team.name}`);
                setUserRegistered(true);
                setUserTeam(team);
                return; // Exit early once we find the user
              }
            }
          } catch (error) {
            console.error(`Error checking team ${teamId}:`, error);
            // Continue checking other teams even if one fails
          }
        }
        
        console.log('Debug - User not found in any registered team');
      } else {
        console.log('Debug - No registered teams found for this tournament');
      }
    } catch (error) {
      console.error('Error checking user registration:', error);
    }
  }, [user, currentTournament]);

  // Initialize registration check when user or tournament data loads
  useEffect(() => {
    if (user && currentTournament) {
      // Reset state and check registration
      setUserRegistered(false);
      setUserTeam(null);
      checkUserRegistration();
    }
  }, [user, currentTournament, checkUserRegistration]);

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      
      // Validate team data
      if (!teamData.name.trim()) {
        showToast('Please enter a team name', 'error');
        setIsRegistering(false);
        return;
      }
      
      // Prepare players array including captain and selected players
      const players = [
        {
          user: user.id,
          role: 'captain',
          joinedAt: new Date()
        },
        ...selectedPlayers.map(player => ({
          user: player.user,
          role: 'player',
          joinedAt: new Date()
        }))
      ];
      
      console.log('Registering team with data:', {
        tournamentId: id,
        teamData: {
          name: teamData.name.trim(),
          shortName: teamData.shortName.trim() || teamData.name.trim().substring(0, 10),
          description: teamData.description.trim(),
          players: players
        }
      });
      
      // Use the actual registration service
      const result = await dispatch(registerForTournament({ 
        tournamentId: id, 
        teamData: {
          name: teamData.name.trim(),
          shortName: teamData.shortName.trim() || teamData.name.trim().substring(0, 10),
          description: teamData.description.trim(),
          players: players
        }
      }));
      
      console.log('Registration result:', result);
      
      if (registerForTournament.fulfilled.match(result)) {
        showToast('Registration successful! You have joined the tournament.', 'success');
        setShowRegistrationForm(false);
        setTeamData({ name: '', shortName: '', description: '' });
        setSelectedPlayers([]);
        setUserSearchQuery('');
        setAvailableUsers([]);
        // Refresh tournament data to show updated registration
        dispatch(fetchTournamentById(id));
        // Reload user data to get updated currentTeam field
        dispatch(loadUser());
        // Recheck registration status after a short delay
        setTimeout(() => {
          checkUserRegistration();
        }, 1000);
      } else {
        console.error('Registration failed:', result);
        const errorMessage = result.payload || result.error?.message || 'Failed to register for tournament';
        showToast(errorMessage, 'error');
      }
      
      setIsRegistering(false);
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Failed to register for tournament', 'error');
      setIsRegistering(false);
    }
  };

  const handleTeamDataChange = (e) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fetch users for player selection
  const fetchUsers = async (query = '') => {
    try {
      setLoadingUsers(true);
      const response = query 
        ? await userService.searchUsers(query)
        : await userService.getUsers({ limit: 20 });
      
      if (response.success && response.data) {
        // Filter out current user and already selected players
        const filteredUsers = response.data.filter(user => 
          user._id !== user.id && 
          !selectedPlayers.some(player => player._id === user._id)
        );
        setAvailableUsers(filteredUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast('Failed to load users', 'error');
    } finally {
      setLoadingUsers(false);
    }
  };

  // Handle user search
  const handleUserSearch = async (query) => {
    setUserSearchQuery(query);
    if (query.length > 0) {
      await fetchUsers(query);
    } else {
      await fetchUsers();
    }
  };

  // Add player to team
  const addPlayerToTeam = (user) => {
    if (selectedPlayers.length >= 15) { // Limit team size
      showToast('Maximum team size is 15 players', 'warning');
      return;
    }
    
    const newPlayer = {
      _id: user._id,
      user: user._id,
      name: `${user.firstName} ${user.lastName}`,
      role: 'player'
    };
    
    setSelectedPlayers(prev => [...prev, newPlayer]);
    setAvailableUsers(prev => prev.filter(u => u._id !== user._id));
  };

  // Remove player from team
  const removePlayerFromTeam = (playerId) => {
    const playerToRemove = selectedPlayers.find(p => p._id === playerId);
    setSelectedPlayers(prev => prev.filter(p => p._id !== playerId));
    
    // Add back to available users if we have the user data
    if (playerToRemove && availableUsers.length > 0) {
      fetchUsers(userSearchQuery); // Refresh the available users list
    }
  };

  // Load users when modal opens
  useEffect(() => {
    if (showRegistrationForm) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRegistrationForm]);

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentTournament && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <FaTrophy className="text-6xl text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tournament Not Found</h3>
        <p className="text-gray-600 mb-4">The tournament you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/tournaments"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FaTrophy className="mr-2" />
          Browse All Tournaments
        </Link>
      </div>
    );
  }

  return (
    <TournamentDetailsContent 
      tournament={currentTournament} 
      handleRegister={handleRegister} 
      isRegistering={isRegistering}
      formatDate={formatDate}
      showRegistrationForm={showRegistrationForm}
      setShowRegistrationForm={setShowRegistrationForm}
      teamData={teamData}
      handleTeamDataChange={handleTeamDataChange}
      selectedPlayers={selectedPlayers}
      availableUsers={availableUsers}
      userSearchQuery={userSearchQuery}
      loadingUsers={loadingUsers}
      handleUserSearch={handleUserSearch}
      addPlayerToTeam={addPlayerToTeam}
      removePlayerFromTeam={removePlayerFromTeam}
      userRegistered={userRegistered}
      userTeam={userTeam}
      user={user}
    />
  );
};

const TournamentDetailsContent = ({ 
  tournament, 
  handleRegister, 
  isRegistering, 
  formatDate,
  showRegistrationForm,
  setShowRegistrationForm,
  teamData,
  handleTeamDataChange,
  selectedPlayers,
  availableUsers,
  userSearchQuery,
  loadingUsers,
  handleUserSearch,
  addPlayerToTeam,
  removePlayerFromTeam,
  userRegistered,
  userTeam,
  user
}) => {
  console.log('[TournamentDetails] Tournament data:', tournament);
  
  const isActive = tournament.status === 'open' || tournament.status === 'ongoing';
  const registeredTeamsCount = tournament.registeredTeams ? tournament.registeredTeams.length : 0;
  
  // Helper function to safely access nested properties
  const getNestedValue = (obj, path, defaultValue = 'TBD') => {
    return path.split('.').reduce((current, key) => current && current[key], obj) || defaultValue;
  };
  
  // Extract venue information
  const venueName = getNestedValue(tournament, 'venue.name', 'Venue TBD');
  const venueAddress = getNestedValue(tournament, 'venue.address', 'Address TBD');
  const venueCity = getNestedValue(tournament, 'venue.city', '');
  const venueState = getNestedValue(tournament, 'venue.state', '');
  const fullVenueAddress = `${venueAddress}${venueCity ? `, ${venueCity}` : ''}${venueState ? `, ${venueState}` : ''}`;
  
  // Extract date information
  const tournamentStartDate = getNestedValue(tournament, 'dates.tournamentStart');
  const tournamentEndDate = getNestedValue(tournament, 'dates.tournamentEnd');
  const registrationStartDate = getNestedValue(tournament, 'dates.registrationStart');
  const registrationEndDate = getNestedValue(tournament, 'dates.registrationEnd');
  
  // Extract organizer information
  const organizerName = tournament.organizer 
    ? `${tournament.organizer.firstName || ''} ${tournament.organizer.lastName || ''}`.trim() || 'Organizer TBD'
    : 'Organizer TBD';
  const organizerEmail = getNestedValue(tournament, 'organizer.email', 'Contact TBD');
  
  // Extract team size from settings
  const minTeamSize = getNestedValue(tournament, 'settings.minPlayersPerTeam', 'TBD');
  const maxTeamSize = getNestedValue(tournament, 'settings.maxPlayersPerTeam', 'TBD');
  
  // Extract prize information
  const prizeTotal = getNestedValue(tournament, 'prizePool.total', 0);
  const prizeDistribution = tournament.prizePool?.distribution || [];
  
  let prizesText = 'Prize details TBD';
  if (prizeTotal > 0) {
    if (prizeDistribution.length > 0) {
      prizesText = prizeDistribution
        .map(prize => `${prize.position === 1 ? '1st' : prize.position === 2 ? '2nd' : prize.position === 3 ? '3rd' : `${prize.position}th`} Place: $${prize.amount}`)
        .join(', ');
    } else {
      prizesText = `Total Prize Pool: $${prizeTotal}`;
    }
  }  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Tournament Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{tournament.name}</h1>
          <div className="flex flex-wrap items-center text-gray-600 mb-4">
            <div className="flex items-center mr-6 mb-2">
              <FaTrophy className="mr-2 text-blue-500" />
              <span>{tournament.sport} - {tournament.format}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <FaCalendarAlt className="mr-2 text-blue-500" />
              <span>{formatDate(tournamentStartDate)} - {formatDate(tournamentEndDate)}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <span>{venueName}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center mb-4">
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                isActive
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {tournament.status ? tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1) : 'Status TBD'}
              </span>
              <span className="ml-3 text-sm text-gray-600">{registeredTeamsCount} Teams Registered</span>
            </div>
            
            {isActive && (
              userRegistered ? (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-md border border-green-300">
                  <FaCheck className="mr-2" />
                  Already Registered
                  {userTeam && (
                    <span className="ml-2 text-sm text-green-600">
                      (Team: {userTeam.name})
                    </span>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowRegistrationForm(true)}
                  disabled={isRegistering}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-70"
                >
                  {isRegistering ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2" />
                      Register Here
                    </>
                  )}
                </button>
              )
            )}
          </div>
        </div>
        
        {/* Tournament Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Tournament</h2>
          <p className="text-gray-600 mb-4">
            {tournament.description || 'Join us for an exciting tournament experience! This tournament brings together teams to compete in a fair and challenging environment.'}
          </p>
          
          {/* Tournament Rules */}
          {tournament.rules && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tournament Rules</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="whitespace-pre-line text-gray-700">
                  {tournament.rules}
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start">
              <FaClock className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Registration Period</h3>
                <p className="text-gray-600">
                  {formatDate(registrationStartDate)} - {formatDate(registrationEndDate)}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaInfoCircle className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Reporting Time</h3>
                <p className="text-gray-600">{tournament.reportingTime || '1 hour before match'}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaUsers className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Team Size</h3>
                <p className="text-gray-600">Min: {minTeamSize}, Max: {maxTeamSize}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaTrophy className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Tournament Format</h3>
                <p className="text-gray-600">{tournament.format} ({tournament.maxTeams} teams max)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaMedal className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Prizes</h3>
                <p className="text-gray-600">{prizesText}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tournament Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Organizer Info</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-gray-800">{organizerName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                <p className="text-gray-800">{organizerEmail}</p>
                {tournament.organizer?.phone && (
                  <p className="text-gray-800">{tournament.organizer.phone}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registration Details</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Entry Fee</h3>
                <p className="text-gray-800">${tournament.registrationFee || 'TBD'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payment</h3>
                <p className="text-gray-800">{tournament.paymentDetails || 'Payment details will be provided upon registration'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Eligibility</h3>
                <p className="text-gray-600">
                  {renderEligibility(tournament.eligibility)}
                  {tournament.visibility === 'private' && ' (Private Tournament)'}
                </p>
              </div>
              {tournament.settings?.requireApproval && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Registration</h3>
                  <p className="text-gray-600">Requires organizer approval</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Venue</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-gray-800">{venueName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-gray-800">{fullVenueAddress}</p>
              </div>
              {tournament.venue?.mapLink && (
                <div className="mt-4">
                  <a 
                    href={tournament.venue.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    <FaMapMarkerAlt className="mr-2" />
                    View on Map
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-8">
          {isActive ? (
            <button
              onClick={handleRegister}
              disabled={isRegistering}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-70"
            >
              {isRegistering ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" />
                  Register for This Tournament
                </>
              )}
            </button>
          ) : (
            <Link 
              to="/tournaments"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FaTrophy className="mr-2" />
              Browse Other Tournaments
            </Link>
          )}
        </div>
      </div>
      
      {/* Team Registration Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Register Team</h3>
                <button
                  onClick={() => setShowRegistrationForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">Team Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={teamData.name}
                      onChange={handleTeamDataChange}
                      placeholder="Enter your team name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="shortName"
                      value={teamData.shortName}
                      onChange={handleTeamDataChange}
                      placeholder="Team abbreviation (e.g. CSK)"
                      maxLength="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={teamData.description}
                      onChange={handleTeamDataChange}
                      placeholder="Brief description about your team"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Captain Info */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-800 mb-2">Team Captain</h5>
                    <p className="text-blue-700">You will be automatically assigned as the team captain</p>
                  </div>
                </div>

                {/* Player Selection */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-800">Add Players</h4>
                    <span className="text-sm text-gray-500">
                      {selectedPlayers.length + 1}/15 players (including captain)
                    </span>
                  </div>

                  {/* Search Users */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={userSearchQuery}
                      onChange={(e) => handleUserSearch(e.target.value)}
                      placeholder="Search users by name or email..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Selected Players */}
                  {selectedPlayers.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Selected Players</h5>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {selectedPlayers.map((player) => (
                          <div key={player._id} className="flex items-center justify-between bg-green-50 p-2 rounded-md">
                            <span className="text-sm text-green-800">{player.name}</span>
                            <button
                              type="button"
                              onClick={() => removePlayerFromTeam(player._id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Available Users */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Available Users</h5>
                    <div className="border border-gray-300 rounded-md max-h-60 overflow-y-auto">
                      {loadingUsers ? (
                        <div className="flex items-center justify-center p-4">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                      ) : availableUsers.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                          {availableUsers.map((user) => (
                            <div key={user._id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600">
                                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {user.firstName} {user.lastName}
                                  </p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => addPlayerToTeam(user)}
                                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                              >
                                Add
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          {userSearchQuery ? 'No users found' : 'Start typing to search for users'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRegistering || !teamData.name.trim()}
                  className={`flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors ${
                    isRegistering || !teamData.name.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isRegistering ? 'Registering...' : `Register Team (${selectedPlayers.length + 1} players)`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentDetails;
