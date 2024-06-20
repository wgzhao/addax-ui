<template>
    <v-app-bar class="bg-primary">
        <template v-slot:default>
            <v-app-bar-title>统一采集管理系统</v-app-bar-title>
            <template v-for="item in $router.options.routes">
                <div v-if="item.children">
                    <v-menu open-on-hover v-if="item.children">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                flat
                                :to="{ name: item.name }"
                            >
                                {{ item.title }}</v-btn
                            >
                        </template>
                        <v-list v-for="child in item">
                            <v-list-item :to="{ name: child.name }">
                                {{ child.title }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <div v-else>
                    <v-btn flat :to="{ name: item.name }">
                        {{ item.title }}</v-btn
                    >
                </div>
            </template>
        </template>
    </v-app-bar>
    <!-- End of Topbar -->
</template>
<script setup>
import { useTheme } from "vuetify";
const { global } = useTheme();
// set the default theme
if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
    global.name.value = "dark";
} else {
    global.name.value = localStorage.getItem("theme");
}

const toggleTheme = () => {
    // global.name.value = themes.value[idx.value].name
    // currentTheme.toggleTheme()
    global.name.value = global.name.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", global.name.value);
};
</script>
