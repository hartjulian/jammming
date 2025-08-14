import Tracklist from "../TrackList/Tracklist";
import "./Playlist.css";

function Playlist({ playlistName, trackList, onNameChange, onClick, onSave, action }) {

    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    return (
        <div className="playlist-container">
                <input className="playlist-name" name="playlist-name" value={playlistName} onChange={handleNameChange} placeholder="New Playlist"/>
                {trackList.length > 0 && <button className="save-to-spotify" onClick={onSave}>Save to Spotify</button>}
                <Tracklist trackList={trackList} onClick={onClick} action={action}/>
        </div>
    );
}

export default Playlist;