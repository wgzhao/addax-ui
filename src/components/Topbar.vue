<template>
    <!-- Topbar Navbar -->
    <nav class="navbar navbar-expand  topbar mb-4 static-top" data-bs-theme="dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
            <ul class="navbar-nav mb-1 mb-log-0">
            <template v-for="item in $router.options.routes" :key="item.name">
                <div v-if="item.children">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-fw" :class="item.icon"></i>
                            <span class="pl-1 mr-2 d-none d-lg-inline text-gray-600 small">{{  item.name }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <template v-for="child in item.children">
                                <li><router-link class="dropdown-item" :to="item.path + '/' + child.path">
                                    <i class="fa-solid" :class="child.icon"></i>
                                    <span class="pl-1 mr-2 d-none d-lg-inline">{{ child.name }}</span>
                                </router-link>
                            </li>
                            </template>
                        </ul>
                    </li>
                </div>
                <div v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="item.path">
                            <i class="fa-solid " :class="item.icon"></i>
                            <span class="pl-1 mr-2 d-none d-lg-inline text-gray-600 small">{{ item.name }}</span>
                        </router-link>
                    </li>
                </div>
            </template>
            </ul>
            <ul class="navbar-nav ml-auto">
            <div class="topbar-divider d-none d-sm-block"></div>
            <a class="nav-link" href="#" @click="toggleTheme()">
                    <span class="mr-1 d-none d-lg-inline text-gray-600 small">
                        <v-icon :icon="themes[idx]['icon']" />
                    </span>
                </a>
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link" href="#">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                    <img class="img-profile rounded-circle" width="80%" src="/src/assets/images/undraw_profile.svg">
                </a>
            </li>

        </ul>
        </div>
        </div>
    </nav>
    
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