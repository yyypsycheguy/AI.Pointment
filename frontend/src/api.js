// function for api calls to flask app server
const API_URL = 'http://localhost:5000/api';

export const fetchData = async () => {
    const response = await fetch(`${API_URL}/data`);
    const data = await response.json();
    return data;
};