import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist({ trackList, onClick, action }) {

    return (
        <div className="tracklist-container">
            {trackList.map((track, index) => {
                return <Track track={track} key={index} onClick={onClick} action={action} />;
            })}
        </div>
    );
}

export default Tracklist;