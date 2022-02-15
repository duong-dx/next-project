import axiosClient from '@/api-client/axios-client';
import {LoginPayload} from "@/models/auth";

const authAPI = {
  login(params: LoginPayload) {
    return axiosClient.post('/login', params)
  },

  logout() {
    return axiosClient.post('/logout')
  },

  getUsers() {
    return axiosClient.get('/users')
  },
}

export default authAPI
