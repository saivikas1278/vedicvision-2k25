import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaArrowLeft, FaTrophy, FaFire, FaClock, FaWeight } from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProgressTracker = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7days'); // '7days', '30days', '90days', '1year'
  const [selectedMetric, setSelectedMetric] = useState('workouts');
  const [progressData, setProgressData] = useState({});
  const [bodyMeasurements, setBodyMeasurements] = useState([]);
  const [personalRecords, setPersonalRecords] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      // Mock data - in real app would be API calls
      const mockData = {
        workouts: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Workouts Completed',
            data: [1, 0, 1, 1, 0, 1, 1],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }]
        },
        calories: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Calories Burned',
            data: [320, 0, 450, 380, 0, 520, 290],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1
          }]
        },
        duration: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Workout Duration (minutes)',
            data: [45, 0, 60, 50, 0, 75, 40],
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: 'rgb(139, 92, 246)',
            borderWidth: 1
          }]
        },
        workoutTypes: {
          labels: ['Strength', 'Cardio', 'HIIT', 'Flexibility', 'Sports'],
          datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 101, 101, 0.8)',
              'rgba(139, 92, 246, 0.8)',
              'rgba(251, 191, 36, 0.8)'
            ],
            borderWidth: 2
          }]
        }
      };

      setProgressData(mockData);

      // Mock body measurements
      setBodyMeasurements([
        { id: 1, date: '2025-08-01', weight: 75.5, bodyFat: 15.2, muscle: 42.8 },
        { id: 2, date: '2025-08-08', weight: 75.2, bodyFat: 14.9, muscle: 43.1 },
        { id: 3, date: '2025-08-13', weight: 74.8, bodyFat: 14.6, muscle: 43.4 }
      ]);

      // Mock personal records
      setPersonalRecords([
        { id: 1, exercise: 'Bench Press', weight: 80, date: '2025-08-10', improvement: '+5kg' },
        { id: 2, exercise: 'Squat', weight: 100, date: '2025-08-08', improvement: '+10kg' },
        { id: 3, exercise: '5K Run', time: '24:30', date: '2025-08-05', improvement: '-1:30' },
        { id: 4, exercise: 'Plank', time: '3:45', date: '2025-08-12', improvement: '+45s' }
      ]);
    };

    fetchProgressData();
  }, [timeRange]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: selectedMetric !== 'workoutTypes' ? {
      y: {
        beginAtZero: true,
      },
    } : undefined,
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const getCurrentData = () => {
    return progressData[selectedMetric] || { labels: [], datasets: [] };
  };

  const renderChart = () => {
    const data = getCurrentData();
    
    if (selectedMetric === 'workoutTypes') {
      return <Doughnut data={data} options={doughnutOptions} />;
    } else if (selectedMetric === 'workouts') {
      return <Line data={data} options={chartOptions} />;
    } else {
      return <Bar data={data} options={chartOptions} />;
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
          <FaChartBar className="mr-3 text-blue-600" /> Progress Tracker
        </h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Workouts</h3>
              <p className="text-3xl font-bold text-blue-600">127</p>
              <p className="text-sm text-green-600">+8 this week</p>
            </div>
            <FaTrophy className="text-4xl text-blue-200" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Calories Burned</h3>
              <p className="text-3xl font-bold text-green-600">45,280</p>
              <p className="text-sm text-green-600">+1,850 this week</p>
            </div>
            <FaFire className="text-4xl text-green-200" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Time</h3>
              <p className="text-3xl font-bold text-purple-600">89h</p>
              <p className="text-sm text-green-600">+5h this week</p>
            </div>
            <FaClock className="text-4xl text-purple-200" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Current Weight</h3>
              <p className="text-3xl font-bold text-orange-600">74.8kg</p>
              <p className="text-sm text-green-600">-0.7kg this month</p>
            </div>
            <FaWeight className="text-4xl text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Progress Charts</h2>
              <div className="flex space-x-2">
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="workouts">Workouts</option>
                  <option value="calories">Calories</option>
                  <option value="duration">Duration</option>
                  <option value="workoutTypes">Workout Types</option>
                </select>
                
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  disabled={selectedMetric === 'workoutTypes'}
                >
                  <option value="7days">7 Days</option>
                  <option value="30days">30 Days</option>
                  <option value="90days">90 Days</option>
                  <option value="1year">1 Year</option>
                </select>
              </div>
            </div>
            
            <div className="h-80">
              {renderChart()}
            </div>
          </div>

          {/* Personal Records */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Records</h2>
            <div className="space-y-4">
              {personalRecords.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{record.exercise}</h3>
                    <p className="text-sm text-gray-600">{record.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">
                      {record.weight ? `${record.weight}kg` : record.time}
                    </p>
                    <p className="text-sm text-green-600">{record.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Body Measurements */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Body Measurements</h2>
            <div className="space-y-4">
              {bodyMeasurements.slice(-3).map(measurement => (
                <div key={measurement.id} className="border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{measurement.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-semibold text-blue-600">{measurement.weight}kg</p>
                      <p className="text-xs text-gray-500">Weight</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-600">{measurement.bodyFat}%</p>
                      <p className="text-xs text-gray-500">Body Fat</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-purple-600">{measurement.muscle}kg</p>
                      <p className="text-xs text-gray-500">Muscle</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
              Add New Measurement
            </button>
          </div>

          {/* Goal Progress */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Goal Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lose 5kg</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">3kg lost, 2kg to go</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Run 5K under 25min</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Current best: 24:30</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Bench Press 80kg</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <p className="text-xs text-green-600 mt-1">Goal achieved! 🎉</p>
              </div>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">This Week</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Workouts:</span>
                <span className="font-medium">5/6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Calories:</span>
                <span className="font-medium">1,850</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Duration:</span>
                <span className="font-medium">52 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Streak:</span>
                <span className="font-medium text-green-600">7 days 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
