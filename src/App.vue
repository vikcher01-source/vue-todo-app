<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- Заголовок приложения -->
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold text-gray-800 mb-2">
          ✅ To-Do List
        </h1>
        <p class="text-gray-600">Organize your tasks efficiently</p>
      </div>

      <!-- Основной контейнер -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Форма добавления задачи -->
        <TodoInput />

        <!-- Фильтры -->
        <TodoFilters />

        <!-- Список задач -->
        <TodoList />

        <!-- Футер со счетчиком -->
        <TodoFooter />
      </div>

      <!-- Информация внизу -->
      <div class="text-center mt-6 text-gray-500 text-sm">
        <p>Built with Vue 3, Pinia, and Tailwind CSS</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoInput from './components/TodoInput.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
</script>
