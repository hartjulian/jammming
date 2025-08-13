import "./BackToTop.css";

function BackToTop( {onClick}) {
    return (
    <button className="back-to-top" onClick={onClick}>Back to top</button>
    );
};

export default BackToTop;