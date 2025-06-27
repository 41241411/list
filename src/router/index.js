import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isLoggedIn } from '../utils/auth'
import { showLoginAlert } from '../utils/sweetalert'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: () => import('../views/PomodoroView.vue'),
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
    },
    {
      path: '/vocab',
      name: 'vocab',
      component: () => import('../views/VocabView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/SettingView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const protectedRoutes = ['pomodoro', 'todo', 'vocab']
  if (protectedRoutes.includes(to.name) && !isLoggedIn()) {
    await showLoginAlert()
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
