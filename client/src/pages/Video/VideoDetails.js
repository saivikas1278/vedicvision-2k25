import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark, FaArrowLeft, FaEllipsisH, FaFlag, FaTrash } from 'react-icons/fa';
import { formatDate, getRelativeTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { showToast } from '../../utils/toast';

const VideoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    // Simulate fetching post details from API
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockPost = {
          id: '1',
          user: {
            id: 'user1',
            name: 'Michael Jordan',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            bio: 'Basketball legend. 6x NBA Champion.'
          },
          videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          thumbnailUrl: 'https://picsum.photos/id/1/600/400',
          caption: 'Just scored my personal best in the championship game! This was during the final quarter when we were down by 2 points. The pressure was on but I managed to pull off this move. #basketball #slam #championship',
          location: 'Chicago Stadium',
          tags: ['basketball', 'slam', 'championship'],
          likes: 245,
          views: 1203,
          comments: [
            {
              id: 'c1',
              user: {
                id: 'user2',
                name: 'LeBron James',
                avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
              },
              text: 'Amazing shot! Your technique is flawless.',
              timestamp: '2025-08-10T14:22:00Z',
              likes: 12
            },
            {
              id: 'c2',
              user: {
                id: 'user3',
                name: 'Stephen Curry',
                avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
              },
              text: 'Teach me that move sometime!',
              timestamp: '2025-08-10T15:30:00Z',
              likes: 8
            },
            {
              id: 'c3',
              user: {
                id: 'user4',
                name: 'Kevin Durant',
                avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
              },
              text: "That's exactly why you're the GOAT.",
              timestamp: '2025-08-10T16:45:00Z',
              likes: 15
            }
          ],
          timestamp: '2025-08-10T12:15:00Z',
          sport: 'Basketball',
          duration: '00:58'
        };
        
        // Mock related videos
        const mockRelatedVideos = [
          {
            id: '2',
            thumbnailUrl: 'https://picsum.photos/id/20/600/400',
            duration: '01:24',
            title: 'Slam Dunk Contest Highlights',
            user: {
              name: 'NBA Official',
              avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
            },
            views: 8765,
            timestamp: '2025-08-01T12:15:00Z'
          },
          {
            id: '3',
            thumbnailUrl: 'https://picsum.photos/id/26/600/400',
            duration: '03:12',
            title: 'Basketball Training Drills for Beginners',
            user: {
              name: 'Coach Mike',
              avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
            },
            views: 3421,
            timestamp: '2025-07-15T09:30:00Z'
          },
          {
            id: '4',
            thumbnailUrl: 'https://picsum.photos/id/29/600/400',
            duration: '02:45',
            title: 'Top 10 Basketball Plays of the Week',
            user: {
              name: 'Sports Central',
              avatar: 'https://randomuser.me/api/portraits/men/29.jpg'
            },
            views: 12543,
            timestamp: '2025-08-08T16:20:00Z'
          }
        ];
        
        setPost(mockPost);
        setLikes(mockPost.likes);
        setComments(mockPost.comments);
        setRelatedVideos(mockRelatedVideos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetails();
    }
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? 'Video removed from saved items' : 'Video saved to your collection', 'success');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard', 'success');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    if (!isAuthenticated) {
      showToast('Please log in to comment', 'info');
      return;
    }
    
    const newComment = {
      id: `c${Date.now()}`,
      user: {
        id: user?.id || 'current-user',
        name: user?.fullName || 'You',
        avatar: user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'
      },
      text: comment,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setComment('');
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    }));
  };

  const handleDeleteVideo = () => {
    // In a real app, this would call an API to delete the video
    showToast('Video deleted successfully', 'success');
    navigate('/videos');
  };

  const handleReportVideo = () => {
    // In a real app, this would open a report dialog
    showToast('Video reported. Our team will review it', 'info');
    setShowOptions(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Video not found</h2>
        <p className="mt-2 text-gray-600">The video you're looking for doesn't exist or has been removed.</p>
        <Link to="/videos" className="mt-4 inline-block text-primary-600 hover:underline">
          Back to Videos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to videos</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-black aspect-video">
                <video 
                  src={post.videoUrl} 
                  poster={post.thumbnailUrl}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-gray-900">{post.caption.split('!')[0] + '!'}</h1>
                  
                  <div className="relative">
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      <FaEllipsisH />
                    </button>
                    
                    {showOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                        {post.user.id === user?.id ? (
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                            onClick={handleDeleteVideo}
                          >
                            <FaTrash className="mr-2" />
                            Delete Video
                          </button>
                        ) : (
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={handleReportVideo}
                          >
                            <FaFlag className="mr-2" />
                            Report Video
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mt-4 text-sm text-gray-500 space-x-4">
                  <span>{post.views} views</span>
                  <span>•</span>
                  <span>{formatDate(post.timestamp)}</span>
                  <span>•</span>
                  <span>{post.sport}</span>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag} 
                      to={`/videos/tags/${tag}`} 
                      className="bg-gray-100 text-primary-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center mt-6 py-3 border-t border-b">
                  <div className="flex space-x-6">
                    <button 
                      className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
                      onClick={handleLike}
                    >
                      {liked ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
                      <span>{likes}</span>
                    </button>
                    
                    <button 
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary-500"
                      onClick={() => document.getElementById('comment-input').focus()}
                    >
                      <FaComment className="w-5 h-5" />
                      <span>{comments.length}</span>
                    </button>
                    
                    <button 
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary-500"
                      onClick={handleShare}
                    >
                      <FaShare className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <button 
                    className={saved ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}
                    onClick={handleSave}
                  >
                    {saved ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center mt-6">
                  <Link to={`/profile/${post.user.id}`}>
                    <img 
                      src={post.user.avatar} 
                      alt={post.user.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-100"
                    />
                  </Link>
                  <div className="ml-3">
                    <Link to={`/profile/${post.user.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                      {post.user.name}
                    </Link>
                    {post.user.bio && (
                      <p className="text-sm text-gray-500">{post.user.bio}</p>
                    )}
                  </div>
                  {post.user.id !== user?.id && (
                    <button 
                      className="ml-auto px-4 py-1 text-sm font-medium text-primary-600 border border-primary-600 rounded-full hover:bg-primary-50"
                    >
                      Follow
                    </button>
                  )}
                </div>
                
                {/* Description */}
                {post.caption && (
                  <div className="mt-6">
                    <p className="text-gray-700">{post.caption}</p>
                    {post.location && (
                      <p className="mt-1 text-sm text-gray-500">
                        📍 {post.location}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {comments.length} Comments
                </h3>
                
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex">
                    <img 
                      src={user?.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                      alt={user?.fullName || 'User'} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary-100 mr-3"
                    />
                    <div className="flex-grow">
                      <input
                        id="comment-input"
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={isAuthenticated ? "Add a comment..." : "Login to comment..."}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        disabled={!isAuthenticated}
                      />
                      <div className="flex justify-end mt-2">
                        <button 
                          type="submit" 
                          className="px-4 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!isAuthenticated || !comment.trim()}
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                
                {/* Comments List */}
                <div className="space-y-6">
                  {comments.length > 0 ? (
                    comments.map(comment => (
                      <div key={comment.id} className="flex">
                        <Link to={`/profile/${comment.user.id}`}>
                          <img 
                            src={comment.user.avatar} 
                            alt={comment.user.name} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-primary-100 mr-3"
                          />
                        </Link>
                        <div className="flex-grow">
                          <div className="bg-gray-50 rounded-lg px-4 py-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <Link to={`/profile/${comment.user.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                                  {comment.user.name}
                                </Link>
                                <p className="text-gray-700 mt-1">{comment.text}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mt-2 space-x-3 text-xs text-gray-500">
                            <span>{getRelativeTime(comment.timestamp)}</span>
                            <button 
                              className="hover:text-gray-700 flex items-center space-x-1"
                              onClick={() => handleCommentLike(comment.id)}
                            >
                              <FaHeart size={10} />
                              <span>{comment.likes} likes</span>
                            </button>
                            <button className="hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - Related Videos */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Related Videos
              </h3>
              
              <div className="space-y-4">
                {relatedVideos.map(video => (
                  <Link key={video.id} to={`/videos/${video.id}`} className="flex hover:bg-gray-50 p-2 rounded-lg">
                    <div className="relative w-40 h-24 flex-shrink-0">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="ml-3 flex-grow">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{video.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{video.user.name}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{video.views} views</span>
                        <span className="mx-1">•</span>
                        <span>{getRelativeTime(video.timestamp)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Tags Cloud */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popular Tags
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {['basketball', 'soccer', 'tennis', 'volleyball', 'football', 'cricket', 'rugby', 'baseball', 'golf', 'swimming', 'athletics', 'cycling'].map(tag => (
                  <Link 
                    key={tag} 
                    to={`/videos/tags/${tag}`} 
                    className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full hover:bg-gray-200"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
