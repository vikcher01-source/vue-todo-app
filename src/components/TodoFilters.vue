<template>
  <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
    <div class="flex justify-center gap-2">
      <!-- Кнопки фильтрации -->
      <button
        v-for="filterOption in filters"
        :key="filterOption.value"
        @click="todoStore.setFilter(filterOption.value)"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition duration-200',
          todoStore.filter === filterOption.value
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        ]"
      >
        {{ filterOption.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'
import type { FilterType } from '../stores/todoStore'

const todoStore = useTodoStore()

// Варианты фильтрации
const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' }
]
</script>
