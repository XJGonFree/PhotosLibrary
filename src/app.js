import { createApp } from 'vue'
import NutUI from '@nutui/nutui-taro';
import '@nutui/nutui-taro/dist/style.css';
import store from './store/index'
import './app.scss'
import Taro from "@tarojs/taro"

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(NutUI).use(store)

export default App
