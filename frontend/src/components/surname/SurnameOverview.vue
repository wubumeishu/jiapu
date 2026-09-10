<template>
  <section class="surname-overview">
    <div class="content-width">
      <div class="overview-header">
        <div class="overview-info">
          <h1 class="surname-title">{{ surnameData?.character }}姓</h1>
          <p class="surname-pinyin">{{ surnameData?.pinyin }} {{ surnameData?.tone ? `(${surnameData.tone})` : '' }}</p>
        </div>
        <SurnameBadge :character="surnameData?.character || ''" />
      </div>
      
      <div class="overview-grid">
        <div class="info-item">
          <span class="info-label">得姓始祖</span>
          <span class="info-value">{{ surnameData?.ancestor || '资料待完善' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">起源时间</span>
          <span class="info-value">{{ surnameData?.originEra || '资料待完善' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">人口数量</span>
          <span class="info-value">{{ surnameData?.population || '资料待完善' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">姓氏排名</span>
          <span class="info-value">{{ surnameData?.ranking || '资料待完善' }}</span>
        </div>
        <div class="info-item full-width">
          <span class="info-label">主要分布</span>
          <span class="info-value distribution">{{ surnameData?.distribution?.join('、') || '资料待完善' }}</span>
        </div>
        <div class="info-item full-width">
          <span class="info-label">姓氏简介</span>
          <p class="info-value introduction">{{ surnameData?.introduction || '资料待完善' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SurnameBadge from './SurnameBadge.vue'
import { getSurnameData } from '@/data/surnames'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string
const surnameData = getSurnameData(slug)
</script>

<style scoped>
.surname-overview {
  padding: 40px 0;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0D6C8;
}

.content-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.overview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.overview-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.surname-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2C1810;
  margin: 0;
}

.surname-pinyin {
  font-size: 1rem;
  color: #8B7355;
  margin: 0;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 0.8125rem;
  color: #8B7355;
}

.info-value {
  font-size: 1rem;
  color: #3E2723;
  font-weight: 500;
}

.info-value.distribution {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.info-value.distribution span {
  display: inline-block;
  padding: 4px 12px;
  background-color: #F9F7F2;
  border-radius: 4px;
  font-size: 0.875rem;
}

.info-value.introduction {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #5C4033;
  font-weight: 400;
}

@media (max-width: 1024px) {
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content-width {
    padding: 0 20px;
  }
  
  .overview-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .surname-title {
    font-size: 2rem;
  }
}
</style>
