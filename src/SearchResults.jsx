import React from "react";
import Tracklist from "./Tracklist";

function SearchResults( {trackList} ) {


    return (
        <div className="contents">
        <h3>Search Results</h3>
        <Tracklist trackList={trackList} />
        </div>
    );
}

export default SearchResults;