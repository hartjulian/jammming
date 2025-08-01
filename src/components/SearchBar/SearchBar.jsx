import React, { useState } from 'react';
import "./SearchBar.css";

function SearchBar({ onSearch }) {
    const [searchString, setSearchString] = useState("");
    
    const handleStringChange = (e) => {
        setSearchString(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchString);
    };

    return (
        <div className="search-container">
            <input className="search-bar" name="searchBar" value={searchString} onChange={handleStringChange} />
            <button className="search-button" onClick={handleSearch}>Search for songs, albums or artists</button>
        </div>
    );
}

export default SearchBar;