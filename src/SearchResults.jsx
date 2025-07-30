import React from "react";
import Tracklist from "./Tracklist";
import "./SearchResults.css";

function SearchResults( {trackList, onClick} ) {


    return (
        <div className="search-results-container">
        <h2>Search Results</h2>
        <Tracklist trackList={trackList} onClick={onClick} />
        </div>
    );
}

export default SearchResults;