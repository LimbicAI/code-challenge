import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from 'helpers/isAuthenticated';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_API_URL}`,
    timeout: 36000,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use((config) => {
    // check if user is authenticated or making auth requests
    if (isAuthenticated() || config.url?.includes('auth')) {
    } else {
        const navigate = useNavigate();
        navigate('auth/sign-in')
    }

    return config;
});



export default instance;
