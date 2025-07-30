import { useState } from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTrackList, setPlaylistTrackList] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const addToPlaylist = (track) => {
    if (!playlistTrackList.includes(track)) {
      setPlaylistTrackList((prev) => [...prev, track]);
    };
  };

  const removeFromPlaylist = (track) => {
    if (playlistTrackList.includes(track)) {
      setPlaylistTrackList((prev) => prev.filter((item) => item !== track));
    };
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearchResults} />
      <div className="content-container">
        <SearchResults trackList={searchResults} onClick={addToPlaylist} />
        <Playlist trackList={playlistTrackList} onClick={removeFromPlaylist} />
      </div>
    </div>
  )
}

export default App
