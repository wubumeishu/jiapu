<template>
  <div class="genealogy-list">
    <h3 class="list-title">相关家谱</h3>
    <div class="genealogy-grid">
      <div 
        v-for="genealogy in genealogies" 
        :key="genealogy.id"
        class="genealogy-card"
        @click="handleClick(genealogy)"
      >
        <div class="genealogy-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
        </div>
        <div class="genealogy-info">
          <h4 class="genealogy-name">{{ genealogy.name }}</h4>
          <p class="genealogy-location">{{ genealogy.location }}</p>
          <p class="genealogy-desc">{{ genealogy.description }}</p>
        </div>
        <div class="genealogy-meta">
          <span class="generations">{{ genealogy.generations }}代</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSurnameData } from '@/data/surnames'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const surnameData = getSurnameData(slug)

const genealogies = surnameData?.genealogies || []

const handleClick = (genealogy: any) => {
  console.log('查看家谱:', genealogy.name)
  router.push(`/surname/${slug}/genealogy/${genealogy.id}`)
}
</script>

<style scoped>
.genealogy-list {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.list-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 20px 0;
}

.genealogy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.genealogy-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background-color: #F9F7F2;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.genealogy-card:hover {
  background-color: #F0E6D3;
  border-color: #E0D6C8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(61, 43, 31, 0.08);
}

.genealogy-icon {
  flex-shrink: 0;
  color: #C9A961;
}

.genealogy-info {
  flex: 1;
  min-width: 0;
}

.genealogy-name {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 4px 0;
}

.genealogy-location {
  font-size: 0.8125rem;
  color: #8B7355;
  margin: 0 0 6px 0;
}

.genealogy-desc {
  font-size: 0.8125rem;
  color: #6B5B4F;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.genealogy-meta {
  flex-shrink: 0;
}

.generations {
  display: inline-block;
  padding: 4px 8px;
  background-color: #FFFFFF;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #8D6E63;
  font-weight: 500;
}

@media (max-width: 768px) {
  .genealogy-grid {
    grid-template-columns: 1fr;
  }
}
</style>
