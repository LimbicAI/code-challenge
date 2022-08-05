import jwtDecode from 'jwt-decode';
import axios from 'services/axios';

export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        try {
            const token: any = jwtDecode(accessToken);
            const time = Date.now().valueOf() / 1000;
            if (token.exp < time) {
                return false;
            }
        } catch (error) {
            return false;
        }
        axios.defaults.headers.common.Authorization = accessToken;

        return !!accessToken;
    }
    return false;
};
