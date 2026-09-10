<template>
  <div class="person-archive">
    <NavBar />

    <!-- 顶部返回 -->
    <div class="top-bar">
      <div class="content-width">
        <button class="back-link" @click="goBack">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          返回{{ surnameData?.name || '家谱' }}
        </button>
      </div>
    </div>

    <!-- 第一幕：认识他 -->
    <!-- Hero 档案封面 -->
    <section class="archive-hero" v-if="person">
      <div class="content-width hero-inner">
        <div class="hero-photo">
          <div class="photo-frame">
            <div class="photo-placeholder">
              <span class="photo-label">{{ person.name }}</span>
              <span class="photo-year">{{ person.birthYear }}—{{ person.deathYear || '今' }}</span>
            </div>
          </div>
        </div>
        <div class="hero-text">
          <h1 class="hero-name">{{ person.name }}</h1>
          <div class="hero-line"></div>
          <div class="hero-meta">
            <span class="meta-item">{{ person.birthYear }} — {{ person.deathYear || '今' }}</span>
            <span class="meta-sep">·</span>
            <span class="meta-item">第{{ person.generation }}代</span>
            <span class="meta-sep">·</span>
            <span class="meta-item">{{ person.hometown }}</span>
          </div>
          <div class="hero-roles">
            <span v-for="tag in person.tags" :key="tag" class="role-tag">{{ tag }}</span>
          </div>
          <p class="hero-quote">{{ person.briefIntro }}</p>
        </div>
      </div>
    </section>

    <!-- 主体内容 -->
    <div class="content-width archive-body">
      <!-- 左侧目录 -->
      <aside class="archive-nav">
        <nav class="nav-links">
          <a 
            v-for="section in sections" 
            :key="section.id"
            :href="`#${section.id}`"
            class="nav-link"
            :class="{ active: activeSection === section.id }"
            @click.prevent="scrollTo(section.id)"
          >
            {{ section.label }}
          </a>
        </nav>
      </aside>

      <!-- 右侧内容 -->
      <main class="archive-content">
        
        <!-- 01 家档案 -->
        <section id="basic-info" class="archive-section">
          <h2 class="section-heading">家 档</h2>
          <div class="archive-table">
            <div class="table-row">
              <span class="table-label">姓 名</span>
              <span class="table-value">{{ person?.name }}</span>
            </div>
            <div class="table-row">
              <span class="table-label">生 卒</span>
              <span class="table-value">{{ person?.birthYear }}年 — {{ person?.deathYear ? person.deathYear + '年' : '今' }}</span>
            </div>
            <div class="table-row">
              <span class="table-label">籍 贯</span>
              <span class="table-value">{{ person?.hometown }}</span>
            </div>
            <div class="table-row">
              <span class="table-label">世 代</span>
              <span class="table-value">第{{ person?.generation }}代</span>
            </div>
            <div class="table-row full">
              <span class="table-label">身 份</span>
              <span class="table-value table-tags">
                <span v-for="tag in person?.occupation" :key="tag" class="tag-pill">{{ tag }}</span>
              </span>
            </div>
          </div>
        </section>

        <!-- 02 血脉 -->
        <section id="family" class="archive-section">
          <h2 class="section-heading">血 脉</h2>
          <div class="family-tree">
            <!-- 父母 -->
            <div v-if="person?.parents && person.parents.length > 0" class="tree-branch">
              <div class="branch-label">父 母</div>
              <div class="branch-list">
                <div 
                  v-for="parentId in person.parents" 
                  :key="parentId"
                  class="branch-node"
                  :class="{ clickable: hasPersonDetail(parentId) }"
                  @click="hasPersonDetail(parentId) ? goToPerson(parentId) : showDemoNotice()"
                >
                  <div class="node-avatar" :class="getPersonById(parentId)?.gender">
                    {{ getPersonById(parentId)?.name?.charAt(0) || '?' }}
                  </div>
                  <div class="node-name">{{ getPersonById(parentId)?.name || '未命名' }}</div>
                </div>
              </div>
            </div>

            <!-- 配偶 -->
            <div v-if="person?.spouse" class="tree-branch">
              <div class="branch-label">配 偶</div>
              <div class="branch-list">
                <div class="branch-node">
                  <div class="node-avatar female">?</div>
                  <div class="node-name">{{ person.spouse }}</div>
                </div>
              </div>
            </div>

            <!-- 子女 -->
            <div v-if="person?.children && person.children.length > 0" class="tree-branch">
              <div class="branch-label">子 女</div>
              <div class="branch-list">
                <div 
                  v-for="childId in person.children" 
                  :key="childId"
                  class="branch-node clickable"
                  @click="hasPersonDetail(childId) ? goToPerson(childId) : showDemoNotice()"
                >
                  <div class="node-avatar" :class="getPersonById(childId)?.gender">
                    {{ getPersonById(childId)?.name?.charAt(0) || '?' }}
                  </div>
                  <div class="node-name">{{ getPersonById(childId)?.name || '未命名' }}</div>
                  <div class="node-gen">第{{ getPersonById(childId)?.generation }}代</div>
                </div>
              </div>
            </div>

            <div v-if="!person?.parents && !person?.children" class="empty-state">
              暂无家族关系记录
            </div>
          </div>
        </section>

        <!-- 03 这一生（视觉核心） -->
        <section id="timeline" class="archive-section timeline-section">
          <h2 class="section-heading timeline-heading">这 一 生</h2>
          <div class="timeline-axis">
            <div 
              v-for="(event, index) in person?.timeline" 
              :key="index"
              class="timeline-event"
            >
              <div class="event-year">{{ event.year }}</div>
              <div class="event-line"></div>
              <div class="event-content">
                <div class="event-title">{{ event.title }}</div>
                <div class="event-desc">{{ event.description }}</div>
              </div>
            </div>
            <div v-if="!person?.timeline?.length" class="empty-timeline">
              暂无人生记录
            </div>
          </div>
        </section>

        <!-- 04 故事 -->
        <section id="story" class="archive-section">
          <h2 class="section-heading">故 事</h2>
          <div class="story-block">
            <div 
              v-for="(para, index) in person?.biography?.split('\n').filter(p => p.trim())" 
              :key="index"
              class="story-paragraph"
            >
              {{ para.trim() }}
            </div>
          </div>
          <div v-if="person?.tags?.length" class="story-essence">
            <span class="essence-label">他的样子</span>
            <div class="essence-tags">
              <span v-for="tag in person.tags" :key="tag" class="essence-tag">{{ tag }}</span>
            </div>
          </div>
        </section>

        <!-- 05 记忆 -->
        <section id="memories" class="archive-section">
          <h2 class="section-heading">记 忆</h2>
          <div class="memory-wall">
            <div 
              v-for="memory in person?.memories" 
              :key="memory.id"
              class="memory-piece"
              @click="openMemoryPreview(memory)"
            >
              <div class="memory-frame" :class="memory.type">
                <span v-if="memory.type === 'photo'" class="memory-emoji">📷</span>
                <span v-else-if="memory.type === 'story'" class="memory-emoji">📖</span>
                <span v-else class="memory-emoji">🏺</span>
              </div>
              <div class="memory-caption">
                <div class="caption-title">{{ memory.title }}</div>
                <div class="caption-desc">{{ memory.description }}</div>
                <div v-if="memory.date" class="caption-date">{{ memory.date }}</div>
              </div>
            </div>
            <div v-if="!person?.memories?.length" class="empty-memories">
              暂无家族记忆留存
            </div>
          </div>
        </section>

        <!-- 06 家人追忆 -->
        <section id="recollections" class="archive-section">
          <h2 class="section-heading">他 在 家 人 眼 中</h2>
          <div class="recollection-gallery">
            <div 
              v-for="rec in person?.recollections" 
              :key="rec.id"
              class="recollection-card"
            >
              <div class="recollection-content">
                <p class="recollection-text">{{ rec.content }}</p>
                <div class="recollection-attribution">
                  <span class="attribution-person">{{ rec.personName }}</span>
                  <span class="attribution-relation">{{ rec.relation }}</span>
                </div>
              </div>
            </div>
            <div v-if="!person?.recollections?.length" class="empty-recollections">
              暂无家人追忆
            </div>
          </div>
        </section>

        <!-- 07 纪念 -->
        <section id="memorial" class="archive-section memorial-section">
          <div class="memorial-inner">
            <div class="memorial-name">{{ person?.name }}</div>
            <div class="memorial-years">{{ person?.birthYear }} — {{ person?.deathYear || '今' }}</div>
            <div class="memorial-divider"></div>
            <p class="memorial-poem">
              愿我们记得他的名字，<br>
              也记得他认真生活过的一生。
            </p>
            <div class="memorial-actions">
              <button class="memorial-btn" disabled>进入纪念空间</button>
              <button class="memorial-btn ghost" disabled>献花</button>
              <button class="memorial-btn ghost" disabled>留言</button>
            </div>
            <p class="memorial-notice">纪念空间将在后续版本开放</p>
          </div>
        </section>

      </main>
    </div>

    <Footer />

    <!-- 记忆预览 -->
    <div v-if="previewMemory" class="memory-overlay" @click="closePreview">
      <div class="overlay-card" @click.stop>
        <div class="overlay-icon" :class="previewMemory?.type">
          <span v-if="previewMemory?.type === 'photo'">📷</span>
          <span v-else-if="previewMemory?.type === 'story'">📖</span>
          <span v-else>🏺</span>
        </div>
        <h3>{{ previewMemory?.title }}</h3>
        <p>{{ previewMemory?.description }}</p>
        <p v-if="previewMemory?.date" class="overlay-date">{{ previewMemory?.date }}</p>
        <button class="overlay-close" @click="closePreview">×</button>
      </div>
    </div>

    <!-- Demo 提示 -->
    <div v-if="demoNotice" class="demo-toast" @click="demoNotice = null">
      <p>{{ demoNotice }}</p>
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
  { id: 'basic-info', label: '家档' },
  { id: 'family', label: '血脉' },
  { id: 'timeline', label: '这一生' },
  { id: 'story', label: '故事' },
  { id: 'memories', label: '记忆' },
  { id: 'recollections', label: '追忆' },
  { id: 'memorial', label: '纪念' }
]

