<template>
  <div
    class="group px-6 py-4 hover:bg-gray-50 transition duration-150"
    :class="{ 'bg-gray-50': todo.completed }"
  >
    <div class="flex items-center gap-3">
      <!-- Checkbox для отметки выполнения -->
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="todoStore.toggleTodo(todo.id)"
        class="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />

      <!-- Текст задачи или поле редактирования -->
      <div class="flex-1 min-w-0">
        <input
          v-if="isEditing"
          v-model="editText"
          @blur="saveEdit"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
          ref="editInput"
          type="text"
          class="w-full px-3 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p
          v-else
          @dblclick="startEdit"
          :class="[
            'text-gray-800 break-words cursor-pointer select-none',
            { 'line-through text-gray-400': todo.completed }
          ]"
        >
          {{ todo.text }}
        </p>
        
        <!-- Дата создания задачи -->
        <p class="text-xs text-gray-400 mt-1">
          Created: {{ formatDate(todo.createdAt) }}
        </p>
      </div>

      <!-- Кнопки действий -->
      <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <!-- Кнопка редактирования -->
        <button
          v-if="!isEditing && !todo.completed"
          @click="startEdit"
          class="p-2 text-blue-500 hover:bg-blue-50 rounded transition"
          title="Edit task"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        <!-- Кнопка удаления -->
        <button
          @click="handleDelete"
          class="p-2 text-red-500 hover:bg-red-50 rounded transition"
          title="Delete task"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import type { Todo } from '../stores/todoStore'

// Props для получения данных задачи
const props = defineProps<{
  todo: Todo
}>()

const todoStore = useTodoStore()

// Состояние редактирования
const isEditing = ref(false)
const editText = ref('')
const editInput = ref<HTMLInputElement | null>(null)

// Начать редактирование задачи
const startEdit = () => {
  editText.value = props.todo.text
  isEditing.value = true
  // Фокусируем поле ввода после рендера
  nextTick(() => {
    editInput.value?.focus()
  })
}

// Сохранить изменения
const saveEdit = () => {
  if (editText.value.trim() && editText.value !== props.todo.text) {
    todoStore.editTodo(props.todo.id, editText.value)
  }
  isEditing.value = false
}

// Отменить редактирование
const cancelEdit = () => {
  isEditing.value = false
  editText.value = ''
}

// Удаление задачи с подтверждением
const handleDelete = () => {
  // Можно добавить подтверждение для важных задач
  if (confirm('Are you sure you want to delete this task?')) {
    todoStore.deleteTodo(props.todo.id)
  }
}

// Форматирование даты для отображения
const formatDate = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  // Для старых задач показываем полную дату
  return new Date(date).toLocaleDateString()
}
</script>
