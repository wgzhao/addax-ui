<template>
  <v-container>
    <v-row>
      <!-- 添加新标签页的按钮 -->
      <v-btn color="primary" @click="addTab">添加标签页</v-btn>
    </v-row>

    <v-divider class="my-4" />
    
    <!-- 标签页 -->
    <v-tabs v-model="activeTab">
      <!-- 动态创建每个标签 -->
      <v-tab
        v-for="tab in tabs"
        :key="tab.id"
        class="d-flex align-items-center"
      >
        <!-- 标签标题 -->
        <span>{{ tab.title }}</span>

        <!-- 关闭图标 -->
        <!-- 防止冒泡切换 -->
        <v-btn
          icon
          size="x-small"
          class="ml-2"
          @click.stop="removeTab(tab.id)"  
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-tab>
    </v-tabs>

    <!-- 标签页内容 -->
    <v-tabs-items v-model="activeTab">
      <!-- 对应每个标签页的内容 -->
      <v-tab-item v-for="tab in tabs" :key="tab.id">
        <v-card>
          <v-card-title>{{ tab.title }}</v-card-title>
          <v-card-text>
            <p>这是标签页 "{{ tab.title }}" 的内容</p>
            <v-btn color="secondary" @click="addTab">
              新建标签页
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Tab {
  id: string; // 唯一 ID
  title: string; // 标签名称
}

// 当前激活的标签
const activeTab = ref(0);

// 标签页数据
const tabs = ref<Tab[]>([
  { id: 'tab-1', title: '默认标签页' }, // 默认初始标签页
]);

// 添加标签页
function addTab() {
  const newTabId = `tab-${tabs.value.length + 1}`;
  tabs.value.push({
    id: newTabId,
    title: `标签页 ${tabs.value.length + 1}`,
  });

  // 切换到新添加的标签页
  activeTab.value = tabs.value.length - 1;
}

// 删除标签页
function removeTab(tabId: string) {
  const tabIndex = tabs.value.findIndex((tab) => tab.id === tabId);
  if (tabIndex !== -1) {
    tabs.value.splice(tabIndex, 1);

    // 如果当前激活的标签被关闭，需要重新调整激活状态
    if (activeTab.value >= tabs.value.length) {
      activeTab.value = tabs.value.length - 1; // 切换到最后一个标签
    } else if (tabIndex <= activeTab.value) {
      activeTab.value = Math.max(0, activeTab.value - 1); // 切换到前一个标签
    }
  }
}
</script>

<style scoped>
.v-btn {
  margin-left: 5px; /* 调整关闭按钮的间距 */
}
</style>
