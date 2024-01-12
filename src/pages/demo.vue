<template>
  <div id="app">
    1 + 2 = {{ s }}
  </div>
  <span>
    <v-icon>mdi-dots-vertical</v-icon>
  </span>
</template>

<script>
import {ref} from 'vue'
import demo from '@/service/demo'
const s = ref(0)
s.value = demo.calc(1,2);
</script>