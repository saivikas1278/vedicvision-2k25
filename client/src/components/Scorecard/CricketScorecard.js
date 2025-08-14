import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CricketScorecard = ({ scorecard, match, onUpdate, canEdit }) => {
  const [localScore, setLocalScore] = useState(scorecard.cricket);
  const currentInnings = localScore.innings[localScore.innings.length - 1];

  const handleScoreUpdate = (type, value = 1) => {
    if (!canEdit) return;

    const updatedInnings = { ...currentInnings };
    switch (type) {
      case 'run':
        updatedInnings.runs += value;
        updatedInnings.batsmen[0].runs += value;
        updatedInnings.batsmen[0].balls += 1;
        updatedInnings.balls += 1;
        if (updatedInnings.balls === 6) {
          updatedInnings.overs += 1;
          updatedInnings.balls = 0;
        }
        break;
      case 'wide':
        updatedInnings.extras.wides += 1;
        updatedInnings.runs += 1;
        break;
      case 'noBall':
        updatedInnings.extras.noBalls += 1;
        updatedInnings.runs += 1;
        break;
      case 'wicket':
        updatedInnings.wickets += 1;
        updatedInnings.batsmen[0].isOut = true;
        updatedInnings.bowlers[0].wickets += 1;
        updatedInnings.balls += 1;
        if (updatedInnings.balls === 6) {
          updatedInnings.overs += 1;
          updatedInnings.balls = 0;
        }
        break;
      default:
        break;
    }

    const newScore = {
      ...localScore,
      innings: localScore.innings.map((inn, idx) => 
        idx === localScore.innings.length - 1 ? updatedInnings : inn
      )
    };

    setLocalScore(newScore);
    onUpdate({
      sportsCategory: 'cricket',
      cricket: newScore
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded">
        <div>
          <h3 className="font-bold">{match.homeTeam.name}</h3>
          <p className="text-2xl font-bold">
            {currentInnings.runs}/{currentInnings.wickets}
          </p>
          <p className="text-gray-600">
            ({currentInnings.overs}.{currentInnings.balls} overs)
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-gray-600">Required Run Rate: {/* Calculate RRR */}</p>
          <p className="text-sm text-gray-600">Current Run Rate: {
            ((currentInnings.runs / (currentInnings.overs * 6 + currentInnings.balls)) * 6).toFixed(2)
          }</p>
        </div>
      </div>

      {canEdit && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleScoreUpdate('run', 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            1 Run
          </button>
          <button
            onClick={() => handleScoreUpdate('run', 2)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            2 Runs
          </button>
          <button
            onClick={() => handleScoreUpdate('run', 4)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Four
          </button>
          <button
            onClick={() => handleScoreUpdate('run', 6)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Six
          </button>
          <button
            onClick={() => handleScoreUpdate('wide')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Wide
          </button>
          <button
            onClick={() => handleScoreUpdate('noBall')}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            No Ball
          </button>
          <button
            onClick={() => handleScoreUpdate('wicket')}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Wicket
          </button>
        </div>
      )}

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Batting</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Batsman</th>
                <th className="p-2">Runs</th>
                <th className="p-2">Balls</th>
                <th className="p-2">4s</th>
                <th className="p-2">6s</th>
                <th className="p-2">SR</th>
              </tr>
            </thead>
            <tbody>
              {currentInnings.batsmen.map((batsman, idx) => (
                <tr key={idx} className={batsman.isOut ? 'text-gray-500' : ''}>
                  <td className="p-2">{batsman.player}</td>
                  <td className="p-2 text-center">{batsman.runs}</td>
                  <td className="p-2 text-center">{batsman.balls}</td>
                  <td className="p-2 text-center">{batsman.fours}</td>
                  <td className="p-2 text-center">{batsman.sixes}</td>
                  <td className="p-2 text-center">
                    {batsman.balls > 0 ? ((batsman.runs / batsman.balls) * 100).toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Bowling</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Bowler</th>
                <th className="p-2">O</th>
                <th className="p-2">R</th>
                <th className="p-2">W</th>
                <th className="p-2">M</th>
                <th className="p-2">Econ</th>
              </tr>
            </thead>
            <tbody>
              {currentInnings.bowlers.map((bowler, idx) => (
                <tr key={idx}>
                  <td className="p-2">{bowler.player}</td>
                  <td className="p-2 text-center">{bowler.overs}</td>
                  <td className="p-2 text-center">{bowler.runs}</td>
                  <td className="p-2 text-center">{bowler.wickets}</td>
                  <td className="p-2 text-center">{bowler.maidens}</td>
                  <td className="p-2 text-center">
                    {bowler.overs > 0 ? (bowler.runs / bowler.overs).toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CricketScorecard;
