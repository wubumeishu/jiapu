<template>
  <section class="platform-features">
    <div class="content-width">
      <h2 class="section-title">平台特色</h2>
      
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card"
        >
          <div class="feature-icon">
            <svg v-if="index === 0" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="24" cy="24" r="20"/>
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 4c8.837 0 16 7.163 16 16s-7.163 16-16 16S8 32.837 8 24 15.163 8 24 8z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="index === 1" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M24 4L4 14v20l20 10 20-10V14L24 4z"/>
              <path d="M4 14l20 10 20-10"/>
              <path d="M24 24v20"/>
            </svg>
            <svg v-else-if="index === 2" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M24 4l-8 16h16l-8 16 M16 20h16"/>
              <path d="M8 36h32"/>
            </svg>
            <svg v-else viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="16" r="6"/>
              <circle cx="36" cy="16" r="6"/>
              <circle cx="12" cy="32" r="6"/>
              <circle cx="36" cy="32" r="6"/>
              <path d="M12 22v6"/>
              <path d="M36 22v6"/>
              <path d="M18 16h12"/>
              <path d="M18 32h12"/>
            </svg>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { 
    title: '姓氏起源', 
    description: '探索姓氏的起源与演变' 
  },
  { 
    title: '家谱树', 
    description: '记录家族成员关系' 
  },
  { 
    title: '网络祭祖', 
    description: '在线祭祀先人' 
  },
  { 
    title: '家族社区', 
    description: '连接宗亲，共叙亲情' 
  }
]
</script>

<style scoped>
.platform-features {
  padding: 40px 0;
  background-color: #F9F7F2;
}

.content-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 20px;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 28px 16px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(61,43,31,0.05);
  transition: all 0.2s;
  border: 1px solid transparent;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(61,43,31,0.08);
  border-color: #E0D6C8;
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 14px;
  color: #5C4033;
  background-color: #F0E6D3;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon svg {
  width: 24px;
  height: 24px;
}

.feature-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 6px;
}

.feature-desc {
  font-size: 0.8125rem;
  color: #6B5B4F;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .platform-features {
    padding: 30px 0;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .feature-card {
    padding: 20px;
  }
}
</style>
