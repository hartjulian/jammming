import { useState, useEffect } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css'
// import searchResultsData from '../../../mock-data/MockSearchResults';
import Spotify from '../../util/Spotify';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTrackList, setPlaylistTrackList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreTracks();
  }, [isFetching]);

  useEffect(() => {
    if (isLoggedIn || isLoggingIn) return;
    getAccessToken();
  }, [isLoggedIn]);

  const getAccessToken = async () => {
    setIsLoggingIn(true);
    const accessToken = await Spotify.getAccessToken();
    if (accessToken) setIsLoggedIn(true);
    setIsLoggingIn(false);
  };
  
  const search = async (term) => {
    Spotify.resetSearch();
    const resultsData = await Spotify.search(term);
    setSearchResults(resultsData);
  };

  const fetchMoreTracks = async () => {
    const resultsData = await Spotify.search();
    resultsData.forEach(track => {
        setSearchResults((prev) => [...prev, track]);
    });
    setIsFetching(false);    
  };

  const updateSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm);
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
      setSearchTerm("");
      setSearchResults([]);
      setPlaylistName("");
      setPlaylistTrackList([]);
      Spotify.resetSearch();
    };
  };

    function handleScroll() {        
        if (window.innerHeight + document.documentElement.scrollTop + 1 < document.documentElement.offsetHeight) return;
        setIsFetching(true);
    };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar searchTerm={searchTerm} onChange={updateSearchTerm} onSearch={search}  />
      <div className="content-container">
        <SearchResults trackList={searchResults} onClick={addToPlaylist} action="add" />
        <Playlist playlistName={playlistName} trackList={playlistTrackList} onNameChange={updatePlaylistName} onClick={removeFromPlaylist} onSave={savePlaylistToSpotify} action="remove" />
      </div>
    </div>
  )
}

export default App
