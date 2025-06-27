<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

const route = useRoute()

const userName = computed(() => {
  const userStr = sessionStorage.getItem('user')
  console.log('sessionStorage user:', userStr)
  if (!userStr) return '帳號'
  try {
    const user = JSON.parse(userStr)
    return user.name || '帳號'
  } catch {
    return '帳號'
  }
})
</script>

<template>
  <header v-if="route.name !== 'login' && route.name !== 'register'">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">首頁</RouterLink>
        <RouterLink to="/pomodoro">番茄鐘</RouterLink>
        <RouterLink to="/todo">To Do List</RouterLink>
        <RouterLink to="/vocab">英文單字卡</RouterLink>
        <div class="dropdown ms-3">
          <button class="btn btn-light dropdown-toggle d-flex align-items-center" type="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/favicon.ico" alt="avatar" class="avatar me-2" />
            {{ userName }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <RouterLink class="dropdown-item" to="/setting">設定</RouterLink>
            </li>
            <li><a class="dropdown-item" href="/login">登出</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;
}

.wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

nav {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

nav a {
  color: #495057;
  font-weight: 500;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  transition: background 0.2s, color 0.2s;
}

nav a.router-link-exact-active,
nav a.router-link-active {
  background: #42b983;
  color: #fff;
}

nav a:hover {
  background: #e9ecef;
  color: #42b983;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e0e0e0;
}
</style>
