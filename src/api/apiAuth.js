import axios from 'axios';
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiAuth = {
    registration: async ({ data }) => {
        return (
            await instance.post('/auth/registration', data)
        ).data;
    },
    login: async ({ data }) => {
        return (
            await instance.post(`/auth/login`, data)
        ).data;
    },
    sendEmail: async (email) => {
        return (
            await instance.get(`/auth/sendEmailForResetPassword?email=${email}`)
        ).data;
    },
    resetPassword: async ({ data }) => {
        return (
            await instance.post(`/auth/resetPassword`, data)
        ).data;
    },
    sendConfirmEmail: async ({ email }) => {
        return (
            await instance.get(`/auth/sendConfirmEmail`, { params: { email } })
        ).data;
    },
    confirmEmail: async ({ token }) => {
        return (
            await instance.get(`/auth/confirmEmail`, { params: { token } })
        ).data;
    },
}