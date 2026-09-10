<template>
  <div class="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script setup lang="ts">
</script>

<style>
/* Global Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Colors - User End */
  --color-primary: #8D6E63;
  --color-primary-dark: #3E2723;
  --color-primary-light: #C9A961;
  --color-secondary: #5C4033;
  --color-bg: #F9F7F2;
  --color-bg-soft: #F5F0E8;
  --color-card: #FFFFFF;
  --color-border: #E0D6C8;
  --color-text: #333333;
  --color-text-secondary: #6B5B4F;
  --color-text-muted: #8B7355;
  
  /* Male/Female */
  --color-male-bg: #E8F5E9;
  --color-female-bg: #FCE4EC;
  
  /* Spacing */
  --spacing-unit: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --spacing-xxxl: 60px;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 50%;
  
  /* Shadow */
  --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-elevated: 0 8px 24px rgba(0, 0, 0, 0.08);
  
  /* Typography */
  --font-serif: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  --font-sans: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

/* Remove global container - sections define their own widths */

/* Section Titles */
.section-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-lg);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.section-more {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  cursor: pointer;
}

.section-more:hover {
  color: var(--color-primary);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
