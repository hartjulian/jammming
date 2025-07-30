import React from "react";
import "./Track.css"

function Track({ id, name, album, artist }) {
    return (
        <div className="track-info">
            <h3>{name}</h3>
            <p>{artist} | {album}</p>
        </div>
    );
}

export default Track;