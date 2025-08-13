import Tracklist from "../TrackList/Tracklist";
import LoadingBanner from "../LoadingBanner/LoadingBanner";
import "./SearchResults.css";

function SearchResults( {searchResultsString, trackList, onClick, action, isFetching, moreResults} ) {


    return (
        <div className="search-results-container">
        <h2>{searchResultsString}</h2>
        <Tracklist trackList={trackList} onClick={onClick} action={action} />
        {trackList.length > 0 && <LoadingBanner isFetching={isFetching} moreResults={moreResults} />}
        </div>
    );
}

export default SearchResults;