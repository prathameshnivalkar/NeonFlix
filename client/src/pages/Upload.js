import React, { useState } from 'react';
import { Upload as UploadIcon, X, Film, FileText, Image } from 'lucide-react';

const UploadPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('entertainment');
  const [tags, setTags] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    setIsUploading(false);
    alert('Video uploaded successfully!');
  };

  const removeVideo = () => {
    setVideoFile(null);
  };

  const removeThumbnail = () => {
    setThumbnail(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-dark-surface rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Video File</h2>
          {videoFile ? (
            <div className="flex items-center justify-between bg-dark-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Film className="w-8 h-8 text-neon-blue" />
                <div>
                  <p className="font-medium">{videoFile.name}</p>
                  <p className="text-sm text-gray-400">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeVideo}
                className="text-red-500 hover:text-red-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center cursor-pointer hover:border-neon-blue transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium mb-2">Click to upload video</p>
              <p className="text-sm text-gray-400">MP4, WebM, or OGG (max. 2GB)</p>
            </label>
          )}
        </div>

        <div className="bg-dark-surface rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Thumbnail</h2>
          {thumbnail ? (
            <div className="relative">
              <img 
                src={URL.createObjectURL(thumbnail)} 
                alt="Thumbnail preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-dark-border rounded-lg p-6 text-center cursor-pointer hover:border-neon-blue transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="hidden"
              />
              <Image className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <p className="font-medium mb-1">Upload thumbnail</p>
              <p className="text-sm text-gray-400">JPG, PNG or GIF (max. 5MB)</p>
            </label>
          )}
        </div>

        <div className="bg-dark-surface rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Video Details</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your video"
              rows={4}
              className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            >
              <option value="entertainment">Entertainment</option>
              <option value="education">Education</option>
              <option value="gaming">Gaming</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="news">News</option>
              <option value="technology">Technology</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas"
              className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            />
          </div>
        </div>

        {isUploading && (
          <div className="bg-dark-surface rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-dark-border rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 bg-dark-surface rounded-lg hover:bg-dark-border transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!videoFile || isUploading}
            className="neon-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
