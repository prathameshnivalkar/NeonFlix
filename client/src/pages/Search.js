import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Filter, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    duration: 'all',
    uploadDate: 'all',
    category: 'all'
  });

  useEffect(() => {
    const mockResults = [
      { id: '1', title: 'How to Learn React in 2024', thumbnail: 'https://via.placeholder.com/320x180', duration: '25:30', views: '234K', channel: 'Tech Edu', uploadDate: '2 days ago' },
      { id: '2', title: 'Advanced JavaScript Tutorial', thumbnail: 'https://via.placeholder.com/320x180', duration: '45:15', views: '567K', channel: 'Code Master', uploadDate: '1 week ago' },
      { id: '3', title: 'Web Development Full Course', thumbnail: 'https://via.placeholder.com/320x180', duration: '3:45:30', views: '1.2M', channel: 'Dev Academy', uploadDate: '1 month ago' },
      { id: '4', title: 'React vs Vue Comparison', thumbnail: 'https://via.placeholder.com/320x180', duration: '18:45', views: '89K', channel: 'Frontend Weekly', uploadDate: '3 days ago' },
      { id: '5', title: 'Building Scalable Apps', thumbnail: 'https://via.placeholder.com/320x180', duration: '32:20', views: '145K', channel: 'Architecture Hub', uploadDate: '5 days ago' },
      { id: '6', title: 'CSS Grid and Flexbox', thumbnail: 'https://via.placeholder.com/320x180', duration: '28:10', views: '423K', channel: 'Design Pro', uploadDate: '2 weeks ago' }
    ];
    setSearchResults(mockResults);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 pl-12 focus:outline-none focus:border-neon-blue transition-colors"
            />
            <SearchIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>
          <button type="submit" className="neon-button">
            Search
          </button>
        </form>

        <div className="flex gap-4 mb-6">
          <select
            value={filters.duration}
            onChange={(e) => setFilters({...filters, duration: e.target.value})}
            className="bg-dark-surface border border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:border-neon-blue"
          >
            <option value="all">Any duration</option>
            <option value="short">Under 4 minutes</option>
            <option value="medium">4-20 minutes</option>
            <option value="long">Over 20 minutes</option>
          </select>

          <select
            value={filters.uploadDate}
            onChange={(e) => setFilters({...filters, uploadDate: e.target.value})}
            className="bg-dark-surface border border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:border-neon-blue"
          >
            <option value="all">Any time</option>
            <option value="hour">Last hour</option>
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="bg-dark-surface border border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:border-neon-blue"
          >
            <option value="all">All categories</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="gaming">Gaming</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">
          {searchResults.length} results for "{searchQuery || 'all videos'}"
        </h2>
      </div>

      <div className="space-y-4">
        {searchResults.map(video => (
          <Link key={video.id} to={`/watch/${video.id}`} className="block">
            <div className="bg-dark-surface rounded-lg overflow-hidden hover:ring-2 hover:ring-neon-blue transition-all">
              <div className="flex gap-4 p-4">
                <div className="relative flex-shrink-0">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-64 h-36 object-cover rounded"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-neon-blue transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{video.channel}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{video.uploadDate}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
