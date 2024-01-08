<template>
    <v-data-table-virtual
    :items="form"
    :headers="headers"
    height="300"
    >
    </v-data-table-virtual>
</template>

<script setup>
defineProps(['form', 'header'])
const headers = ref([
        { title: '场景类别', value: 'kindName' },
        { title: '名称', value: 'used' },
    ])
</script>