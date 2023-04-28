import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiDonation = {
  getDonation: async ({ id, headers, page }) => {
    return (await instance.get(`/donation/getDonation`, { params: { page, projectID: id }, headers })).data;
  },
  getDonationForUser: async ({ headers, page }) => {
    return (await instance.get(`/donation/getDonationForUser`, { params: { page }, headers })).data;
  },
  setAnonimous: async ({ headers, idPayment }) => {
    return (await instance.get(`/donation/setAnonimous`, { params: { idPayment }, headers })).data;
  },
  sendDonation: async ({ headers, data }) => {
    return (await instance.post(`/donation/sendDonation`, data, { headers })).data;
  },
};