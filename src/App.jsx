import { useState } from 'react';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar onSearch={handleSearchResults} />
      <div className="content-container">
        <SearchResults trackList={searchResults} />
        <Playlist />
      </div>
    </div>
    // <div>SearchButton</div>
  )
}

export default App
