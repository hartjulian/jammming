import React from "react";

function Track( {id, name, album, artist} ) {
    return (
        <div>
        <p>{name}</p>
        <p>{artist}</p>
        <p>{album}</p>
        </div>
    );
}

export default Track;