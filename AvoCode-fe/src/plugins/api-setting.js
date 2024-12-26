import axios from 'axios'

const requestApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,

})

const requestGDBApi = axios.create({
    baseURL: import.meta.env.VITE_GDB_URL,
    withCredentials: false,
})

export const algebraApi = axios.create({
    baseURL: import.meta.env.VITE_ALGEBRA_URL,
    withCredentials: false
})

let getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

requestApi.interceptors.request.use(function (config) {
    const token = getCookie('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export { requestApi, requestGDBApi };
export default requestApi;