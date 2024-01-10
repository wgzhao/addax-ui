<template>
    <nav class="navbar navbar-expand bg-primary topbar mb-4 static-top" data-bs-theme="dark">

        <!-- Sidebar Toggle (Topbar) -->
        <!-- <form class="form-inline">
            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                <i class="fa fa-bars"></i>
            </button>
        </form> -->

        <!-- Topbar Search -->
        <!-- <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                    aria-label="Search" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </form> -->

        <!-- Topbar Navbar -->
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
            <ul class="navbar-nav mb-1 mb-log-0">

            <!-- generator nav item from $router -->
            <template v-for="item in $router.options.routes">
                <div v-if="item.children">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-fw" :class="item.icon"></i>
                            <span class="pl-1 mr-2 d-none d-lg-inline text-gray-600 small">{{  item.title }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <template v-for="child in item.children">
                                <li><router-link class="dropdown-item" :to="{name: child.name}">
                                    <i class="fa-solid" :class="child.icon"></i>
                                    <span class="pl-1 mr-2 d-none d-lg-inline">{{ child.title }}</span>
                                </router-link>
                            </li>
                            </template>
                        </ul>
                    </li>
                </div>
                <div v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: item.name }">
                            <i class="fa-solid " :class="item.icon"></i>
                            <span class="pl-1 mr-2 d-none d-lg-inline text-gray-600 small">{{ item.title }}</span>
                        </router-link>
                    </li>
                </div>
            </template>
            </ul>
            <ul class="navbar-nav ml-auto">
                 <!-- Nav Item - Alerts -->
            <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa-solid fa-bell fa-fw"></i>
                    <!-- Counter - Alerts -->
                    <span class="position-absolute  translate-middle badge rounded-pill bg-danger">3+</span>
                </a>
            </li>

            <!-- Nav Item - Messages -->
            <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-envelope fa-fw"></i>
                    <!-- Counter - Messages -->
                    <span class="position-absolute  translate-middle badge rounded-pill bg-danger">7</span>
                </a>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>
            <!-- Nav Item - User Information -->
            <NavbarThemeSwitcher class="me-2" />
            <li class="nav-item dropdown no-arrow">

                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                    <img class="img-profile rounded-circle" width="80%" src="/src/assets/images/undraw_profile.svg">
                </a>
                <!-- Dropdown - User Information -->
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        Settings
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        Activity Log
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                    </a>
                </div>
            </li>

        </ul>
        </div>
        </div>
    </nav>
    
    <!-- End of Topbar -->
</template>
<script setup>
import NavbarThemeSwitcher from './NavbarThemeSwitcher.vue'
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
   background-color:rgb(26, 81, 182);
   color: white;
 }
</style>