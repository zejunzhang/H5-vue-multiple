import dev from "./config-dev";
import prd from "./config-prd";
import test from "./config-test";
let baseUrl={};
const obj={
    loginNative : 'nexuscommon://gotoLogin?params={param1:"", param2:""}',//app登录
    nativeShareUrl : 'nexusshare://share?params=',//app分享
    activityType:'1004', //活动类型
    register:'https://m-uat2.maxxipoint.com/regist/member/register.do',
    simple:'https://a.app.qq.com/o/simple.jsp?pkgname=com.maxxipoint.android',//应用宝
    card:'20', //电子卡
    login:'35', //登录
}
// const env =  process.env.npm_lifecycle_event;
// if(env === 'build'){
//     baseUrl = Object.assign(obj, prd);
// }else if(env === 'build-test'){
//     baseUrl = Object.assign(obj, test);
// }else{
//     baseUrl = Object.assign(obj, dev);
// }
if(location.href.includes('static.maxxipoint.com')){
    baseUrl = Object.assign(obj, prd);
}else if(location.href.includes('image-uat.maxxipoint.com') || location.href.includes('image-uat2.maxxipoint.com')){
    baseUrl = Object.assign(obj, test);
}else{
    baseUrl = Object.assign(obj, dev);
}
export default baseUrl;