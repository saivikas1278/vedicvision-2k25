import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaFilter, FaFire, FaClock, FaTrophy, FaChevronDown } from 'react-icons/fa';
import PhotoPost from '../../components/Photo/PhotoPost';
import PhotoUploadForm from '../../components/Photo/PhotoUploadForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const PhotoHub = () => {
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
            imageUrl: 'https://picsum.photos/id/237/800/800',
            caption: 'Championship trophy! Hard work pays off. #basketball #champion #nba',
            location: 'Chicago Stadium',
            tags: ['basketball', 'champion', 'nba'],
            likes: 352,
            comments: [
              {
                id: 'c1',
                user: {
                  id: 'user2',
                  name: 'LeBron James',
                  avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
                },
                text: 'Congrats man! Well deserved.',
                timestamp: '2025-08-10T14:22:00Z'
              },
              {
                id: 'c2',
                user: {
                  id: 'user3',
                  name: 'Stephen Curry',
                  avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
                },
                text: 'Legend! 🏆',
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
            imageUrl: 'https://picsum.photos/id/1012/800/800',
            caption: 'Perfect day for tennis! New racket feels amazing.',
            location: 'Wimbledon',
            tags: ['tennis', 'wimbledon', 'grandslam'],
            likes: 214,
            comments: [
              {
                id: 'c3',
                user: {
                  id: 'user5',
                  name: 'Venus Williams',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                },
                text: 'That racket looks great! We should practice together soon.',
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
            imageUrl: 'https://picsum.photos/id/1011/800/800',
            caption: 'Match day! Ready to give my all for the team. #soccer #matchday #champion',
            location: 'Madrid Stadium',
            tags: ['soccer', 'matchday', 'champion'],
            likes: 531,
            comments: [
              {
                id: 'c4',
                user: {
                  id: 'user7',
                  name: 'Lionel Messi',
                  avatar: 'https://randomuser.me/api/portraits/men/77.jpg'
                },
                text: 'Good luck! May the best team win.',
                timestamp: '2025-08-12T11:42:00Z'
              },
              {
                id: 'c5',
                user: {
                  id: 'user8',
                  name: 'Neymar Jr',
                  avatar: 'https://randomuser.me/api/portraits/men/82.jpg'
                },
                text: "Show them how it's done! 💪",
                timestamp: '2025-08-12T12:30:00Z'
              }
            ],
            timestamp: '2025-08-12T10:45:00Z',
            sport: 'Soccer'
          },
          {
            id: '4',
            user: {
              id: 'user9',
              name: 'Simone Biles',
              avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
            },
            imageUrl: 'https://picsum.photos/id/1035/800/800',
            caption: 'Training day! Perfecting my routine for the upcoming championship. #gymnastics #training #focus',
            location: 'Olympic Training Center',
            tags: ['gymnastics', 'training', 'focus'],
            likes: 287,
            comments: [
              {
                id: 'c6',
                user: {
                  id: 'user10',
                  name: 'Gabby Douglas',
                  avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
                },
                text: "Looking strong! Can't wait to see the final routine.",
                timestamp: '2025-08-13T10:15:00Z'
              }
            ],
            timestamp: '2025-08-13T09:22:00Z',
            sport: 'Gymnastics'
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
    { value: 'gymnastics', label: 'Gymnastics' },
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
            <h1 className="text-3xl font-bold text-gray-900">Sports Gallery</h1>
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
              placeholder="Search photos, users, or tags..."
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
                placeholder="Search photos, users, or tags..."
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
          <PhotoUploadForm onSuccess={handleNewPost} />
        )}
        
        {/* Posts */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <PhotoPost key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No photos found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `We couldn't find any photos matching "${searchTerm}"`
                : filter !== 'all'
                ? `No photos found for ${filter}`
                : 'Be the first to share a sports photo!'}
            </p>
            {isAuthenticated && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Upload a Photo
              </button>
            )}
          </div>
        )}
        
        {filteredPosts.length > 0 && filteredPosts.length < posts.length && (
          <div className="mt-4 text-center">
            <p className="text-gray-500">
              Showing {filteredPosts.length} of {posts.length} photos
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

export default PhotoHub;
