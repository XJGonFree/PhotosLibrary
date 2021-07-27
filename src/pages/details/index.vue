<template>
    <view v-if="info" class="index">
        <img class="resize" :src="`https://picsum.photos/id/${id}/2000`" alt="">
        <view class="content">
            <view class="title">作者</view>
                <view class="infomage">{{info.author}}</view>
            <view class="title">像素比</view>
                <view class="infomage">{{info.width}}:{{info.height}}</view>
            <view class="title">博客地址</view>
                <view class="infomage">{{info.url}}</view>
        </view>
        <nut-button size="large" shape="square" @click="GoIndex">返回</nut-button>
    </view>
</template>
<script>
import {ref,onMounted } from 'vue'
import Taro from '@tarojs/taro'
export default {
    name: 'detail',
    setup(){
        const res = ref([]);
        const info = ref([]);
        const id = ref(0);

        const getConnect = async()=>{
            id.value = Taro.getCurrentInstance().router.params.id
            const url = `https://picsum.photos/id/${id.value}/info`
            try{
                res.value = await Taro.request({url})
            }catch(error){
                console.log(error)
            }finally{
                info.value = res.value.data
            }
        }
        const GoIndex = ()=>{
            Taro.navigateBack({
                delta: 2
            })
        }
        onMounted(()=>{
            getConnect()
        })
        return({
            info,
            id,
            GoIndex
        })
    }
}
</script>
<style lang="scss">
    
    .resize{
        max-width: 100%;
        height: 340px;
        width: 95%;
        margin: 10px;
        border-radius: 8px;
        box-shadow: 0 13px 27px -5px hsl(240deg 30% 28% / 25%), 0 8px 16px -8px hsl(0deg 0% 0% / 30%), 0 -6px 16px -6px hsl(0deg 0% 0% / 3%);
    }
    .content{
        font-family: 'Work Sans', sans-serif;;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        .title{
            font-size:26px;
        }
    }
    .content view{
        margin: 20px;
    }
</style>