import Tracklist from "../TrackList/Tracklist";
import "./Playlist.css";

function Playlist({ playlistName, trackList, onNameChange, onClick, onSave, action }) {

    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave();
    };

    return (
        <form className="playlist-container" onSubmit={handleSave}>
                <input className="playlist-name" name="playlist-name" value={playlistName} onChange={handleNameChange} placeholder="New Playlist"/>
                {trackList.length > 0 && <button className="save-to-spotify" type="submit">Save to Spotify</button>}
                <Tracklist trackList={trackList} onClick={onClick} action={action}/>
        </form>
    );
}

export default Playlist;