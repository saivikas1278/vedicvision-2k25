import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaShareAlt, FaDownload, FaPrint, FaBaseballBall, FaTableTennis, FaRunning, FaVolleyballBall, FaBasketballBall } from 'react-icons/fa';
import { GiWhistle } from 'react-icons/gi';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const sportIcons = {
  cricket: <FaBaseballBall className="text-green-600" />,
  badminton: <FaTableTennis className="text-yellow-600" />,
  kabaddi: <FaRunning className="text-orange-600" />,
  volleyball: <FaVolleyballBall className="text-blue-600" />,
  basketball: <FaBasketballBall className="text-red-600" />
};

const StatusBadge = ({ status }) => {
  const colors = {
    live: 'bg-red-500',
    completed: 'bg-green-500',
    scheduled: 'bg-blue-500',
    cancelled: 'bg-gray-500',
    postponed: 'bg-yellow-500'
  };
  
  return (
    <div className={`${colors[status] || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full inline-flex items-center`}>
      {status === 'live' && (
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      )}
      {status}
    </div>
  );
};

const BadmintonScorecard = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Match Result</h3>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800">{match.result.summary || 'Match completed'}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Player</th>
              <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Set 1</th>
              <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Set 2</th>
              {match.result.scorecard?.sets?.length > 2 && (
                <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Set 3</th>
              )}
              <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="py-3 px-3 text-sm font-medium border-b border-gray-200">
                {match.teams.team1.name}
              </td>
              <td className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${match.result.scorecard.sets[0].winner === 'player1' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                {match.result.scorecard.sets[0].player1Score}
              </td>
              <td className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${match.result.scorecard.sets[1]?.winner === 'player1' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                {match.result.scorecard.sets[1]?.player1Score || '-'}
              </td>
              {match.result.scorecard?.sets?.length > 2 && (
                <td className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${match.result.scorecard.sets[2]?.winner === 'player1' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                  {match.result.scorecard.sets[2]?.player1Score || '-'}
                </td>
              )}
              <td className="py-3 px-3 text-sm text-center font-medium border-b border-gray-200">
                {match.teams.team1.score}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-3 text-sm font-medium border-b border-gray-200">
                {match.teams.team2.name}
              </td>
              <td className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${match.result.scorecard.sets[0].winner === 'player2' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                {match.result.scorecard.sets[0].player2Score}
              </td>
              <td className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${match.result.scorecard.sets[1]?.winner === 'player2' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                {match.result.scorecard.sets[1]?.player2Score || '-'}
              </td>
              {match.result.scorecard?.sets?.length > 2 && (
                <td className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${match.result.scorecard.sets[2]?.winner === 'player2' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                  {match.result.scorecard.sets[2]?.player2Score || '-'}
                </td>
              )}
              <td className="py-3 px-3 text-sm text-center font-medium border-b border-gray-200">
                {match.teams.team2.score}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VolleyballScorecard = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Match Result</h3>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800">{match.result.summary || 'Match completed'}</p>
        </div>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Team</th>
              {match.result.scorecard.sets.map((set, index) => (
                <th key={index} className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Set {index + 1}
                </th>
              ))}
              <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="py-3 px-3 text-sm font-medium border-b border-gray-200">
                {match.teams.team1.name}
              </td>
              {match.result.scorecard.sets.map((set, index) => (
                <td key={index} className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${set.winner === 'team1' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                  {set.team1Score}
                </td>
              ))}
              <td className="py-3 px-3 text-sm text-center font-medium border-b border-gray-200">
                {match.teams.team1.score}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-3 text-sm font-medium border-b border-gray-200">
                {match.teams.team2.name}
              </td>
              {match.result.scorecard.sets.map((set, index) => (
                <td key={index} className={`py-3 px-3 text-sm text-center font-medium border-b border-gray-200 ${set.winner === 'team2' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                  {set.team2Score}
                </td>
              ))}
              <td className="py-3 px-3 text-sm text-center font-medium border-b border-gray-200">
                {match.teams.team2.score}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const KabaddiScorecard = ({ match }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Match Result</h3>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800">{match.result.summary || 'Match completed'}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3 text-center">{match.teams.team1.name}</h4>
          <div className="text-center mb-4">
            <span className="text-5xl font-bold">{match.teams.team1.score}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm"><span className="font-medium">Raids:</span> {match.result.scorecard.stats?.team1.raids || 0}</div>
            <div className="text-sm"><span className="font-medium">Successful Raids:</span> {match.result.scorecard.stats?.team1.successfulRaids || 0}</div>
            <div className="text-sm"><span className="font-medium">Tackles:</span> {match.result.scorecard.stats?.team1.tackles || 0}</div>
            <div className="text-sm"><span className="font-medium">All Outs:</span> {match.result.scorecard.stats?.team1.allOuts || 0}</div>
            <div className="text-sm"><span className="font-medium">Bonus Points:</span> {match.result.scorecard.stats?.team1.bonusPoints || 0}</div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3 text-center">{match.teams.team2.name}</h4>
          <div className="text-center mb-4">
            <span className="text-5xl font-bold">{match.teams.team2.score}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm"><span className="font-medium">Raids:</span> {match.result.scorecard.stats?.team2.raids || 0}</div>
            <div className="text-sm"><span className="font-medium">Successful Raids:</span> {match.result.scorecard.stats?.team2.successfulRaids || 0}</div>
            <div className="text-sm"><span className="font-medium">Tackles:</span> {match.result.scorecard.stats?.team2.tackles || 0}</div>
            <div className="text-sm"><span className="font-medium">All Outs:</span> {match.result.scorecard.stats?.team2.allOuts || 0}</div>
            <div className="text-sm"><span className="font-medium">Bonus Points:</span> {match.result.scorecard.stats?.team2.bonusPoints || 0}</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Score Progression</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Half</th>
                <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">{match.teams.team1.name}</th>
                <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">{match.teams.team2.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="py-3 px-3 text-sm font-medium border-b border-gray-200">First Half</td>
                <td className="py-3 px-3 text-sm text-center border-b border-gray-200">
                  {match.result.scorecard.halftimeScore?.team1 || 0}
                </td>
                <td className="py-3 px-3 text-sm text-center border-b border-gray-200">
                  {match.result.scorecard.halftimeScore?.team2 || 0}
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-3 text-sm font-medium border-b border-gray-200">Second Half</td>
                <td className="py-3 px-3 text-sm text-center border-b border-gray-200">
                  {(match.teams.team1.score - (match.result.scorecard.halftimeScore?.team1 || 0)) || 0}
                </td>
                <td className="py-3 px-3 text-sm text-center border-b border-gray-200">
                  {(match.teams.team2.score - (match.result.scorecard.halftimeScore?.team2 || 0)) || 0}
                </td>
              </tr>
              <tr className="bg-blue-50">
                <td className="py-3 px-3 text-sm font-medium border-b border-gray-200">Final Score</td>
                <td className="py-3 px-3 text-sm text-center font-bold border-b border-gray-200">
                  {match.teams.team1.score}
                </td>
                <td className="py-3 px-3 text-sm text-center font-bold border-b border-gray-200">
                  {match.teams.team2.score}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {match.result.scorecard.playerStats && (
        <div>
          <h4 className="font-semibold mb-3">Top Performers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium mb-2">{match.teams.team1.name}</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Player</th>
                      <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Raid Pts</th>
                      <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tackle Pts</th>
                      <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.result.scorecard.playerStats?.team1
                      ?.sort((a, b) => b.totalPoints - a.totalPoints)
                      .slice(0, 3)
                      .map((player, index) => (
                        <tr key={player.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-2 px-3 text-sm font-medium border-b border-gray-200">{player.name}</td>
                          <td className="py-2 px-3 text-sm text-center border-b border-gray-200">{player.raidPoints}</td>
                          <td className="py-2 px-3 text-sm text-center border-b border-gray-200">{player.tacklePoints}</td>
                          <td className="py-2 px-3 text-sm text-center font-medium border-b border-gray-200">{player.totalPoints}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-2">{match.teams.team2.name}</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Player</th>
                      <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Raid Pts</th>
                      <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tackle Pts</th>
                      <th className="py-2 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.result.scorecard.playerStats?.team2
                      ?.sort((a, b) => b.totalPoints - a.totalPoints)
                      .slice(0, 3)
                      .map((player, index) => (
                        <tr key={player.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="py-2 px-3 text-sm font-medium border-b border-gray-200">{player.name}</td>
                          <td className="py-2 px-3 text-sm text-center border-b border-gray-200">{player.raidPoints}</td>
                          <td className="py-2 px-3 text-sm text-center border-b border-gray-200">{player.tacklePoints}</td>
                          <td className="py-2 px-3 text-sm text-center font-medium border-b border-gray-200">{player.totalPoints}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CricketScorecard = ({ match }) => {
  // Format player stats
  const formatPlayerStats = (playerData, inningNumber) => {
    const battingInning = match.scorecard?.innings?.[inningNumber]?.batting || [];
    const bowlingInning = match.scorecard?.innings?.[inningNumber]?.bowling || [];
    
    if (!battingInning.length && !bowlingInning.length) {
      return (
        <div className="text-center py-8 text-gray-500">
          Scorecard data not available
        </div>
      );
    }
    
    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {inningNumber === 1 ? match.teams.team1.name : match.teams.team2.name} Innings
        </h3>
        
        {/* Batting Scorecard */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Batter</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">R</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">B</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">4s</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">6s</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">SR</th>
              </tr>
            </thead>
            <tbody>
              {battingInning.map((batter, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-3 text-sm border-b border-gray-200">
                    <div className="font-medium">{batter.name}</div>
                    <div className="text-xs text-gray-500">{batter.dismissal || 'not out'}</div>
                  </td>
                  <td className="py-2 px-3 text-sm text-right font-medium border-b border-gray-200">{batter.runs}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">{batter.balls}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">{batter.fours}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">{batter.sixes}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">
                    {batter.balls > 0 ? ((batter.runs / batter.balls) * 100).toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))}
              
              {/* Extras and Total */}
              <tr className="bg-gray-50">
                <td colSpan="5" className="py-2 px-3 text-sm font-medium text-right border-b border-gray-200">
                  Extras (B: {match.scorecard?.innings?.[inningNumber]?.extras?.byes || 0}, 
                  LB: {match.scorecard?.innings?.[inningNumber]?.extras?.legByes || 0}, 
                  NB: {match.scorecard?.innings?.[inningNumber]?.extras?.noBalls || 0}, 
                  W: {match.scorecard?.innings?.[inningNumber]?.extras?.wides || 0})
                </td>
                <td className="py-2 px-3 text-sm text-right font-medium border-b border-gray-200">
                  {match.scorecard?.innings?.[inningNumber]?.extras?.total || 0}
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td colSpan="5" className="py-2 px-3 text-sm font-bold text-right border-b border-gray-200">
                  Total ({match.scorecard?.innings?.[inningNumber]?.wickets || 0} wickets, {match.scorecard?.innings?.[inningNumber]?.overs || 0} overs)
                </td>
                <td className="py-2 px-3 text-sm text-right font-bold border-b border-gray-200">
                  {match.scorecard?.innings?.[inningNumber]?.score || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Bowling Scorecard */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Bowler</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">O</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">M</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">R</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">W</th>
                <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Econ</th>
              </tr>
            </thead>
            <tbody>
              {bowlingInning.map((bowler, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-3 text-sm font-medium border-b border-gray-200">{bowler.name}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">{bowler.overs}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">{bowler.maidens}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">{bowler.runs}</td>
                  <td className="py-2 px-3 text-sm text-right font-medium border-b border-gray-200">{bowler.wickets}</td>
                  <td className="py-2 px-3 text-sm text-right border-b border-gray-200">
                    {bowler.overs > 0 ? (bowler.runs / bowler.overs).toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Match Result</h3>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-blue-800">{match.result.summary || 'Match completed'}</p>
        </div>
      </div>
      
      {/* Innings 1 */}
      <div className="mb-8">
        {formatPlayerStats(match.teams.team1, 1)}
      </div>
      
      {/* Innings 2 */}
      <div className="mb-6">
        {formatPlayerStats(match.teams.team2, 2)}
      </div>
      
      {/* Fall of Wickets */}
      {(match.scorecard?.innings?.[1]?.fallOfWickets?.length > 0 || 
        match.scorecard?.innings?.[2]?.fallOfWickets?.length > 0) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Fall of Wickets</h3>
          
          {match.scorecard?.innings?.[1]?.fallOfWickets?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">{match.teams.team1.name}</h4>
              <p className="text-sm text-gray-600">
                {match.scorecard.innings[1].fallOfWickets.map((w, i) => 
                  `${w.wicket}-${w.score} (${w.player}, ${w.overs})`
                ).join(' | ')}
              </p>
            </div>
          )}
          
          {match.scorecard?.innings?.[2]?.fallOfWickets?.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">{match.teams.team2.name}</h4>
              <p className="text-sm text-gray-600">
                {match.scorecard.innings[2].fallOfWickets.map((w, i) => 
                  `${w.wicket}-${w.score} (${w.player}, ${w.overs})`
                ).join(' | ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MatchDetails = () => {
  const { matchId } = useParams();
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState(null);
  
  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        // In a real app, you would fetch from API
        // const response = await fetch(`/api/matches/${matchId}`);
        // const data = await response.json();
        
        // For demo purposes, get from localStorage
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
        
        // Try to get completed match data first
        let matchData = JSON.parse(localStorage.getItem(`match_${matchId}_completed`) || null);
        
        // If no completed data, try to get match data
        if (!matchData) {
          matchData = JSON.parse(localStorage.getItem(`match_${matchId}`) || null);
          
          // Check if we have a summary for live match
          const summaryData = JSON.parse(localStorage.getItem(`match_${matchId}_summary`) || null);
          
          if (matchData && summaryData) {
            // This match has started scoring
            matchData = {
              id: matchData.id || matchId,
              sport: matchData.sport || 'cricket',
              teams: {
                team1: {
                  name: matchData.homeTeamData?.name || matchData.team1?.name || 'Team 1',
                  score: summaryData.innings?.[1]?.score || 0,
                  wickets: summaryData.innings?.[1]?.wickets || 0,
                  overs: summaryData.innings?.[1]?.overs || 0
                },
                team2: {
                  name: matchData.awayTeamData?.name || matchData.team2?.name || 'Team 2',
                  score: summaryData.innings?.[2]?.score || 0,
                  wickets: summaryData.innings?.[2]?.wickets || 0,
                  overs: summaryData.innings?.[2]?.overs || 0
                }
              },
              venue: matchData.venue || { name: 'Local Venue' },
              date: matchData.scheduledTime || matchData.date || new Date().toISOString(),
              format: matchData.format || 'T20',
              status: 'live',
              scorecard: summaryData.scorecard || null,
              result: summaryData.result || { summary: 'Match in progress' }
            };
          } else if (matchData) {
            // This is a scheduled match
            matchData = {
              id: matchData.id || matchId,
              sport: matchData.sport || 'cricket',
              teams: {
                team1: {
                  name: matchData.homeTeamData?.name || matchData.team1?.name || 'Team 1',
                  score: 0,
                  wickets: 0,
                  overs: 0
                },
                team2: {
                  name: matchData.awayTeamData?.name || matchData.team2?.name || 'Team 2',
                  score: 0,
                  wickets: 0,
                  overs: 0
                }
              },
              venue: matchData.venue || { name: 'Local Venue' },
              date: matchData.scheduledTime || matchData.date || new Date().toISOString(),
              format: matchData.format || 'T20',
              status: 'scheduled',
              result: { summary: 'Match not started' }
            };
          }
        }
        
        if (!matchData) {
          throw new Error('Match not found');
        }
        
        setMatch(matchData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match details:', error);
        setLoading(false);
      }
    };
    
    fetchMatchDetails();
  }, [matchId]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleDownloadScorecard = () => {
    // In a real app, this would generate a PDF
    alert('Downloading scorecard...');
    // The actual implementation would call the match service to generate a PDF
  };
  
  const handlePrintScorecard = () => {
    window.print();
  };
  
  const handleShareMatch = () => {
    if (navigator.share) {
      navigator.share({
        title: `${match.teams.team1.name} vs ${match.teams.team2.name}`,
        text: `Check out this ${match.sport} match: ${match.teams.team1.name} vs ${match.teams.team2.name}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!match) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <GiWhistle className="text-gray-400 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Match Not Found</h2>
          <p className="text-gray-600 mb-6">
            The match you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/matches"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/matches"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Matches
          </Link>
        </div>
        
        {/* Match Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              {sportIcons[match.sport] || <GiWhistle className="text-gray-600" />}
              <span className="ml-2 text-sm font-medium text-gray-500">{match.sport}</span>
              <span className="mx-2 text-gray-300">•</span>
              <StatusBadge status={match.status} />
            </div>
            
            <div className="flex space-x-2">
              {match.status === 'completed' && (
                <>
                  <button
                    onClick={handleDownloadScorecard}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FaDownload className="mr-1.5" />
                    Download
                  </button>
                  <button
                    onClick={handlePrintScorecard}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FaPrint className="mr-1.5" />
                    Print
                  </button>
                </>
              )}
              <button
                onClick={handleShareMatch}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaShareAlt className="mr-1.5" />
                Share
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {match.teams.team1.name} vs {match.teams.team2.name}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Date & Time:</span> {formatDate(match.date)}
              </div>
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Venue:</span> {match.venue?.name || 'Local Venue'}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Format:</span> {match.format || 'Standard Format'}
              </div>
            </div>
            
            {match.status === 'completed' || match.status === 'live' ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">{match.teams.team1.name}</div>
                  <div className="font-bold">{match.teams.team1.score}-{match.teams.team1.wickets} ({match.teams.team1.overs})</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-medium">{match.teams.team2.name}</div>
                  <div className="font-bold">{match.teams.team2.score}-{match.teams.team2.wickets} ({match.teams.team2.overs})</div>
                </div>
                {match.status === 'completed' && match.result && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm font-medium text-gray-800">
                    {match.result.summary}
                  </div>
                )}
                {match.status === 'live' && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-sm font-medium text-red-600 flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    LIVE: Match in progress
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Match Status:</span> Scheduled
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  This match has not started yet.
                </div>
              </div>
            )}
          </div>
          
          {/* Action Button */}
          {match.status === 'live' ? (
            <Link
              to={`/matches/score/${match.sport}/${match.id}`}
              className="inline-block w-full sm:w-auto text-center py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Continue Scoring
            </Link>
          ) : match.status === 'scheduled' ? (
            <Link
              to={`/matches/score/${match.sport}/${match.id}`}
              className="inline-block w-full sm:w-auto text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Start Match
            </Link>
          ) : null}
        </div>
        
        {/* Scorecard (for completed matches) */}
        {match.status === 'completed' && match.sport === 'cricket' && (
          <CricketScorecard match={match} />
        )}
        
        {/* Badminton Scorecard */}
        {match.status === 'completed' && match.sport === 'badminton' && (
          <BadmintonScorecard match={match} />
        )}
        
        {/* Volleyball Scorecard */}
        {match.status === 'completed' && match.sport === 'volleyball' && (
          <VolleyballScorecard match={match} />
        )}
        
        {/* Kabaddi Scorecard */}
        {match.status === 'completed' && match.sport === 'kabaddi' && (
          <KabaddiScorecard match={match} />
        )}
        
        {/* For other sports or match statuses */}
        {(match.status !== 'completed' || (match.sport !== 'cricket' && match.sport !== 'badminton')) && match.status !== 'scheduled' && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <GiWhistle className="text-gray-400 text-4xl mx-auto mb-4" />
            {match.status === 'live' ? (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Match in Progress</h3>
                <p className="text-gray-600 mb-4">
                  This match is currently being played. Check back later for the full scorecard.
                </p>
                <Link
                  to={`/matches/score/${match.sport}/${match.id}`}
                  className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Go to Live Scoring
                </Link>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Scorecard Not Available</h3>
                <p className="text-gray-600">
                  The scorecard for this {match.sport} match is not available yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
