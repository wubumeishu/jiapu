<template>
  <div class="genealogy-page">
    <NavBar />
    
    <main class="main-content">
      <div class="content-width">
        <Breadcrumb :surname="surnameData?.character || '陈'" />
        
        <!-- 家谱头部 -->
        <div class="genealogy-header" v-if="genealogy">
          <div class="genealogy-title">
            <h1>{{ genealogy.name }}</h1>
            <div class="genealogy-meta">
              <span class="location">📍 {{ genealogy.location }}</span>
              <span class="generations">{{ genealogy.generations }}代</span>
            </div>
          </div>
          <button class="back-btn" @click="goBack">← 返回姓氏页</button>
        </div>
        
        <!-- 加载状态 -->
        <div v-else class="loading-state">
          <p>正在加载家谱信息...</p>
        </div>
        
        <!-- 家谱树 -->
        <ChenGenealogyTree v-if="genealogy" />
        
        <!-- 家谱信息 -->
        <div class="genealogy-info-section" v-if="genealogy">
          <h3>家谱简介</h3>
          <p>{{ genealogy.description }}</p>
          <p class="note">此为测试家谱，用于验证家谱树布局引擎。</p>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Breadcrumb from '@/components/surname/Breadcrumb.vue'
import ChenGenealogyTree from '@/components/surname/ChenGenealogyTree.vue'
import { getSurnameData } from '@/data/surnames'

const route = useRoute()
const router = useRouter()

const surname = route.params.slug as string
const surnameData = getSurnameData(surname)

const genealogyId = route.params.id as string
const genealogy = ref<any>(null)

onMounted(() => {
  // 查找对应的家谱
  if (surnameData?.genealogies) {
    genealogy.value = surnameData.genealogies.find((g: any) => g.id === genealogyId)
  }
})

const goBack = () => {
  router.push(`/surname/${surname}`)
}
</script>

<style scoped>
.genealogy-page {
  min-height: 100vh;
  background-color: #F9F7F2;
}

.main-content {
  flex: 1;
  padding: 20px 0;
}

.content-width {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.genealogy-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 0;
  border-bottom: 1px solid #E0D6C8;
  margin-bottom: 24px;
}

.genealogy-title h1 {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #2C1810;
  margin: 0 0 8px 0;
}

.genealogy-meta {
  display: flex;
  gap: 16px;
  align-items: center;
}

.location, .generations {
  font-size: 0.875rem;
  color: #8B7355;
  background-color: #F0E6D3;
  padding: 4px 12px;
  border-radius: 4px;
}

.back-btn {
  padding: 8px 20px;
  border: 1px solid #C9A961;
  background-color: transparent;
  color: #8D6E63;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.back-btn:hover {
  background-color: #C9A961;
  color: #FFFFFF;
}

.genealogy-info-section {
  margin-top: 32px;
  padding: 24px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.genealogy-info-section h3 {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 12px 0;
}

.genealogy-info-section p {
  font-size: 0.9375rem;
  color: #5C4033;
  line-height: 1.6;
  margin: 0 0 8px 0;
}

.note {
  font-size: 0.8125rem;
  color: #8B7355;
  font-style: italic;
}

.loading-state {
  padding: 40px;
  text-align: center;
  color: #8B7355;
}

@media (max-width: 768px) {
  .content-width {
    padding: 0 20px;
  }
  
  .genealogy-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .back-btn {
    align-self: flex-start;
  }
}
</style>
