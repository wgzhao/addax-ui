<template>

    <div class="bg-blue-800 p-4">
      <pre>${{ $route.matched }}</pre>
            {{ $router.currentRoute.value }}
            <span v-for="(matched, idx) in this.$route.matched"
            :key="idx">
            <a 
            :href="matched.path">
            {{ matched.name }}
            </a>
            <span v-if="idx != Object.keys(this.$route.matched).length - 1"> / </span>
            </span>
    
      </div>      
    </template>