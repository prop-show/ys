import { ref } from 'vue'

export function useUser() {
  const user = ref()
  function getUserById() {
    return null
  }

  return {
    user,
    getUserById,
  }
}
