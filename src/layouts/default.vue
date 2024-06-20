<script setup>
import Topbar from "./default/Topbar.vue";
import Footer from "./default/Footer.vue";
</script>

<template>
    <v-app>
        <div id="wrapper">
            <Topbar />
            <v-main>
                <router-view></router-view>
            </v-main>
            <Footer />
        </div>
    </v-app>
</template>
