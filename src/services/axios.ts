import axios from "axios"
// const baseURL = import.meta.env.VITE_API_URL
const baseURL = import.meta.env.VITE_API_URL || "/api"
export const staleTime = 1000 * 60 * 15

export const api = axios.create({
  baseURL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
})
