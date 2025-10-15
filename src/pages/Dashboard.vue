<script setup lang="ts">
import SearchBar from '../shared/SearchBar.vue'
import DocList from '../shared/DocList.vue'
import DocPreview from '../shared/DocPreview.vue'
import Loader from '../shared/Loader.vue'
import ErrorAlert from '../shared/ErrorAlert.vue'
import { useDocumentsStore } from '../stores/documents'

const store = useDocumentsStore()
</script>

<template>
  <section class="panel left-panel">
    <SearchBar @search="store.search" />
    <ErrorAlert v-if="store.error" :message="store.error" />
    <Loader v-if="store.loading" />
    <DocList :items="store.documents" :selectedId="store.selectedId" @select="store.select" />
  </section>
  <div class="divider"></div>
  <section class="panel preview">
    <DocPreview :doc="store.selected" @download="store.downloadSelected" @delete="store.deleteSelected" />
  </section>
</template>

<style scoped>
.left-panel {
  display: flex;
  flex-direction: column;
}
</style>


