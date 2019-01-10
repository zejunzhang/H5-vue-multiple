//封裝axios
import axios from 'axios'
import md5 from 'js-md5'
import config from '@/config/config'
import {random} from '@/utils/common.js'
// 创建axios实例
const $http = axios.create({
    baseURL: config.apiPath,    // 接口地址
    timeout: 20000,             // 请求超时时间
    withCredentials: false,      // 选项表明了是否是跨域请求
    headers:{
        'Content-Type': 'application/json'
    }
})
$http.interceptors.request.use(configer => {
    configer.data.activityType = config.activityType;
    //统一网关
    configer.data = {bizContent:configer.data};
    let parameters = JSON.stringify(configer.data);
    let requestId = random("8");
    let appId = 'EVENT201812H5'; //h5活动appId，其他请与后台约定
    let timestamp = new Date().getTime();
    let signature = md5(`requestId=${requestId}&appId=${appId}&timestamp=${timestamp}&reqType=eventcenter&tokenId=null&parameters=${parameters}`)
    if(configer.method != 'OPTION' || !location.href.includes('open.weixin.qq.com')){
        configer.headers['requestId'] = `${requestId}`;
        configer.headers['appId'] = `${appId}`;
        configer.headers['timestamp'] = `${timestamp}`;
        configer.headers['reqType'] = 'eventcenter';          //代表h5活动，其他请与后台约定
        configer.headers['signMethod'] = 'md5';
        configer.headers['signature'] = `${signature}`;
        return configer;
    }
})

$http.interceptors.response.use(response => {
    if (response.status === 200) {
        return response;
    }else{
        console.log("200其他错误")
    }
}, function (error) {
    location.href='./404.html?error=2&req=request';
    return Promise.reject(error);
});

  
export default {
    // get(url, data) {     //连接网关后只能请求post
    //     return $http({ method: 'get', url, params: data })
    // },
    post(url, data) {
        return $http({ method: 'post', url, data })
    }
}
  