<template>
  <view class="index">
    <view class="title">PHOTO-LIBRARY</view>
    <view class="line"/>
    <view v-if="loading">
      <nut-icon name="loading"/>
    </view>
    <view v-else class="content" id="content">
      <!-- <nut-infiniteloading
      containerId = 'content'
      :is-open-refresh="false"
      load-txt="loading"
      :has-more="hasMore"
      @load-more="loadMore"
      > -->
      <view>
        <view v-for="(item) in photos" :key="item.id" class="item" >
            <img class="image" :src="`https://picsum.photos/id/${item.id}/1000`" @click="GoDetails(item)">
            <view class="image_info">
              <view class="author">{{item.author}}</view>
              <view>{{item.url}}</view>
              <nut-icon class="goTop" name="top" @click="scrollTop"/>
            </view>
        </view>
      </view>
      <!-- </nut-infiniteloading> -->
    </view>
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
    const loadMore = async ()=>{
      loading.value = true;
      page.value++;
      try{
          const res = store.dispatch('LOAD_PHOTOS_ACTIONS',{page : 1})
      }catch(error){
          console.log(error)
          hasMore.value = false;
      }finally{
          loading.value = false;
      }
    }

    const GoDetails = (info)=>{
      Taro.navigateTo({
        url: `/pages/details/index?id=${info.id}`
      })
    }

    const scrollTop = ()=>{
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
    onMounted(()=>{
      loadMore();
    });
    
    return({
      loading,
      photos,
      hasMore,
      scrollTop,
      loadMore,
      GoDetails
    })
  }
  
}

</script>

<style lang="scss">
.index {
  font-family: 'Work Sans', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .title{
        justify-content: center;
        margin:20px auto;
        font-size:3ex;
        font-weight: bolder;
  }
  .line{
      border:gray solid 2px;
      width: 99%;
      height:2rpx;
      display: block;
  }
  .content{
    text-align:left;
    margin-top:20rpx;
    .item{
      display:flex;margin:20px 2px;position: relative;
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
          font-size:19px;
          font-weight:bold;
          margin-bottom: 20px;
        }
      }
      .goTop{
        font-size: 20px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
}
</style>
