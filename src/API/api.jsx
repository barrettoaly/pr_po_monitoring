import axios from "axios";

let baseURL = "http://127.0.0.1:8000";

// let baseURL = "http://192.168.137.1:8000/";
export const Baseurl = baseURL;

const api = new axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

// This will rebuild the api instance of Axios
// To Include and the token if exist.
// api.interceptors.request.use(function (config) {
//   const token = sessionStorage.getItem("token");
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

//Reusable Get Module
export const GetRequest = async ({ url }, token) => {
  return await api.get(url, { cancelToken: token });
};

//Reusable Post ModuleR
export const PostRequest = async ({ url }, data, token) => {
  return await api.post(url, data);
};

//Reusable Put Module
export const PutRequest = async ({ url }, data) => {
  return await api.put(url, data);
};

//Reusable Delete Module
export const DeleteRequest = async ({ url }, data) => {
  return await api.delete(url, data);
};

// Reusable Get Multiple Module
// export const GetMultiple = async (urls, data) => {
//   const requests = urls.map((url) => api.get(url));
//   return await axios.all(requests, data);
// };

// export const GetMultiple = async (urls, data) => {
//   const requests = urls.map((url) => api.get(url, data));
//   return await axios.all(requests).then(
//     axios.spread((...responses) => {
//       return responses;
//     })
//   );
// };

export const GetMultiple = async (urls, token) => {
  const requests = urls.map((url) => api.get(url, { cancelToken: token }));
  const responses = await Promise.all(requests);
  return responses;
};

export default api;
