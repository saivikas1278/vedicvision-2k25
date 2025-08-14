import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark, FaEllipsisH, FaPlay } from 'react-icons/fa';
import { getRelativeTime } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const Post = ({ post }) => {
  const { isDark } = useTheme();
  const [liked, setLiked] = useState(post.liked || false);
  const [saved, setSaved] = useState(post.saved || false);
  const [likes, setLikes] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  
  // Determine if this is a video or photo post
  const isVideo = post.type === 'video';

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
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    
    const newComment = {
      id: Date.now(),
      user: {
        id: 'current-user',
        name: 'You',
        avatar: '/assets/avatars/default.jpg'
      },
      text: comment,
      timestamp: new Date().toISOString()
    };
    
    setComments([newComment, ...comments]);
    setComment('');
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
          <Link to={`/profile/${post.user.id}`}>
            <img 
              src={post.user.avatar} 
              alt={post.user.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-primary-100"
            />
          </Link>
          <div>
            <Link to={`/profile/${post.user.id}`} className={`font-medium transition-colors duration-300 ${
              isDark 
                ? 'text-white hover:text-primary-400' 
                : 'text-gray-900 hover:text-primary-600'
            }`}>
              {post.user.name}
            </Link>
            {post.location && (
              <p className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>{post.location}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {isVideo ? 'Video' : 'Photo'}
          </span>
          <button className={`transition-colors duration-300 ${
            isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
          }`}>
            <FaEllipsisH />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative bg-black">
        <Link to={`/posts/${post.id}`}>
          {isVideo ? (
            <>
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <FaPlay className="text-white text-3xl ml-1" />
                </div>
              </div>
              <video 
                src={post.videoUrl} 
                poster={post.thumbnailUrl}
                className="w-full aspect-video object-contain cursor-pointer"
                preload="none"
              >
                Your browser does not support the video tag.
              </video>
            </>
          ) : (
            <img 
              src={post.imageUrl} 
              alt={post.caption || 'Sports content'}
              className="w-full object-contain cursor-pointer"
              loading="lazy"
            />
          )}
        </Link>
      </div>
      
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
            <button className={`flex items-center space-x-1 transition-colors duration-300 ${
              isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'
            }`}>
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
        
        {/* Post caption */}
        <div className="mb-2">
          <Link to={`/profile/${post.user.id}`} className={`font-medium mr-2 transition-colors duration-300 ${
            isDark 
              ? 'text-white hover:text-primary-400' 
              : 'text-gray-900 hover:text-primary-600'
          }`}>
            {post.user.name}
          </Link>
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>{post.caption}</span>
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {post.tags.map(tag => (
              <Link 
                key={tag} 
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
          {getRelativeTime(post.timestamp)}
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
                <div key={comment.id} className="flex space-x-2">
                  <Link to={`/profile/${comment.user.id}`}>
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name} 
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  </Link>
                  <div>
                    <div className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <Link to={`/profile/${comment.user.id}`} className={`font-medium text-sm mr-1 transition-colors duration-300 ${
                        isDark 
                          ? 'text-white hover:text-primary-400' 
                          : 'text-gray-900 hover:text-primary-600'
                      }`}>
                        {comment.user.name}
                      </Link>
                      <span className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>{comment.text}</span>
                    </div>
                    <div className={`flex items-center mt-1 space-x-3 text-xs transition-colors duration-300 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>{getRelativeTime(comment.timestamp)}</span>
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
            <Link to={`/posts/${post.id}`} className={`block text-center mt-3 hover:underline transition-colors duration-300 ${
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
