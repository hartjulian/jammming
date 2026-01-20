import './Login.css';

function Login( {login} ) {
    return <button className="login-button" onClick={ login }>Login using Spotify</button>
}

export default Login;