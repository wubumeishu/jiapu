<template>
  <div class="memorial-page">
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
        <span class="demo-badge">纪念空间 · 演示数据</span>
      </div>
    </div>

    <!-- 纪念身份区域 -->
    <section class="memorial-hero" v-if="person">
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

    <!-- 追思核心区域 -->
    <div class="content-width memorial-body">
      <!-- 祭祀互动按钮 -->
      <section class="action-section">
        <div class="action-buttons">
          <button 
            class="action-btn" 
            :class="{ active: flowerCount > 0 }"
            @click="offerFlowers"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="10" r="2.2"/>
              <path d="M12 8c-4-6-8 1-3 3-5 2 1 7 3 2 2 5 8 0 3-2 5-2 1-9-3-3Z"/>
              <path d="M12 12v8M9 20h6"/>
            </svg>
            <span class="btn-label">献花</span>
            <span v-if="flowerCount > 0" class="btn-count">{{ flowerCount }}</span>
          </button>
          
          <button class="action-btn" @click="lightLamp">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M8 8h8M7 10h10l-1 8H8l-1-8ZM9 20h6M10 5h4M11 2h2v3h-2z"/>
            </svg>
            <span class="btn-label">点灯</span>
          </button>
          
          <button class="action-btn" @click="offerTea">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 20h14M7 17h10M8 17V9h8v8M5 9l7-5 7 5"/>
              <path d="M10 13h4"/>
            </svg>
            <span class="btn-label">敬茶</span>
          </button>
          
          <button class="action-btn primary" @click="openMessageModal">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="9" cy="9" r="3"/>
              <circle cx="17" cy="11" r="2.5"/>
              <path d="M3.5 20c.6-3.3 2.5-5 5.5-5s4.9 1.7 5.5 5M14 16c2.7-.1 4.8 1.1 5.5 4"/>
            </svg>
            <span class="btn-label">留言</span>
          </button>
        </div>
        
        <!-- 献花展示区域 -->
        <div class="flower-display" v-if="flowerCount > 0">
          <div class="flowers-row">
            <span v-for="n in Math.min(flowerCount, 12)" :key="n" class="flower">🌸</span>
          </div>
        </div>
      </section>

      <!-- Tab 导航 -->
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          class="tab-btn" 
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab 内容 -->
      <div class="tab-content">
        <!-- 生平简介 -->
        <div v-if="activeTab === 'life'" class="content-section">
          <h3>生平简介</h3>
          <div class="biography-text">
            <div 
              v-for="(para, index) in person?.biography?.split('\n').filter((p: string) => p.trim())" 
              :key="index"
              class="biography-paragraph"
            >
              {{ para.trim() }}
            </div>
          </div>
          
          <!-- 时间线 -->
          <div class="timeline-section">
            <h4>人生历程</h4>
            <div class="timeline">
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
            </div>
          </div>
        </div>

        <!-- 家族追忆 -->
        <div v-if="activeTab === 'memory'" class="content-section">
          <h3>家族追忆</h3>
          <div class="recollection-list">
            <div 
              v-for="rec in person?.recollections" 
              :key="rec.id"
              class="recollection-item"
            >
              <div class="recollection-quote">"</div>
              <div class="recollection-content">
                <p class="recollection-text">{{ rec.content }}</p>
                <div class="recollection-attribution">
                  <span class="attr-person">{{ rec.personName }}</span>
                  <span class="attr-relation">{{ rec.relation }}</span>
                </div>
              </div>
            </div>
            <div v-if="!person?.recollections?.length" class="empty-state">
              暂无家族追忆记录
            </div>
          </div>
        </div>

        <!-- 纪念留言 -->
        <div v-if="activeTab === 'message'" class="content-section">
          <h3>纪念留言</h3>
          <div class="message-list">
            <div 
              v-for="(msg, index) in messages" 
              :key="index"
              class="message-item"
            >
              <div class="message-avatar">{{ msg.author.charAt(0) }}</div>
              <div class="message-content">
                <div class="message-header">
                  <span class="message-author">{{ msg.author }}</span>
                  <span class="message-time">{{ msg.time }}</span>
                </div>
                <p class="message-text">{{ msg.content }}</p>
              </div>
            </div>
            <div v-if="messages.length === 0" class="empty-state">
              暂无留言，成为第一个留言的人吧
            </div>
          </div>
        </div>

        <!-- 记忆收藏 -->
        <div v-if="activeTab === 'memories'" class="content-section">
          <h3>记忆收藏</h3>
          <div class="memory-grid">
            <div 
              v-for="memory in person?.memories" 
              :key="memory.id"
              class="memory-card"
            >
              <div class="memory-icon" :class="memory.type">
                <span v-if="memory.type === 'photo'">📷</span>
                <span v-else-if="memory.type === 'story'">📖</span>
                <span v-else>🏺</span>
              </div>
              <div class="memory-info">
                <div class="memory-title">{{ memory.title }}</div>
                <div class="memory-date">{{ memory.date || '' }}</div>
                <div class="memory-desc">{{ memory.description }}</div>
              </div>
            </div>
            <div v-if="!person?.memories?.length" class="empty-state">
              暂无记忆留存
            </div>
          </div>
        </div>

        <!-- 家人来访 -->
        <div v-if="activeTab === 'visitors'" class="content-section">
          <h3>今日来访家人</h3>
          <div class="visitors-grid">
            <div 
              v-for="visitor in visitors" 
              :key="visitor.id"
              class="visitor-item"
            >
              <div class="visitor-avatar" :class="visitor.gender">{{ visitor.name.charAt(0) }}</div>
              <span class="visitor-name">{{ visitor.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部纪念收束 -->
    <footer class="memorial-footer">
      <div class="content-width">
        <div class="footer-poem">
          <p>愿我们记得他的名字，</p>
          <p>也记得他认真生活过的一生。</p>
        </div>
        <div class="footer-candle">
          <span class="candle-flame">🕯️</span>
        </div>
      </div>
    </footer>

    <!-- 留言弹窗 -->
    <div v-if="showMessageModal" class="modal-overlay" @click="closeMessageModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>留下您的纪念</h3>
          <button class="modal-close" @click="closeMessageModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>您的姓名</label>
            <input 
              v-model="newMessage.author" 
              type="text" 
              placeholder="请输入您的姓名"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label>留言内容</label>
            <textarea 
              v-model="newMessage.content" 
              placeholder="写下您对祖先的思念与祝福..."
              class="form-textarea"
              rows="4"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="closeMessageModal">取消</button>
          <button class="btn-submit" @click="submitMessage">提交留言</button>
        </div>
      </div>
    </div>

    <!-- 提示消息 -->
    <div v-if="toastMessage" class="toast" @click="toastMessage = null">
      <p>{{ toastMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getPersonData } from '@/data/persons'
import { getSurnameData } from '@/data/surnames'

const route = useRoute()
const router = useRouter()

const personId = route.params.personId as string
const slug = route.params.slug as string
const genealogyId = route.params.genealogyId as string

const person = ref(getPersonData(personId))
const surnameData = getSurnameData(slug)

// 状态管理
const activeTab = ref('life')
const flowerCount = ref(0)
const showMessageModal = ref(false)
const toastMessage = ref<string | null>(null)

// 留言数据
const messages = ref([
  { author: '陈国强', time: '2024-03-15', content: '父亲，今天是您的忌日，我们全家来探望您了。祝您在另一个世界安好。' },
  { author: '陈志远', time: '2024-03-14', content: '祖父大人，孙儿在外工作繁忙，未能及时回来探望，心中愧疚。愿您在天之灵安息。' },
  { author: '陈秀兰', time: '2024-03-10', content: '爷爷，您的教诲我一直铭记在心，勤劳正直，诚实守信。我会继续发扬家风。' }
])

const visitors = ref([
  { id: 1, name: '陈国强', gender: 'male' },
  { id: 2, name: '陈志远', gender: 'male' },
  { id: 3, name: '陈秀兰', gender: 'female' },
  { id: 4, name: '陈有禄', gender: 'male' },
  { id: 5, name: '陈明远', gender: 'male' }
])

// 新留言表单
const newMessage = ref({
  author: '',
  content: ''
})

// 标签页定义
const tabs = [
  { id: 'life', label: '生平简介' },
  { id: 'memory', label: '家族追忆' },
  { id: 'message', label: '纪念留言' },
  { id: 'memories', label: '记忆收藏' },
  { id: 'visitors', label: '家人来访' }
]

// 返回首页
const goBack = () => {
  router.push(`/surname/${slug}/genealogy/${genealogyId}`)
}

// 献花交互
const offerFlowers = () => {
  flowerCount.value++
  showToast('已献上一束鲜花 🌸')
}

// 点灯交互
const lightLamp = () => {
  showToast('已为您点亮一盏明灯 🕯️')
}

// 敬茶交互
const offerTea = () => {
  showToast('已敬上一杯清茶 🍵')
}

// 打开留言弹窗
const openMessageModal = () => {
  showMessageModal.value = true
  newMessage.value = { author: '', content: '' }
}

// 关闭留言弹窗
const closeMessageModal = () => {
  showMessageModal.value = false
}

// 提交留言
const submitMessage = () => {
  if (!newMessage.value.author.trim() || !newMessage.value.content.trim()) {
    showToast('请填写姓名和留言内容')
    return
  }
  
  const today = new Date()
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  
  messages.value.unshift({
    author: newMessage.value.author,
    time: dateStr,
    content: newMessage.value.content
  })
  
  showToast('留言已提交，感谢您的缅怀 💐')
  closeMessageModal()
}

// 显示提示
const showToast = (message: string) => {
  toastMessage.value = message
  setTimeout(() => {
    toastMessage.value = null
  }, 3000)
}

onMounted(() => {
  // 检查人物数据是否存在
  if (!person.value) {
    showToast('未找到该人物信息')
  }
})
</script>

<style scoped>
/* ========== 基础 ========== */
.memorial-page {
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

.demo-badge {
  display: inline-block;
  margin-left: 16px;
  padding: 2px 10px;
  background-color: #F5F0E8;
  border: 1px solid #E0D6C8;
  border-radius: 2px;
  font-size: 0.6875rem;
  color: #B8A898;
  letter-spacing: 1px;
  vertical-align: middle;
}

/* ========== Hero 区域 ========== */
.memorial-hero {
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
.memorial-body {
  padding-top: 40px;
  padding-bottom: 80px;
}

/* ========== 祭祀互动按钮 ========== */
.action-section {
  margin-bottom: 32px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #FFFFFF;
  border: 1.5px solid #E8E0D4;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: #5C4033;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.action-btn:hover {
  border-color: #C9A961;
  color: #8D6E63;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(201, 169, 97, 0.15);
}

.action-btn.active {
  border-color: #C9A961;
  background-color: rgba(201, 169, 97, 0.08);
  color: #8D6E63;
}

.action-btn.primary {
  background-color: #8D6E63;
  border-color: #8D6E63;
  color: #FFFFFF;
}

.action-btn.primary:hover {
  background-color: #7A5C56;
  border-color: #7A5C56;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-label {
  font-weight: 500;
}

.btn-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background-color: #C9A961;
  color: #FFFFFF;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 4px;
}

/* 献花展示 */
.flower-display {
  margin-top: 20px;
  padding: 16px 20px;
  background-color: rgba(201, 169, 97, 0.06);
  border-radius: 8px;
  border: 1px dashed #C9A961;
}

.flowers-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 1.5rem;
}

/* ========== Tab 导航 ========== */
.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 32px;
  border-bottom: 2px solid #E8E0D4;
  padding-bottom: 0;
}

.tab-btn {
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #8B7355;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: -2px;
  font-family: inherit;
  letter-spacing: 1px;
}

.tab-btn:hover {
  color: #8D6E63;
}

.tab-btn.active {
  color: #8D6E63;
  border-bottom-color: #C9A961;
  font-weight: 600;
}

/* ========== 内容区域 ========== */
.content-section {
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E8E0D4;
  padding: 32px;
}

.content-section h3 {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0 0 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E0D6C8;
  letter-spacing: 2px;
}

.content-section h4 {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #3E2723;
  margin: 32px 0 16px;
  letter-spacing: 1px;
}

/* ========== 生平简介 ========== */
.biography-text {
  font-size: 1rem;
  line-height: 2;
  color: #4A3B32;
}

.biography-paragraph {
  margin-bottom: 16px;
  text-indent: 2em;
}

.biography-paragraph:last-child {
  margin-bottom: 0;
}

/* ========== 时间线 ========== */
.timeline {
  position: relative;
  padding-left: 48px;
}

.timeline::before {
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
  padding-bottom: 24px;
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
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 0 2px #C9A961;
}

.event-content {
  padding-left: 16px;
}

.event-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 4px;
}

.event-desc {
  font-size: 0.9375rem;
  color: #6B5B4F;
  line-height: 1.6;
}

/* ========== 家族追忆 ========== */
.recollection-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.recollection-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: #F9F7F2;
  border-radius: 8px;
  border-left: 3px solid #C9A961;
}

