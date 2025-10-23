<template>
  <div class="divide-y divide-gray-200">
    <!-- Сообщение если задач нет -->
    <div
      v-if="todoStore.filteredTodos.length === 0"
      class="p-12 text-center text-gray-400"
    >
      <div class="text-6xl mb-4">📝</div>
      <p class="text-lg">
        {{ getEmptyMessage() }}
      </p>
    </div>

    <!-- Список задач -->
    <TransitionGroup name="list" tag="div">
      <TodoItem
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        :todo="todo"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()

// Функция для получения сообщения в зависимости от фильтра
const getEmptyMessage = () => {
  switch (todoStore.filter) {
    case 'active':
      return 'No active tasks. Great job! 🎉'
    case 'completed':
      return 'No completed tasks yet.'
    default:
      return 'No tasks yet. Add one above!'
  }
}
</script>

<style scoped>
/* Анимация для списка задач */
.list-enter-active {
  animation: slideIn 0.3s ease-out;
}

.list-leave-active {
  transition: all 0.3s ease;
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
