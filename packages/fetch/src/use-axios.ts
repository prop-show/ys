import type { AxiosInstance } from 'axios'

import axios from 'axios'
import { toast } from 'vue-sonner'

import { useGetTokens, useRefreshToken } from './use-token'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
})

const { accessToken } = useGetTokens()

axiosInstance.interceptors.request.use((config) => {
  // 如果有token，就把token携带到请求头中
  if (accessToken.value) {
    config.headers.Authorization = `Bearer ${accessToken.value}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response) => {
  return response
}, async (error) => {
  const { response } = error

  if (!response) {
    return Promise.reject(error)
  }

  const data = response.data
  const message = data.message || '请求出错，请稍后再试'

  switch (response.status) {
    case 401:
      // 重新换一次token
      await useRefreshToken()
      // TODO 如果换取失败如何处理
      break
    case 403:
      toast.warning(message || '没有权限，请联系管理员')
      break
  }
  return Promise.reject(message || error)
})

export function useAxios() {
  return {
    axiosInstance,
    axios: axiosInstance,
  }
}
