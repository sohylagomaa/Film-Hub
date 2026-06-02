import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '786d51c7420fbfc40a53ec75ab4cd421', 
    },
});

export default axiosInstance;