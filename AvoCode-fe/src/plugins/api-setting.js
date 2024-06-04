import axios from 'axios'

console.log(import.meta.env.VITE_BASE_URL)

const requestApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,

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

export default requestApi;