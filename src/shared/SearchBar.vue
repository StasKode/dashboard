<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'search', value: string): void }>()
const q = ref('')

function onSubmit(e: Event) {
  e.preventDefault()
  emit('search', q.value.trim())
}
</script>

<template>
  <div>
    <h3 class="section-title">Поиск документа</h3>
    <form @submit="onSubmit">
      <input class="search-input" v-model="q" placeholder="Введите ID документа" />
    </form>
  </div>
</template>

<style scoped>
</style>


