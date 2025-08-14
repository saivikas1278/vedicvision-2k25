import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark, FaEllipsisH, FaPlay, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getRelativeTime } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';
import { likePost, addComment, sharePost } from '../../redux/slices/postSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { isDark } = useTheme();
  
  const [liked, setLiked] = useState(post.isLiked || false);
  const [saved, setSaved] = useState(post.isSaved || false);
  const [likes, setLikes] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [showFullContent, setShowFullContent] = useState(false);
  
  // Determine if this is a video or photo post
  const isVideo = post.type === 'video';
  const hasImages = post.images && post.images.length > 0;
  const hasVideos = post.videos && post.videos.length > 0;

  const handleLike = async () => {
    try {
      const result = await dispatch(likePost(post._id)).unwrap();
      setLiked(result.isLiked);
      setLikes(result.likesCount);
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    // TODO: Implement save post functionality
    toast.success(saved ? 'Post removed from saved' : 'Post saved');
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    try {
      const result = await dispatch(addComment({ 
        postId: post._id, 
        text: comment.trim() 
      })).unwrap();
      
      setComments([result.comment, ...comments]);
      setComment('');
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleShare = async () => {
    try {
      await dispatch(sharePost(post._id)).unwrap();
      toast.success('Post shared successfully');
    } catch (error) {
      toast.error('Failed to share post');
    }
  };

  const renderMedia = () => {
    if (hasImages && post.images.length > 0) {
      return (
        <div className="relative bg-black">
          {post.images.length === 1 ? (
            <img 
              src={post.images[0]}
              alt={post.title}
              className="w-full object-contain cursor-pointer max-h-96"
              loading="lazy"
            />
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image}
                    alt={`${post.title} ${index + 1}`}
                    className="w-full h-48 object-cover cursor-pointer"
                    loading="lazy"
                  />
                  {index === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        +{post.images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (hasVideos && post.videos.length > 0) {
      return (
        <div className="relative bg-black">
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <FaPlay className="text-white text-3xl ml-1" />
            </div>
          </div>
          <video 
            src={post.videos[0]}
            className="w-full aspect-video object-contain cursor-pointer"
            preload="none"
          >
            Your browser does not support the video tag.
          </video>
          {post.videos.length > 1 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
              +{post.videos.length - 1} more
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`rounded-xl shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Post header */}
      <div className={`p-4 flex items-center justify-between border-b transition-colors duration-300 ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author._id}`}>
            <img 
              src={post.author.avatar || '/default-avatar.png'} 
              alt={`${post.author.firstName} ${post.author.lastName}`} 
              className="w-10 h-10 rounded-full object-cover border-2 border-primary-100"
            />
          </Link>
          <div>
            <Link to={`/profile/${post.author._id}`} className={`font-medium transition-colors duration-300 ${
              isDark 
                ? 'text-white hover:text-primary-400' 
                : 'text-gray-900 hover:text-primary-600'
            }`}>
              {post.author.firstName} {post.author.lastName}
            </Link>
            {post.sport && (
              <p className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {post.sport.charAt(0).toUpperCase() + post.sport.slice(1)}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {getRelativeTime(post.createdAt)}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {post.privacy.charAt(0).toUpperCase() + post.privacy.slice(1)}
          </span>
          <button className={`transition-colors duration-300 ${
            isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
          }`}>
            <FaEllipsisH />
          </button>
        </div>
      </div>

      {/* Post Title */}
      {post.title && (
        <div className="px-4 pt-4">
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h3>
        </div>
      )}

      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-4">
          <div className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {showFullContent || post.content.length <= 150 ? (
              <p>{post.content}</p>
            ) : (
              <p>
                {post.content.substring(0, 150)}...
                <button 
                  onClick={() => setShowFullContent(true)}
                  className={`ml-1 font-medium transition-colors duration-300 ${
                    isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'
                  }`}
                >
                  Read more
                </button>
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Media Content */}
      {renderMedia()}
      
      {/* Post actions */}
      <div className={`p-4 border-b transition-colors duration-300 ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex justify-between mb-3">
          <div className="flex space-x-4">
            <button 
              className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-700'}`}
              onClick={handleLike}
            >
              {liked ? <FaHeart className="w-6 h-6" /> : <FaRegHeart className="w-6 h-6" />}
            </button>
            <button 
              className={`flex items-center space-x-1 transition-colors duration-300 ${
                showComments 
                  ? isDark 
                    ? 'text-primary-400' 
                    : 'text-primary-600'
                  : isDark 
                    ? 'text-gray-300 hover:text-gray-100' 
                    : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => setShowComments(!showComments)}
            >
              <FaComment className="w-6 h-6" />
            </button>
            <button 
              className={`flex items-center space-x-1 transition-colors duration-300 ${
                isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'
              }`}
              onClick={handleShare}
            >
              <FaShare className="w-6 h-6" />
            </button>
          </div>
          <button 
            className={`transition-colors duration-300 ${
              saved 
                ? 'text-primary-600' 
                : isDark 
                  ? 'text-gray-300 hover:text-gray-100' 
                  : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={handleSave}
          >
            {saved ? <FaBookmark className="w-6 h-6" /> : <FaRegBookmark className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Likes count */}
        <p className={`font-medium mb-1 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>{likes} likes</p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {post.tags.map((tag, index) => (
              <Link 
                key={index} 
                to={`/posts/tags/${tag}`} 
                className={`text-sm hover:underline transition-colors duration-300 ${
                  isDark ? 'text-primary-400' : 'text-primary-600'
                }`}
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
        
        {/* Post time */}
        <p className={`text-xs transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {getRelativeTime(post.createdAt)}
        </p>
      </div>
      
      {/* Comments section */}
      {showComments && (
        <div className={`p-4 border-b transition-colors duration-300 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h4 className={`font-medium mb-3 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Comments</h4>
          
          {/* Comment form */}
          <form onSubmit={handleComment} className="flex mb-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className={`flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button 
              type="submit" 
              className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              disabled={!comment.trim()}
            >
              Post
            </button>
          </form>
          
          {/* Comments list */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment._id} className="flex space-x-2">
                  <Link to={`/profile/${comment.author._id}`}>
                    <img 
                      src={comment.author.avatar || '/default-avatar.png'} 
                      alt={`${comment.author.firstName} ${comment.author.lastName}`} 
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  </Link>
                  <div>
                    <div className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <Link to={`/profile/${comment.author._id}`} className={`font-medium text-sm mr-1 transition-colors duration-300 ${
                        isDark 
                          ? 'text-white hover:text-primary-400' 
                          : 'text-gray-900 hover:text-primary-600'
                      }`}>
                        {comment.author.firstName} {comment.author.lastName}
                      </Link>
                      <span className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>{comment.text}</span>
                    </div>
                    <div className={`flex items-center mt-1 space-x-3 text-xs transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>{getRelativeTime(comment.createdAt)}</span>
                      <button className={`transition-colors duration-300 ${
                        isDark ? 'hover:text-gray-200' : 'hover:text-gray-700'
                      }`}>Like</button>
                      <button className={`transition-colors duration-300 ${
                        isDark ? 'hover:text-gray-200' : 'hover:text-gray-700'
                      }`}>Reply</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={`text-center py-2 transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>No comments yet. Be the first to comment!</p>
            )}
          </div>
          
          {comments.length > 3 && (
            <Link to={`/posts/${post._id}`} className={`block text-center mt-3 hover:underline transition-colors duration-300 ${
              isDark ? 'text-primary-400' : 'text-primary-600'
            }`}>
              View all {comments.length} comments
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
