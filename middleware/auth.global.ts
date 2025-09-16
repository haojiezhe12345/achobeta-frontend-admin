import { useUserStore } from '../stores/modules/userStore'

// 路由守卫
export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  const { token } = userStore

  if (to.path === '/login') {
    if (token) {
      message.error('请先退出登录')
      return navigateTo('/')
    }
  } else {
    if (!token) {
      message.error('请先登录')
      return navigateTo('/login')
    }
  }
})
