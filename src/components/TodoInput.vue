<template>
  <div class="p-6 border-b border-gray-200">
    <form @submit.prevent="handleSubmit" class="flex gap-3">
      <!-- Поле ввода новой задачи -->
      <input
        v-model="newTodo"
        type="text"
        placeholder="What needs to be done?"
        class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        maxlength="200"
      />
      
      <!-- Кнопка добавления -->
      <button
        type="submit"
        class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!newTodo.trim()"
      >
        Add
      </button>
    </form>

    <!-- Подсказка о количестве символов -->
    <div v-if="newTodo.length > 0" class="mt-2 text-xs text-gray-500 text-right">
      {{ newTodo.length }} / 200 characters
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const newTodo = ref('')

// Обработка отправки формы
const handleSubmit = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value)
    // Очищаем поле после добавления
    newTodo.value = ''
  }
}
</script>
