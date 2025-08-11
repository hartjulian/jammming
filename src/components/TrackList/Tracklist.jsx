import { useEffect, useState } from "react";
import Track from "../Track/Track";
import "./Tracklist.css";

function Tracklist({ trackList, onClick, action }) {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        
        if (window.innerHeight + document.documentElement.scrollTop + 1 < document.documentElement.offsetHeight) return;
        console.log('Fetch more list items!');
    }

    return (
        <div className="tracklist-container">
            {trackList.map((track, index) => {
                return <Track track={track} key={index} onClick={onClick} action={action} />;
            })}
        </div>
    );
}

export default Tracklist;