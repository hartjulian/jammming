import "./LoadingBanner.css";

function LoadingBanner({ isFetching, moreResults }) {
    let scrollMessage = "";
    if (isFetching) {
        scrollMessage = "Loading more results...";
    } else if (moreResults) {
        scrollMessage = "Scrolll to fetch more results";
    } else {
        scrollMessage = "No more results";
    }
    return (
        <p className="loading-banner">{scrollMessage}</p>
    );
};

export default LoadingBanner;