import { useState, useEffect } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import BackToTop from '../BackToTop/BackToTop';
import './App.css'
// import searchResultsData from '../../../mock-data/MockSearchResults';
import Spotify from '../../util/Spotify';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsString, setSearchResultsString] = useState("Search Results");
  const [playlistTrackList, setPlaylistTrackList] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [moreResults, setMoreResults] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
    if (!term) return;
    Spotify.resetSearch();
    const resultsData = await Spotify.search(term);
    setSearchResultsString(`Search Results for ${searchTerm}`);    
    setSearchTerm("");
    (resultsData.length > 0 ? setMoreResults(true) : setMoreResults(false));    
    setSearchResults(resultsData);    
  };

  const fetchMoreTracks = async () => {
    setIsFetching(true);
    const resultsData = await Spotify.search();
    resultsData.forEach(track => {
        setSearchResults((prev) => [...prev, track]);
    });
    setIsFetching(false);
    (resultsData.length > 0 ? setMoreResults(true) : setMoreResults(false));
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
    if (!playlistName) {
      alert("Enter a playlist name to save to Spotify.");
      return;
    }
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

    const handleScroll = () => {
        (window.pageYOffset > window.innerHeight) ? setShowScrollToTop(true) : setShowScrollToTop(false);
        if (window.innerHeight + document.documentElement.scrollTop + 1 < document.documentElement.offsetHeight) return;
        setIsFetching(true);
    };

    const backToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar searchTerm={searchTerm} onChange={updateSearchTerm} onSearch={search}  />
      <div className="content-container">
        <SearchResults searchResultsString={searchResultsString} trackList={searchResults} onClick={addToPlaylist} action="add" isFetching={isFetching} moreResults={moreResults}/>
        <Playlist playlistName={playlistName} trackList={playlistTrackList} onNameChange={updatePlaylistName} onClick={removeFromPlaylist} onSave={savePlaylistToSpotify} action="remove" />
      </div>
      {showScrollToTop && <BackToTop onClick={backToTop}/>}
    </div>
  )
}

export default App
