import axios from 'axios';
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiMessage = {
    addMessage: async ({ headers, data }) => {
        return (
            await instance.post('/messages/addMessage', data, { headers })
        ).data;
    },
    getMessages: async ({ сonversationsId, headers }) => {
        return (
            await instance.get(`/messages/getMessages`, { params: { сonversationsId }, headers })
        ).data;
    },
    // sendEmail: async (email) => {
    //     return (
    //         await instance.get(`/messages/sendEmailForResetPassword?email=${email}`)
    //     ).data;
    // },
    // resetPassword: async ({ data }) => {
    //     return (
    //         await instance.post(`/messages/resetPassword`, data)
    //     ).data;
    // },
}