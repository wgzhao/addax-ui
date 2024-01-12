<template>
    <v-app-bar elevation="0" rounded>
        <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Home
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in $router.options.routes"
          :key="item.name"
          :to="item.path">
          <v-icon left>{{ item.icon }}</v-icon>
          <router-link :to="{ name: item.name }">
                <span class="pl-1 mr-2 d-none d-lg-inline text-gray-600 small">{{ item.name }}</span>
         </router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
        <template v-slot:append>
    <v-btn icon="mdi-heart"></v-btn>

    <v-btn icon="mdi-magnify"></v-btn>

    <v-btn icon="mdi-dots-vertical"></v-btn>
  </template>
    </v-app-bar>
    
    
    <!-- End of Topbar -->
</template>
<script setup>
import { useTheme } from 'vuetify'
import {ref} from 'vue'
const { global } = useTheme()

const themes = ref([
  {
    name: 'light',
    icon: 'fas fa-sun',
  },
  {
    name: 'dark',
    icon: 'fas fa-moon',
  },
])
const idx = ref((themes.value.findIndex(t => t.name === global.name.value)  +1) % 2)

const toggleTheme = () => {
    global.name.value = themes.value[idx.value].name
    idx.value = (idx.value + 1) % 2
}
const sidebard = ref(false)
</script>
<style>
.sidebar .nav-item .nav-link .img-profile,
.topbar .nav-item .nav-link .img-profile {
  height: 2rem;
  width: 2rem;
}
.nav-item .router-link-active,
.nav-item .router-link-exact-active {
    cursor: pointer;
    color: white;
    background-color: rgb(var(--v-theme-primary))!important;
    border-radius: 0.35rem;
}
</style>