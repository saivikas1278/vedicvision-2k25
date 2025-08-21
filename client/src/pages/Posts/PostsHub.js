import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaFilter, FaFire, FaClock, FaTrophy, FaChevronDown, FaImage, FaVideo } from 'react-icons/fa';
import Post from '../../components/Posts/Post';
import PostUploadForm from '../../components/Posts/PostUploadForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { useTheme } from '../../context/ThemeContext';
import { 
  fetchPosts, 
  selectPosts, 
  selectPostsLoading, 
  selectPostsError,
  setFilters,
  clearError
} from '../../redux/slices/postSlice';

const PostsHub = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const { isDark } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get('type');
  
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState(typeParam || 'all');
  const [sort, setSort] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Clear any previous errors
    if (error) {
      dispatch(clearError());
    }

    // Fetch posts from backend
    const fetchParams = {
      page: 1,
      limit: 20,
      sort: sort === 'latest' ? '-createdAt' : sort === 'popular' ? '-likesCount' : 'createdAt'
    };

    if (filter !== 'all') {
      fetchParams.sport = filter;
    }

    if (mediaTypeFilter !== 'all') {
      fetchParams.type = mediaTypeFilter;
    }

    if (searchTerm) {
      fetchParams.search = searchTerm;
    }

    dispatch(fetchPosts(fetchParams));
  }, [dispatch, filter, mediaTypeFilter, searchTerm, sort, error]);

  // Handle adding a new post
  const handleNewPost = (newPost) => {
    // The post will be automatically added to the store via the createPost action
    // We just need to refresh the posts list
    dispatch(fetchPosts({
      page: 1,
      limit: 20,
      sort: sort === 'latest' ? '-createdAt' : sort === 'popular' ? '-likesCount' : 'createdAt'
    }));
  };

  // Filter posts based on search term, filter, and sort
  const filterPosts = (postsArray, sportFilter, typeFilter, search, sortType) => {
    // Since filtering is now handled by the backend API, we just return the posts
    return postsArray;
  };

  // Handle search and filter changes - these now trigger new API calls
  useEffect(() => {
    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      if (searchTerm !== '') {
        // The useEffect above will handle the API call with search term
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleMediaTypeChange = (newType) => {
    setMediaTypeFilter(newType);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  // Available sports for filtering
  const sportFilters = [
    { value: 'all', label: 'All Sports' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'gymnastics', label: 'Gymnastics' },
    { value: 'cricket', label: 'Cricket' },
    { value: 'rugby', label: 'Rugby' }
  ];

  // Media type filters
  const mediaTypeFilters = [
    { value: 'all', label: 'All Media', icon: null },
    { value: 'photo', label: 'Photos', icon: <FaImage className="mr-1" /> },
    { value: 'video', label: 'Videos', icon: <FaVideo className="mr-1" /> }
  ];

  // Sort options
  const sortOptions = [
    { value: 'latest', label: 'Latest', icon: <FaClock /> },
    { value: 'popular', label: 'Popular', icon: <FaFire /> },
    { value: 'oldest', label: 'Oldest', icon: <FaTrophy /> }
  ];

  return (
    <div className={`min-h-screen pb-10 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Sports Feed</h1>
            <p className={`transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>Share and discover sports moments</p>
          </div>
          
          <button 
            className={`md:hidden flex items-center space-x-1 p-2 rounded-full shadow-sm transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <FaChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Search and Filters - Desktop */}
        <div className="hidden md:block mb-6">
          <div className="flex space-x-4 mb-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                placeholder="Search posts, users, or tags..."
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            {/* Sport Filter */}
            <select 
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              {sportFilters.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Sort Options */}
            <select 
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Media Type Filters */}
          <div className={`flex rounded-lg shadow-sm p-1 transition-colors duration-300 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            {mediaTypeFilters.map(option => (
              <button
                key={option.value}
                onClick={() => handleMediaTypeChange(option.value)}
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center space-x-1 transition-all duration-300 ${
                  mediaTypeFilter === option.value
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Search and Filters - Mobile */}
        {showFilters && (
          <div className={`md:hidden space-y-3 mb-6 p-4 rounded-lg shadow-sm transition-colors duration-300 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                placeholder="Search posts, users, or tags..."
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            {/* Media Type Filters */}
            <div>
              <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>Media type</label>
              <div className={`grid grid-cols-3 gap-1 p-1 rounded-lg transition-colors duration-300 ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {mediaTypeFilters.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleMediaTypeChange(option.value)}
                    className={`py-1 px-2 rounded-md flex items-center justify-center text-sm transition-all duration-300 ${
                      mediaTypeFilter === option.value
                        ? isDark 
                          ? 'bg-gray-600 shadow-sm font-medium text-primary-400'
                          : 'bg-white shadow-sm font-medium text-primary-700'
                        : isDark 
                          ? 'text-gray-300' 
                          : 'text-gray-600'
                    }`}
                  >
                    {option.icon && <span className="mr-1">{option.icon}</span>}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Filter by sport</label>
                <select 
                  className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  {sportFilters.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>Sort by</label>
                <select 
                  className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        
        {/* Upload Form */}
        {isAuthenticated && (
          <PostUploadForm onSuccess={handleNewPost} />
        )}
        
        {/* Posts */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className={`rounded-xl shadow-md p-8 text-center transition-colors duration-300 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${
              isDark ? 'bg-red-900/20' : 'bg-red-100'
            }`}>
              <FaSearch className={`text-2xl transition-colors duration-300 ${
                isDark ? 'text-red-400' : 'text-red-600'
              }`} />
            </div>
            <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>Error loading posts</h3>
            <p className={`mb-6 transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {error}
            </p>
            <button
              onClick={() => dispatch(fetchPosts({ page: 1, limit: 20 }))}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Try Again
            </button>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map(post => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className={`rounded-xl shadow-md p-8 text-center transition-colors duration-300 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${
              isDark ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <FaSearch className={`text-2xl transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
            </div>
            <h3 className={`text-xl font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>No posts found</h3>
            <p className={`mb-6 transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {searchTerm
                ? `We couldn't find any posts matching "${searchTerm}"`
                : filter !== 'all'
                ? `No posts found for ${filter}`
                : mediaTypeFilter !== 'all'
                ? `No ${mediaTypeFilter}s found`
                : 'Be the first to share a sports moment!'}
            </p>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                  setMediaTypeFilter('all');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create a Post
              </button>
            )}
          </div>
        )}
        
        {posts.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Showing {posts.length} posts
            </p>
            {(searchTerm || filter !== 'all' || mediaTypeFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                  setMediaTypeFilter('all');
                }}
                className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsHub;
