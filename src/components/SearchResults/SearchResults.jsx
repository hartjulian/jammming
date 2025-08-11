import Tracklist from "../TrackList/Tracklist";
import "./SearchResults.css";

function SearchResults( {trackList, onClick, action} ) {


    return (
        <div className="search-results-container">
        <h2>Search Results</h2>
        <Tracklist trackList={trackList} onClick={onClick} action={action} />
        </div>
    );
}

export default SearchResults;