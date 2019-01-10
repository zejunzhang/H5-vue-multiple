<template>
    <div class="error" v-if="error == '1'">
        <img src="../../assets/images/nohd.png" alt="">
        <p>暂时还没有点标活动呢</p>
        <button @click="callBack" v-if="memberId">回到首页</button>
    </div>
    <div class="error" v-else-if="error == '3'">
        <img src="../../assets/images/network.png" alt="">
        <p>网络好像不给力</p>
        <button @click="callBack" v-if="memberId">回到首页</button>
    </div>
    <div class="error" v-else>
        <img src="../../assets/images/false.png" alt="">
        <p>哎呀，页面加载失败啦~</p>
        <button @click="callBack" v-if="memberId">回到首页</button>
    </div>
    
</template>
<style lang="less" scoped>
        .error{
            width: 100%;
            padding: 30% 0 0 0;
            img{
                width: 50%;
                margin-left: 25%;
            }
            p{
                text-align: center;
            }
            button{
                width: 40%;
                margin-left: 30%;
                height: 3.2rem;
                line-height: 3.2rem;
                text-align: center;
                border: 0.1rem solid rgb(220,220,220);
                margin-top: 1rem;
                background: white;
                border-radius: 1.6rem;
            }
        }
</style>


<script>
import {getQueryString} from '@/utils/common'
export default {
    name:'error',
    data(){
        return {
            error:'',
            memberId:''
        }
    },
    mounted(){
        this.memberId = sessionStorage.memberId;
        this.error = getQueryString("error");
    },
    methods:{
        callBack(){
            location.href="./index.html?memberId="+sessionStorage.memberId;
        }
    }
}

</script>
