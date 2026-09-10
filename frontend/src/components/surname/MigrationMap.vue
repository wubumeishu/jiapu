<template>
  <div class="migration-map">
    <div class="map-header">
      <h3 class="map-title">迁徙分布</h3>
      <div class="map-legend">
        <span class="legend-item">
          <span class="legend-dot male"></span>
          <span>男性</span>
        </span>
        <span class="legend-item">
          <span class="legend-dot female"></span>
          <span>女性</span>
        </span>
      </div>
    </div>
    
    <div class="map-container">
      <svg class="china-map" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#F9F7F2" />
        
        <path d="M 150 200 Q 200 150 300 180 T 500 160 Q 600 140 650 200 T 700 350 Q 720 450 650 500 T 400 550 Q 200 560 100 450 T 80 250 Q 100 220 150 200 Z" 
              fill="#E8DFD0" stroke="#C9B89A" stroke-width="2" />
        
        <circle cx="400" cy="280" r="25" fill="#C9A961" opacity="0.8" />
        <text x="400" y="320" text-anchor="middle" fill="#5C4033" font-size="14" font-family="Noto Serif SC">河南·发源地</text>
        
        <path d="M 400 280 Q 350 250 300 260" stroke="#8D6E63" stroke-width="2" fill="none" stroke-dasharray="5,5" />
        <circle cx="300" cy="260" r="8" fill="#8D6E63" opacity="0.6" />
        
        <path d="M 400 280 Q 450 320 500 350" stroke="#8D6E63" stroke-width="2" fill="none" stroke-dasharray="5,5" />
        <circle cx="500" cy="350" r="8" fill="#8D6E63" opacity="0.6" />
        
        <path d="M 400 280 Q 380 400 350 450" stroke="#8D6E63" stroke-width="2" fill="none" stroke-dasharray="5,5" />
        <circle cx="350" cy="450" r="8" fill="#8D6E63" opacity="0.6" />
        
        <path d="M 350 450 Q 400 480 450 470" stroke="#8D6E63" stroke-width="2" fill="none" stroke-dasharray="5,5" />
        <circle cx="450" cy="470" r="8" fill="#8D6E63" opacity="0.6" />
        
        <circle cx="300" cy="260" r="12" fill="none" stroke="#C9A961" stroke-width="2" />
        <text x="300" y="250" text-anchor="middle" fill="#5C4033" font-size="12" font-family="Noto Serif SC">山东</text>
        
        <circle cx="500" cy="350" r="12" fill="none" stroke="#C9A961" stroke-width="2" />
        <text x="500" y="340" text-anchor="middle" fill="#5C4033" font-size="12" font-family="Noto Serif SC">四川</text>
        
        <circle cx="350" cy="450" r="12" fill="none" stroke="#C9A961" stroke-width="2" />
        <text x="350" y="470" text-anchor="middle" fill="#5C4033" font-size="12" font-family="Noto Serif SC">广东</text>
        
        <circle cx="450" cy="470" r="12" fill="none" stroke="#C9A961" stroke-width="2" />
        <text x="450" y="490" text-anchor="middle" fill="#5C4033" font-size="12" font-family="Noto Serif SC">福建</text>
      </svg>
      
      <div class="timeline">
        <div class="timeline-item active">
          <span class="timeline-era">先秦</span>
          <span class="timeline-desc">陈国建立，族人聚居河南</span>
        </div>
        <div class="timeline-item">
          <span class="timeline-era">汉唐</span>
          <span class="timeline-desc">向江淮、四川迁徙</span>
        </div>
        <div class="timeline-item">
          <span class="timeline-era">宋元</span>
          <span class="timeline-desc">南迁闽粤</span>
        </div>
        <div class="timeline-item">
          <span class="timeline-era">明清</span>
          <span class="timeline-desc">渡海至台湾、东南亚</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.migration-map {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.map-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0;
}

.map-legend {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: #6B5B4F;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-dot.male {
  background-color: #8BC34A;
}

.legend-dot.female {
  background-color: #E91E63;
}

.map-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.china-map {
  width: 100%;
  height: auto;
  max-height: 400px;
}

.timeline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.timeline-item {
  flex: 1;
  padding: 12px;
  background-color: #F9F7F2;
  border-radius: 6px;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

.timeline-item:hover,
.timeline-item.active {
  background-color: #F0E6D3;
}

.timeline-era {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 4px;
}

.timeline-desc {
  font-size: 0.75rem;
  color: #6B5B4F;
}

@media (max-width: 768px) {
  .timeline {
    flex-direction: column;
  }
  
  .map-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
