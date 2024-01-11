<script setup>
import { useTheme } from 'vuetify'
import { hexToRgb } from './utils';
import Topbar from '@/components/Topbar.vue'
import Footer from '@/components/Footer.vue';

const { global } = useTheme()

global.name.value = "dark"
</script>

<template>
    <v-app :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <!-- Page Wrapper -->
    <div id="wrapper">
        <!-- <Nav /> -->
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <!-- Topbar -->
                <Topbar />
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </div>
            <Footer />
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
</v-app>
</template>

<style>
.v-data-table tbody tr td, thead tr th {
    padding: 0px !important;
    font-size: 0.8rem;
}
</style>
