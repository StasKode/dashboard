import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../utils/api'

export interface DocItem {
  id: number
  name: string
  description: string
  image?: string | null
  sizeMb?: number
}

export const useDocumentsStore = defineStore('documents', () => {
  const documents = ref<DocItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedId = ref<number | null>(null)

  const selected = computed(() => documents.value.find(d => d.id === selectedId.value) ?? null)

  async function search(query: string) {
    error.value = null
    loading.value = true
    selectedId.value = null
    try {
      const res = await api.get<DocItem[]>('/user/docs', { params: { search: query } })
      // Сохраняем стабильный размер для каждого документа по id
      const prevSizeById = new Map<number, number>()
      for (const d of documents.value) {
        if (typeof d.sizeMb === 'number') prevSizeById.set(d.id, d.sizeMb)
      }
      documents.value = res.data.map((d) => {
        const existing = prevSizeById.get(d.id)
        const sizeMb = typeof existing === 'number' ? existing : Math.max(1, Math.min(15, Math.floor(Math.random() * 15) + 1))
        return { ...d, sizeMb }
      })
    } catch (e: any) {
      error.value = e?.response?.data?.message || e?.message || 'Ошибка запроса'
      documents.value = []
    } finally {
      loading.value = false
    }
  }

  function select(id: number) {
    selectedId.value = id
  }

  function downloadSelected() {
    if (!selected.value) return
    const blob = new Blob([selected.value.description], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selected.value.name}.txt`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function deleteSelected() {
    if (!selected.value) return
    if (!selected.value.image) return
    documents.value = documents.value.filter(d => d.id !== selected.value!.id)
    selectedId.value = null
  }

  return { documents, loading, error, selectedId, selected, search, select, downloadSelected, deleteSelected }
})


