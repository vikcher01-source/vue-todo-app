import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Интерфейс для типизации задачи
export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

// Тип для фильтрации задач
export type FilterType = 'all' | 'active' | 'completed'

export const useTodoStore = defineStore('todo', () => {
  // Реактивное состояние для хранения задач
  const todos = ref<Todo[]>([])
  
  // Текущий активный фильтр
  const filter = ref<FilterType>('all')

  // Загружаем задачи из localStorage при инициализации
  const loadTodos = () => {
    const saved = localStorage.getItem('vue-todos')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Конвертируем строки дат обратно в объекты Date
        todos.value = parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }))
      } catch (e) {
        console.error('Ошибка при загрузке задач:', e)
      }
    }
  }

  // Сохраняем задачи в localStorage
  const saveTodos = () => {
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
  }

  // Вычисляемое свойство: количество активных задач
  const activeCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length
  })

  // Вычисляемое свойство: отфильтрованные задачи
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  // Добавление новой задачи
  const addTodo = (text: string) => {
    if (text.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(), // Используем timestamp как простой уникальный ID
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    }

    todos.value.push(newTodo)
    saveTodos()
  }

  // Переключение статуса выполнения задачи
  const toggleTodo = (id: number) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveTodos()
    }
  }

  // Удаление задачи
  const deleteTodo = (id: number) => {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
      saveTodos()
    }
  }

  // Редактирование текста задачи
  const editTodo = (id: number, newText: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo && newText.trim() !== '') {
      todo.text = newText.trim()
      saveTodos()
    }
  }

  // Удаление всех выполненных задач
  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
    saveTodos()
  }

  // Установка фильтра
  const setFilter = (newFilter: FilterType) => {
    filter.value = newFilter
  }

  // Инициализация: загружаем задачи при создании store
  loadTodos()

  return {
    todos,
    filter,
    activeCount,
    filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter
  }
})
