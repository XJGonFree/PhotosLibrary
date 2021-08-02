<template>
    
    <view v-if="info" class="index">
        <nut-icon class="follow_o_del" :name="is_follow == 'false' ? 'addfollow' : 'del'" @tap="is_follow == 'false' ? addfollow(index) : delfollow(id,index)" />
        <nut-navbar  @on-click-back="GoIndex" title="图片详情"></nut-navbar>
        <img class="resize" :src="`https://picsum.photos/id/${id}/2000`" alt="">
        <view class="content">
            <view class="title">作者</view>
                <view class="infomage">{{info.author}}</view>
            <view class="title">像素比</view>
                <view class="infomage">{{info.width}}:{{info.height}}</view>
            <view class="title">博客地址</view>
                <view class="infomage">{{info.url}}</view>
        </view>
    </view>
</template>
<script>
import {ref,onMounted } from 'vue'
import Taro from '@tarojs/taro'
import {useStore} from 'vuex'
export default {
    name: 'detail',
    setup(){
        const store = useStore();
        const res = ref([]);
        const info = ref([]);
        const id = ref(0);
        const index = ref(0);
        const is_follow = ref(false);
        const getConnect = async()=>{
            id.value = Taro.getCurrentInstance().router.params.id;
            index.value = Taro.getCurrentInstance().router.params.index;
            is_follow.value = Taro.getCurrentInstance().router.params.is_follow;
            const url = `https://picsum.photos/id/${id.value}/info`
            try{
                res.value = await Taro.request({url})
            }catch(error){
                console.log(error)
            }finally{
                info.value = res.value.data
            }
        }

        const addfollow = (index)=>{
            is_follow.value = 'true'
            store.commit("ADD_TO_MYFOLLOW",index)
        }
        
        const delfollow = (id,index)=>{
            is_follow.value = 'false'
            store.commit("DEL_MYFOLLOW",{id:id,index:index})
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
            index,
            is_follow,
            addfollow,
            delfollow,
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
    .nut-navbar{
        margin:0;
        // height:-webkit-fill-available;
        height: 20%;
    }
    .follow_o_del{
        position:absolute;
        z-index:99;
        right: 4%;
        top: 2%;
        font-size: 20px;
        font-weight: bolder;
    }
</style>