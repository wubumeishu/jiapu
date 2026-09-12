<template>
  <div class="memorial-page">
    <NavBar />
    
    <!-- ========== 第一幕：人物身份 ========== -->
    <section class="dramatic-hero">
      <div class="hero-bg-layer">
        <div class="mountain-silhouette"></div>
        <div class="mist-layer"></div>
      </div>
      <div class="content-width hero-content">
        <div class="hero-identity">
          <div class="identity-frame">
            <div class="portrait-placeholder">
              <span class="portrait-label">{{ person?.name }}</span>
              <span class="portrait-years">{{ person?.birthYear }} — {{ person?.deathYear || '今' }}</span>
            </div>
            <div class="frame-border"></div>
          </div>
          <div class="identity-text">
            <h1 class="hero-title">{{ person?.name }}</h1>
            <div class="title-line"></div>
            <div class="hero-meta">
              <span class="meta-item">{{ person?.birthYear }} — {{ person?.deathYear || '今' }}</span>
              <span class="meta-sep">·</span>
              <span class="meta-item">陈氏第{{ person?.generation }}代</span>
              <span class="meta-sep">·</span>
              <span class="meta-item">{{ person?.hometown }}</span>
            </div>
            <div class="hero-intro">{{ person?.briefIntro }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 第二幕：纪念核心空间 ========== -->
    <section class="memorial-space">
      <div class="space-inner">
        <!-- 牌位 -->
        <div class="spirit-tablet">
          <div class="tablet-body">
            <div class="tablet-text">{{ person?.name }}</div>
            <div class="tablet-years">{{ person?.birthYear }}—{{ person?.deathYear }}</div>
            <div class="tablet-gen">第{{ person?.generation }}代</div>
          </div>
        </div>
        
        <!-- 供桌 -->
        <div class="altar-table">
          <div class="table-top"></div>
          <div class="table-body"></div>
        </div>
        
        <!-- 香炉 -->
        <div class="incense-burner">
          <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- 底座 -->
            <ellipse cx="60" cy="80" rx="35" ry="8" fill="#5C4033" opacity="0.3"/>
            <!-- 炉身 -->
            <path d="M25 55 L30 75 Q60 82 90 75 L95 55 Z" fill="#8D6E63" opacity="0.7"/>
            <path d="M30 55 L90 55 L95 75 Q60 82 25 75 Z" fill="#A08060" opacity="0.5"/>
            <!-- 炉口 -->
            <ellipse cx="60" cy="55" rx="30" ry="8" fill="#6B5B4F" opacity="0.8"/>
            <ellipse cx="60" cy="55" rx="28" ry="6" fill="#4A3B32" opacity="0.6"/>
            <!-- 香 -->
            <line x1="60" y1="55" x2="60" y2="18" stroke="#C9A961" stroke-width="2" stroke-linecap="round"/>
            <!-- 香头 -->
            <circle cx="60" cy="18" r="2.5" fill="#C9A961">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <!-- 烟雾 -->
            <path d="M60 18 Q55 10 60 2" stroke="#E8DCC8" stroke-width="1.5" fill="none" opacity="0.4">
              <animate attributeName="d" values="M60 18 Q55 10 60 2;M60 18 Q65 10 60 2;M60 18 Q55 10 60 2" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M55 20 Q50 12 55 4" stroke="#E8DCC8" stroke-width="1" fill="none" opacity="0.3">
              <animate attributeName="d" values="M55 20 Q50 12 55 4;M55 20 Q60 12 55 4;M55 20 Q50 12 55 4" dur="4s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        
        <!-- 供奉物品 -->
        <div class="offerings">
          <!-- 花束 -->
          <div class="offering-item flowers" :class="{ 'offered': flowerCount > 0 }">
            <div class="vase">
              <svg viewBox="0 0 60 80" fill="none">
                <path d="M15 30 L20 70 Q30 75 40 70 L45 30 Z" fill="#C9A961" opacity="0.6"/>
                <ellipse cx="30" cy="30" rx="15" ry="5" fill="#B8935A" opacity="0.7"/>
              </svg>
              <div class="bouquet">
                <span v-for="(_, i) in Math.min(flowerCount, 9)" :key="i" class="blossom" :class="`blossom-${i % 4}`">❀</span>
              </div>
            </div>
            <span class="offering-label" v-if="flowerCount > 0">鲜花 {{ flowerCount }} 束</span>
          </div>
          
          <!-- 明灯 -->
          <div class="offering-item lamp" :class="{ 'offered': lampLit }">
            <div class="lamp-body">
              <svg viewBox="0 0 40 60" fill="none">
                <!-- 灯座 -->
                <rect x="12" y="48" width="16" height="6" rx="1" fill="#8D6E63" opacity="0.7"/>
                <!-- 灯柱 -->
                <rect x="18" y="30" width="4" height="18" fill="#A08060" opacity="0.6"/>
                <!-- 灯罩 -->
                <path d="M10 30 L30 30 L26 15 Q20 12 14 15 Z" fill="#C9A961" opacity="0.5"/>
                <!-- 火焰 -->
                <ellipse cx="20" cy="22" rx="3" ry="5" fill="#E8A840" opacity="0.9" v-if="lampLit">
                  <animate attributeName="ry" values="5;6;5" dur="1.5s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="20" cy="22" rx="2" ry="3" fill="#F5D080" opacity="0.8" v-if="lampLit"/>
              </svg>
            </div>
            <span class="offering-label" v-if="lampLit">明灯长燃</span>
          </div>
          
          <!-- 清茶 -->
          <div class="offering-item tea" :class="{ 'offered': teaOffered }">
            <div class="tea-cup">
              <svg viewBox="0 0 50 40" fill="none">
                <!-- 茶杯 -->
                <path d="M8 12 L42 12 L38 32 Q25 38 12 32 Z" fill="#E8DCC8" opacity="0.8"/>
                <path d="M10 12 L40 12 L36 30 Q25 35 14 30 Z" fill="#F9F7F2" opacity="0.6"/>
                <!-- 茶面 -->
                <ellipse cx="25" cy="14" rx="12" ry="3" fill="#C9A961" opacity="0.3"/>
                <!-- 把手 -->
                <path d="M42 16 Q48 20 42 24" stroke="#C9A961" stroke-width="1.5" fill="none" opacity="0.6"/>
              </svg>
            </div>
            <span class="offering-label" v-if="teaOffered">清茶供奉</span>
          </div>
        </div>
        
        <!-- 操作区域 -->
        <div class="ritual-actions">
          <button class="ritual-btn" @click="offerFlowers" :class="{ 'active': flowerCount > 0 }">
            <span class="btn-icon">❀</span>
            <span class="btn-text">献花</span>
          </button>
          <button class="ritual-btn" @click="lightLamp" :class="{ 'active': lampLit }">
            <span class="btn-icon">🕯️</span>
            <span class="btn-text">点灯</span>
          </button>
          <button class="ritual-btn" @click="offerTea" :class="{ 'active': teaOffered }">
            <span class="btn-icon">🍵</span>
            <span class="btn-text">敬茶</span>
          </button>
          <button class="ritual-btn primary" @click="openMessageModal">
            <span class="btn-icon">✎</span>
            <span class="btn-text">留言</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ========== 第三幕：内容叙事 ========== -->
    <main class="content-narrative">
      <div class="content-width">
        <!-- 这一生 -->
        <article class="narrative-section">
          <header class="section-header">
            <h2 class="section-title">这 一 生</h2>
            <div class="title-decoration"></div>
          </header>
          
          <div class="biography-text">
            <p v-for="(para, i) in person?.biography?.split('\n').filter(p => p.trim())" :key="i" class="biography-paragraph">
              {{ para.trim() }}
            </p>
          </div>
          
          <div class="timeline-container">
            <h3 class="timeline-title">人生历程</h3>
            <div class="timeline">
              <div v-for="(event, i) in person?.timeline" :key="i" class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-year">{{ event.year }}</div>
                <div class="timeline-content">
                  <div class="event-title">{{ event.title }}</div>
                  <div class="event-desc">{{ event.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        <!-- 家人眼中的他 -->
        <article class="narrative-section">
          <header class="section-header">
            <h2 class="section-title">家 人 眼 中 的 他</h2>
            <div class="title-decoration"></div>
          </header>
          
          <div class="recollections">
            <div v-for="rec in person?.recollections" :key="rec.id" class="recollection">
              <div class="recollection-quote">"</div>
              <div class="recollection-content">
                <p class="recollection-text">{{ rec.content }}</p>
                <footer class="recollection-footer">
                  <span class="attr-person">{{ rec.personName }}</span>
                  <span class="attr-relation">{{ rec.relation }}</span>
                </footer>
              </div>
            </div>
          </div>
        </article>
        
        <!-- 留下的记忆 -->
        <article class="narrative-section">
          <header class="section-header">
            <h2 class="section-title">留 下 的 记 忆</h2>
            <div class="title-decoration"></div>
          </header>
          
          <div class="memories-grid">
            <div v-for="memory in person?.memories" :key="memory.id" class="memory-card">
              <div class="memory-icon" :class="memory.type">
                <span v-if="memory.type === 'photo'">◇</span>
                <span v-else-if="memory.type === 'story'">○</span>
                <span v-else>□</span>
              </div>
              <div class="memory-info">
                <div class="memory-title">{{ memory.title }}</div>
                <div class="memory-date" v-if="memory.date">{{ memory.date }}</div>
                <div class="memory-desc">{{ memory.description }}</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>

    <!-- ========== 第四幕：留言与纪念收束 ========== -->
    <section class="memorial-closing">
      <div class="content-width">
        <div class="messages-section">
          <h2 class="section-title">纪 念 留 言</h2>
          <div class="messages-list">
            <div v-for="(msg, i) in messages" :key="i" class="message-item">
              <div class="message-avatar">{{ msg.author.charAt(0) }}</div>
              <div class="message-body">
                <div class="message-header">
                  <span class="message-author">{{ msg.author }}</span>
                  <span class="message-time">{{ msg.time }}</span>
                </div>
                <p class="message-text">{{ msg.content }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <footer class="closing-poem">
          <p>愿我们记得他的名字，</p>
          <p>也记得他认真生活过的一生。</p>
          <div class="candle-icon">⚬</div>
        </footer>
      </div>
    </section>

    <!-- 留言弹窗 -->
    <div v-if="showMessageModal" class="modal-overlay" @click="closeMessageModal">
      <div class="modal-content" @click.stop>
        <h3>留下您的纪念</h3>
        <div class="form-group">
          <label>您的姓名</label>
          <input v-model="newMessage.author" type="text" placeholder="请输入您的姓名" class="form-input"/>
        </div>
        <div class="form-group">
          <label>留言内容</label>
          <textarea v-model="newMessage.content" placeholder="写下您对祖先的思念与祝福..." class="form-textarea" rows="4"></textarea>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="closeMessageModal">取消</button>
          <button class="btn-submit" @click="submitMessage">提交留言</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getPersonData } from '@/data/persons'

const route = useRoute()
const router = useRouter()

const personId = route.params.personId as string
const slug = route.params.slug as string
const genealogyId = route.params.genealogyId as string

const person = ref(getPersonData(personId))

// 状态管理
const flowerCount = ref(0)
const lampLit = ref(false)
const teaOffered = ref(false)
const showMessageModal = ref(false)

// 留言数据
const messages = ref([
  { author: '陈国强', time: '2024-03-15', content: '父亲，今天是您的忌日，我们全家来探望您了。祝您在另一个世界安好。' },
  { author: '陈志远', time: '2024-03-14', content: '祖父大人，孙儿在外工作繁忙，未能及时回来探望，心中愧疚。愿您在天之灵安息。' },
  { author: '陈秀兰', time: '2024-03-10', content: '爷爷，您的教诲我一直铭记在心，勤劳正直，诚实守信。我会继续发扬家风。' }
])

const newMessage = ref({ author: '', content: '' })

// 献花交互
const offerFlowers = () => {
  flowerCount.value++
}

// 点灯交互
const lightLamp = () => {
  lampLit.value = !lampLit.value
}

// 敬茶交互
const offerTea = () => {
  teaOffered.value = !teaOffered.value
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
    return
  }
  
  const today = new Date()
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  
  messages.value.unshift({
    author: newMessage.value.author,
    time: dateStr,
    content: newMessage.value.content
  })
  
  closeMessageModal()
}

onMounted(() => {
  if (!person.value) {
    router.push(`/surname/${slug}/genealogy/${genealogyId}`)
  }
})
</script>

<style scoped>
/* ========== 基础 ========== */
.memorial-page {
  min-height: 100vh;
  background-color: #F9F7F2;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  color: #3E2723;
}

.content-width {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 64px);
}

/* ========== 第一幕：人物身份 Hero ========== */
.dramatic-hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #2C1810 0%, #3E2723 40%, #5C4033 100%);
  overflow: hidden;
  padding: 80px 0;
}

