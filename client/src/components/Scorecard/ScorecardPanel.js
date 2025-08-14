import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchById, updateScore, selectCurrentMatch, selectMatchLoading, selectMatchError } from '../../redux/slices/matchSlice';
import CricketScorecard from './CricketScorecard';
import FootballScorecard from './FootballScorecard';
import VolleyballScorecard from './VolleyballScorecard';
import KabaddiScorecard from './KabaddiScorecard';
import BadmintonScorecard from './BadmintonScorecard';
import LoadingSpinner from '../UI/LoadingSpinner';

const ScorecardPanel = ({ matchId }) => {
  const dispatch = useDispatch();
  const currentMatch = useSelector(selectCurrentMatch);
  const loading = useSelector(selectMatchLoading);
  const error = useSelector(selectMatchError);
  const { user } = useSelector((state) => state.auth);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchMatchById(matchId));
  }, [dispatch, matchId]);

  useEffect(() => {
    // Check if user can edit the scorecard (organizer or official)
    if (currentMatch && user) {
      const isOrganizer = currentMatch.tournament.organizer === user._id;
      const isOfficial = currentMatch.officials.some(off => off._id === user._id);
      setCanEdit(isOrganizer || isOfficial);
    }
  }, [currentMatch, user]);

  const handleScoreUpdate = async (scorecardData) => {
    if (!canEdit) return;
    await dispatch(updateScore({ matchId, scoreData: scorecardData }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!currentMatch || !currentMatch.scorecard) return null;

  const renderScorecard = () => {
    const props = {
      scorecard: currentMatch.scorecard,
      match: currentMatch,
      onUpdate: handleScoreUpdate,
      canEdit,
    };

    switch (currentMatch.scorecard.sportsCategory) {
      case 'cricket':
        return <CricketScorecard {...props} />;
      case 'football':
        return <FootballScorecard {...props} />;
      case 'volleyball':
        return <VolleyballScorecard {...props} />;
      case 'kabaddi':
        return <KabaddiScorecard {...props} />;
      case 'badminton':
        return <BadmintonScorecard {...props} />;
      default:
        return <div>Unsupported sport type</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          {currentMatch.homeTeam.name} vs {currentMatch.awayTeam.name}
        </h2>
        <p className="text-gray-600">
          {currentMatch.venue.name} • {new Date(currentMatch.scheduledTime).toLocaleDateString()}
        </p>
        <div className="bg-gray-100 rounded px-3 py-1 inline-block">
          <span className="font-semibold">Round:</span> {currentMatch.round}
        </div>
      </div>
      
      <div className="relative">
        {!canEdit && (
          <div className="absolute top-2 right-2">
            <span className="text-sm text-gray-500">
              Auto-refreshes every 30 seconds
            </span>
          </div>
        )}
        {renderScorecard()}
      </div>
    </div>
  );
};

export default ScorecardPanel;
