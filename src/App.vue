<script setup>
import Topbar from './components/Topbar.vue'
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
            <footer class="sticky-footer bg-white">
                <div class="container">
                    <div class="copyright text-center">
                        <span>Copyright &copy; My Website 2023</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
</template>

<style>
.v-data-table tbody tr td, thead tr th {
    padding: 0px !important;
    font-size: 0.8rem;
}
</style>
