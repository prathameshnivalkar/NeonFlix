import React, { useState } from 'react';
import { User, Settings, LogOut, Play, ThumbsUp, Clock, Eye, Edit } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    bio: 'Content creator and tech enthusiast',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com'
  });

  const userVideos = [
    { id: '1', title: 'My First Vlog', thumbnail: 'https://via.placeholder.com/320x180', views: '12K', uploadDate: '2 days ago' },
    { id: '2', title: 'Tech Review 2024', thumbnail: 'https://via.placeholder.com/320x180', views: '45K', uploadDate: '1 week ago' },
    { id: '3', title: 'Cooking Tutorial', thumbnail: 'https://via.placeholder.com/320x180', views: '8K', uploadDate: '2 weeks ago' },
    { id: '4', title: 'Travel Diary', thumbnail: 'https://via.placeholder.com/320x180', views: '23K', uploadDate: '1 month ago' }
  ];

  const likedVideos = [
    { id: '5', title: 'Amazing Nature Documentary', thumbnail: 'https://via.placeholder.com/320x180', views: '1.2M', channel: 'Nature Channel' },
    { id: '6', title: 'Learn JavaScript', thumbnail: 'https://via.placeholder.com/320x180', views: '567K', channel: 'Code Academy' },
    { id: '7', title: 'Music Video', thumbnail: 'https://via.placeholder.com/320x180', views: '2.1M', channel: 'Music Studio' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">{profileData.username}</h1>
              <p className="text-gray-400 mb-2">{profileData.email}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span><strong className="text-white">1.2K</strong> subscribers</span>
                <span><strong className="text-white">24</strong> videos</span>
                <span><strong className="text-white">156K</strong> total views</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="neon-button flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {isEditing && (
          <div className="border-t border-dark-border pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <input
                  type="text"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full bg-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue resize-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-dark-border rounded-lg hover:bg-dark-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="neon-button"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-dark-surface rounded-lg">
        <div className="border-b border-dark-border">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'videos'
                  ? 'border-neon-blue text-neon-blue'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>My Videos</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'liked'
                  ? 'border-neon-blue text-neon-blue'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-4 h-4" />
                <span>Liked Videos</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-neon-blue text-neon-blue'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userVideos.map(video => (
                <div key={video.id} className="video-card">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.uploadDate}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedVideos.map(video => (
                <div key={video.id} className="video-card">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{video.channel}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-border rounded-lg">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive emails about your account activity</p>
                    </div>
                    <button className="w-12 h-6 bg-neon-blue rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-dark-border rounded-lg">
                    <div>
                      <p className="font-medium">Private Profile</p>
                      <p className="text-sm text-gray-400">Only show your profile to subscribers</p>
                    </div>
                    <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Danger Zone</h3>
                <div className="space-y-4">
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    Clear Watch History
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-4">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
