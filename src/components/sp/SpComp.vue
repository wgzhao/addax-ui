<template>
  <slot name="hello">
    <table class="table table-stripped">
      <thead>
        <th>场景类别</th>
        <th>名称</th>
      </thead>
      <tbody>
        <template v-for="d in form">
          <tr>
            <td>{{ d.kind }}</td>
            <td>{{ d.used }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </slot>
</template>

<script setup lang="ts">
defineProps(["form"]);
</script>
