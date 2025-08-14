import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import LoadingSpinner from '../UI/LoadingSpinner';
import { showToast } from '../../utils/toast';

const UpcomingTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingTournaments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - in a real app, this would come from an API
        setTournaments([
          {
            id: 1,
            name: 'Summer Basketball Championship',
            startDate: '2025-08-20T10:00:00',
            location: 'Central City Sports Complex',
            teamCount: 16,
            sport: 'Basketball',
            registrationOpen: true
          },
          {
            id: 2,
            name: 'Regional Soccer Tournament',
            startDate: '2025-09-05T09:00:00',
            location: 'Memorial Stadium',
            teamCount: 24,
            sport: 'Soccer',
            registrationOpen: true
          },
          {
            id: 3,
            name: 'Winter Basketball League',
            startDate: '2025-10-15T11:00:00',
            location: 'Downtown Indoor Arena',
            teamCount: 12,
            sport: 'Basketball',
            registrationOpen: false
          }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching upcoming tournaments:', error);
        showToast('Failed to load upcoming tournaments', 'error');
        setIsLoading(false);
      }
    };

    fetchUpcomingTournaments();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="text-center py-8">
        <FaTrophy className="mx-auto text-gray-300 text-4xl mb-4" />
        <h3 className="text-lg font-medium text-gray-700">No Upcoming Tournaments</h3>
        <p className="text-gray-500 mt-2">Check back later for new tournaments</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tournaments.map((tournament) => (
        <div 
          key={tournament.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex items-start">
            <div className="p-2 bg-blue-50 rounded-full mr-3">
              <FaTrophy className="text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg text-gray-800">{tournament.name}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-600">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  {formatDate(tournament.startDate)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  {tournament.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaUsers className="mr-2 text-gray-400" />
                  {tournament.teamCount} Teams
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  tournament.registrationOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {tournament.registrationOpen ? 'Registration Open' : 'Coming Soon'}
                </span>
                <Link 
                  to={`/tournaments/${tournament.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <Link 
          to="/tournaments"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View All Tournaments
        </Link>
      </div>
    </div>
  );
};

export default UpcomingTournaments;
