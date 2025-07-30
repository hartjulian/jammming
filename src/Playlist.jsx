import React, { useState } from "react";
import Tracklist from "./Tracklist";
import "./Playlist.css";

function Playlist( {trackList} ) {


    const [playlistName, setPlaylistName] = useState("New Playlist");
    const handleUserInput = (e) => {
        setPlaylistName(e.target.value);
    };

    return (
        <div className="playlist-container">
        <h2>Playlist</h2>
        <input value={playlistName} onChange={handleUserInput} />
        <Tracklist trackList={trackList} />
        <button type="submit">Save to Spotify</button>
        </div>
    );
}

export default Playlist;