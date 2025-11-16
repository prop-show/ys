import type { UserInsert, UserSelect, UserUpdate } from '@ys/shared'
import type { AxiosError } from 'axios'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { useAxios } from './use-axios'

export function useGetUserListQuery() {
  const { axiosInstance } = useAxios()

  return useQuery<UserSelect[], AxiosError>({
    queryKey: ['user-list'],
    queryFn: async () => {
      const response = await axiosInstance.get('/users')
      return response.data
    },
  })
}

export function useGetUserInfoQuery(id: number) {
  const { axiosInstance } = useAxios()

  return useQuery<UserSelect, AxiosError>({
    queryKey: ['user-info', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/users/${id}`)
      return response.data
    },
  })
}

export function useCreateUserMutation() {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  return useMutation<boolean, AxiosError, UserInsert>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/users', data)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    },
  })
}

export function useUpdateUserMutation(id: number) {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  return useMutation<boolean, AxiosError, UserUpdate>({
    mutationFn: async (data) => {
      const response = await axiosInstance.put(`/users/${id}`, data)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    },
  })
}

export function useDeleteUserMutation(id: number) {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  return useMutation<boolean, AxiosError, void>({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/users/${id}`)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-list'] })
    },
  })
}
