<template>
  <view class="index">
    <view class="title">PHOTO-LIBRARY<nut-icon name="my" style="" size="30px" @tap="GoMy"/></view>
    <view class="line"/>
    <view v-if="loading">
        <nut-icon name="loading"/>
    </view>
      <view-block v-else class="content infiniteUl" id="content">
        <nut-infiniteloading
          containerId = 'content'
          :is-open-refresh="false"
          load-txt="loading"
          :has-more="hasMore"
          @load-more="load"
        >
          <!-- <nut-backtop bottom="100" id="backtop">
            <template v-slot:content> -->
              <view-block v-for="(item,index) in photos[0]" :key="item.id" class="item infiniteLi">
                  <img class="image" :src="`https://picsum.photos/id/${item.id}/1000`" @tap="GoDetails(item,index)">
                  <view class="image_info">
                    <view class="author">{{item.author}}</view>
                    <view>{{item.url}}</view>
                  </view>
                  <nut-icon name="addfollow" :key="item.id" class="follow" :color="item.is_follow == false ? 'blue' : 'red'" @tap="addfollow(index)"/>
              </view-block>
            <!-- </template>
          </nut-backtop> -->
        </nut-infiniteloading>
      </view-block>
  </view>
</template>

<script lang="ts">
import { ref,onMounted,computed } from 'vue';
import {useStore} from 'vuex';
import Taro from '@tarojs/taro';
export default {
  name: 'Index',
  setup(){
    const store = useStore();
    const loading = ref(false);
    const page = ref(0);
    const hasMore = ref(true);

    const photos = computed(()=> store.state.photos)
    const load = (done) => {
      setTimeout(() => {
        loadMore()
        done()
      }, 1000);
    }

    const loadMore = async ()=>{
      loading.value = true;
      page.value++;
      console.log("load");
      try{
          const res = store.dispatch('LOAD_PHOTOS_ACTIONS',{page : page.value})
      }catch(error){
          console.log(error)
          hasMore.value = false;
      }finally{
          loading.value = false;
      }
    }
    const addfollow = (index)=>{
      store.commit("ADD_TO_MYFOLLOW",index)
    }

    const GoDetails = (info,index)=>{
      Taro.navigateTo({
        url: `/pages/details/index?id=${info.id}&index=${index}&is_follow=${info.is_follow}`
      })
    }
    const GoMy = ()=>{
      Taro.switchTab({
        url:`/pages/homepage/index`
      })
    }

    // const scrollTop = ()=>{
    //   Taro.pageScrollTo({
    //     scrollTop: 0,
    //     duration: 300
    //   })
    //   console.log("置顶")
    // }
    onMounted(()=>{
      loadMore();
    });
    
    return({
      loading,
      photos,
      hasMore,
      addfollow,
      // scrollTop,
      loadMore,
      GoDetails,
      GoMy,
      load
    })
  }
  
}

</script>

<style lang="scss">
.index {
  font-family: 'Work Sans', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100vh;
  .title{
      justify-content: center;
      margin:10px 0 20px 0;
      font-size:3ex;
      font-weight: bolder;
      .nut-icon{
        margin-left:200rpx;
      }
  }
  .line{
      border:gray solid 2px;
      width: 99%;
      height:2rpx;
      display: block;
  }
  .content{
    text-align:left;
    // margin-top:20rpx;
    .item{
      display:flex;margin:20px 2px 10px 2px;position: relative;
      .image{
      width:50%;
      height:175px;
      display: inline-block;
      }
      .image_info{
        position:absolute;
        width:50%;
        top: 50%;
        height:100%;
        transform: translate(100%,-50%);
        text-align: center;
        word-break:break-all; /*支持IE，chrome，FF不支持*/
        word-wrap:break-word;/*支持IE，chrome，FF*/
        .author{
          margin-top: 20px;
          font-size:19px;
          font-weight:bold;
          margin-bottom: 20px;
        }
      }
      .follow{
        font-size: 20px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
  .infiniteUl {
      height: 90%;
      max-height: 90%;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
  }
  .nut-infinite-bottom{
    padding: 0;
  }
}
</style>
