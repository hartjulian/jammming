import "./SearchBar.css";

function SearchBar({ searchTerm, onChange, onSearch }) {
    
    const handleStringChange = (e) => {
        onChange(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-container">
            <input className="search-bar" name="searchBar" value={searchTerm} onChange={handleStringChange} />
            <button className="search-button" onClick={handleSearch}>Search for songs, albums or artists</button>
        </div>
    );
}

export default SearchBar;