.recollection-quote {
  font-size: 3rem;
  font-family: Georgia, serif;
  color: #C9A961;
  line-height: 1;
  opacity: 0.6;
}

.recollection-content {
  flex: 1;
}

.recollection-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #4A3B32;
  margin: 0 0 12px;
  font-style: italic;
}

.recollection-attribution {
  display: flex;
  gap: 12px;
  align-items: center;
}

.attr-person {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #3E2723;
}

.attr-relation {
  font-size: 0.8125rem;
  color: #8B7355;
  padding: 2px 8px;
  background-color: #F5F0E8;
  border-radius: 10px;
}

/* ========== 纪念留言 ========== */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: #F9F7F2;
  border-radius: 8px;
}

.message-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #8D6E63;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  font-weight: 600;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.message-author {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #3E2723;
}

.message-time {
  font-size: 0.8125rem;
  color: #8B7355;
}

.message-text {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #5C4033;
  margin: 0;
}

/* ========== 记忆收藏 ========== */
.memory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.memory-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: #F9F7F2;
  border-radius: 8px;
  border: 1px solid #E8E0D4;
  transition: all 0.2s;
}

.memory-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(61, 43, 31, 0.08);
  border-color: #C9A961;
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
  background-color: #F0F5E8;
}

.memory-icon.story {
  background-color: #FFF8E7;
}

