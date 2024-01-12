<script setup>
import Topbar from './default/Topbar.vue'
import Footer from './default/Footer.vue';
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
            <!-- Footer -->
           <Footer />
            <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
</template>