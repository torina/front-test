import axios from 'axios';
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiConversation = {
    getChats: async ({ headers }) => {
        return (
            await instance.get('/conversations/getChats', { headers })
        ).data;
    },
    getChatUsers: async ({ data }) => {
        return (
            await instance.get(`/conversations/getChatUsers`, data)
        ).data;
    },
    addChat: async ({ headers, data }) => {
        return (
            await instance.post(`/conversations/addChat`, data, { headers })
        ).data;
    },
    addMemberInChat: async ({ headers, data }) => {
        return (
            await instance.post(`/conversations/addMemberInChat`, data, { headers })
        ).data;
    },
    deleteMemberInChat: async ({ headers, data }) => {
        return (
            await instance.post(`/conversations/deleteMemberInChat`, data, { headers })
        ).data;
    },
}