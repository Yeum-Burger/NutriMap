import axios from "axios";

export const api = axios.create({
    // baseURL: 'http://localhost:8080', TODO: CHANGE THIS URL WITH THE ACTUAL BACKEND URL
})
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
