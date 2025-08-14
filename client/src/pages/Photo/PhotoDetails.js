import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaHeart, 
  FaRegHeart, 
  FaComment, 
  FaShare, 
  FaBookmark, 
  FaRegBookmark,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatDate, getRelativeTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const PhotoDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching post from API
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - would normally come from an API
        const mockPost = {
          id: '1',
          user: {
            id: 'user1',
            name: 'Michael Jordan',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          imageUrl: 'https://picsum.photos/id/237/1200/800',
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
        };
        
        // Mock related posts
        const mockRelatedPosts = [
          {
            id: '2',
            imageUrl: 'https://picsum.photos/id/1012/300/300',
            user: {
              name: 'Serena Williams'
            },
            likes: 214
          },
          {
            id: '3',
            imageUrl: 'https://picsum.photos/id/1011/300/300',
            user: {
              name: 'Cristiano Ronaldo'
            },
            likes: 531
          },
          {
            id: '4',
            imageUrl: 'https://picsum.photos/id/1035/300/300',
            user: {
              name: 'Simone Biles'
            },
            likes: 287
          }
        ];
        
        setPost(mockPost);
        setLikes(mockPost.likes);
        setComments(mockPost.comments);
        setRelatedPosts(mockRelatedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Failed to load photo details');
        setLoading(false);
      }
    };

    fetchPost();
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
    toast.success(saved ? 'Removed from saved photos' : 'Added to saved photos');
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: {
        id: 'current-user',
        name: 'You',
        avatar: user?.avatar || '/assets/avatars/default.jpg'
      },
      text: comment,
      timestamp: new Date().toISOString()
    };
    
    setComments([newComment, ...comments]);
    setComment('');
    toast.success('Comment added');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Photo Not Found</h2>
        <p className="text-gray-600 mb-6">The photo you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/photos')}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/photos')}
            className="flex items-center text-gray-700 hover:text-primary-600"
          >
            <FaArrowLeft className="mr-2" />
            Back to Gallery
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Photo display */}
            <div className="md:w-7/12 bg-black flex items-center justify-center">
              <img 
                src={post.imageUrl} 
                alt={post.caption} 
                className="w-full object-contain max-h-[80vh]"
              />
            </div>
            
            {/* Details and comments */}
            <div className="md:w-5/12 flex flex-col">
              {/* Post header */}
              <div className="p-4 border-b flex items-center space-x-3">
                <Link to={`/profile/${post.user.id}`}>
                  <img 
                    src={post.user.avatar} 
                    alt={post.user.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-100"
                  />
                </Link>
                <div className="flex-grow">
                  <Link to={`/profile/${post.user.id}`} className="font-medium text-gray-900 hover:text-primary-600">
                    {post.user.name}
                  </Link>
                  {post.location && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-1" size={10} />
                      {post.location}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Caption and details */}
              <div className="p-4 border-b">
                <p className="text-gray-800 mb-3">
                  <span className="font-medium mr-2">{post.user.name}</span>
                  {post.caption}
                </p>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/photos/tags/${tag}`} 
                        className="text-primary-600 text-sm hover:underline"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
                
                {/* Metadata */}
                <div className="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {formatDate(post.timestamp)}
                  </span>
                  <span className="flex items-center">
                    <FaUser className="mr-1" />
                    {post.sport}
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <button 
                      className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-700'}`}
                      onClick={handleLike}
                    >
                      {liked ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="w-6 h-6" />}
                    </button>
                    <button className="flex items-center space-x-1 text-gray-700">
                      <FaComment className="w-6 h-6" />
                    </button>
                    <button 
                      className="flex items-center space-x-1 text-gray-700"
                      onClick={handleShare}
                    >
                      <FaShare className="w-6 h-6" />
                    </button>
                  </div>
                  <button 
                    className={saved ? 'text-primary-600' : 'text-gray-700'}
                    onClick={handleSave}
                  >
                    {saved ? <FaBookmark className="w-6 h-6" /> : <FaRegBookmark className="w-6 h-6" />}
                  </button>
                </div>
                
                {/* Likes count */}
                <p className="font-medium text-gray-900 mt-3">{likes} likes</p>
              </div>
              
              {/* Comments section */}
              <div className="flex-grow overflow-auto p-4 border-b">
                <h3 className="font-medium text-gray-900 mb-4">Comments</h3>
                
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3">
                        <Link to={`/profile/${comment.user.id}`}>
                          <img 
                            src={comment.user.avatar} 
                            alt={comment.user.name} 
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        </Link>
                        <div>
                          <div className="bg-gray-100 px-3 py-2 rounded-lg">
                            <Link to={`/profile/${comment.user.id}`} className="font-medium text-gray-900 text-sm mr-1">
                              {comment.user.name}
                            </Link>
                            <span className="text-gray-700 text-sm">{comment.text}</span>
                          </div>
                          <div className="flex items-center mt-1 space-x-3 text-xs text-gray-500">
                            <span>{getRelativeTime(comment.timestamp)}</span>
                            <button className="hover:text-gray-700">Like</button>
                            <button className="hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
                )}
              </div>
              
              {/* Add comment */}
              <div className="p-4">
                {isAuthenticated ? (
                  <form onSubmit={handleComment} className="flex">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                    <button 
                      type="submit" 
                      className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors"
                      disabled={!comment.trim()}
                    >
                      Post
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-2">
                    <Link to="/login" className="text-primary-600 hover:underline">
                      Log in to add a comment
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related photos */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Photos</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedPosts.map(relatedPost => (
              <Link 
                key={relatedPost.id} 
                to={`/photos/${relatedPost.id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={relatedPost.imageUrl} 
                  alt={`Photo by ${relatedPost.user.name}`}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-gray-900 truncate">{relatedPost.user.name}</p>
                  <p className="text-sm text-gray-500">{relatedPost.likes} likes</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetails;
