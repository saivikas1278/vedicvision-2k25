import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBaseballBall, FaCalendarAlt, FaChartBar, FaTrophy, FaUserFriends } from 'react-icons/fa';
import { showToast } from '../../utils/toast';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const CricketHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [popularTeams, setPopularTeams] = useState([]);

  useEffect(() => {
    const fetchCricketData = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, these would be API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setLiveMatches([
          {
            id: '1',
            matchTitle: 'Super Kings vs Royal Challengers',
            teams: {
              team1Name: 'Super Kings',
              team2Name: 'Royal Challengers'
            },
            innings: [
              {
                teamName: 'Super Kings',
                totalRuns: 186,
                wickets: 4,
                overs: 18,
                balls: 3
              }
            ],
            venue: 'Central Stadium',
            matchType: 'T20'
          },
          {
            id: '2',
            matchTitle: 'Mumbai Indians vs Delhi Capitals',
            teams: {
              team1Name: 'Mumbai Indians',
              team2Name: 'Delhi Capitals'
            },
            innings: [
              {
                teamName: 'Mumbai Indians',
                totalRuns: 212,
                wickets: 6,
                overs: 20,
                balls: 0
              },
              {
                teamName: 'Delhi Capitals',
                totalRuns: 95,
                wickets: 3,
                overs: 9,
                balls: 2
              }
            ],
            venue: 'Metro Ground',
            matchType: 'T20'
          }
        ]);
        
        setUpcomingMatches([
          {
            id: '3',
            matchTitle: 'Kolkata Knight Riders vs Lucknow Giants',
            teams: {
              team1Name: 'Kolkata Knight Riders',
              team2Name: 'Lucknow Giants'
            },
            date: '2025-08-15T14:30:00',
            venue: 'Eden Gardens',
            matchType: 'T20'
          },
          {
            id: '4',
            matchTitle: 'Sunrisers vs Gujarat Titans',
            teams: {
              team1Name: 'Sunrisers',
              team2Name: 'Gujarat Titans'
            },
            date: '2025-08-16T18:00:00',
            venue: 'Hyderabad Stadium',
            matchType: 'T20'
          },
          {
            id: '5',
            matchTitle: 'Punjab Kings vs Rajasthan Royals',
            teams: {
              team1Name: 'Punjab Kings',
              team2Name: 'Rajasthan Royals'
            },
            date: '2025-08-17T14:30:00',
            venue: 'Mohali Stadium',
            matchType: 'T20'
          }
        ]);
        
        setRecentMatches([
          {
            id: '6',
            matchTitle: 'Super Kings vs Mumbai Indians',
            teams: {
              team1Name: 'Super Kings',
              team2Name: 'Mumbai Indians'
            },
            result: {
              winnerName: 'Super Kings',
              description: 'Super Kings won by 24 runs'
            },
            date: '2025-08-10',
            venue: 'Chennai Stadium',
            matchType: 'T20'
          },
          {
            id: '7',
            matchTitle: 'Delhi Capitals vs Kolkata Knight Riders',
            teams: {
              team1Name: 'Delhi Capitals',
              team2Name: 'Kolkata Knight Riders'
            },
            result: {
              winnerName: 'Kolkata Knight Riders',
              description: 'Kolkata Knight Riders won by 6 wickets'
            },
            date: '2025-08-09',
            venue: 'Delhi Stadium',
            matchType: 'T20'
          },
          {
            id: '8',
            matchTitle: 'Gujarat Titans vs Lucknow Giants',
            teams: {
              team1Name: 'Gujarat Titans',
              team2Name: 'Lucknow Giants'
            },
            result: {
              description: 'Match tied (Gujarat Titans won in Super Over)'
            },
            date: '2025-08-08',
            venue: 'Ahmedabad Stadium',
            matchType: 'T20'
          }
        ]);
        
        setPopularTeams([
          { id: '1', name: 'Super Kings', wins: 24, losses: 9, draws: 2 },
          { id: '2', name: 'Mumbai Indians', wins: 22, losses: 10, draws: 3 },
          { id: '3', name: 'Royal Challengers', wins: 18, losses: 12, draws: 5 },
          { id: '4', name: 'Kolkata Knight Riders', wins: 20, losses: 13, draws: 2 }
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching cricket data:', error);
        showToast('Failed to load cricket data', 'error');
        setIsLoading(false);
      }
    };

    fetchCricketData();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center text-gray-800">
            <FaBaseballBall className="mr-3 text-green-600" /> Cricket Hub
          </h1>
          <Link 
            to="/cricket/create-match" 
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            <FaBaseballBall className="mr-2" /> Create New Match
          </Link>
        </div>
        <p className="text-gray-600">Track live matches, create and manage your own cricket matches with detailed scoring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Live Matches */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-700 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <div className="mr-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                  Live Matches
                </h2>
                <Link to="/cricket" className="text-sm text-white hover:underline">
                  View All
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {liveMatches.length > 0 ? (
                <div className="space-y-6">
                  {liveMatches.map(match => (
                    <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <Link to={`/cricket/${match.id}`} className="block">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium text-lg text-gray-800">{match.matchTitle}</h3>
                            <p className="text-sm text-gray-500">{match.venue} • {match.matchType}</p>
                          </div>
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full animate-pulse">
                            LIVE
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          {match.innings.map((inning, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <div className="flex-1">
                                <span className="font-medium text-gray-800">{inning.teamName}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-lg">{inning.totalRuns}/{inning.wickets}</span>
                                <span className="text-sm text-gray-500 ml-2">
                                  ({inning.overs}.{inning.balls} ov)
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <Link 
                            to={`/cricket/${match.id}/score`}
                            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800"
                          >
                            Score Now →
                          </Link>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No live matches at the moment</p>
                  <Link 
                    to="/cricket/create"
                    className="inline-flex items-center mt-3 text-green-600 hover:text-green-800"
                  >
                    Create a Match →
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Upcoming Matches */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Upcoming Matches
                </h2>
                <Link to="/cricket?filter=upcoming" className="text-sm text-white hover:underline">
                  View All
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              {upcomingMatches.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMatches.map(match => (
                    <div key={match.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <div className="bg-blue-50 rounded-lg p-3 mr-4">
                        <FaCalendarAlt className="text-blue-500 text-xl" />
                      </div>
                      <div className="flex-1">
                        <Link to={`/cricket/${match.id}`}>
                          <h3 className="font-medium text-gray-800 hover:text-blue-600">{match.matchTitle}</h3>
                        </Link>
                        <p className="text-sm text-gray-500">{match.venue} • {match.matchType}</p>
                        <p className="text-sm font-medium text-blue-600 mt-1">{formatDateTime(match.date)}</p>
                      </div>
                      <Link 
                        to={`/cricket/${match.id}/edit`}
                        className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100"
                      >
                        Manage
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No upcoming matches scheduled</p>
                  <Link 
                    to="/cricket/create"
                    className="inline-flex items-center mt-3 text-blue-600 hover:text-blue-800"
                  >
                    Schedule a Match →
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Create Match Card */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md p-6 border border-green-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Your Cricket Match</h2>
                <p className="text-gray-600">
                  Set up a new match with teams, players and start scoring ball-by-ball with our advanced cricket scorer.
                </p>
              </div>
              <Link 
                to="/cricket/create"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Create Match
              </Link>
            </div>
          </div>
        </div>
        
        {/* Sidebar - 1/3 width on large screens */}
        <div className="space-y-8">
          {/* Recent Matches Results */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaChartBar className="mr-2" />
                Recent Results
              </h2>
            </div>
            
            <div className="p-6">
              {recentMatches.length > 0 ? (
                <div className="space-y-4">
                  {recentMatches.map(match => (
                    <Link key={match.id} to={`/cricket/${match.id}`} className="block border-b border-gray-100 pb-3 last:border-0 last:pb-0 hover:bg-gray-50 rounded-lg transition-colors p-2">
                      <div className="mb-1">
                        <h3 className="font-medium text-gray-800">{match.matchTitle}</h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500">{new Date(match.date).toLocaleDateString()} • {match.venue}</p>
                          <span className="text-xs font-medium text-gray-600">{match.matchType}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 mt-2">
                        <p className="text-sm font-medium text-green-700">{match.result.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">No recent match results</p>
              )}
              
              <div className="mt-4 text-center">
                <Link to="/cricket?filter=completed" className="text-sm font-medium text-gray-600 hover:text-gray-800">
                  View All Results →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Popular Teams */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaUserFriends className="mr-2" />
                Popular Teams
              </h2>
            </div>
            
            <div className="p-6">
              {popularTeams.length > 0 ? (
                <div className="space-y-4">
                  {popularTeams.map(team => (
                    <Link key={team.id} to={`/teams/${team.id}`} className="flex justify-between items-center hover:bg-gray-50 p-3 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="font-bold text-purple-600">{team.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-gray-800">{team.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600 font-medium">{team.wins}W</span>
                        {" - "}
                        <span className="text-red-600 font-medium">{team.losses}L</span>
                        {" - "}
                        <span className="text-gray-600 font-medium">{team.draws}D</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">No teams available</p>
              )}
              
              <div className="mt-4 text-center">
                <Link to="/teams" className="text-sm font-medium text-purple-600 hover:text-purple-800">
                  View All Teams →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FaTrophy className="mr-2" />
                Top Performers
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Top Batsmen</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">MS Dhoni</span>
                      <span className="text-sm">435 runs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Virat Kohli</span>
                      <span className="text-sm">412 runs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Rohit Sharma</span>
                      <span className="text-sm">389 runs</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Top Bowlers</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Jasprit Bumrah</span>
                      <span className="text-sm">24 wickets</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Rashid Khan</span>
                      <span className="text-sm">21 wickets</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Yuzvendra Chahal</span>
                      <span className="text-sm">19 wickets</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/cricket/stats" className="text-sm font-medium text-yellow-600 hover:text-yellow-800">
                  View All Stats →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CricketHub;
