import type { IResponse, TaskInsert, TaskSelect, TaskUpdate } from '@ys/shared'
import type { AxiosError } from 'axios'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { useAxios } from './use-axios'

export function useGetTaskListQuery() {
  const { axiosInstance } = useAxios()

  return useQuery<IResponse<TaskSelect[]>, AxiosError>({
    queryKey: ['task-list'],
    queryFn: async () => {
      const response = await axiosInstance.get('v1/tasks')
      return response.data
    },
  })
}

export function useGetTaskInfoQuery(id: number) {
  const { axiosInstance } = useAxios()

  return useQuery<IResponse<TaskSelect>, AxiosError>({
    queryKey: ['task-info', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`v1/tasks/${id}`)
      return response.data
    },
  })
}

export function useCreateTaskMutation() {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  return useMutation<IResponse<TaskSelect>, AxiosError, TaskInsert>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('v1/tasks', data)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] })
    },
  })
}

export function useUpdateTaskMutation(id: number) {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  return useMutation<IResponse<TaskSelect>, AxiosError, TaskUpdate>({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch(`v1/tasks/${id}`, data)

      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] })
      queryClient.invalidateQueries({ queryKey: ['task-info', id] })
    },
  })
}

export function useDeleteTaskMutation(id: number) {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  return useMutation<IResponse<TaskSelect>, AxiosError, void>({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`v1/tasks/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-list'] })
    },
  })
}
