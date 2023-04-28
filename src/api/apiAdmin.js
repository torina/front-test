import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiAdmin = {
    getUsers: async ({ headers }) => {
        return (await instance.get(`/admin/getUsers`, { headers })).data;
    },
//   getUser: async ({ headers }) => {
//     return (await instance.get(`/user/getUser`, { headers })).data;
//   },
//   changePassword: async ({ headers, data }) => {
//     return (await instance.post(`/user/changePassword`, data, { headers }))
//       .data;
//   },
//   getUserById: async ({ id }) => {
//     return (await instance.get(`/user/getUserById?id=${id}`)).data;
//   },
};
