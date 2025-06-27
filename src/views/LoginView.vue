<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../utils/supabase'
import Swal from 'sweetalert2'

const username = ref('')
const password = ref('')
const router = useRouter()

async function handleLogin() {
    if (!username.value || !password.value) {
        await Swal.fire({ icon: 'warning', title: '請輸入Email與密碼' })
        return
    }
    const { data, error } = await supabase.auth.signInWithPassword({
        email: username.value,
        password: password.value
    })
    if (error) {
        await Swal.fire({ icon: 'error', title: '登入失敗', text: error.message })
        return
    }
    // 取得 auth_id
    const auth_id = data.user?.id
    if (auth_id) {
        // 查詢自訂 users 表
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', auth_id)
            .single()
        if (userError || !userData) {
            await Swal.fire({ icon: 'error', title: '找不到使用者資料', text: userError?.message || '' })
            return
        }
        // 存到 sessionStorage
        sessionStorage.setItem('user', JSON.stringify(userData))
    }
    await Swal.fire({ icon: 'success', title: '登入成功' })
    router.push('/')
}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="mb-4">登入</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <label class="form-label">電子郵件</label>
                    <input v-model="username" type="email" class="form-control" placeholder="請輸入電子郵件" />
                </div>
                <div class="mb-3">
                    <label class="form-label">密碼</label>
                    <input v-model="password" type="password" class="form-control" placeholder="請輸入密碼" />
                </div>
                <button type="submit" class="btn btn-success w-100">登入</button>
            </form>
            <div class="mt-3">
                沒有帳號？<a href="/register">註冊</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
}

.login-card {
    background: #fff;
    padding: 2.5rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    min-width: 320px;
    max-width: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
