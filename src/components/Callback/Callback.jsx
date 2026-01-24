import Spotify from '../../util/Spotify';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';


function Callback() {
    const urlParams = new URLSearchParams(window.location.search);    
    const navigate = useNavigate();

    const authCode = urlParams.get('code')
    localStorage.setItem('auth_code', authCode);
    
    useEffect(() => {
        navigate('/');
    }, [])

};

export default Callback