import { createApp } from 'vue'
import { router } from './router/router.js'
import App from './App.vue'
import axios from 'axios'

// createApp(App).mount('#app')
const app = createApp(App);
app.config.globalProperties.axios = axios
app.use(router)
app.mount('#app')