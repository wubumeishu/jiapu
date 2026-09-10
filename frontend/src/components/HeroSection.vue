<template>
  <section class="hero">
    <div class="hero-bg">
      <img src="/assets/home/backgrounds/hero-bg.png" alt="水墨山水背景" class="hero-img" />
    </div>
    
    <div class="hero-content">
      <h1 class="hero-title">你的姓氏，从哪里来？</h1>
      <p class="hero-subtitle">寻找属于你的家族故事</p>
      
      <div class="search-box">
        <input 
          type="text" 
          class="search-input" 
          placeholder="请输入您的姓氏"
          v-model="surname"
        />
        <button class="search-btn" @click="handleSearch">
          开始寻根
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const surname = ref('')

const handleSearch = () => {
  console.log('搜索姓氏:', surname.value)
}
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.hero-bg {
  width: 100%;
}

.hero-img {
  width: 100%;
  height: auto;
  display: block;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
}

.hero-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 2.75rem;
  font-weight: 700;
  color: #2C1810;
  margin-bottom: 10px;
  letter-spacing: 0.02em;
  text-align: center;
  text-shadow: 0 1px 4px rgba(255,255,255,0.8);
}

.hero-subtitle {
  font-size: 1.0625rem;
  color: #5C4033;
  margin-bottom: 28px;
  font-weight: 400;
  text-align: center;
  text-shadow: 0 1px 3px rgba(255,255,255,0.7);
}

.search-box {
  display: flex;
  align-items: center;
  max-width: 520px;
  width: 100%;
  background: rgba(255,255,255,0.96);
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  overflow: hidden;
  border: 1px solid rgba(212, 196, 176, 0.35);
}

.search-input {
  flex: 1;
  height: 50px;
  padding: 0 20px;
  border: none;
  background: transparent;
  font-size: 0.9375rem;
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #333333;
  outline: none;
}

.search-input::placeholder {
  color: #A09080;
}

.search-btn {
  height: 50px;
  padding: 0 28px;
  background: linear-gradient(135deg, #C9A961 0%, #B8944F 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 0 6px 6px 0;
  font-size: 0.9375rem;
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.search-btn:hover {
  background: linear-gradient(135deg, #B8944F 0%, #A8843F 100%);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-subtitle {
    font-size: 0.875rem;
    margin-bottom: 20px;
  }
  
  .search-box {
    flex-direction: column;
    width: 90%;
  }
  
  .search-input {
    width: 100%;
    height: 44px;
    padding: 0 16px;
  }
  
  .search-btn {
    width: 100%;
    height: 44px;
    border-radius: 0 0 6px 6px;
  }
}
</style>
