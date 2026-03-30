import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward, ThumbsUp, ThumbsDown, Share, Download } from 'lucide-react';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setVideo({
      id: videoId,
      title: 'Amazing Nature Documentary',
      description: 'Explore the wonders of our natural world in stunning 4K. This documentary takes you on a journey through the most beautiful landscapes on Earth.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://via.placeholder.com/1920x1080',
      duration: '45:23',
      views: '1.2M',
      likes: '45K',
      dislikes: '1.2K',
      uploadDate: '2024-03-15',
      uploader: {
        name: 'Nature Channel',
        avatar: 'https://via.placeholder.com/40x40',
        subscribers: '2.5M'
      }
    });
  }, [videoId]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  if (!video) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative bg-black rounded-lg overflow-hidden mb-4">
            <video
              className="w-full aspect-video"
              src={video.videoUrl}
              poster={video.thumbnail}
              controls
            />
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
            <div className="flex items-center justify-between text-gray-400 mb-4">
              <span>{video.views} views • {video.uploadDate}</span>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 hover:text-neon-blue transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span>{video.likes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-neon-blue transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                  <span>{video.dislikes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-neon-blue transition-colors">
                  <Share className="w-5 h-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-neon-blue transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-dark-surface rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <img 
                src={video.uploader.avatar} 
                alt={video.uploader.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{video.uploader.name}</h3>
                <p className="text-sm text-gray-400">{video.uploader.subscribers} subscribers</p>
              </div>
              <button className="neon-button">Subscribe</button>
            </div>
            <div className="border-t border-dark-border pt-4">
              <p className="text-gray-300">{video.description}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-dark-surface rounded-lg p-4">
            <h3 className="font-semibold mb-4">Related Videos</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex space-x-3 cursor-pointer hover:bg-dark-border p-2 rounded transition-colors">
                  <img 
                    src={`https://via.placeholder.com/160x90`} 
                    alt="Related video"
                    className="w-40 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-2">Related Video Title {i}</h4>
                    <p className="text-xs text-gray-400 mt-1">Channel Name</p>
                    <p className="text-xs text-gray-400">123K views • 2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
