import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTournamentById, registerForTournament } from '../../redux/slices/tournamentSlice';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaUserPlus, FaClock, FaInfoCircle, FaMedal } from 'react-icons/fa';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { showToast } from '../../utils/toast';

const TournamentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentTournament, loading } = useSelector((state) => state.tournaments);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchTournamentById(id));
    }
  }, [dispatch, id]);

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      // In a real app, this would dispatch the registration action
      // For now, we'll just simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('Registration successful! You have joined the tournament.', 'success');
      setIsRegistering(false);
    } catch (error) {
      console.error('Registration error:', error);
      showToast('Failed to register for tournament', 'error');
      setIsRegistering(false);
    }
  };

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
    // Use mock data if we don't have actual data
    const mockTournament = {
      _id: id,
      name: 'Summer Basketball Championship',
      sport: 'Basketball',
      format: '5v5',
      startDate: '2025-08-20',
      endDate: '2025-08-25',
      registrationStartDate: '2025-07-15',
      registrationEndDate: '2025-08-10',
      venueName: 'Central City Sports Complex',
      venueAddress: '123 Sports Way, Central City',
      organizerName: 'City Sports Association',
      organizerEmail: 'contact@citysports.com',
      organizerPhone: '555-123-4567',
      status: 'active',
      registrationOpen: true,
      teamCount: 16,
      prizes: 'First Place: $1000, Second Place: $500, Third Place: $250',
      specialAwards: 'MVP, Best Defensive Player, Most Improved',
      reportingTime: '1 hour before match',
      eligibility: 'Open to all age groups',
      equipment: 'Teams must bring their own jerseys and basketballs for warm-up',
      minTeamSize: 5,
      maxTeamSize: 12,
      entryFee: 100,
      paymentDetails: 'Payment can be made online or at the venue',
      description: 'The biggest basketball tournament of the summer, featuring teams from across the region competing for glory and prizes.',
      participants: []
    };
    
  return (
    <TournamentDetailsContent 
      tournament={mockTournament} 
      handleRegister={handleRegister} 
      isRegistering={isRegistering}
      formatDate={formatDate} 
    />
  );
}

return (
  <TournamentDetailsContent 
    tournament={currentTournament} 
    handleRegister={handleRegister} 
    isRegistering={isRegistering}
    formatDate={formatDate}
  />
);
};

const TournamentDetailsContent = ({ tournament, handleRegister, isRegistering, formatDate }) => {
  const isActive = tournament.status === 'active' || tournament.registrationOpen === true;  return (
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
              <span>{formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              <span>{tournament.venueName}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center mb-4">
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                isActive
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {isActive ? 'Active Tournament' : tournament.status}
              </span>
              <span className="ml-3 text-sm text-gray-600">{tournament.teamCount || 0} Teams Registered</span>
            </div>
            
            {isActive && (
              <button
                onClick={handleRegister}
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
            )}
          </div>
        </div>
        
        {/* Tournament Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About This Tournament</h2>
          <p className="text-gray-600 mb-4">
            {tournament.description || 'Join us for an exciting tournament experience! This tournament brings together teams to compete in a fair and challenging environment.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start">
              <FaClock className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Registration Period</h3>
                <p className="text-gray-600">
                  {formatDate(tournament.registrationStartDate)} - {formatDate(tournament.registrationEndDate)}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaInfoCircle className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Reporting Time</h3>
                <p className="text-gray-600">{tournament.reportingTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaUsers className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Team Size</h3>
                <p className="text-gray-600">Min: {tournament.minTeamSize}, Max: {tournament.maxTeamSize}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaMedal className="mt-1 mr-3 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-800">Prizes</h3>
                <p className="text-gray-600">{tournament.prizes}</p>
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
                <p className="text-gray-800">{tournament.organizerName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                <p className="text-gray-800">{tournament.organizerEmail}</p>
                <p className="text-gray-800">{tournament.organizerPhone}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registration Details</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Entry Fee</h3>
                <p className="text-gray-800">${tournament.entryFee}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payment</h3>
                <p className="text-gray-800">{tournament.paymentDetails}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Eligibility</h3>
                <p className="text-gray-800">{tournament.eligibility}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Venue</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-gray-800">{tournament.venueName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-gray-800">{tournament.venueAddress}</p>
              </div>
              {tournament.venueMapLink && (
                <div className="mt-4">
                  <a 
                    href={tournament.venueMapLink} 
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
    </div>
  );
};

export default TournamentDetails;
