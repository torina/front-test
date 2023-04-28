import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiVolunteer = {
    getVolunteers: async ({ headers, id }) => {
      return (await instance.get(`/volunteer/getVolunteerForProject?id=${id}`, { headers })).data;
    },
    changeStatus: async ({ headers, id, status }) => {
      return (await instance.get(`/volunteer/changeStatus?id=${id}&status=${status}`, { headers })).data;
    },
    leaveProject: async ({ headers, id }) => {
      return (await instance.get(`/volunteer/leaveProject?idProject=${id}`, { headers })).data;
    },
};