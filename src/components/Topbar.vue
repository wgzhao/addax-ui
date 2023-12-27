<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

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
        <ul class="navbar-nav mr-auto">


            <li class="nav-item">
                <router-link class="nav-link" aria-current="page" :to="{ name: 'Home' }">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Home</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'ETL' }">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">采集监控</span></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'spmonitor' }">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">SP监控</span></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'taskgroup' }">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">任务组</span></router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'risk' }">
                    <i class="fas fa-fw fa-chart-area"></i>
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">风险点</span></router-link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">主表配置</span>
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#ods">ODS 采集</a></li>
                    <li><router-link class="dropdown-item" :to="{name: 'impsp'}">SP 计算</router-link></li>
                    <li><a class="dropdown-item" href="#ds">数据服务</a></li>
                    <li><router-link class="dropdown-item" :to="{name: 'plantask'}">计划任务</router-link></li>
                    <li><a class="dropdown-item" href="/dict/list">参数管理</a></li>
                    <li><router-link class="dropdown-item" :to="{name: 'impdb'}">数据源管理</router-link></li>
                    <li><a class="dropdown-item" href="#apimgt">接口管理</a></li>
                    <li><a class="dropdown-item" href="#procedure">存储过程</a></li>
                    <li><a class="dropdown-item" href="#trino">trino执行日志</a></li>
                </ul>
            </li>
            
            </ul>
            <ul class="navbar-nav ml-auto">
                 <!-- Nav Item - Alerts -->
            <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-bell fa-fw"></i>
                    <!-- Counter - Alerts -->
                    <span class="badge badge-danger badge-counter">3+</span>
                </a>
            </li>

            <!-- Nav Item - Messages -->
            <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-envelope fa-fw"></i>
                    <!-- Counter - Messages -->
                    <span class="badge badge-danger badge-counter">7</span>
                </a>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>
            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                    <img class="img-profile rounded-circle" src="/src/assets/images/undraw_profile.svg">
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

    </nav>
    <!-- End of Topbar -->
</template>