import { useStore,createStore } from 'vuex';
import Taro from '@tarojs/taro';
// Create a new store instance.
const store = createStore({
  state () {
    return {
      photos: [],
      myfollow: []
    }
  },
  mutations: {//处理同步
    LOAD_PHOTOS_MUTATIONS:(state,photos)=>{
      
      if(state.photos.length==0){
        for(var k in photos){
          photos[k].is_follow = false;
        }
      }

      state.photos.push(photos);

      for(var i=1;i<state.photos.length;i++){
        for(var j=0;j<state.photos[i].length;j++){
          state.photos[i][j].is_follow = false;
          state.photos[0].push(state.photos[i][j]);
        }
        state.photos.splice(i,1)
      }
    },
    ADD_TO_MYFOLLOW:(state,index)=>{
      if(state.photos[0][index].is_follow == false){
        state.photos[0][index].is_follow= true;
        state.photos[0][index].photos_index = index;
        state.myfollow.push(state.photos[0][index])
        Taro.showToast({
          title: '已添加至收藏夹',
          icon: 'success',
          duration: 500
        })
      }
    },
    DEL_MYFOLLOW:(state,{id,index})=>{
      Taro.showToast({
        title: '已从收藏夹清除',
        icon: 'none',
        duration: 1000
      })
      for (let item in state.myfollow){
        if(state.myfollow[item].id==id){
          state.myfollow.splice(item,1)
          state.photos[0][index].is_follow=false;
        }
      }
    },
    UPDATE_MYFOLLOW:(state,myfollow)=>{
      Taro.showToast({
        title: '图库更新成功',
        icon: 'none',
        duration: 1000
      })
      state.myfollow = myfollow
    },
    CHANGE_PHOTOS_TO_MYFOLLOW:(state)=>{
      for(let pho in state.photos[0]){
        for(let fol in state.myfollow)
          if(state.photos[0][pho].id==state.myfollow[fol].id){
            state.photos[0][pho].is_follow=state.myfollow[fol].is_follow
        }
      }
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
        url,
      });
      context.commit("LOAD_PHOTOS_MUTATIONS",res.data);
      context.commit("CHANGE_PHOTOS_TO_MYFOLLOW",context.myfollow);
      return res.data;
    }
  }
})

export default store