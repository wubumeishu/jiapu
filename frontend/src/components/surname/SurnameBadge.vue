<template>
  <div class="surname-badge">
    <div class="badge-circle">
      <span class="badge-char">{{ character }}</span>
    </div>
    <div class="badge-decorations">
      <span class="deco-dot"></span>
      <span class="deco-dot"></span>
      <span class="deco-dot"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  character: string
}>()
</script>

<style scoped>
.surname-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.badge-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C9A961 0%, #B8944F 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(201, 169, 97, 0.3);
}

.badge-char {
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.badge-decorations {
  display: flex;
  gap: 6px;
}

.deco-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #C9A961;
}

.deco-dot:nth-child(2) {
  opacity: 0.7;
}

.deco-dot:nth-child(3) {
  opacity: 0.5;
}
</style>
