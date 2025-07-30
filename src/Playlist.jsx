import React, { useState } from "react";
import Tracklist from "./Tracklist";
import "./Playlist.css";

function Playlist({ trackList, onClick }) {


    const [playlistName, setPlaylistName] = useState("New Playlist");
    const handleUserInput = (e) => {
        setPlaylistName(e.target.value);
    };

    return (
        <div className="playlist-container">
            <input className="playlist-name" value={playlistName} onChange={handleUserInput} />
            <Tracklist trackList={trackList} onClick={onClick} />
            <button className="save-to-spotify" type="submit">Save to Spotify</button>
        </div>
    );
}

export default Playlist;