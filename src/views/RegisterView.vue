<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../utils/supabase'
import Swal from 'sweetalert2'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const nickname = ref('')
const router = useRouter()

async function handleRegister() {
    if (!username.value || !password.value || !nickname.value) {
        await Swal.fire({ icon: 'warning', title: '請輸入Email、暱稱與密碼' })
        return
    }
    if (password.value !== confirmPassword.value) {
        await Swal.fire({ icon: 'warning', title: '兩次密碼輸入不一致' })
        return
    }
    // 1. 使用 Supabase Auth 註冊
    const { data, error } = await supabase.auth.signUp({
        email: username.value,
        password: password.value
    })
    if (error) {
        await Swal.fire({ icon: 'error', title: '註冊失敗', text: error.message })
        return
    }
    // 2. 註冊成功後，寫入自訂 users 表
    const auth_id = data.user?.id
    if (auth_id) {
        const { error: userError } = await supabase
            .from('users')
            .insert({ auth_id, name: nickname.value, image: '', known_word_count: 0 })
        if (userError) {
            await Swal.fire({ icon: 'error', title: '註冊成功但寫入資料表失敗', text: userError.message })
            return
        }
    }
    await Swal.fire({ icon: 'success', title: '註冊成功', text: '請至信箱收驗證信' })
    router.push('/login')
}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="mb-4">註冊</h2>
            <form @submit.prevent="handleRegister">
                <div class="mb-3">
                    <label class="form-label">電子郵件</label>
                    <input v-model="username" type="email" class="form-control" placeholder="請輸入電子郵件" />
                </div>
                <div class="mb-3">
                    <label class="form-label">暱稱</label>
                    <input v-model="nickname" type="text" class="form-control" placeholder="請輸入暱稱" />
                </div>
                <div class="mb-3">
                    <label class="form-label">密碼</label>
                    <input v-model="password" type="password" class="form-control" placeholder="請輸入密碼" />
                </div>
                <div class="mb-3">
                    <label class="form-label">確認密碼</label>
                    <input v-model="confirmPassword" type="password" class="form-control" placeholder="請再次輸入密碼" />
                </div>
                <button type="submit" class="btn btn-primary w-100">註冊</button>
            </form>
            <div class="mt-3">
                已有帳號？<a href="/login">登入</a>
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
