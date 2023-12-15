<script setup>
import Login from './components/Login.vue';
import Nav from './components/Nav.vue'
</script>

<template>
    <div>
        <div class="row">
            <Nav />
        </div>
        <!-- <Layout />  -->
        <div class="row">
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
.content {
    margin-top: 50px;
}
</style>
