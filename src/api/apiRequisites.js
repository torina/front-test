import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiRequisites = {
  addRequisite: async ({ headers, data }) => {
    return (await instance.post(`/requisit/createRequisit`, data, { headers }))
      .data;
  },
  changeRequisite: async ({ headers, data }) => {
    return (await instance.post(`/requisit/changeRequisit`, data, { headers }))
      .data;
  },
  deleteRequisite: async ({ headers, id }) => {
    return (await instance.get(`/requisit/deleteRequisit?idRequisites=${id}`, { headers }))
      .data;
  },
  getRequisites: async ({ headers, page }) => {
    return (await instance.get(`/requisit/getRequivistes?page=${page ? page : 1}`, { headers }))
      .data;
  },
  setDefaultRequisites: async ({ headers, id }) => {
    return (await instance.get(`/requisit/setDefaultRequisites?idRequisites=${id}`, { headers }))
      .data;
  },
};