const goBack = () => {
  router.push(`/surname/${slug}/genealogy/${genealogyId}`)
}

const goToPerson = (targetPersonId: string) => {
  router.push(`/surname/${slug}/genealogy/${genealogyId}/member/${targetPersonId}`)
}

const showDemoNotice = () => {
  demoNotice.value = '人物详情页将在后续版本建立（当前为 Demo 数据）'
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

const handleScroll = () => {
  const scrollY = window.scrollY + 120
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
/* ========== 基础 ========== */
.person-archive {
  min-height: 100vh;
  background-color: #F9F7F2;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
}

.content-width {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 56px);
}

/* ========== 顶部返回 ========== */
.top-bar {
  background: rgba(255,255,255,0.9);
  border-bottom: 1px solid #E8E0D4;
  padding: 10px 0;
  position: sticky;
  top: 64px;
  z-index: 90;
  backdrop-filter: blur(8px);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  background: none;
  border: none;
  border-bottom: 1px solid transparent;
  color: #8B7355;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.back-link:hover {
  color: #8D6E63;
  border-bottom-color: #8D6E63;
}

/* ========== Hero 档案封面 ========== */
.archive-hero {
  background: linear-gradient(180deg, #F2EDE4 0%, #F9F7F2 100%);
  padding: 56px 0 48px;
  border-bottom: 1px solid #E8E0D4;
}

.hero-inner {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}

/* 照片框 */
.hero-photo {
  flex-shrink: 0;
}

.photo-frame {
  width: 140px;
  height: 170px;
  background-color: #FFFFFF;
  border: 1px solid #D4C8B8;
  padding: 8px;
  box-shadow: 0 2px 12px rgba(61, 43, 31, 0.08);
  transform: rotate(-1deg);
  transition: transform 0.3s ease;
}

.photo-frame:hover {
  transform: rotate(0deg) scale(1.02);
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  background-color: #F5F0E8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px dashed #C9B99A;
}

.photo-label {
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  color: #8B7355;
  letter-spacing: 2px;
}

.photo-year {
  font-size: 0.75rem;
  color: #B8A898;
}

/* 文字区 */
.hero-text {
  flex: 1;
  padding-top: 12px;
}

.hero-name {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 3rem;
  font-weight: 700;
  color: #2C1810;
  margin: 0 0 12px;
  letter-spacing: 4px;
}

.hero-line {
  width: 60px;
  height: 2px;
  background-color: #C9A961;
  margin-bottom: 16px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 1rem;
  color: #6B5B4F;
}

.meta-sep {
  color: #C9A961;
}

.hero-roles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.role-tag {
  padding: 4px 14px;
  background-color: rgba(201, 169, 97, 0.12);
  border: 1px solid rgba(201, 169, 97, 0.3);
  border-radius: 2px;
  font-size: 0.8125rem;
  color: #8B7355;
  letter-spacing: 1px;
}

.hero-quote {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #5C4033;
  margin: 0;
  padding-left: 16px;
  border-left: 2px solid #C9A961;
  font-style: italic;
}

/* ========== 主体布局 ========== */
.archive-body {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 32px;
  padding-top: 40px;
  padding-bottom: 80px;
}

/* ========== 左侧目录 ========== */
.archive-nav {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #B8A898;
  font-size: 0.8125rem;
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 1px;
  border-left: 2px solid transparent;
}

.nav-link:hover {
  color: #8D6E63;
  background-color: rgba(201, 169, 97, 0.08);
}

.nav-link.active {
  color: #8D6E63;
  background-color: rgba(201, 169, 97, 0.12);
  border-left-color: #C9A961;
  font-weight: 600;
}

/* ========== 章节通用 ========== */
.archive-section {
  margin-bottom: 56px;
}

.section-heading {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E0D6C8;
  letter-spacing: 6px;
}

.timeline-heading {
  font-size: 1.5rem;
  letter-spacing: 10px;
}

/* ========== 家档（基础信息） ========== */
.archive-table {
  background-color: #FFFFFF;
  border: 1px solid #E8E0D4;
  border-radius: 4px;
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  border-bottom: 1px solid #F0E8D8;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row.full {
  grid-template-columns: 100px 1fr;
}

.table-label {
  padding: 14px 20px;
  font-size: 0.875rem;
  color: #8B7355;
  background-color: #FAFAF5;
  border-right: 1px solid #F0E8D8;
  text-align: center;
  letter-spacing: 4px;
  font-weight: 500;
}

.table-value {
  padding: 14px 20px;
  font-size: 1rem;
  color: #3E2723;
  line-height: 1.6;
}

.table-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-pill {
  padding: 3px 12px;
  background-color: #F5F0E8;
  border: 1px solid #E0D6C8;
  border-radius: 2px;
  font-size: 0.8125rem;
  color: #6B5B4F;
}

/* ========== 血脉（家族关系） ========== */
.family-tree {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tree-branch {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.branch-label {
  font-size: 0.8125rem;
  color: #8B7355;
  letter-spacing: 2px;
  padding-bottom: 6px;
  border-bottom: 1px dashed #E0D6C8;
}

.branch-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.branch-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background-color: #FFFFFF;
  border: 1px solid #E8E0D4;
  border-radius: 4px;
  cursor: default;
  transition: all 0.2s;
  min-width: 80px;
}

.branch-node.clickable {
  cursor: pointer;
}

.branch-node.clickable:hover {
  border-color: #C9A961;
  background-color: #FFFCF5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.15);
}

.node-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Serif SC', serif;
  font-size: 1.25rem;
  color: #FFFFFF;
  background-color: #8D6E63;
}

.node-avatar.female {
  background-color: #B88A9A;
}

.node-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #3E2723;
  text-align: center;
}

.node-gen {
  font-size: 0.75rem;
  color: #8B7355;
}

.empty-state {
  color: #B8A898;
  font-style: italic;
  padding: 20px;
  text-align: center;
}

/* ========== 这一生（时间轴 - 视觉核心） ========== */
.timeline-axis {
  position: relative;
  padding-left: 48px;
}

.timeline-axis::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #C9A961 0%, #E0D6C8 100%);
}

