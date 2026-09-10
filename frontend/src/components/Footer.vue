<template>
  <footer class="footer">
    <div class="content-width">
      <div class="footer-content">
        <div class="footer-motto">
          <div class="motto-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="8" r="4"/>
              <path d="M12 12v10"/>
              <path d="M8 18h8"/>
            </svg>
            <span>寻根问祖，传承血脉</span>
          </div>
          <div class="motto-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span>家谱在手，根脉不忘</span>
          </div>
          <div class="motto-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L4 7v5c0 5.25 3.4 10.15 8 11.5 4.6-1.35 8-6.25 8-11.5V7L12 2z"/>
            </svg>
            <span>缅怀先祖，感恩传承</span>
          </div>
          <div class="motto-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>连接宗亲，共叙亲情</span>
          </div>
        </div>
        
        <div class="footer-links">
          <a href="#">关于我们</a>
          <a href="#">联系我们</a>
          <a href="#">隐私政策</a>
          <a href="#">使用条款</a>
        </div>
        
        <div class="footer-copyright">
          <p>© 2026 中国姓氏家谱·网络祭祖平台 版权所有</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.footer {
  background-color: #F5F0E8;
  border-top: 1px solid #E0D6C8;
  padding: 20px 0;
}

.content-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-motto {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  justify-content: center;
}

.motto-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B5B4F;
  font-size: 0.875rem;
}

.motto-item svg {
  color: #8D6E63;
}

.footer-links {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  font-size: 0.8125rem;
  color: #8B7355;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #8D6E63;
}

.footer-copyright {
  font-size: 0.6875rem;
  color: #A09080;
}

@media (max-width: 768px) {
  .container {
    padding: 0 20px;
  }
  
  .footer-motto {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .motto-item {
    justify-content: center;
  }
}
</style>
