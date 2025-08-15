import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Theme Provider
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import NavbarSwitcher from './components/Layout/NavbarSwitcher';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import Dashboard from './pages/Dashboard/Dashboard';
import TournamentHub from './pages/Tournament/TournamentHub';
import TournamentDetails from './pages/Tournament/TournamentDetails';
import TournamentCreatePage from './pages/Tournament/TournamentCreatePage';
import LiveTournamentBoard from './pages/Tournament/LiveTournamentBoard';
import PostsHub from './pages/Posts/PostsHub';
import PostDetails from './pages/Posts/PostDetails';
import FitnessHub from './pages/Fitness/FitnessHub';
import FitnessDetails from './pages/Fitness/FitnessDetails';
import WorkoutBuilder from './pages/Fitness/WorkoutBuilder';
import WorkoutTimer from './pages/Fitness/WorkoutTimer';
import ProgressTracker from './pages/Fitness/ProgressTracker';
import NutritionTracker from './pages/Fitness/NutritionTracker';
import NutritionGuide from './pages/Fitness/NutritionGuide';
import BrowseWorkout from './pages/Fitness/BrowseWorkout';
import WorkoutDetails from './pages/Fitness/WorkoutDetails';
import ProfilePage from './pages/Profile/ProfilePage';
import SettingsPage from './pages/Settings/SettingsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import TeamsPage from './pages/Team/TeamsPage';
import CricketHub from './pages/Cricket/CricketHub';
import CricketCreateMatch from './pages/Cricket/CricketCreateMatch';
import ThemeShowcase from './pages/ThemeShowcase';

// Match pages
import CreateMatch from './pages/Matches/CreateMatch';
import TeamSelection from './pages/Matches/TeamSelection';
import CricketScoring from './pages/Matches/Scoring/CricketScoring';
import BadmintonScoring from './pages/Matches/Scoring/BadmintonScoring';
import VolleyballScoring from './pages/Matches/Scoring/VolleyballScoring';
import KabaddiScoring from './pages/Matches/Scoring/KabaddiScoring';
import MatchesHub from './pages/Matches/MatchesHub';
import MatchDetails from './pages/Matches/MatchDetails';

// Protected Route Component
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Redux Actions
import { loadUser } from './redux/slices/authSlice';

// Socket.io
import { initializeSocket, disconnectSocket } from './services/socket';

// Custom redirect component for dynamic paths
const DynamicRedirect = ({ pattern, replacement }) => {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const to = replacement.replace(':id', id);
  return <Navigate to={to} replace />;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load user on app start
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    // Initialize socket connection only when authenticated
    if (isAuthenticated && !loading) {
      console.log('[App] User is authenticated, initializing socket connection');
      initializeSocket();
    } else if (!isAuthenticated && !loading) {
      console.log('[App] User not authenticated, disconnecting socket');
      disconnectSocket();
    }

    // Cleanup socket on unmount
    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
        <NavbarSwitcher />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} 
            />
            
            {/* Theme Showcase */}
            <Route path="/theme-showcase" element={<ThemeShowcase />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Tournament Routes */}
            <Route path="/tournaments" element={<TournamentHub />} />
            <Route path="/tournaments/create" element={<TournamentCreatePage />} />
            <Route path="/tournaments/:id" element={<TournamentDetails />} />
            <Route 
              path="/tournaments/:id/live" 
              element={
                <ProtectedRoute>
                  <LiveTournamentBoard />
                </ProtectedRoute>
              } 
            />
            
            {/* Team Routes */}
            <Route 
              path="/teams" 
              element={
                <ProtectedRoute>
                  <TeamsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Match Routes */}
            <Route path="/matches" element={<MatchesHub />} />
            <Route path="/matches/:matchId" element={<MatchDetails />} />
            <Route 
              path="/matches/create" 
              element={
                <ProtectedRoute>
                  <CreateMatch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/matches/create/:sportId/teams" 
              element={
                <ProtectedRoute>
                  <TeamSelection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/matches/score/cricket/:matchId" 
              element={
                <ProtectedRoute>
                  <CricketScoring />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/matches/score/badminton/:matchId" 
              element={
                <ProtectedRoute>
                  <BadmintonScoring />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/matches/score/volleyball/:matchId" 
              element={
                <ProtectedRoute>
                  <VolleyballScoring />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/matches/score/kabaddi/:matchId" 
              element={
                <ProtectedRoute>
                  <KabaddiScoring />
                </ProtectedRoute>
              } 
            />
            
            {/* Posts Routes */}
            <Route path="/posts" element={<PostsHub />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            
            {/* Legacy Routes - Redirect to new Posts routes */}
            <Route path="/videos" element={<Navigate to="/posts?type=video" replace />} />
            <Route path="/videos/:id" element={<DynamicRedirect pattern="/videos/:id" replacement="/posts/:id" />} />
            <Route path="/photos" element={<Navigate to="/posts?type=photo" replace />} />
            <Route path="/photos/:id" element={<DynamicRedirect pattern="/photos/:id" replacement="/posts/:id" />} />
            
            {/* Fitness Routes */}
            <Route path="/fitness" element={<FitnessHub />} />
            <Route path="/fitness/browse-workouts" element={<BrowseWorkout />} />
            <Route path="/fitness/workout/:id" element={<WorkoutDetails />} />
            <Route path="/fitness/workout-builder" element={<WorkoutBuilder />} />
            <Route path="/fitness/timer" element={<WorkoutTimer />} />
            <Route path="/fitness/progress" element={<ProgressTracker />} />
            <Route path="/fitness/nutrition" element={<NutritionTracker />} />
            <Route path="/fitness/nutrition-guide" element={<NutritionGuide />} />
            <Route path="/fitness/:id" element={<FitnessDetails />} />
            
            {/* User Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Cricket Routes */}
            <Route path="/cricket" element={<CricketHub />} />
            <Route path="/cricket/create" element={<CricketCreateMatch />} />
            <Route path="/cricket/create-match" element={<CricketCreateMatch />} />
            <Route path="/cricket/:id" element={<CricketHub />} />
            <Route path="/cricket/:id/score" element={<CricketHub />} />
            <Route path="/cricket/:id/edit" element={<CricketCreateMatch />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
