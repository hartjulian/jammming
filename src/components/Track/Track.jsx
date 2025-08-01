import React from "react";
import "./Track.css"

function Track({ track, onClick }) {

    const handleClick = () => {
        onClick(track);
    }

    return (
        <div className="track-info" onClick={handleClick}>
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
        </div>
    );
}

export default Track;