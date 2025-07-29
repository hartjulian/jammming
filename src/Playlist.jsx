import React from "react";
import Tracklist from "./Tracklist";

function Playlist() {
    return (
        <div className="contents">
        <h3>Playlist</h3>
        {/* <Tracklist /> */}
        <button type="submit">Save to Spotify</button>
        </div>
    );
}

export default Playlist;