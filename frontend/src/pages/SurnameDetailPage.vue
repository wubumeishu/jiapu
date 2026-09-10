<template>
  <div class="surname-detail-page">
    <NavBar />
    
    <main class="main-content">
      <div class="content-width">
        <Breadcrumb />
        
        <SurnameOverview />
        
        <SurnameTabs />
        
        <div class="cta-section">
          <button class="cta-btn secondary" @click="viewGenealogy">
            查看相关家谱
          </button>
          <button class="cta-btn primary" @click="createGenealogy">
            我要创建家谱
          </button>
        </div>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import Breadcrumb from '@/components/surname/Breadcrumb.vue'
import SurnameOverview from '@/components/surname/SurnameOverview.vue'
import SurnameTabs from '@/components/surname/SurnameTabs.vue'

const viewGenealogy = () => {
  console.log('查看相关家谱')
}

const createGenealogy = () => {
  console.log('创建家谱')
}
</script>

<style scoped>
.surname-detail-page {
  min-height: 100vh;
  background-color: #F9F7F2;
}

.main-content {
  flex: 1;
  padding: 20px 0;
}

.content-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.cta-section {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 40px 0;
}

.cta-btn {
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 1rem;
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.cta-btn.primary {
  background: linear-gradient(135deg, #C9A961 0%, #B8944F 100%);
  color: #FFFFFF;
}

.cta-btn.primary:hover {
  background: linear-gradient(135deg, #B8944F 0%, #A8843F 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.3);
}

.cta-btn.secondary {
  background-color: #FFFFFF;
  color: #8D6E63;
  border: 1px solid #8D6E63;
}

.cta-btn.secondary:hover {
  background-color: #F9F7F2;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .content-width {
    padding: 0 20px;
  }
  
  .cta-section {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>
