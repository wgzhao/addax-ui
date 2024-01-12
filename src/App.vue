<script setup>
import { useTheme } from 'vuetify'
import { hexToRgb } from './utils';
import defaultLayout from '@/layouts/default.vue'

const { global } = useTheme()

global.name.value = "dark"
</script>

<template>
    <v-app :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <defaultLayout />
</v-app>
</template>

<style>
.v-data-table tbody tr td, thead tr th {
    padding: 0px !important;
    font-size: 0.8rem;
}
</style>
