<script setup lang="ts">
import { ref, watch } from 'vue'
import type { DocItem } from '../stores/documents'

const props = defineProps<{ doc: DocItem | null }>()
const emit = defineEmits<{ (e: 'download'): void; (e: 'delete'): void }>()

const imageError = ref(false)
function onImageError(e: Event) {
  const img = e.target as HTMLImageElement
  if (!img) return
  img.src = '/placeholder-image.svg'
  imageError.value = true
}
function onImageLoad(e: Event) {
  const img = e.target as HTMLImageElement
  if (!img) return
  // Если загружен плейсхолдер, оставляем кнопку "Удалить" неактивной
  imageError.value = img.src.includes('placeholder-image.svg')
}
watch(() => props.doc?.image, () => { imageError.value = false })
</script>

<template>
  <div class="preview" v-if="doc">
    <div class="preview-body">
      <img
        :src="doc.image || '/placeholder-image.svg'"
        alt=""
        class="preview-image"
        @error="onImageError"
        @load="onImageLoad"
      />
      <div class="preview-details">
        <div class="preview-title">{{ doc.name }}</div>
        <div class="btns">
          <button class="btn primary" @click="emit('download')">Скачать</button>
          <button class="btn danger" :disabled="!doc.image || imageError" @click="emit('delete')">Удалить</button>
        </div>
        <div class="description-section">
          <div class="description-title">Описание:</div>
          <div class="description-text">{{ doc.description }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="empty-state">Выберите документ, чтобы посмотреть его содержимое</div>
</template>

<style scoped>
</style>


