<script setup lang="ts">
import Topbar from "./default/Topbar.vue";
import Footer from "./default/Footer.vue";
</script>

<template>
  <v-app>
    <div class="px-2">
      <Topbar />
      <v-main>
        <router-view></router-view>
      </v-main>
      <Footer />
    </div>
  </v-app>
</template>
