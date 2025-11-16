<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'

import { useCreateTaskMutation } from '@ys/fetch'
import { ref } from 'vue'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1, '任务标题不能为空'),
})
type Schema = z.output<typeof schema>
const state = ref<Partial<Schema>>({
  title: '',
})

const toast = useToast()
const { mutate: createTask } = useCreateTaskMutation()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  createTask(event.data, {
    onSuccess() {
      toast.add({ title: 'Success', description: '任务创建成功', color: 'success' })
      state.value.title = ''
    },
  })
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="标题" name="title">
      <UInput v-model="state.title" />
    </UFormField>

    <UButton type="submit">
      添加
    </UButton>
  </UForm>
</template>
