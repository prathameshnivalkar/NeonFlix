import React, { useState, useEffect } from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    setFeaturedVideo({
      id: '1',
      title: 'Amazing Nature Documentary',
      description: 'Explore the wonders of our natural world in stunning 4K',
      thumbnail: 'https://via.placeholder.com/1920x1080',
      duration: '45:23',
      views: '1.2M'
    });

    setCategories([
      { id: '1', name: 'Entertainment', color: 'bg-purple-600' },
      { id: '2', name: 'Education', color: 'bg-blue-600' },
      { id: '3', name: 'Gaming', color: 'bg-green-600' },
      { id: '4', name: 'Music', color: 'bg-pink-600' },
      { id: '5', name: 'Sports', color: 'bg-orange-600' },
      { id: '6', name: 'News', color: 'bg-red-600' }
    ]);

    setTrendingVideos([
      { id: '2', title: 'Tech Review 2024', thumbnail: 'https://via.placeholder.com/320x180', duration: '12:45', views: '856K' },
      { id: '3', title: 'Cooking Masterclass', thumbnail: 'https://via.placeholder.com/320x180', duration: '28:30', views: '623K' },
      { id: '4', title: 'Travel Vlog: Tokyo', thumbnail: 'https://via.placeholder.com/320x180', duration: '15:20', views: '445K' },
      { id: '5', title: 'Fitness Workout', thumbnail: 'https://via.placeholder.com/320x180', duration: '30:15', views: '332K' },
      { id: '6', title: 'Music Video', thumbnail: 'https://via.placeholder.com/320x180', duration: '4:30', views: '2.1M' },
      { id: '7', title: 'Gaming Stream', thumbnail: 'https://via.placeholder.com/320x180', duration: '2:45:30', views: '567K' }
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {featuredVideo && (
        <section className="mb-12">
          <div className="relative rounded-xl overflow-hidden group cursor-pointer">
            <img 
              src={featuredVideo.thumbnail} 
              alt={featuredVideo.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-8">
                <h1 className="text-4xl font-bold mb-2">{featuredVideo.title}</h1>
                <p className="text-gray-300 mb-4 max-w-2xl">{featuredVideo.description}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{featuredVideo.views} views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredVideo.duration}</span>
                  </span>
                </div>
                <Link to={`/watch/${featuredVideo.id}`}>
                  <button className="neon-button flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Watch Now</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <div key={category.id} className="text-center">
              <div className={`${category.color} rounded-lg p-6 hover:opacity-80 transition-opacity cursor-pointer`}>
                <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2"></div>
              </div>
              <p className="mt-2 text-sm">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingVideos.map(video => (
            <Link key={video.id} to={`/watch/${video.id}`} className="video-card">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
