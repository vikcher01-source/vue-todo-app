import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

// Создаем экземпляр Pinia для управления состоянием
const pinia = createPinia()

// Инициализируем Vue приложение
const app = createApp(App)

// Подключаем Pinia к приложению
app.use(pinia)

// Монтируем приложение в DOM
app.mount('#app')
