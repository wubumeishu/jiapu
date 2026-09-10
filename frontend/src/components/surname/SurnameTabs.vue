<template>
  <div class="surname-tabs">
    <div class="tabs-nav">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-btn"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    
    <div class="tabs-content">
      <!-- 姓氏起源 -->
      <div v-if="activeTab === 0" class="tab-panel">
        <h3 class="panel-title">姓氏起源</h3>
        <p class="panel-content">{{ surnameData?.origin || '资料待完善' }}</p>
      </div>
      
      <!-- 迁徙分布 -->
      <div v-if="activeTab === 1" class="tab-panel">
        <MigrationMap />
      </div>
      
      <!-- 郡望堂号 -->
      <div v-if="activeTab === 2" class="tab-panel">
        <h3 class="panel-title">郡望</h3>
        <div class="tag-list">
          <span v-for="item in surnameData?.commanderies" :key="item" class="tag">{{ item }}</span>
        </div>
        <h3 class="panel-title">堂号</h3>
        <div class="tag-list">
          <span v-for="item in surnameData?.halls" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
      
      <!-- 历史名人 -->
      <div v-if="activeTab === 3" class="tab-panel">
        <h3 class="panel-title">历史名人</h3>
        <div class="celebrity-list">
          <div v-for="(celeb, index) in surnameData?.celebrities" :key="index" class="celebrity-item">
            <div class="celebrity-name">{{ celeb.name }}</div>
            <div class="celebrity-era">{{ celeb.era }}</div>
            <div class="celebrity-achievement">{{ celeb.achievement }}</div>
            <div class="celebrity-desc">{{ celeb.description }}</div>
          </div>
        </div>
      </div>
      
      <!-- 家谱概览 -->
      <div v-if="activeTab === 4" class="tab-panel">
        <GenealogyList />
      </div>
      
      <!-- 宗亲会 -->
      <div v-if="activeTab === 5" class="tab-panel">
        <h3 class="panel-title">宗亲会</h3>
        <p class="panel-empty">暂无资料，即将上线</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MigrationMap from './MigrationMap.vue'
import GenealogyList from './GenealogyList.vue'
import { getSurnameData } from '@/data/surnames'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string
const surnameData = getSurnameData(slug)

const activeTab = ref(0)

const tabs = surnameData?.tabs ? [
  surnameData.tabs.origin,
  surnameData.tabs.migration,
  surnameData.tabs.commandery,
  surnameData.tabs.celebrities,
  surnameData.tabs.genealogy,
  surnameData.tabs.community
] : ['姓氏起源', '迁徙分布', '郡望堂号', '历史名人', '家谱概览', '宗亲会']
</script>

<style scoped>
.surname-tabs {
  background-color: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.tabs-nav {
  display: flex;
  border-bottom: 1px solid #E0D6C8;
  background-color: #F9F7F2;
  overflow-x: auto;
}

.tab-btn {
  flex: 1;
  min-width: 100px;
  padding: 16px 20px;
  background: none;
  border: none;
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 0.9375rem;
  color: #6B5B4F;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  position: relative;
}

.tab-btn:hover {
  color: #8D6E63;
  background-color: rgba(201, 169, 97, 0.1);
}

.tab-btn.active {
  color: #3E2723;
  font-weight: 600;
  background-color: #FFFFFF;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #8D6E63;
}

.tabs-content {
  padding: 24px;
}

.panel-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 16px 0;
}

.panel-content {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #5C4033;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.tag {
  padding: 6px 16px;
  background-color: #F9F7F2;
  border: 1px solid #E0D6C8;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #5C4033;
}

.celebrity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.celebrity-item {
  padding: 16px;
  background-color: #F9F7F2;
  border-radius: 6px;
}

.celebrity-name {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 4px;
}

.celebrity-era {
  font-size: 0.8125rem;
  color: #8B7355;
  margin-bottom: 4px;
}

.celebrity-achievement {
  font-size: 0.875rem;
  color: #8D6E63;
  font-weight: 500;
  margin-bottom: 6px;
}

.celebrity-desc {
  font-size: 0.875rem;
  color: #6B5B4F;
  line-height: 1.6;
}

.panel-empty {
  color: #A09080;
  font-size: 0.9375rem;
  text-align: center;
  padding: 40px 0;
}

@media (max-width: 768px) {
  .tabs-nav {
    flex-wrap: nowrap;
  }
  
  .tab-btn {
    padding: 12px 16px;
    font-size: 0.875rem;
  }
  
  .tabs-content {
    padding: 16px;
  }
}
</style>