.timeline-event {
  position: relative;
  padding-bottom: 32px;
}

.timeline-event:last-child {
  padding-bottom: 0;
}

.event-year {
  position: absolute;
  left: -48px;
  width: 36px;
  text-align: right;
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  font-weight: 600;
  color: #C9A961;
  padding-top: 4px;
}

.event-line {
  position: absolute;
  left: -36px;
  top: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #C9A961;
  border: 2px solid #F9F7F2;
  box-shadow: 0 0 0 2px #C9A961;
}

.event-content {
  padding-left: 16px;
}

.event-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 6px;
}

.event-desc {
  font-size: 0.9375rem;
  color: #6B5B4F;
  line-height: 1.7;
}

.empty-timeline {
  color: #B8A898;
  font-style: italic;
  padding: 20px;
  text-align: center;
}

/* ========== 故事 ========== */
.story-block {
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 28px 32px;
  border: 1px solid #E8E0D4;
}

.story-paragraph {
  font-size: 1rem;
  line-height: 2;
  color: #4A3B32;
  margin: 0 0 16px;
  text-indent: 2em;
}

.story-paragraph:last-child {
  margin-bottom: 0;
}

.story-essence {
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.essence-label {
  font-size: 0.875rem;
  color: #8B7355;
  letter-spacing: 2px;
}

.essence-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.essence-tag {
  padding: 4px 16px;
  background-color: #F5F0E8;
  border: 1px solid #E0D6C8;
  border-radius: 20px;
  font-size: 0.8125rem;
  color: #6B5B4F;
  letter-spacing: 1px;
}

/* ========== 记忆 ========== */
.memory-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.memory-piece {
  background-color: #FFFFFF;
  border: 1px solid #E8E0D4;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
}

.memory-piece:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(61, 43, 31, 0.1);
  border-color: #C9A961;
}

