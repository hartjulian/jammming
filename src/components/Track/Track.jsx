import React from "react";
import "./Track.css"

function Track({ track, onClick, action }) {

    const handleClick = () => {
        onClick(track);
    }

    return (
        <div className="track-info" >
            <div className="album-image">
                <img src={track.albumArtwork}></img>
            </div>
            <div className="track-detail">
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <div className="right-container">
                {action === "add" && <button onClick={handleClick}>+</button>}
                {action === "remove" && <button onClick={handleClick}>-</button>}
            </div>
        </div>
    );
}

export default Track;