<script setup lang="ts">
import Topbar from "./default/Topbar.vue";
import Footer from "./default/Footer.vue";
import GlobalSnackbar from "@/components/MySnackbar.vue";

</script>

<template>
  <v-app>
    <Topbar />
    <v-main class="align-center justify-center" style="min-height: 600px">
      <router-view />
    </v-main>
    <GlobalSnackbar ref="snackbar" />
    <Footer />
  </v-app>
</template>