.memory-frame {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background-color: #F9F7F2;
  border-bottom: 1px solid #E8E0D4;
}

.memory-frame.photo {
  background-color: #F0F5E8;
}

.memory-frame.story {
  background-color: #FFF8E7;
}

.memory-frame.object {
  background-color: #F5F0E8;
}

.memory-caption {
  padding: 14px 16px;
}

.caption-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 6px;
}

.caption-desc {
  font-size: 0.8125rem;
  color: #6B5B4F;
  line-height: 1.6;
  margin-bottom: 8px;
}

.caption-date {
  font-size: 0.75rem;
  color: #B8A898;
}

.empty-memories {
  grid-column: 1 / -1;
  color: #B8A898;
  font-style: italic;
  padding: 20px;
  text-align: center;
}

/* ========== 家人追忆 ========== */
.recollection-gallery {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.recollection-card {
  background-color: #FFFFFF;
  border-left: 3px solid #C9A961;
  padding: 24px 28px;
  border-radius: 0 4px 4px 0;
}

.recollection-text {
  font-size: 1.0625rem;
  line-height: 1.9;
  color: #4A3B32;
  margin: 0 0 16px;
  font-style: italic;
  position: relative;
  padding-left: 20px;
}

.recollection-text::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -8px;
  font-size: 2.5rem;
  color: #C9A961;
  font-family: Georgia, serif;
  line-height: 1;
}