.hero-bg-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.mountain-silhouette {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(180deg, transparent 0%, rgba(61, 43, 31, 0.3) 100%);
  clip-path: polygon(
    0% 100%, 0% 60%, 10% 45%, 20% 55%, 30% 40%, 40% 50%, 50% 35%, 60% 45%, 70% 30%, 80% 40%, 90% 50%, 100% 45%, 100% 100%
  );
}

.mist-layer {
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(180deg, transparent 0%, rgba(201, 169, 97, 0.1) 50%, transparent 100%);
  animation: mistFloat 8s ease-in-out infinite;
}

@keyframes mistFloat {
  0%, 100% { transform: translateX(-20px); opacity: 0.3; }
  50% { transform: translateX(20px); opacity: 0.5; }
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1000px;
}

.hero-identity {
  display: flex;
  align-items: center;
  gap: 48px;
}

/* 肖像框 */
.identity-frame {
  position: relative;
  flex-shrink: 0;
}

.portrait-placeholder {
  width: 140px;
  height: 170px;
  background: linear-gradient(135deg, #F5F0E8 0%, #E8E0D4 100%);
  border: 2px solid #C9A961;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 32px rgba(44, 24, 16, 0.4);
}

.portrait-label {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  color: #8B7355;
  letter-spacing: 4px;
  font-weight: 600;
}

.portrait-years {
  font-size: 0.8125rem;
  color: #B8A898;
  letter-spacing: 2px;
}

.frame-border {
  position: absolute;
  inset: -8px;
  border: 1px solid rgba(201, 169, 97, 0.3);
  pointer-events: none;
}

/* 人物文字 */
.identity-text {
  flex: 1;
}

.hero-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 4rem;
  font-weight: 700;
  color: #F5F0E8;
  margin: 0 0 16px;
  letter-spacing: 8px;
  line-height: 1.1;
}

