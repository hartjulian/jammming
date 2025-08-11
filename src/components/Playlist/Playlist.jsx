import Tracklist from "../Tracklist/TrackList/";
import "./Playlist.css";

function Playlist({ playlistName, trackList, onNameChange, onClick, onSave, action }) {

    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    return (
        <div className="playlist-container">
                <input className="playlist-name" value={playlistName} onChange={handleNameChange} placeholder="New Playlist"/>
                <Tracklist trackList={trackList} onClick={onClick} action={action}/>
                <button className="save-to-spotify" onClick={onSave}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;