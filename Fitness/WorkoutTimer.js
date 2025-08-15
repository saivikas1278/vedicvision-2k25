import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStopwatch, FaArrowLeft, FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const WorkoutTimer = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // 'work', 'rest'
  const [workTime, setWorkTime] = useState(300); // 5 minutes
  const [restTime, setRestTime] = useState(60); // 1 minute
  const [rounds, setRounds] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [timerType, setTimerType] = useState('simple'); // 'simple', 'interval', 'tabata'

  const handleTimerComplete = () => {
    // Play sound notification
    if ('Notification' in window) {
      new Notification('Timer Complete!', {
        body: mode === 'work' ? 'Rest time!' : 'Work time!',
        icon: '/favicon.ico'
      });
    }

    if (timerType === 'interval') {
      if (mode === 'work') {
        setMode('rest');
        setTimeLeft(restTime);
      } else {
        if (currentRound < rounds) {
          setCurrentRound(currentRound + 1);
          setMode('work');
          setTimeLeft(workTime);
        } else {
          setIsRunning(false);
          alert('Workout Complete! Great job!');
        }
      }
    } else {
      setIsRunning(false);
      alert('Timer Complete!');
    }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, restTime, workTime, timerType, currentRound, rounds]);

  const startTimer = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentRound(1);
    setMode('work');
    if (timerType === 'simple') {
      setTimeLeft(workTime);
    } else {
      setTimeLeft(workTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setPreset = (preset) => {
    setIsRunning(false);
    setCurrentRound(1);
    setMode('work');
    
    switch (preset) {
      case 'tabata':
        setTimerType('interval');
        setWorkTime(20);
        setRestTime(10);
        setRounds(8);
        setTimeLeft(20);
        break;
      case 'hiit':
        setTimerType('interval');
        setWorkTime(45);
        setRestTime(15);
        setRounds(12);
        setTimeLeft(45);
        break;
      case 'strength':
        setTimerType('interval');
        setWorkTime(120);
        setRestTime(60);
        setRounds(6);
        setTimeLeft(120);
        break;
      default:
        setTimerType('simple');
        setTimeLeft(300);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/fitness')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaStopwatch className="mr-3 text-blue-600" /> Workout Timer
        </h1>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Timer Display */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
          <div className={`text-8xl font-bold mb-4 ${
            mode === 'work' ? 'text-green-600' : 'text-blue-600'
          }`}>
            {formatTime(timeLeft)}
          </div>
          
          {timerType === 'interval' && (
            <div className="mb-4">
              <div className={`text-xl font-semibold mb-2 ${
                mode === 'work' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {mode === 'work' ? 'WORK' : 'REST'}
              </div>
              <div className="text-gray-600">
                Round {currentRound} of {rounds}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {timerType === 'interval' && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  mode === 'work' ? 'bg-green-600' : 'bg-blue-600'
                }`}
                style={{ 
                  width: `${((currentRound - 1) / rounds + (1 - timeLeft / (mode === 'work' ? workTime : restTime)) / rounds) * 100}%` 
                }}
              ></div>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={isRunning ? pauseTimer : startTimer}
              className={`px-8 py-3 rounded-lg font-semibold text-white text-lg flex items-center ${
                isRunning 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isRunning ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={resetTimer}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-lg flex items-center"
            >
              <FaRedo className="mr-2" /> Reset
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Presets</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setPreset('tabata')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="font-semibold text-gray-800">Tabata</div>
              <div className="text-sm text-gray-600">20s work / 10s rest</div>
              <div className="text-xs text-gray-500">8 rounds</div>
            </button>
            
            <button
              onClick={() => setPreset('hiit')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="font-semibold text-gray-800">HIIT</div>
              <div className="text-sm text-gray-600">45s work / 15s rest</div>
              <div className="text-xs text-gray-500">12 rounds</div>
            </button>
            
            <button
              onClick={() => setPreset('strength')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="font-semibold text-gray-800">Strength</div>
              <div className="text-sm text-gray-600">2min work / 1min rest</div>
              <div className="text-xs text-gray-500">6 rounds</div>
            </button>
            
            <button
              onClick={() => {
                setTimerType('simple');
                setTimeLeft(600);
                setIsRunning(false);
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="font-semibold text-gray-800">Custom</div>
              <div className="text-sm text-gray-600">10 minutes</div>
              <div className="text-xs text-gray-500">Simple timer</div>
            </button>
          </div>
        </div>

        {/* Custom Settings */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Custom Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timer Type
              </label>
              <select
                value={timerType}
                onChange={(e) => setTimerType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="simple">Simple Timer</option>
                <option value="interval">Interval Timer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Time (seconds)
              </label>
              <input
                type="number"
                value={workTime}
                onChange={(e) => setWorkTime(parseInt(e.target.value))}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {timerType === 'interval' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rest Time (seconds)
                </label>
                <input
                  type="number"
                  value={restTime}
                  onChange={(e) => setRestTime(parseInt(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Rounds
                </label>
                <input
                  type="number"
                  value={rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setTimeLeft(workTime);
              setCurrentRound(1);
              setMode('work');
              setIsRunning(false);
            }}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;
