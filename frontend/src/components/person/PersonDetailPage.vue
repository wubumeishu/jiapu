<template>
  <div class="person-detail-page">
    <NavBar />

    <!-- 返回按钮 -->
    <div class="back-bar">
      <div class="content-width">
        <button class="back-btn" @click="goBack">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回{{ surnameData?.name || '家谱' }}
        </button>
      </div>
    </div>

    <!-- Hero 人物身份区域 -->
    <section class="person-hero" v-if="person">
      <div class="content-width hero-inner">
        <div class="hero-avatar">
          <div class="avatar-circle" :class="person.gender">
            {{ person.name.charAt(0) }}
          </div>
        </div>
        <div class="hero-info">
          <h1 class="hero-name">{{ person.name }}</h1>
          <div class="hero-years">
            <span>{{ person.birthYear }} — {{ person.deathYear || '今' }}</span>
            <span class="generation-tag">第{{ person.generation }}代</span>
          </div>
          <div class="hero-tags">
            <span v-for="tag in person.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <p class="hero-brief">{{ person.briefIntro }}</p>
        </div>
      </div>
    </section>

    <!-- 主要内容区 -->
    <div class="content-width main-layout">
      <!-- 左侧目录 -->
      <aside class="sidebar-nav">
        <nav class="nav-list">
          <a 
            v-for="section in sections" 
            :key="section.id"
            :href="`#${section.id}`"
            class="nav-item"
            :class="{ active: activeSection === section.id }"
            @click.prevent="scrollTo(section.id)"
          >
            <span class="nav-num">{{ section.num }}</span>
            <span class="nav-label">{{ section.label }}</span>
          </a>
        </nav>
      </aside>

      <!-- 右侧内容 -->
      <main class="content-area">
        <!-- 01 基础信息 -->
        <section id="basic-info" class="content-section">
          <h2 class="section-title">
            <span class="section-num">01</span>
            基础信息
          </h2>
          <div class="info-card">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">姓名</span>
                <span class="info-value">{{ person?.name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">性别</span>
                <span class="info-value">{{ person?.gender === 'male' ? '男' : '女' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">出生</span>
                <span class="info-value">{{ person?.birthYear }}年</span>
              </div>
              <div class="info-item">
                <span class="info-label">离世</span>
                <span class="info-value">{{ person?.deathYear ? person.deathYear + '年' : '—' }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">家乡</span>
                <span class="info-value">{{ person?.hometown }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">世代</span>
                <span class="info-value">第{{ person?.generation }}代</span>
              </div>
              <div class="info-item full-width">
                <span class="info-label">身份</span>
                <div class="info-tags">
                  <span v-for="tag in person?.occupation" :key="tag" class="occ-tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 02 家族关系 -->
        <section id="family" class="content-section">
          <h2 class="section-title">
            <span class="section-num">02</span>
            家族关系
          </h2>
          <div class="relation-card">
            <!-- 父母 -->
            <div v-if="person?.parents && person.parents.length > 0" class="relation-group">
              <h3 class="relation-group-title">父母</h3>
              <div class="relation-list">
                <div 
                  v-for="parentId in person.parents" 
                  :key="parentId"
                  class="relation-person"
                  :class="{ clickable: hasPersonDetail(parentId) }"
                  @click="hasPersonDetail(parentId) ? goToPerson(parentId) : showDemoNotice()"
                >
                  <div class="relation-avatar" :class="getPersonById(parentId)?.gender">
                    {{ getPersonById(parentId)?.name?.charAt(0) || '?' }}
                  </div>
                  <div class="relation-info">
                    <div class="relation-name">{{ getPersonById(parentId)?.name || '未命名' }}</div>
                    <div class="relation-role">父亲 / 母亲</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 配偶 -->
            <div v-if="person?.spouse" class="relation-group">
              <h3 class="relation-group-title">配偶</h3>
              <div class="relation-list">
                <div class="relation-person">
                  <div class="relation-avatar female">?</div>
                  <div class="relation-info">
                    <div class="relation-name">{{ person.spouse }}</div>
                    <div class="relation-role">配偶</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 子女 -->
            <div v-if="person?.children && person.children.length > 0" class="relation-group">
              <h3 class="relation-group-title">子女</h3>
              <div class="relation-list">
                <div 
                  v-for="childId in person.children" 
                  :key="childId"
                  class="relation-person"
                  :class="{ clickable: hasPersonDetail(childId) }"
                  @click="hasPersonDetail(childId) ? goToPerson(childId) : showDemoNotice()"
                >
                  <div class="relation-avatar" :class="getPersonById(childId)?.gender">
                    {{ getPersonById(childId)?.name?.charAt(0) || '?' }}
                  </div>
                  <div class="relation-info">
                    <div class="relation-name">{{ getPersonById(childId)?.name || '未命名' }}</div>
                    <div class="relation-role">第{{ getPersonById(childId)?.generation || '?' }}代</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!person?.parents && !person?.children" class="empty-relation">
              暂无家族关系数据
            </div>
          </div>
        </section>

        <!-- 03 这一生 / 人生时间轴 -->
        <section id="timeline" class="content-section">
          <h2 class="section-title">
            <span class="section-num">03</span>
            这一生
          </h2>
          <div class="timeline">
            <div 
              v-for="(event, index) in person?.timeline" 
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-year">{{ event.year }}</div>
                <div class="timeline-title">{{ event.title }}</div>
                <div class="timeline-desc">{{ event.description }}</div>
              </div>
            </div>
            <div v-if="!person?.timeline?.length" class="empty-timeline">
              暂无人生记录
            </div>
          </div>
        </section>

        <!-- 04 人物故事 -->
        <section id="story" class="content-section">
          <h2 class="section-title">
            <span class="section-num">04</span>
            人物故事
          </h2>
          <div class="story-content">
            <div class="story-text">
              <p v-for="(para, index) in person?.biography?.split('\n').filter(p => p.trim())" :key="index">
                {{ para.trim() }}
              </p>
            </div>
            <div v-if="person?.tags?.length" class="story-tags">
              <h3>生活中的他</h3>
              <div class="trait-list">
                <span v-for="tag in person.tags" :key="tag" class="trait-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 05 家族记忆 -->
        <section id="memories" class="content-section">
          <h2 class="section-title">
            <span class="section-num">05</span>
            家族记忆
          </h2>
          <div class="memory-grid">
            <div 
              v-for="memory in person?.memories" 
              :key="memory.id"
              class="memory-card"
              @click="openMemoryPreview(memory)"
            >
              <div class="memory-icon" :class="memory.type">
                <span v-if="memory.type === 'photo'">📷</span>
                <span v-else-if="memory.type === 'story'">📖</span>
                <span v-else>🏺</span>
              </div>
              <div class="memory-info">
                <div class="memory-title">{{ memory.title }}</div>
                <div class="memory-desc">{{ memory.description }}</div>
                <div v-if="memory.date" class="memory-date">{{ memory.date }}</div>
              </div>
            </div>
            <div v-if="!person?.memories?.length" class="empty-memories">
              暂无家族记忆
            </div>
          </div>
        </section>

        <!-- 06 家人眼中的他 -->
        <section id="recollections" class="content-section">
          <h2 class="section-title">
            <span class="section-num">06</span>
            家人眼中的他
          </h2>
          <div class="recollection-list">
            <div 
              v-for="rec in person?.recollections" 
              :key="rec.id"
              class="recollection-card"
            >
              <div class="recollection-quote">"</div>
              <div class="recollection-content">
                <p class="recollection-text">{{ rec.content }}</p>
                <div class="recollection-meta">
                  <span class="recollection-person">{{ rec.personName }}</span>
                  <span class="recollection-relation">{{ rec.relation }}</span>
                </div>
              </div>
            </div>
            <div v-if="!person?.recollections?.length" class="empty-recollections">
              暂无家人追忆
            </div>
          </div>
        </section>

        <!-- 07 纪念空间 -->
        <section id="memorial" class="content-section memorial-section">
          <div class="memorial-inner">
            <h2 class="section-title memorial-title">
              <span class="section-num">07</span>
              纪念空间
            </h2>
            <div class="memorial-content">
              <div class="memorial-avatar">
                <div class="avatar-circle large" :class="person?.gender">
                  {{ person?.name?.charAt(0) || '?' }}
                </div>
              </div>
              <h3 class="memorial-name">{{ person?.name }}</h3>
              <p class="memorial-years">{{ person?.birthYear }} — {{ person?.deathYear || '今' }}</p>
              <p class="memorial-text">
                愿我们记得他的名字，<br>
                也记得他认真生活过的一生。
              </p>
              <div class="memorial-actions">
                <button class="memorial-btn primary" disabled>
                  进入纪念空间
                </button>
                <button class="memorial-btn secondary" disabled>
                  献花
                </button>
                <button class="memorial-btn secondary" disabled>
                  留言
                </button>
              </div>
              <p class="memorial-notice">纪念空间将在后续版本开放</p>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- 页脚 -->
    <Footer />

    <!-- 图片预览 -->
    <div v-if="previewMemory" class="memory-preview" @click="closePreview">
      <div class="preview-content">
        <div class="preview-icon" :class="previewMemory?.type">
          <span v-if="previewMemory?.type === 'photo'">📷</span>
          <span v-else-if="previewMemory?.type === 'story'">📖</span>
          <span v-else>🏺</span>
        </div>
        <h3>{{ previewMemory?.title }}</h3>
        <p>{{ previewMemory?.description }}</p>
        <p v-if="previewMemory?.date" class="preview-date">{{ previewMemory?.date }}</p>
      </div>
    </div>

    <!-- Demo 提示 -->
    <div v-if="demoNotice" class="demo-notice" @click="demoNotice = null">
      <div class="notice-content">
        <p>{{ demoNotice }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { getPersonData, hasPersonDetail, getPersonById } from '@/data/persons'
import { getSurnameData } from '@/data/surnames'

const route = useRoute()
const router = useRouter()

const personId = route.params.personId as string
const slug = route.params.slug as string
const genealogyId = route.params.genealogyId as string

const person = ref(getPersonData(personId))
const surnameData = getSurnameData(slug)
const activeSection = ref('basic-info')
const previewMemory = ref<any>(null)
const demoNotice = ref<string | null>(null)

const sections = [
  { id: 'basic-info', num: '01', label: '基础信息' },
  { id: 'family', num: '02', label: '家族关系' },
  { id: 'timeline', num: '03', label: '这一生' },
  { id: 'story', num: '04', label: '人物故事' },
  { id: 'memories', num: '05', label: '家族记忆' },
  { id: 'recollections', num: '06', label: '家人眼中的他' },
  { id: 'memorial', num: '07', label: '纪念空间' }
]

const goBack = () => {
  router.push(`/surname/${slug}/genealogy/${genealogyId}`)
}

const goToPerson = (targetPersonId: string) => {
  router.push(`/surname/${slug}/genealogy/${genealogyId}/member/${targetPersonId}`)
}

const showDemoNotice = () => {
  demoNotice.value = '人物详情页将在后续版本建立\n（当前为 Demo 数据）'
}

const scrollTo = (sectionId: string) => {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const openMemoryPreview = (memory: any) => {
  previewMemory.value = memory
}

const closePreview = () => {
  previewMemory.value = null
}

// 滚动监听，更新当前激活的章节
const handleScroll = () => {
  const scrollY = window.scrollY + 100
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id)
    if (el && el.offsetTop <= scrollY) {
      activeSection.value = sections[i].id
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 基础样式 */
.person-detail-page {
  min-height: 100vh;
  background-color: #F9F7F2;
}

.content-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(24px, 4vw, 72px);
}

/* 返回按钮 */
.back-bar {
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0D6C8;
  padding: 12px 0;
  position: sticky;
  top: 64px;
  z-index: 90;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #E0D6C8;
  border-radius: 4px;
  color: #6B5B4F;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn:hover {
  background-color: #F9F7F2;
  border-color: #8D6E63;
  color: #8D6E63;
}

/* Hero 区域 */
.person-hero {
  background: linear-gradient(180deg, #F9F7F2 0%, #FFFFFF 100%);
  padding: 48px 0 32px;
}

.hero-inner {
  display: flex;
  align-items: flex-start;
  gap: 32px;
}

.hero-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #FFFFFF;
  background-color: #8D6E63;
  border: 3px solid #E0D6C8;
}

.avatar-circle.male {
  background-color: #8D6E63;
}

.avatar-circle.female {
  background-color: #B88A9A;
}

.avatar-circle.large {
  width: 120px;
  height: 120px;
  font-size: 3rem;
}

.hero-info {
  flex: 1;
}

.hero-name {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #2C1810;
  margin: 0 0 8px;
}

.hero-years {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.hero-years span {
  font-size: 1rem;
  color: #6B5B4F;
}

.generation-tag {
  background-color: #F0E6D3;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #8B7355;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 12px;
  background-color: #F5F0E8;
  border: 1px solid #E0D6C8;
  border-radius: 4px;
  font-size: 0.8125rem;
  color: #6B5B4F;
}

.hero-brief {
  font-size: 1rem;
  line-height: 1.7;
  color: #5C4033;
  margin: 0;
}

/* 主布局 */
.main-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  padding-top: 40px;
  padding-bottom: 60px;
}

/* 左侧目录 */
.sidebar-nav {
  position: sticky;
  top: 120px;
  height: fit-content;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  text-decoration: none;
  color: #8B7355;
  font-size: 0.875rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #F5F0E8;
  color: #6B5B4F;
}

.nav-item.active {
  background-color: #F0E6D3;
  color: #8D6E63;
  font-weight: 600;
}

.nav-num {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* 右侧内容 */
.content-area {
  min-width: 0;
}

.content-section {
  margin-bottom: 48px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #E0D6C8;
}

.section-num {
  font-size: 0.875rem;
  color: #8D6E63;
  font-weight: 400;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 信息卡片 */
.info-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
}

.occ-tag {
  display: inline-block;
  padding: 4px 12px;
  background-color: #F5F0E8;
  border: 1px solid #E0D6C8;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #6B5B4F;
  margin-right: 8px;
}

/* 关系卡片 */
.relation-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.relation-group {
  margin-bottom: 24px;
}

.relation-group:last-child {
  margin-bottom: 0;
}

.relation-group-title {
  font-size: 1rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E0D6C8;
}

.relation-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.relation-person {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #F9F7F2;
  border-radius: 8px;
  transition: all 0.2s;
}

.relation-person.clickable {
  cursor: pointer;
}

.relation-person.clickable:hover {
  background-color: #F0E6D3;
  transform: translateY(-2px);
}

.relation-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  color: #FFFFFF;
  background-color: #8D6E63;
  flex-shrink: 0;
}

.relation-avatar.female {
  background-color: #B88A9A;
}

.relation-info {
  display: flex;
  flex-direction: column;
}

.relation-name {
  font-weight: 600;
  color: #3E2723;
  font-size: 0.9375rem;
}

.relation-role {
  font-size: 0.8125rem;
  color: #8B7355;
}

.empty-relation {
  color: #8B7355;
  font-style: italic;
  padding: 16px;
  text-align: center;
}

/* 时间轴 */
.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #E0D6C8;
}

.timeline-item {
  position: relative;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -28px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #8D6E63;
  border: 2px solid #F9F7F2;
}

.timeline-content {
  display: flex;
  gap: 16px;
}

.timeline-year {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #8D6E63;
  min-width: 60px;
  padding-top: 2px;
}

.timeline-title {
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 4px;
}

.timeline-desc {
  font-size: 0.9375rem;
  color: #5C4033;
  line-height: 1.6;
}

.empty-timeline {
  color: #8B7355;
  font-style: italic;
  padding: 16px;
  text-align: center;
}

/* 人物故事 */
.story-content {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
}

.story-text {
  margin-bottom: 24px;
}

.story-text p {
  font-size: 1rem;
  line-height: 1.8;
  color: #5C4033;
  margin: 0 0 16px;
  text-indent: 2em;
}

.story-text p:last-child {
  margin-bottom: 0;
}

.story-tags h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 12px;
}

.trait-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.trait-tag {
  padding: 6px 16px;
  background-color: #F5F0E8;
  border: 1px solid #E0D6C8;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #6B5B4F;
}

/* 家族记忆 */
.memory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.memory-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.memory-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(61, 43, 31, 0.1);
}

.memory-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.memory-icon.photo {
  background-color: #E8F5E9;
}

.memory-icon.story {
  background-color: #FFF8E7;
}

.memory-icon.object {
  background-color: #F0E6D3;
}

.memory-info {
  flex: 1;
  min-width: 0;
}

.memory-title {
  font-weight: 600;
  color: #3E2723;
  font-size: 0.9375rem;
  margin-bottom: 4px;
}

.memory-desc {
  font-size: 0.875rem;
  color: #6B5B4F;
  line-height: 1.5;
  margin-bottom: 8px;
}

.memory-date {
  font-size: 0.8125rem;
  color: #8B7355;
}

.empty-memories {
  grid-column: 1 / -1;
  color: #8B7355;
  font-style: italic;
  padding: 16px;
  text-align: center;
}

/* 家人追忆 */
.recollection-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recollection-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.05);
  display: flex;
  gap: 16px;
}

.recollection-quote {
  font-size: 3rem;
  line-height: 1;
  color: #C9A961;
  font-family: Georgia, serif;
  flex-shrink: 0;
}

.recollection-content {
  flex: 1;
}

.recollection-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #5C4033;
  margin: 0 0 12px;
  font-style: italic;
}

.recollection-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.recollection-person {
  font-weight: 600;
  color: #3E2723;
}

.recollection-relation {
  font-size: 0.875rem;
  color: #8B7355;
  padding: 2px 8px;
  background-color: #F5F0E8;
  border-radius: 4px;
}

.empty-recollections {
  color: #8B7355;
  font-style: italic;
  padding: 16px;
  text-align: center;
}

/* 纪念空间 */
.memorial-section {
  margin-top: 60px;
}

.memorial-inner {
  background: linear-gradient(135deg, #F9F7F2 0%, #F5F0E8 100%);
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  border: 1px solid #E0D6C8;
}

.memorial-title {
  justify-content: center;
  border-bottom: none;
  margin-bottom: 32px;
}

.memorial-content {
  max-width: 480px;
  margin: 0 auto;
}

.memorial-name {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2C1810;
  margin: 16px 0 8px;
}

.memorial-years {
  font-size: 1rem;
  color: #8B7355;
  margin-bottom: 16px;
}

.memorial-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #5C4033;
  margin-bottom: 32px;
}

.memorial-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.memorial-btn {
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.memorial-btn.primary {
  background-color: #8D6E63;
  color: #FFFFFF;
}

.memorial-btn.primary:disabled {
  background-color: #C9A961;
  cursor: not-allowed;
}

.memorial-btn.secondary {
  background-color: #FFFFFF;
  color: #8D6E63;
  border: 1px solid #8D6E63;
}

.memorial-btn.secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.memorial-notice {
  font-size: 0.875rem;
  color: #8B7355;
  font-style: italic;
}

/* 图片预览 */
.memory-preview {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  cursor: pointer;
}

.preview-content {
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 32px;
  max-width: 400px;
  text-align: center;
}

.preview-icon {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 16px;
}

.preview-icon.photo {
  background-color: #E8F5E9;
}

.preview-icon.story {
  background-color: #FFF8E7;
}

.preview-icon.object {
  background-color: #F0E6D3;
}

.preview-content h3 {
  font-size: 1.25rem;
  color: #3E2723;
  margin: 0 0 8px;
}

.preview-content p {
  font-size: 0.9375rem;
  color: #6B5B4F;
  line-height: 1.6;
  margin: 0 0 12px;
}

.preview-date {
  font-size: 0.875rem;
  color: #8B7355;
}

/* Demo 提示 */
.demo-notice {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #3E2723;
  color: #FFFFFF;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 0.9375rem;
  line-height: 1.6;
  z-index: 200;
  cursor: pointer;
  max-width: 320px;
  text-align: center;
}

/* 响应式 */
@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 160px 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-tags {
    justify-content: center;
  }

  .main-layout {
    grid-template-columns: 1fr;
  }

  .sidebar-nav {
    position: static;
    order: -1;
  }

  .nav-list {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
    gap: 8px;
  }

  .nav-item {
    white-space: nowrap;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .memory-grid {
    grid-template-columns: 1fr;
  }

  .memorial-inner {
    padding: 32px 20px;
  }

  .memorial-actions {
    flex-direction: column;
  }

  .memorial-btn {
    width: 100%;
  }
}
</style>
