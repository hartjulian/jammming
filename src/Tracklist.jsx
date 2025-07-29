import React from "react";
import Track from "./Track";

function Tracklist({ trackList }) {

    return (
        <div>
            {trackList.map((track, index) => {
                return <div><Track id={track.id} name={track.name} artist={track.artist} album={track.album} key={index} /></div>;
            })}
        </div>
    );
}

export default Tracklist;