.title-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, #C9A961, transparent);
  margin-bottom: 24px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 1.0625rem;
  color: #C9A961;
  letter-spacing: 1px;
}

.meta-sep {
  color: #8D6E63;
}

.hero-intro {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #E8DCC8;
  max-width: 520px;
  border-left: 2px solid #C9A961;
  padding-left: 20px;
  font-style: italic;
}

/* ========== 第二幕：纪念核心空间 ========== */
.memorial-space {
  background: linear-gradient(180deg, #3E2723 0%, #2C1810 100%);
  padding: 80px 0;
  position: relative;
}

.space-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* 牌位 */
.spirit-tablet {
  width: 160px;
  height: 200px;
  background: linear-gradient(180deg, #C9A961 0%, #A08060 100%);
  border-radius: 8px 8px 40px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  position: relative;
}

.tablet-body {
  text-align: center;
  color: #2C1810;
}

.tablet-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 4px;
  writing-mode: horizontal-tb;
}

.tablet-years {
  font-size: 0.875rem;
  margin-top: 8px;
  letter-spacing: 2px;
}

.tablet-gen {
  font-size: 0.75rem;
  margin-top: 4px;
  opacity: 0.8;
}

/* 供桌 */
.altar-table {
  width: 100%;
  max-width: 600px;
  position: relative;
}

.table-top {
  height: 12px;
  background: linear-gradient(180deg, #8D6E63, #6B5B4F);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.table-body {
  height: 60px;
  background: linear-gradient(180deg, #6B5B4F, #5C4033);
  margin-top: -2px;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
}

/* 香炉 */
.incense-burner {
  width: 120px;
  height: 90px;
  margin: 0 auto;
}

/* 供奉物品 */
.offerings {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 24px;
}

.offering-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.4;
  transition: all 0.5s ease;
}

.offering-item.offered {
  opacity: 1;
}

.offering-label {
  font-size: 0.75rem;
  color: #C9A961;
  letter-spacing: 1px;
  font-family: 'Noto Serif SC', serif;
}

/* 花束 */
.bouquet {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  max-width: 80px;
  font-size: 1.25rem;
  color: #C9A961;
}

.blossom {
  animation: bloom 0.6s ease-out forwards;
  opacity: 0;
}

.blossom-0 { animation-delay: 0s; }
.blossom-1 { animation-delay: 0.1s; }
.blossom-2 { animation-delay: 0.2s; }
.blossom-3 { animation-delay: 0.3s; }

@keyframes bloom {
  to { opacity: 1; transform: scale(1); }
  from { opacity: 0; transform: scale(0.5); }
}

/* 祭祀操作 */
.ritual-actions {
  display: flex;
  gap: 24px;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.ritual-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(201, 169, 97, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.ritual-btn:hover {
  background: rgba(201, 169, 97, 0.1);
  border-color: #C9A961;
  transform: translateY(-2px);
}

.ritual-btn.active {
  background: rgba(201, 169, 97, 0.15);
  border-color: #C9A961;
}

.ritual-btn.primary {
  background: #8D6E63;
  border-color: #8D6E63;
}

.ritual-btn.primary:hover {
  background: #7A5C56;
}

.btn-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.btn-text {
  font-size: 0.875rem;
  color: #E8DCC8;
  letter-spacing: 2px;
  font-family: 'Noto Serif SC', serif;
}

.ritual-btn.primary .btn-text {
  color: #FFFFFF;
}

/* ========== 第三幕：内容叙事 ========== */
.content-narrative {
  background: #F9F7F2;
  padding: 80px 0;
}

.narrative-section {
  margin-bottom: 64px;
}

.section-header {
  margin-bottom: 32px;
}

.section-title {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #3E2723;
  letter-spacing: 8px;
  margin: 0 0 12px;
}

.title-decoration {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #C9A961, transparent);
}

/* 生平文本 */
.biography-text {
  font-size: 1.0625rem;
  line-height: 2;
  color: #4A3B32;
  text-align: justify;
}

.biography-paragraph {
  margin-bottom: 16px;
  text-indent: 2em;
}

.biography-paragraph:last-child {
  margin-bottom: 0;
}

/* 时间线 */
.timeline-container {
  margin-top: 48px;
}

.timeline-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #3E2723;
  margin-bottom: 24px;
  letter-spacing: 2px;
}

.timeline {
  position: relative;
  padding-left: 40px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #C9A961 0%, #E0D6C8 100%);
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
  left: -40px;
  top: 4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #C9A961;
  border: 3px solid #F9F7F2;
  box-shadow: 0 0 0 2px #C9A961;
}

.timeline-year {
  position: absolute;
  left: -100px;
  top: 2px;
  width: 50px;
  text-align: right;
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  font-weight: 600;
  color: #C9A961;
}

.timeline-content {
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

/* 家人追忆 */
.recollections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.recollection {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: #FFFFFF;
  border-radius: 4px;
  border-left: 3px solid #C9A961;
  box-shadow: 0 2px 8px rgba(61, 43, 31, 0.04);
}

.recollection-quote {
  font-size: 3rem;
  font-family: Georgia, serif;
  color: #C9A961;
  line-height: 1;
  opacity: 0.5;
}

.recollection-content {
  flex: 1;
}

.recollection-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #4A3B32;
  margin: 0 0 16px;
  font-style: italic;
}

.recollection-footer {
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
  padding: 2px 10px;
  background: #F5F0E8;
  border-radius: 10px;
}

/* 记忆收藏 */
.memories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.memory-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #E8E0D4;
  transition: all 0.2s ease;
}

.memory-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(61, 43, 31, 0.08);
  border-color: #C9A961;
}

.memory-icon {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  color: #C9A961;
  background: #F5F0E8;
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

/* ========== 第四幕：纪念收束 ========== */
.memorial-closing {
  background: linear-gradient(180deg, #F9F7F2 0%, #F2EDE4 100%);
  padding: 80px 0;
}

.messages-section {
  margin-bottom: 64px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #E8E0D4;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #8D6E63;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  flex-shrink: 0;
}

.message-body {
  flex: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
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

/* 收尾诗句 */
.closing-poem {
  text-align: center;
  padding: 48px 0;
  border-top: 1px solid #E8E0D4;
}

.closing-poem p {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.125rem;
  color: #5C4033;
  line-height: 2;
  margin: 0 0 24px;
  opacity: 0.8;
}

.candle-icon {
  font-size: 1.5rem;
  color: #C9A961;
  animation: flicker 2s ease-in-out infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
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
  background: #F9F7F2;
  border-radius: 8px;
  padding: 32px;
  max-width: 480px;
  width: 90%;
  border: 1px solid #E0D6C8;
}

.modal-content h3 {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.25rem;
  color: #3E2723;
  margin: 0 0 24px;
  letter-spacing: 2px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  color: #8B7355;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E0D6C8;
  border-radius: 4px;
  font-size: 0.9375rem;
  font-family: inherit;
  background: #FFFFFF;
  color: #3E2723;
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn-cancel,
.btn-submit {
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 0.9375rem;
  cursor: pointer;
  font-family: inherit;
  border: none;
}

.btn-cancel {
  background: #F5F0E8;
  color: #8B7355;
  border: 1px solid #E0D6C8;
}

.btn-submit {
  background: #8D6E63;
  color: #FFFFFF;
}

.btn-submit:hover {
  background: #7A5C56;
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .hero-identity {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-meta {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hero-intro {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .dramatic-hero {
    min-height: auto;
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 2.25rem;
    letter-spacing: 4px;
  }
  
  .portrait-placeholder {
    width: 120px;
    height: 150px;
  }
  
  .spirit-tablet {
    width: 140px;
    height: 180px;
  }
  
  .tablet-text {
    font-size: 1.5rem;
  }
  
  .offerings {
    gap: 24px;
  }
  
  .ritual-actions {
    gap: 16px;
  }
  
  .ritual-btn {
    padding: 12px 16px;
    min-width: 70px;
  }
  
  .memories-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-year {
    position: static;
    width: auto;
    text-align: left;
    margin-bottom: 4px;
  }
  
  .timeline {
    padding-left: 24px;
  }
  
  .timeline-dot {
    left: -24px;
  }
}
</style>
