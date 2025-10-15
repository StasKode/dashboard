import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL as string

export const api = axios.create({
  baseURL,
  timeout: 15000,
})


