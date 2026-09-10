<template>
  <section class="hot-surnames">
    <div class="content-width">
      <div class="section-header">
        <h2 class="section-title">热门姓氏</h2>
        <a href="#" class="section-more">更多 ></a>
      </div>
      
      <div class="surname-grid">
        <div 
          v-for="item in surnames" 
          :key="item.slug"
          class="surname-card"
          @click="goToSurname(item.slug)"
        >
          <span class="surname-char">{{ item.char }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const surnames = [
  { char: '李', slug: 'li' },
  { char: '王', slug: 'wang' },
  { char: '张', slug: 'zhang' },
  { char: '刘', slug: 'liu' },
  { char: '陈', slug: 'chen' },
  { char: '杨', slug: 'yang' },
  { char: '赵', slug: 'zhao' },
  { char: '黄', slug: 'huang' },
  { char: '周', slug: 'zhou' },
  { char: '吴', slug: 'wu' },
  { char: '徐', slug: 'xu' },
  { char: '孙', slug: 'sun' },
  { char: '朱', slug: 'zhu' },
  { char: '胡', slug: 'hu' },
  { char: '郭', slug: 'guo' },
  { char: '何', slug: 'he' },
  { char: '高', slug: 'gao' },
  { char: '林', slug: 'lin' },
  { char: '罗', slug: 'luo' },
  { char: '梁', slug: 'liang' },
  { char: '宋', slug: 'song' },
  { char: '郑', slug: 'zheng' },
  { char: '谢', slug: 'xie' },
  { char: '韩', slug: 'han' },
  { char: '唐', slug: 'tang' },
  { char: '冯', slug: 'feng' },
  { char: '邓', slug: 'deng' },
  { char: '曹', slug: 'cao' },
  { char: '彭', slug: 'peng' },
  { char: '曾', slug: 'zeng' },
  { char: '肖', slug: 'xiao' },
  { char: '田', slug: 'tian' },
  { char: '董', slug: 'dong' }
]

const goToSurname = (slug: string) => {
  router.push(`/surname/${slug}`)
}
</script>

<style scoped>
.hot-surnames {
  padding: 40px 0;
  background-color: #F9F7F2;
}

.content-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0;
}

.section-more {
  font-size: 0.8125rem;
  color: #8B7355;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
}

.section-more:hover {
  color: #8D6E63;
}

.surname-grid {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 10px;
  max-width: 1100px;
  margin: 0 auto;
}

.surname-card {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  border: 1px solid #E0D5C5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.surname-card:hover {
  background-color: #8D6E63;
  color: #FFFFFF;
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(141,110,99,0.15);
  border-color: #8D6E63;
}

.surname-char {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.375rem;
  font-weight: 600;
  color: #3E2723;
}

.surname-card:hover .surname-char {
  color: #FFFFFF;
}

@media (max-width: 1200px) {
  .surname-grid {
    grid-template-columns: repeat(9, 1fr);
  }
}

@media (max-width: 768px) {
  .hot-surnames {
    padding: 30px 0;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .surname-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
  }
  
  .surname-char {
    font-size: 1.125rem;
  }
}
</style>
