import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const projectsApi = {
  registration: async ({ data }) => {
    return (await instance.post("/auth/registration", data)).data;
  },
  login: async ({ data }) => {
    return (await instance.post(`/auth/login`, data)).data;
  },
  sendEmail: async (email) => {
    return (
      await instance.get(`/auth/sendEmailForResetPassword?email=${email}`)
    ).data;
  },
  getMyProjects: async ({ filterCategory, filterStatus, headers, page, querySearch, sortBy, filterDraft }) => {
    return (await instance.get(`/project/getMyProjects?querySearch=${querySearch}&page=${page ? page : 1}&filterStatus=${filterStatus}&sortBy=${sortBy}&filterDraft=${filterDraft}`, { headers })).data;
  },
  getAllProjects: async ({ filterCategory, filterStatus, headers }) => {
    return (await instance.get(`/project/getAllProjects`, { headers })).data;
  },
  resetPassword: async ({ data }) => {
    return (await instance.post(`/auth/resetPassword`, data)).data;
  },
  sendVolunteer: async ({ data, headers }) => {
    return (await instance.post(`/volunteer/sendVolunteer`, data, { headers }))
      .data;
  },
};
