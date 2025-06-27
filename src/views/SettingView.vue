<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../utils/supabase'
import Swal from 'sweetalert2'

const router = useRouter()
const user = ref(null)
const name = ref('')
const image = ref('')

onMounted(() => {
    const userStr = sessionStorage.getItem('user')
    if (!userStr) {
        Swal.fire({ icon: 'warning', title: '請先登入' })
        router.push('/login')
        return
    }
    user.value = JSON.parse(userStr)
    name.value = user.value.name || ''
    image.value = user.value.image || ''
})

async function handleSave() {
    if (!name.value) {
        await Swal.fire({ icon: 'warning', title: '暱稱不能為空' })
        return
    }
    const { error } = await supabase
        .from('users')
        .update({ name: name.value, image: image.value })
        .eq('id', user.value.id)
    if (error) {
        await Swal.fire({ icon: 'error', title: '更新失敗', text: error.message })
        return
    }
    // 更新 sessionStorage
    const updatedUser = { ...user.value, name: name.value, image: image.value }
    sessionStorage.setItem('user', JSON.stringify(updatedUser))
    await Swal.fire({ icon: 'success', title: '更新成功' })
    router.push('/')
}
</script>

<template>
    <div class="setting-container">
        <div class="setting-card">
            <h2 class="mb-4">帳號設定</h2>
            <form @submit.prevent="handleSave">
                <div class="mb-3">
                    <label class="form-label">暱稱</label>
                    <input v-model="name" type="text" class="form-control" placeholder="請輸入暱稱" />
                </div>
                <div class="mb-3">
                    <label class="form-label">頭像圖片網址</label>
                    <input v-model="image" type="text" class="form-control" placeholder="請輸入圖片網址" />
                </div>
                <div class="mb-3 text-center">
                    <img v-if="image" :src="image" alt="頭像預覽" class="avatar-preview mb-2" />
                </div>
                <button type="submit" class="btn btn-success w-100">儲存</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.setting-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
}

.setting-card {
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

.avatar-preview {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #e0e0e0;
}
</style>
