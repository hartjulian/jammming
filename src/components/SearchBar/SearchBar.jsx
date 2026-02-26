import "./SearchBar.css";

function SearchBar({ searchTerm, onChange, onSearch }) {
    
    const handleStringChange = (e) => {
        onChange(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        // <div className="search-container">
            <form className="search-container" onSubmit={handleSearch}>
                <input className="search-bar" name="searchBar" value={searchTerm} onChange={handleStringChange} />
                <button className="search-button" type="submit">Search for songs, albums or artists</button>
            </form>
        // </div>
    );
}

export default SearchBar;