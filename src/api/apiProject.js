import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiProject = {
  getMyProjects: async ({ headers, onPage, page }) => {
    return (
      await instance.get(
        `/project/getMyProjects?onPage=${onPage ? onPage : 7}&page=${page ? page : 1
        }`,
        { headers }
      )
    ).data;
  },
  getAllProjects: async ({ headers, data }) => {
    return (
      await instance.get(`/project/getAllProjects`, {
        params: {
          page: data.page,
          querySearch: data.querySearch,
          sortBy: data.sortBy,
          filterType: data.filterType,
          filterCategory: data.filterCategory,
          endDate: data.endDate,
        },
        headers,
      })
    ).data;
  },
  getProject: async ({ headers, id }) => {
    return (await instance.get(`/project/getProject?id=${id}`, { headers }))
      .data;
  },
  addComment: async ({ headers, data }) => {
    return (await instance.post(`/project/addComment`, data, { headers })).data;
  },
  changeComment: async ({ headers, data }) => {
    return (await instance.post(`/project/changeComment`, data, { headers })).data;
  },
  updateProject: async ({ headers, data }) => {
    return (await instance.post(`/project/updateProject`, data, { headers }))
      .data;
  },
  archiveProject: async ({ headers, id }) => {
    return (await instance.get(`/project/achivedProject?id=${id}`, { headers }))
      .data;
  },
  deleteProject: async ({ headers, id }) => {
    return (await instance.get(`/project/deleteProject?id=${id}`, { headers }))
      .data;
  },
  addInCollection: async ({ headers, idProject }) => {
    return (await instance.get(`/project/addInCollection`, { params: { idProject }, headers }))
      .data;
  },
  getCollectionProjects: async ({ headers, data }) => {
    return (
      await instance.get(`/project/getCollectionProjects`, {
        params: {
          page: data.page,
          querySearch: data.querySearch,
          sortBy: data.sortBy,
          filterType: data.filterType,
          filterCategory: data.filterCategory,
          endDate: data.endDate,
        },
        headers,
      })
    ).data;
  },
};
