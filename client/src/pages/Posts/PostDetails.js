import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  FaUser,
  FaImage,
  FaVideo,
  FaPlay
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatDate, getRelativeTime } from '../../utils/helpers';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import MetaTags from '../../components/SEO/MetaTags';
import { 
  fetchPostById, 
  likePost, 
  addComment,
  selectCurrentPost,
  selectPostsLoading,
  selectPostsError,
  clearCurrentPost
} from '../../redux/slices/postSlice';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const post = useSelector(selectCurrentPost);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const navigate = useNavigate();
  
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch post from backend
    dispatch(fetchPostById(id));
    
    // Cleanup when component unmounts
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, id]);

  const isVideo = post?.type === 'video';
  const isLiked = post?.isLikedByUser || false;

  const handleLike = () => {
    if (!post) return;
    dispatch(likePost(post._id));
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Removed from saved posts' : 'Added to saved posts');
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: post.title || `Post by ${post.author.firstName} ${post.author.lastName}`,
      text: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content,
      url: shareUrl
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast.success('Post shared successfully');
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
        toast.error('Failed to share post');
      }
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim() || !post) return;
    
    dispatch(addComment({ id: post._id, content: comment }));
    setComment('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Post</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => dispatch(fetchPostById(id))}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 mr-4"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate('/posts')}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Back to Posts
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/posts')}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Back to Posts
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* SEO Meta Tags */}
      {post && (
        <MetaTags
          title={`${post.title || 'Post'} by ${post.author.firstName} ${post.author.lastName} - SportSphere`}
          description={post.content.length > 160 ? post.content.substring(0, 160) + '...' : post.content}
          image={post.images && post.images.length > 0 ? 
            (typeof post.images[0] === 'string' ? post.images[0] : post.images[0].url) : 
            '/logo192.png'
          }
          url={window.location.href}
          type="article"
        />
      )}
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/posts')}
            className="flex items-center text-gray-700 hover:text-primary-600"
          >
            <FaArrowLeft className="mr-2" />
            Back to Posts
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Media display */}
            <div className="md:w-7/12 bg-black flex items-center justify-center">
              {isVideo ? (
                post.videos && post.videos.length > 0 ? (
                  <video 
                    src={typeof post.videos[0] === 'string' ? post.videos[0] : post.videos[0].url} 
                    className="w-full object-contain max-h-[80vh]"
                    controls
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : null
              ) : (
                post.images && post.images.length > 0 ? (
                  <img 
                    src={typeof post.images[0] === 'string' ? post.images[0] : post.images[0].url} 
                    alt={post.content} 
                    className="w-full object-contain max-h-[80vh]"
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src);
                      e.target.src = '/placeholder-image.svg';
                    }}
                  />
                ) : null
              )}
            </div>
            
            {/* Details and comments */}
            <div className="md:w-5/12 flex flex-col">
              {/* Post header */}
              <div className="p-4 border-b flex items-center space-x-3">
                <Link to={`/profile/${post.author._id}`}>
                  <img 
                    src={post.author.avatar || `https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}&background=3b82f6&color=fff`} 
                    alt={`${post.author.firstName} ${post.author.lastName}`} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary-100"
                  />
                </Link>
                <div className="flex-grow">
                  <Link to={`/profile/${post.author._id}`} className="font-medium text-gray-900 hover:text-primary-600">
                    {post.author.firstName} {post.author.lastName}
                  </Link>
                  {post.location && (
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaMapMarkerAlt className="mr-1" size={10} />
                      {post.location}
                    </p>
                  )}
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full flex items-center">
                  {isVideo ? <FaVideo className="mr-1" /> : <FaImage className="mr-1" />}
                  {isVideo ? 'Video' : 'Photo'}
                </span>
              </div>
              
              {/* Caption and details */}
              <div className="p-4 border-b">
                <p className="text-gray-800 mb-3">
                  <span className="font-medium mr-2">{post.author.firstName} {post.author.lastName}</span>
                  {post.content}
                </p>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/posts?search=${tag}`} 
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
                    {formatDate(post.createdAt)}
                  </span>
                  {post.sport && (
                    <span className="flex items-center">
                      <FaUser className="mr-1" />
                      {post.sport}
                    </span>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <button 
                      className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-700'}`}
                      onClick={handleLike}
                    >
                      {isLiked ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="w-6 h-6" />}
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
                <p className="font-medium text-gray-900 mt-3">{post.likesCount || 0} likes</p>
              </div>
              
              {/* Comments section */}
              <div className="flex-grow overflow-auto p-4 border-b">
                <h3 className="font-medium text-gray-900 mb-4">Comments</h3>
                
                {post.comments && post.comments.length > 0 ? (
                  <div className="space-y-4">
                    {post.comments.map(comment => (
                      <div key={comment._id} className="flex space-x-3">
                        <Link to={`/profile/${comment.author._id}`}>
                          <img 
                            src={comment.author.avatar || `https://ui-avatars.com/api/?name=${comment.author.firstName}+${comment.author.lastName}&background=3b82f6&color=fff`} 
                            alt={`${comment.author.firstName} ${comment.author.lastName}`} 
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        </Link>
                        <div>
                          <div className="bg-gray-100 px-3 py-2 rounded-lg">
                            <Link to={`/profile/${comment.author._id}`} className="font-medium text-gray-900 text-sm mr-1">
                              {comment.author.firstName} {comment.author.lastName}
                            </Link>
                            <span className="text-gray-700 text-sm">{comment.content}</span>
                          </div>
                          <div className="flex items-center mt-1 space-x-3 text-xs text-gray-500">
                            <span>{getRelativeTime(comment.createdAt)}</span>
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
        
        {/* Related posts */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Posts</h2>
          
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Discover more posts from the community</p>
            <Link 
              to="/posts"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Browse All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