.recollection-attribution {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 20px;
}

.attribution-person {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #3E2723;
}

.attribution-relation {
  font-size: 0.8125rem;
  color: #8B7355;
}

.empty-recollections {
  color: #B8A898;
  font-style: italic;
  padding: 20px;
  text-align: center;
}

/* ========== 纪念空间 ========== */
.memorial-section {
  margin-top: 20px;
}

.memorial-inner {
  background: linear-gradient(135deg, #2C1810 0%, #3E2723 50%, #2C1810 100%);
  border-radius: 8px;
  padding: 56px 40px;
  text-align: center;
  color: #F5F0E8;
  position: relative;
  overflow: hidden;
}

.memorial-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(201, 169, 97, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.memorial-name {
  font-family: 'Noto Serif SC', 'STSong', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #F5F0E8;
  margin: 0 0 8px;
  letter-spacing: 6px;
  position: relative;
}

.memorial-years {
  font-size: 1rem;
  color: #C9A961;
  margin-bottom: 24px;
  position: relative;
}

.memorial-divider {
  width: 60px;
  height: 1px;
  background-color: #C9A961;
  margin: 0 auto 24px;
  position: relative;
}

.memorial-poem {
  font-size: 1.0625rem;
  line-height: 2;
  color: #E8DCC8;
  margin: 0 0 32px;
  position: relative;
}

.memorial-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  position: relative;
}

.memorial-btn {
  padding: 10px 28px;
  border-radius: 4px;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
}

.memorial-btn {
  background-color: #C9A961;
  color: #2C1810;
}

.memorial-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.memorial-btn.ghost {
  background: transparent;
  color: #C9A961;
  border: 1px solid #C9A961;
}

.memorial-btn.ghost:disabled {
  opacity: 0.4;
}

.memorial-notice {
  font-size: 0.8125rem;
  color: #8B7355;
  position: relative;
}

/* ========== 预览弹窗 ========== */
.memory-overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 24, 16, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  cursor: pointer;
  backdrop-filter: blur(4px);
}