.memory-icon.object {
  background-color: #F5F0E8;
}

.memory-info {
  flex: 1;
}

.memory-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 4px;
}

.memory-date {
  font-size: 0.8125rem;
  color: #8B7355;
  margin-bottom: 8px;
}

.memory-desc {
  font-size: 0.875rem;
  color: #6B5B4F;
  line-height: 1.6;
}

/* ========== 家人来访 ========== */
.visitors-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.visitor-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #F9F7F2;
  border-radius: 20px;
  border: 1px solid #E8E0D4;
}

.visitor-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #8D6E63;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.visitor-avatar.female {
  background-color: #B47C78;
}

.visitor-name {
  font-size: 0.875rem;
  color: #3E2723;
}

/* ========== 空状态 ========== */
.empty-state {
  color: #B8A898;
  font-style: italic;
  padding: 40px;
  text-align: center;
  font-size: 0.9375rem;
}

/* ========== 底部纪念 ========== */
.memorial-footer {
  background-color: #2C1810;
  padding: 48px 0;
  text-align: center;
  color: #E8DCC8;
}

.footer-poem {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  line-height: 2;
  margin-bottom: 24px;
  opacity: 0.9;
}

.footer-candle {
  font-size: 2rem;
  animation: flicker 2s ease-in-out infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

/* ========== 弹窗 ========== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 24, 16, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: #F9F7F2;
  border-radius: 12px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  border: 1px solid #E0D6C8;
  box-shadow: 0 8px 32px rgba(44, 24, 16, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h3 {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3E2723;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #E0D6C8;
  background: #FFFFFF;
  color: #8B7355;
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #F5F0E8;
  color: #3E2723;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.875rem;
  color: #8B7355;
  font-weight: 500;
}

.form-input,
.form-textarea {
  padding: 12px 16px;
  border: 1px solid #E0D6C8;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-family: inherit;
  background-color: #FFFFFF;
  color: #3E2723;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #C9A961;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel,
.btn-submit {
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  border: none;
}

.btn-cancel {
  background-color: #F5F0E8;
  color: #8B7355;
  border: 1px solid #E0D6C8;
}

.btn-cancel:hover {
  background-color: #E8E0D4;
}

.btn-submit {
  background-color: #8D6E63;
  color: #FFFFFF;
}

.btn-submit:hover {
  background-color: #7A5C56;
}

/* ========== Toast 提示 ========== */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2C1810;
  color: #F5F0E8;
  padding: 14px 24px;
  border-radius: 8px;
  font-size: 0.9375rem;
  line-height: 1.6;
  z-index: 300;
  cursor: pointer;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(44, 24, 16, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .hero-inner {
    gap: 24px;
  }
  
  .action-buttons {
    gap: 12px;
  }
  
  .action-btn {
    padding: 10px 18px;
    font-size: 0.875rem;
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
  
  .action-buttons {
    justify-content: center;
  }
  
  .tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    gap: 0;
  }
  
  .tab-btn {
    padding: 10px 16px;
    font-size: 0.875rem;
    white-space: nowrap;
  }
  
  .content-section {
    padding: 20px;
  }
  
  .recollection-item {
    flex-direction: column;
    gap: 12px;
  }
  
  .memory-grid {
    grid-template-columns: 1fr;
  }
}
</style>
