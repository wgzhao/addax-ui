<template>
    <!-- 调度和命令日志 -->
    <v-card>
            <v-card-title>
                <span class="text-h5">调度/命令日志</span>
            </v-card-title>
            <v-card-text>
                <ul>
                <template v-for="(f, index) in props.d">
                <li><a href="#" :key="index" @click="getContent(f)">{{ f }}</a></li>
                </template>
                </ul>
                <v-spacer></v-spacer>
                <!-- file content-->
                <div v-if="fContent">
                    <h6>{{ filename }}</h6>
                    <pre>{{ fContent }}</pre>
                </div>
            </v-card-text>
        </v-card>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios';
const props = defineProps(["d"])
const fContent = ref()
const filename = ref()
const getContent = (f) => {
    axios.get("/log/logFileContent", {
        params: {
            f: f
        }
        })
        .then(res => { fContent.value = res.data; filename.value = f; return res.data; });
}
</script>
<style>
    
</style>