import React, { useState } from 'react';
import "./SearchBar.css";

const searchResults = [
    {
        name: "Carousel",
        artist: "These Four Walls",
        album: "Carousel",
        id: 4009
    },
    {
        name: "Passenger",
        artist: "Mojo Crow",
        album: "Imposter",
        id: 61432
    },
    {
        name: "When I Come Around",
        artist: "Green Day",
        album: "Dookie",
        id: 69236
    }
];

function SearchBar({ onSearch }) {
    const [searchString, setSearchString] = useState("");

    const handleUserInput = e => {
        setSearchString(e.target.value);
    };

    const handleSearch = e => {
        e.preventDefault();
        setSearchString("");
        onSearch(searchResults);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input className="search-bar" name="searchBar" value={searchString} onChange={handleUserInput} />
                <button className="search-button" type="submit">Search for songs, albums or artists</button>
            </form>
        </div>
    );
}

export default SearchBar;