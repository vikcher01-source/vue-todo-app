<template>
  <div class="px-6 py-4 bg-gray-50 flex items-center justify-between">
    <!-- Счетчик активных задач -->
    <div class="text-sm text-gray-600">
      <span class="font-semibold">{{ todoStore.activeCount }}</span>
      {{ todoStore.activeCount === 1 ? 'task' : 'tasks' }} left
    </div>

    <!-- Статистика -->
    <div class="text-sm text-gray-500">
      Total: {{ todoStore.todos.length }} tasks
    </div>

    <!-- Кнопка очистки выполненных задач -->
    <button
      v-if="hasCompletedTodos"
      @click="handleClearCompleted"
      class="text-sm text-red-500 hover:text-red-700 font-medium transition"
    >
      Clear completed
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()

// Проверяем есть ли выполненные задачи
const hasCompletedTodos = computed(() => {
  return todoStore.todos.some(todo => todo.completed)
})

// Обработчик очистки с подтверждением
const handleClearCompleted = () => {
  const completedCount = todoStore.todos.filter(t => t.completed).length
  if (confirm(`Delete ${completedCount} completed task(s)?`)) {
    todoStore.clearCompleted()
  }
}
</script>
