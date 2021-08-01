<template>
    <nut-navbar  @on-click-back="GoIndex" title="个人主页"></nut-navbar>
    <view class="content">
        <view-block v-for="(item,index) in follows" :key="item.id" class="item infiniteLi">
            <img class="image" :src="`https://picsum.photos/id/${item.id}/1000`" @tap="GoDetails(item)">
            <view class="image_info">
                <view class="author">{{item.author}}</view>
                <view>{{item.url}}</view>
            </view>
            <nut-icon name="del" class="delfollow" @tap="delfollow(item.id,item.photos_index)"/>
        </view-block>
    </view>
</template>
<script>
import {ref,computed,onMounted,} from "vue"
import {useStore} from "vuex"
import Taro from "@tarojs/taro"
export default {
    name: 'my',
    setup() {
        
        const store = useStore();

        const follows = computed(()=>store.state.myfollow)

        const delfollow = (id,index)=>{
            store.commit("DEL_MYFOLLOW",{id:id,index:index})
        }

        
        onMounted(() => {
            try {
                let value = Taro.getStorageSync('data')
                
                if (value) {
                    // Do something with return value
                    store.commit("UPDATE_MYFOLLOW",JSON.parse(value))
                }
            } catch (e) {
            // Do something when catch error
                console.log(e)
            }

        })

        const GoIndex = ()=>{
            Taro.switchTab({
                url:`/pages/index/index`,
                success:()=>{
                    Taro.setStorage({
                        key:"data",
                        data:JSON.stringify(follows.value)
                    })
                    console.log("存储完毕")
                }
            })
        }
        const GoDetails = (info)=>{
            Taro.navigateTo({
                url: `/pages/details/index?id=${info.id}&index=${info.photos_index}&is_follow=${info.is_follow}`
            })
        }
        return({
            follows,
            delfollow,
            GoIndex,
            GoDetails
        })

    }
}
</script>
<style lang="scss">
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
      .delfollow{
        font-size: 20px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
</style>