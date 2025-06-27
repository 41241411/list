<script setup>
// 目前為基礎展示頁，未來可擴充功能
</script>

<template>
    <main class="feature-main">
        <h1 class="feature-title">英文單字卡</h1>
        <p class="feature-desc">隨時隨地背單字，強化英文能力，學習更有效率。</p>
        <div class="feature-icon">📚</div>
    </main>
</template>

<style scoped>
.feature-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
}

.feature-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #42b983;
}

.feature-desc {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 1.5rem;
    text-align: center;
}

.feature-icon {
    font-size: 3rem;
}
</style>
