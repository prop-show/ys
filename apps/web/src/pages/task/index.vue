<script lang="ts" setup>
import { useGetTaskListQuery } from '@ys/fetch'

import TaskCreate from './components/task-create.vue'
import TaskDelete from './components/task-delete.vue'
import TaskDoneUpdate from './components/task-done-update.vue'

const { data: tasks, isPending, isError, error } = useGetTaskListQuery()
</script>

<template>
  <section>
    <TaskCreate />
  </section>

  <section>
    <div v-if="isPending">
      加载中...
    </div>
    <div v-if="isError">
      {{ error }}
    </div>
    <div v-if="!isPending && !isError" class="my-4 ">
      <div v-if="tasks?.data.length" class="space-y-2">
        <UCard v-for="task in tasks.data" :key="task.id">
          <div class="flex items-center justify-between">
            {{ task.title }}

            <div class="flex gap-2">
              <TaskDelete :task />
              <UBadge v-if="task.done" variant="outline">
                已完成
              </UBadge>
              <TaskDoneUpdate v-if="!task.done" :task />
            </div>
          </div>
        </UCard>
      </div>
      <div v-else>
        <UEmpty
          icon="i-lucide-file"
          title="没有任务"
          description="看起来你还没有添加任何任务。创建一个以开始吧。"
        />
      </div>
    </div>
  </section>
</template>
