<template>
  <div id="app">
    1 + 2 = {{ s }}
  </div>
  <div>
    <h6>data</h6>
    <v-data-table :items="data">
    </v-data-table>
  </div>

  <div>
    <h5>log</h5>
    {{ logfiles }}
  </div>
</template>

<script setup>
import {ref} from 'vue'
import demo from '@/service/demo'
const s = ref(0)
const data =  ref()
data.value = demo.sysRisks().result
console.log(data.value)
</script>