<template>
<div id="app">
    <v-app>
  
      <v-data-table 
        ref="mytable"
        show-select
        select-strategy="single"
        v-model="selected"
        :headers="headers"
        :items="desserts"
        disable-pagination
        class="elevation-1"
        item-value="name"
        @click:row="(item, slot) => rowSelected(slot.index)"
      >
      
      </v-data-table>
      
      <h5>Selected: {{selected}}</h5>
    </v-app>
  </div>
  </template>
<script setup>
import { ref } from 'vue'
const selected = ref([])
const selectedRows=ref([])
const idx = ref()
const mytable = ref()
const headers= ref([
        {
          title: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { title: 'Calories', value: 'calories' },
        { title: 'Fat (g)', value: 'fat' },
        { title: 'Carbs (g)', value: 'carbs' },
        { title: 'Protein (g)', value: 'protein' },
        { title: 'Iron (%)', value: 'iron' },
      ])
const  desserts = ref([
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ])

const rowClick = (item, row) => {
    idx.value = row.index

}

const showCmd = (e, row) => {
    console.log(idx)
}

const rowSelected = (v, row) => {
    console.log(v)
    
}
</script>
<style></style>