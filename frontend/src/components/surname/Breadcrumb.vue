<template>
  <nav class="breadcrumb">
    <a href="/" class="breadcrumb-item">首页</a>
    <span class="breadcrumb-separator">></span>
    <a href="/surnames" class="breadcrumb-item">姓氏</a>
    <span class="breadcrumb-separator">></span>
    <span class="breadcrumb-current">{{ surnameData?.name || surnameData?.character || '姓氏' }}</span>
  </nav>
</template>

<script setup lang="ts">
import { getSurnameData } from '@/data/surnames'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string
const surnameData = getSurnameData(slug)
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  font-size: 0.875rem;
}

.breadcrumb-item {
  color: #6B5B4F;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-item:hover {
  color: #8D6E63;
}

.breadcrumb-separator {
  color: #A09080;
}

.breadcrumb-current {
  color: #3E2723;
  font-weight: 500;
}
</style>
