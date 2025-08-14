import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaCamera, FaVideo, FaTimesCircle, FaTags, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const PostUploadForm = ({ onSuccess }) => {
  const { user } = useSelector(state => state.auth);
  const { isDark } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [postType, setPostType] = useState('photo'); // 'photo' or 'video'
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (postType === 'photo' && !file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    if (postType === 'video' && !file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return;
    }
    
    setSelectedFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error(`Please select a ${postType} to upload`);
      return;
    }
    
    if (!caption.trim()) {
      toast.error('Please add a caption to your post');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call for upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create tags array from comma-separated string
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag !== '');
      
      // Create new post object
      const newPost = {
        id: `temp-${Date.now()}`,
        type: postType,
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg'
        },
        caption,
        location: location || null,
        tags: tagsArray,
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString(),
        sport: tagsArray[0] || 'general'
      };
      
      // Add type-specific properties
      if (postType === 'photo') {
        newPost.imageUrl = previewUrl;
      } else {
        newPost.videoUrl = previewUrl;
        newPost.thumbnailUrl = previewUrl; // In a real app, this would be a thumbnail generated from the video
      }
      
      // Call the onSuccess callback with the new post
      onSuccess(newPost);
      
      // Reset form
      setCaption('');
      setLocation('');
      setTags('');
      setSelectedFile(null);
      setPreviewUrl('');
      setShowForm(false);
      
      toast.success(`${postType === 'photo' ? 'Photo' : 'Video'} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${postType}:`, error);
      toast.error(`Failed to upload ${postType}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setPostType('photo');
    setCaption('');
    setLocation('');
    setTags('');
    setSelectedFile(null);
    setPreviewUrl('');
  };

  return (
    <div className={`rounded-xl shadow-md overflow-hidden mb-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className={`w-full p-4 flex items-center space-x-3 transition-colors duration-300 ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <FaCamera />
          </div>
          <span className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>Share a photo or video moment...</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Create Post</h3>
            <button 
              type="button"
              onClick={handleCancel}
              className={`transition-colors duration-300 ${
                isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaTimesCircle />
            </button>
          </div>
          
          {/* Post type selection */}
          <div className="mb-4">
            <div className="flex border rounded-lg overflow-hidden">
              <button
                type="button"
                className={`flex-1 py-2 flex justify-center items-center space-x-2 transition-all duration-300 ${
                  postType === 'photo' 
                    ? 'bg-primary-600 text-white' 
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setPostType('photo')}
              >
                <FaCamera />
                <span>Photo</span>
              </button>
              <button
                type="button"
                className={`flex-1 py-2 flex justify-center items-center space-x-2 transition-all duration-300 ${
                  postType === 'video' 
                    ? 'bg-primary-600 text-white' 
                    : isDark 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setPostType('video')}
              >
                <FaVideo />
                <span>Video</span>
              </button>
            </div>
          </div>
          
          {/* File preview */}
          {previewUrl ? (
            <div className="relative mb-4">
              {postType === 'photo' ? (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-64 object-contain bg-black rounded-lg"
                />
              ) : (
                <video 
                  src={previewUrl} 
                  className="w-full h-64 object-contain bg-black rounded-lg" 
                  controls
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl('');
                }}
                className="absolute top-2 right-2 bg-white bg-opacity-75 rounded-full p-1 text-gray-700 hover:text-red-500"
              >
                <FaTimesCircle />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current.click()}
              className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer transition-all duration-300 ${
                isDark 
                  ? 'border-gray-600 hover:bg-gray-700 hover:border-gray-500' 
                  : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              {postType === 'photo' ? (
                <>
                  <FaCamera className={`text-3xl mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>Click to select an image</p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>PNG, JPG, WEBP up to 5MB</p>
                </>
              ) : (
                <>
                  <FaVideo className={`text-3xl mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <p className={`transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>Click to select a video</p>
                  <p className={`text-xs mt-1 transition-colors duration-300 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>MP4, WEBM up to 30MB</p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={postType === 'photo' ? 'image/*' : 'video/*'}
                className="hidden"
              />
            </div>
          )}
          
          {/* Caption */}
          <div className="mb-4">
            <label htmlFor="caption" className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Caption
            </label>
            <textarea
              id="caption"
              placeholder={`Write a caption for your ${postType}...`}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              required
            />
          </div>
          
          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaMapMarkerAlt className="inline mr-1" /> Location (optional)
            </label>
            <input
              type="text"
              id="location"
              placeholder="Add location"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <label htmlFor="tags" className={`block text-sm font-medium mb-1 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaTags className="inline mr-1" /> Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              placeholder="E.g., basketball, nba, slam"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          
          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors duration-300"
              disabled={loading || !selectedFile || !caption.trim()}
            >
              {loading ? 'Uploading...' : `Post ${postType === 'photo' ? 'Photo' : 'Video'}`}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostUploadForm;
