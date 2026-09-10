<template>
  <div class="home-page">
    <NavBar />
    <main>
      <HeroSection />
      <HotSurnamesSection />
      <PlatformStatsSection />
      <PlatformFeaturesSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import HotSurnamesSection from '@/components/HotSurnamesSection.vue'
import PlatformStatsSection from '@/components/PlatformStatsSection.vue'
import PlatformFeaturesSection from '@/components/PlatformFeaturesSection.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
