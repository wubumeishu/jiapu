<template>
  <section class="platform-stats">
    <div class="content-width">
      <div class="stats-grid">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="stat-card"
        >
          <div class="stat-icon">
            <svg v-if="index === 0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="index === 1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" stroke-linecap="round"/>
              <path d="M2 12h20" stroke-linecap="round"/>
            </svg>
            <svg v-else-if="index === 2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-number">{{ stat.number }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { number: '128,456+', label: '新修家谱' },
  { number: '6,856+', label: '姓氏数量' },
  { number: '256,789+', label: '家族用户' },
  { number: '1,234,567+', label: '祭祖记录' }
]
</script>

<style scoped>
.platform-stats {
  padding: 32px 0;
  background-color: #FFFFFF;
  border-top: 1px solid #E0D6C8;
  border-bottom: 1px solid #E0D6C8;
}

.content-width {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
}

.stats-grid {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background-color: #F9F7F2;
  border-radius: 8px;
  flex: 1;
  min-width: 0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.stat-icon {
  width: 28px;
  height: 28px;
  color: #C9A961;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 100%;
  height: 100%;
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-label {
  font-size: 0.8125rem;
  color: #8B7355;
  line-height: 1.2;
}

.stat-number {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.375rem;
  font-weight: 700;
  color: #3E2723;
  line-height: 1.2;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .stats-grid {
    gap: 12px;
  }
  
  .stat-card {
    padding: 12px 16px;
  }
  
  .stat-number {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .platform-stats {
    padding: 24px 0;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .stats-grid {
    flex-direction: column;
    gap: 10px;
  }
  
  .stat-card {
    width: 100%;
  }
}
</style>
