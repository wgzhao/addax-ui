<script setup>
import Topbar from '@/components/Topbar.vue'
import Footer from '@/components/Footer.vue';
</script>

<template>
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
        </div>
        <!-- End of Content Wrapper -->
        <Footer />
    </div>
    <!-- End of Page Wrapper -->
</template>

<style>
.v-data-table tbody tr td, thead tr th {
    padding: 0px !important;
    font-size: 0.8rem;
}
</style>
