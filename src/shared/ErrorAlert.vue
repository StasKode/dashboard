<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<template>
  <div class="error-alert">
    {{ message }}
  </div>
</template>

<style scoped>
.error-alert {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid var(--danger);
  color: #fecaca;
  background: #1b1212;
  border-radius: 10px;
}
</style>


