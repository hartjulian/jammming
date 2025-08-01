import React from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist({ trackList, onClick }) {

    return (
        <div className="tracklist-container">
            {trackList.map((track, index) => {
                return <Track track={track} key={index} onClick={onClick} />;
            })}
        </div>
    );
}

export default Tracklist;