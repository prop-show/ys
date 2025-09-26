import { useStorage } from '@vueuse/core'
import axios from 'axios'

export interface ITokens {
  accessToken: string
  refreshToken: string
}

const accessToken = useStorage('accessToken', '', sessionStorage)
const refreshToken = useStorage('refreshToken', '', sessionStorage)

export function useSaveTokens({
  accessToken: _accessToken,
  refreshToken: _refreshToken,
}: ITokens) {
  accessToken.value = _accessToken
  refreshToken.value = _refreshToken
}

export function useGetTokens() {
  return {
    accessToken,
    refreshToken,
  }
}

export function useClearTokens() {
  accessToken.value = ''
  refreshToken.value = ''
}

//  请求接口，使用refreshToken换取新token
export async function useRefreshToken(): Promise<boolean> {
  const http = axios.create({
    baseURL: '/api',
  })
  try {
    // TODO 更改更换token的接口地址
    const res = await http.post('/refresh-token', {
      refreshToken: refreshToken.value,
    })

    const data = res.data as ITokens
    useSaveTokens(data)
    return true
  }
  catch (error) {
    console.error('刷新token失败', error)
    return false
  }
}
