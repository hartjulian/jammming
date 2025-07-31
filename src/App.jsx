import { useState } from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './App.css'
import searchResultsData from '../mock-data/MockSearchResults';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTrackList, setPlaylistTrackList] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");

  const search = () => {
    setSearchResults(searchResultsData);
  };

  const updatePlaylistName = (playlistName) => {
    setPlaylistName(playlistName);
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

  const savePlaylistToSpotify = () => {
    // const playlistUris = playlistTrackList.map((track) => track.uri);
    setPlaylistName("New Playlist");
    setPlaylistTrackList([]);
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={search}  />
      <div className="content-container">
        <SearchResults trackList={searchResults} onClick={addToPlaylist} />
        <Playlist playlistName={playlistName} trackList={playlistTrackList} onNameChange={updatePlaylistName} onClick={removeFromPlaylist} onSave={savePlaylistToSpotify}/>
      </div>
    </div>
  )
}

export default App
