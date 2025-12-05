<script lang="ts" setup>
import type { TaskSelect } from '@ys/shared'

import { useUpdateTaskMutation } from '@ys/fetch'
import { computed, unref } from 'vue'

const props = defineProps<{
  task: TaskSelect
}>()

const id = computed(() => props.task.id)

const { mutate: updateTask } = useUpdateTaskMutation(unref(id))
</script>

<template>
  <UButton
    @click="updateTask({ done: true })"
  >
    标记完成
  </UButton>
</template>
