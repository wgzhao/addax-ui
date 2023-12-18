<template>
<nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
        <img src='https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg' width="30">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link"  aria-current="page" :to="{name: 'Home'}">Home</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'ETL'}">SP监控</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            主表配置
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#ods">ODS 采集</a></li>
            <li><a class="dropdown-item" href="#sp">SP 计算</a></li>
            <li><a class="dropdown-item" href="#ds">数据服务</a></li>
            <li><a class="dropdown-item" href="#cron">计划任务</a></li>
            <li><a class="dropdown-item" href="/dict/list">参数管理</a></li>
            <li><a class="dropdown-item" href="/impdb" >数据源管理</a></li>
            <li><a class="dropdown-item" href="#apimgt">接口管理</a></li>
            <li><a class="dropdown-item" href="#procedure">存储过程</a></li>
            <li><a class="dropdown-item" href="#trino">trino执行日志</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
</template>
<style>
    #nav a.router-link-active {
      color: #42b983;
    }
    .navbar-nav {
      display: flex;
      flex-direction: column;
    }
</style>