import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'
import { Button, message, Drawer, List, Menu } from 'ant-design-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
app.use(Drawer)
app.use(List)
app.use(Menu)
app.mount('#app')

app.config.globalProperties.$message = message
