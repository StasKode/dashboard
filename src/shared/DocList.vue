<script setup lang="ts">
import type { DocItem } from '../stores/documents'

defineProps<{ items: DocItem[]; selectedId: number | null }>()
const emit = defineEmits<{ (e: 'select', id: number): void }>()

function formatFileSizeMb(sizeMb?: number): string {
  if (typeof sizeMb === 'number') return `${sizeMb} MB`
  return ''
}
</script>

<template>
  <div>
    <h3 class="section-title results-title">Результаты</h3>
    <div class="list">
      <div v-if="items.length === 0" class="muted">Ничего не найдено</div>
      <div v-for="item in items" :key="item.id" class="list-item" :class="{ selected: item.id === selectedId }" @click="emit('select', item.id)">
        <div class="thumb" :class="{ 'has-image': item.image }">
          <img
            :src="item.image || '/placeholder-image.svg'"
            alt=""
            @error="($event.target as HTMLImageElement).src = '/placeholder-image.svg'"
          />
        </div>
        <div class="item-content">
          <div class="title">{{ item.name }}</div>
          <div class="file-size">{{ formatFileSizeMb(item.sizeMb) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results-title {
  margin: 33px 0 18px;
}
</style>


