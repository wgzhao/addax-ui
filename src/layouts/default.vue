<script setup lang="ts">
import Topbar from "./default/Topbar.vue";
import Footer from "./default/Footer.vue";
</script>

<template>
  <v-app>
    <div class="px-2">
      <Topbar />
      <v-main class="align-center justify-center" style="min-height: 600px;">
        <router-view></router-view>
      </v-main>
      <Footer />
    </div>
  </v-app>
</template>
