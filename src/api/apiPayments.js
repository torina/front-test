import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const apiPayments = {
//   getDonation: async ({ id, headers }) => {
//     return (await instance.get(`/donation/getDonation?projectID=${id}`, { headers })).data;
//   },
//   getDonationForUser: async ({ headers, page }) => {
//     return (await instance.get(`/donation/getDonationForUser`, { params: { page }, headers })).data;
//   },
//   setAnonimous: async ({ headers, idPayment }) => {
//     return (await instance.get(`/donation/setAnonimous`, { params: { idPayment }, headers })).data;
//   },
  createPayment: async ({ headers, data }) => {
    return (await instance.post(`/payments/createPayment`, data, { headers })).data;
  },
};