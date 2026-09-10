<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="logo">
        <svg class="logo-icon" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="10" r="7" fill="#8D6E63" opacity="0.9"/>
          <circle cx="10" cy="20" r="5" fill="#8D6E63" opacity="0.7"/>
          <circle cx="22" cy="20" r="5" fill="#8D6E63" opacity="0.7"/>
          <path d="M16 17V28" stroke="#8D6E63" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M12 28H20" stroke="#8D6E63" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span class="logo-text">姓氏家谱</span>
      </div>
      
      <nav class="nav-menu">
        <a href="#" class="nav-link active">首页</a>
        <a href="#" class="nav-link">姓氏</a>
        <a href="#" class="nav-link">家谱</a>
        <a href="#" class="nav-link">祭祖</a>
        <a href="#" class="nav-link">社区</a>
      </nav>
      
      <div class="nav-actions">
        <button class="icon-btn" aria-label="搜索">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        <a href="#" class="btn-login">登录 / 注册</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
  height: 64px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0D6C8;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.navbar-inner {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 clamp(24px, 4vw, 72px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #3E2723;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #3E2723;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: 32px;
}

.nav-link {
  font-size: 0.9375rem;
  color: #6B5B4F;
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: #8D6E63;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #8D6E63;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.icon-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #6B5B4F;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: #F5F0E8;
  color: #8D6E63;
}

.btn-login {
  font-size: 0.875rem;
  color: #8D6E63;
  text-decoration: none;
  padding: 8px 20px;
  border: 1px solid #8D6E63;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-login:hover {
  background-color: #8D6E63;
  color: #FFFFFF;
}

@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }
}
</style>
