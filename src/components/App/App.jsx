import { useState } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css'
// import searchResultsData from '../../../mock-data/MockSearchResults';
import Spotify from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTrackList, setPlaylistTrackList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    Spotify.getAccessToken();
    setLoggedIn(true);
  }

  const search = async (term) => {
    const resultsData = await Spotify.search(term);
    setSearchResults(resultsData);
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

  const savePlaylistToSpotify = async () => {
    const playlistUris = playlistTrackList.map((track) => track.uri);
    const result = await Spotify.savePlaylist(playlistUris, playlistName);
    if (result) {
    setPlaylistName("");
    setPlaylistTrackList([]);
    };
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={search}  />
      <div className="content-container">
        <SearchResults trackList={searchResults} onClick={addToPlaylist} action="add" />
        <Playlist playlistName={playlistName} trackList={playlistTrackList} onNameChange={updatePlaylistName} onClick={removeFromPlaylist} onSave={savePlaylistToSpotify} action="remove" />
      </div>
    </div>
  )
}

export default App
