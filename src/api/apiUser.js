import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiUser = {
  getUser: async ({ headers }) => {
    return (await instance.get(`/user/getUser`, { headers })).data;
  },
  getDashboardData: async ({ headers }) => {
    return (await instance.get(`/user/dashboardCounts`, { headers })).data;
  },
  changeUser: async ({ headers, data }) => {
    return (await instance.post(`/user/changeUser`, data, { headers })).data;
  },
  uploadImage: async ({ headers, file }) => {
    return (
      await instance.post(`/user/uploadImage`, { picture: file }, { headers })
    ).data;
  },
  changePassword: async ({ headers, data }) => {
    return (await instance.post(`/user/changePassword`, data, { headers }))
      .data;
  },
  createProject: async (data, headers) => {
    return (
      await instance.post(`/project/addProject`, data, {
        headers,
      })
    ).data;
  },
  getUsersForConversations: async ({ headers }) => {
    return (await instance.get(`/user/getUsersForConversations`, { headers })).data;
  },
  getUserById: async ({ id }) => {
    return (await instance.get(`/user/getUserById?id=${id}`)).data;
  },
  getEmails: async () => {
    return (await instance.get(`/user/getEmails`)).data;
  },
};
