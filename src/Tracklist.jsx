import React from "react";
import Track from "./Track";
import "./Tracklist.css";

function Tracklist({ trackList }) {

    return (
        <div className="tracklist-container">
            {trackList.map((track, index) => {
                return <Track id={track.id} name={track.name} artist={track.artist} album={track.album} key={index} />;
            })}
        </div>
    );
}

export default Tracklist;