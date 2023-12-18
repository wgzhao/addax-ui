<script setup>
import Login from './components/Login.vue';
import Nav from './components/Nav.vue'
</script>

<template>

    <Nav />
    <!-- <Layout />  -->
    <router-view></router-view>
    
</template>

<style>
body {
    margin: 10px;
}
/* #app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
} */
</style>
