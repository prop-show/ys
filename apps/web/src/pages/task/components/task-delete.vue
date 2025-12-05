<script lang="ts" setup>
import type { TaskSelect } from '@ys/shared'

import { useDeleteTaskMutation } from '@ys/fetch'
import { computed, unref } from 'vue'

const props = defineProps<{
  task: TaskSelect
}>()

const id = computed(() => props.task.id)

const { mutate: deleteTask } = useDeleteTaskMutation(unref(id))
</script>

<template>
  <UButton
    color="error"
    @click="deleteTask()"
  >
    删除
  </UButton>
</template>