.overlay-card {
  background-color: #F9F7F2;
  border-radius: 8px;
  padding: 32px;
  max-width: 380px;
  text-align: center;
  position: relative;
  border: 1px solid #E0D6C8;
}

.overlay-icon {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 16px;
}

.overlay-icon.photo {
  background-color: #F0F5E8;
}

.overlay-icon.story {
  background-color: #FFF8E7;
}

.overlay-icon.object {
  background-color: #F5F0E8;
}

.overlay-card h3 {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  color: #3E2723;
  margin: 0 0 8px;
}

.overlay-card p {
  font-size: 0.9375rem;
  color: #6B5B4F;
  line-height: 1.6;
  margin: 0 0 8px;
}

.overlay-date {
  font-size: 0.8125rem;
  color: #B8A898;
  margin-bottom: 16px;
}

.overlay-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #E0D6C8;
  background: #FFFFFF;
  color: #8B7355;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.overlay-close:hover {
  background: #F5F0E8;
  color: #3E2723;
}

/* ========== Demo 提示 ========== */
.demo-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2C1810;
  color: #F5F0E8;
  padding: 14px 24px;
  border-radius: 6px;
  font-size: 0.875rem;
  line-height: 1.6;
  z-index: 200;
  cursor: pointer;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(44, 24, 16, 0.3);
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .archive-body {
    grid-template-columns: 120px 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .hero-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }

  .hero-name {
    font-size: 2.25rem;
  }

  .hero-meta {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-roles {
    justify-content: center;
  }

  .hero-quote {
    text-align: left;
  }

  .archive-body {
    grid-template-columns: 1fr;
  }

  .archive-nav {
    position: static;
    order: -1;
  }

  .nav-links {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
    gap: 4px;
  }

  .nav-link {
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  .table-row {
    grid-template-columns: 80px 1fr;
  }

  .table-label {
    letter-spacing: 2px;
    padding: 12px 16px;
  }

  .timeline-axis {
    padding-left: 36px;
  }

  .event-year {
    left: -36px;
    width: 28px;
    font-size: 0.875rem;
  }

  .event-line {
    left: -28px;
  }

  .memorial-inner {
    padding: 36px 20px;
  }

  .memorial-name {
    font-size: 1.5rem;
    letter-spacing: 4px;
  }

  .memorial-actions {
    flex-direction: column;
    align-items: center;
  }

  .memorial-btn {
    width: 100%;
    max-width: 200px;
  }

  .memory-wall {
    grid-template-columns: 1fr;
  }
}
</style>
