import { createStore } from 'vuex'
import Taro from '@tarojs/taro'
// Create a new store instance.
const store = createStore({
  state () {
    return {
      photos: [],
    }
  },
  mutations: {//处理同步
    LOAD_PHOTOS_MUTATIONS:(state,photos)=>{
      state.photos = photos;
    }
  },
  actions:{//处理异步
    /**
     * async 是在es7中定义的  将原本promise then的写法逻辑 变得更清晰
    async 函数 实质返回的是promise对象，原理相同
    函数再碰到await声明时 需等待结束后再执行
     */
    LOAD_PHOTOS_ACTIONS:async (context,{page =1 , limit =30})=>{
      /**
       * 此处写法是方便设网页请求所需参数，例如头header 和 一些其他参数
      */
      const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
      const res = await Taro.request({
        url
      });
      context.commit("LOAD_PHOTOS_MUTATIONS",res.data);
      return res.data;
    }
  }
})

export default store