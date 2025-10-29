<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  {
    label: 'home',
    icon: 'i-lucide-database',
    to: '/',
  },
  {
    label: 'Composables',
    icon: 'i-lucide-database',
    to: '/about',
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    badge: '3.8k',
    to: 'https://github.com/nuxt/ui',
    target: '_blank'
  },
  
])
</script>

<template>
  <UNavigationMenu :items="items" />
</template>
