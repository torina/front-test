import axios from 'axios';
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiLocation = {
    addLocation: async ({ headers, data }) => {
        return (
            await instance.post('/location/addLocation', data, { headers })
        ).data;
    },
    deleteLocation: async ({ headers, id }) => {
        return (
            await instance.get(`/location/deleteLocation?_id=${id}`, { headers })
        ).data;
    },
    changeLocation: async ({ headers, data }) => {
        return (
            await instance.post(`/location/changeLocation`, data, { headers })
        ).data;
    }
}