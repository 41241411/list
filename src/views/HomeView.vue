<script setup>
const features = [
  {
    title: '番茄鐘',
    description: '專注工作與休息的最佳工具，提升效率，管理時間。',
    icon: '⏲️'
  },
  {
    title: 'To Do List',
    description: '輕鬆管理每日任務，規劃待辦事項，提升生產力。',
    icon: '📝'
  },
  {
    title: '英文單字卡',
    description: '隨時隨地背單字，強化英文能力，學習更有效率。',
    icon: '📚'
  }
];
</script>

<template>
  <main class="home-main">
    <h1 class="home-title">歡迎使用學習輔助工具</h1>
    <div class="features">
      <div v-for="feature in features" :key="feature.title" class="feature-card">
        <div class="feature-icon">{{ feature.icon }}</div>
        <h2 class="feature-title">{{ feature.title }}</h2>
        <p class="feature-desc">{{ feature.description }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

.home-title {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.features {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2rem 1.5rem;
  min-width: 220px;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
}

.feature-card:hover {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #42b983;
}

.feature-desc {
  font-size: 1rem;
  color: #555;
  text-align: center;
}
</style>
