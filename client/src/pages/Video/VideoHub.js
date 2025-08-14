import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaFilter, FaFire, FaClock, FaTrophy, FaChevronDown } from 'react-icons/fa';
import VideoPost from '../../components/Video/VideoPost';
import VideoUploadForm from '../../components/Video/VideoUploadForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const VideoHub = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate fetching posts from API
    const fetchPosts = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockPosts = [
          {
            id: '1',
            user: {
              id: 'user1',
              name: 'Michael Jordan',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            thumbnailUrl: 'https://picsum.photos/id/1/600/400',
            caption: 'Just scored my personal best in the championship game! #basketball #slam #championship',
            location: 'Chicago Stadium',
            tags: ['basketball', 'slam', 'championship'],
            likes: 245,
            comments: [
              {
                id: 'c1',
                user: {
                  id: 'user2',
                  name: 'LeBron James',
                  avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
                },
                text: 'Amazing shot! Your technique is flawless.',
                timestamp: '2025-08-10T14:22:00Z'
              },
              {
                id: 'c2',
                user: {
                  id: 'user3',
                  name: 'Stephen Curry',
                  avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
                },
                text: 'Teach me that move sometime!',
                timestamp: '2025-08-10T15:30:00Z'
              }
            ],
            timestamp: '2025-08-10T12:15:00Z',
            sport: 'Basketball'
          },
          {
            id: '2',
            user: {
              id: 'user4',
              name: 'Serena Williams',
              avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
            },
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            thumbnailUrl: 'https://picsum.photos/id/20/600/400',
            caption: 'Perfect day for tennis! Working on my serve for the upcoming tournament.',
            location: 'Wimbledon',
            tags: ['tennis', 'practice', 'serve'],
            likes: 189,
            comments: [
              {
                id: 'c3',
                user: {
                  id: 'user5',
                  name: 'Venus Williams',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                },
                text: 'Your serve is getting even better!',
                timestamp: '2025-08-11T09:15:00Z'
              }
            ],
            timestamp: '2025-08-11T08:30:00Z',
            sport: 'Tennis'
          },
          {
            id: '3',
            user: {
              id: 'user6',
              name: 'Cristiano Ronaldo',
              avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
            },
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            thumbnailUrl: 'https://picsum.photos/id/26/600/400',
            caption: 'Free kick practice! Scored 9 out of 10 today. #soccer #freekick #practice',
            location: 'Madrid Training Grounds',
            tags: ['soccer', 'freekick', 'practice'],
            likes: 423,
            comments: [
              {
                id: 'c4',
                user: {
                  id: 'user7',
                  name: 'Lionel Messi',
                  avatar: 'https://randomuser.me/api/portraits/men/77.jpg'
                },
                text: 'Great form! The curve on that last one was incredible.',
                timestamp: '2025-08-12T11:42:00Z'
              },
              {
                id: 'c5',
                user: {
                  id: 'user8',
                  name: 'Neymar Jr',
                  avatar: 'https://randomuser.me/api/portraits/men/82.jpg'
                },
                text: 'Need to try that technique!',
                timestamp: '2025-08-12T12:30:00Z'
              }
            ],
            timestamp: '2025-08-12T10:45:00Z',
            sport: 'Soccer'
          }
        ];
        
        setPosts(mockPosts);
        setFilteredPosts(mockPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle adding a new post
  const handleNewPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setFilteredPosts(
      filterPosts(updatedPosts, filter, searchTerm, sort)
    );
  };

  // Filter posts based on search term, filter, and sort
  const filterPosts = (postsArray, filterType, search, sortType) => {
    // First filter by sport/type
    let filtered = postsArray;
    if (filterType !== 'all') {
      filtered = postsArray.filter(post => 
        post.sport.toLowerCase() === filterType.toLowerCase() ||
        post.tags.includes(filterType.toLowerCase())
      );
    }
    
    // Then filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(post => 
        post.caption.toLowerCase().includes(searchLower) ||
        post.user.name.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (post.location && post.location.toLowerCase().includes(searchLower))
      );
    }
    
    // Finally sort
    switch(sortType) {
      case 'latest':
        return [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case 'popular':
        return [...filtered].sort((a, b) => b.likes - a.likes);
      case 'oldest':
        return [...filtered].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      default:
        return filtered;
    }
  };

  // Handle search and filter changes
  useEffect(() => {
    const filtered = filterPosts(posts, filter, searchTerm, sort);
    setFilteredPosts(filtered);
  }, [filter, searchTerm, sort, posts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
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
    { value: 'cricket', label: 'Cricket' },
    { value: 'rugby', label: 'Rugby' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'latest', label: 'Latest', icon: <FaClock /> },
    { value: 'popular', label: 'Popular', icon: <FaFire /> },
    { value: 'oldest', label: 'Oldest', icon: <FaTrophy /> }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sports Feed</h1>
            <p className="text-gray-600">Share and discover sports moments</p>
          </div>
          
          <button 
            className="md:hidden flex items-center space-x-1 bg-white p-2 rounded-full shadow-sm text-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <FaChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Search and Filters - Desktop */}
        <div className="hidden md:flex space-x-4 mb-6">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search videos, users, or tags..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Sport Filter */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
        
        {/* Search and Filters - Mobile */}
        {showFilters && (
          <div className="md:hidden space-y-3 mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search videos, users, or tags..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by sport</label>
                <select 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                <select 
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          <VideoUploadForm onSuccess={handleNewPost} />
        )}
        
        {/* Posts */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <VideoPost key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No videos found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `We couldn't find any videos matching "${searchTerm}"`
                : filter !== 'all'
                ? `No videos found for ${filter}`
                : 'Be the first to share a sports video!'}
            </p>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Upload a Video
              </button>
            )}
          </div>
        )}
        
        {filteredPosts.length > 0 && filteredPosts.length < posts.length && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Showing {filteredPosts.length} of {posts.length} videos
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilter('all');
              }}
              className="mt-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoHub;
