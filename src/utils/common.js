import { Base64 } from 'js-base64';
import wx from 'weixin-js-sdk'
import config from '@/config/config'
import {sharekey} from '@/api/apiAdr'

//处理请求数据
export function decideData(data){
    if(data.respCode == '00'){
        if(data.bizData == null){
            location.href="404.html?error=1"
            return;
        }else{
            return data.bizData;
        }
    }else if(data.respCode == 'F002'){
        location.href="404.html?error=1"
        return;
    }else if(data.respCode == 'F010'){ 
        location.href="404.html?error=3&req=F010"
        return;
    }else if(data.respCode == 'F012'){
        location.href="404.html?error=3&req=F012"
        return;
    }else if(data.respCode == 'F021'){
        //没有交易记录
        return;
    }else if(data.respCode == 'F027'){  //微信未查到关联账户
        return data.bizData;
    }else if(data.respCode == '500'){
        debugger;
        location.href="404.html?error=2&req=500"
        return;
    }else{
        // console.log(data);
        // location.href="404.html?error=3&req=other"
        // return;
        /* SUCCESS("00", "成功"), 
        B8("B8", "缺少必传参数"), 
        FAIL("F001", "失败"), 
        NO_ACTIVITY("F002", "活动不存在"), 
        MSG_CODE_ERROR("F003", "验证码错误"),
        MSG_CODE_FAST("F004", "验证码输入速度过快"), 
        NO_UESR("F005", "会员不存在"),
        NO_CARD("F006", "会员没有卡"), 
        EXPIRY_DATE_ERROE("F007", "不在活动有效期内"),
        STATUS_ERROE("F008", "活动状态异常"),
        NETWORK_EXCEPTION("F009", "网络异常"),
        SYSTEM_ERROR("F010", "系统异常"),
        NOT_SUFFICIENT("F011","点标数量不足"),
        NO_RECOND("F012", "无记录"), 
        OUT_OF_RECEIVE_LIMIT("F013","超出点标领取上线"),
        ASK_FAIL("F014","索要失败"),
        SEND_EXCESSIVE("F015", "超过赠送最大限度"),
        RECEIVE_EXCESSIVE("F016", "超过领取最大限度"),
        SEND_RISK_NO_PASS("F017", "赠送人风控验证未通过"),
        ASK_RISK_NO_PASS("F018", "接收人风控验证未通过"),
        GTPT_RESP_FAIL("F019", "请求沟通平台未返回成功"),
        CHECK_KEY_FAIL("F020", "key校验失败"),
        NO_STAMP_RECOND("F021", "无点标交易记录"),
        TASK_COMPLETED("F022", "任务已经完成"),
        TASK_OVERDUE("F023", "任务已经过期"),
        MEMBER_MSG_ERROR("F024","用户信息异常"),
        SEND_CHECKAPP_NO_PASS("F025","CHECKAPP校验失败"),
        TASK_STATUS_ERROR("F026","任务状态异常"),
        OPENID_NO_USER("F027","openId未查到关联用户"), */

    }
}
//生成随机数
export function random(num){
    let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let res = "";
    for(var i = 0; i < num ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += chars[id];
    }
    return res;
}
//通用H5跳转
export const h5To = (pageId,pageValue) => {
    let page = Base64.encode('{"pageId":"'+pageId+'","pageValue":"'+pageValue+'"}');
    location.href=`nexuscommon://gotopage?params=${page}}`
}
//app分享
export const sharePage = (data) => {
    var platVal = ["WeiXin","WeiXinFriends"];
    let giveY = location.href.includes('give.html');
    if(giveY){
        platVal.push("PhoneNo");
    }
    const obj = {
        platformType:platVal,
        title:data.title,
        shareDesc:data.shareDesc,
        thumImage:data.thumImage,
        shareUrl:config.shareUrl+data.shareName,
        shareStatus: 1,
    }
    const base64 = Base64.encode(JSON.stringify(obj));
    var url=`${config.nativeShareUrl}${base64}`;
    location.href=url;
}
//微信分享
export function shareWechat(shareData){
    sharekey({url:encodeURIComponent(location.href)}).then(({data}) => {
        let authorData = JSON.parse(data.data).bizData;
        wx.config({
            debug: false,
            appId: authorData.appId,
            timestamp: authorData.timestamp,
            nonceStr: authorData.nonceStr,
            signature: authorData.signature,
            jsApiList: [
                'checkJsApi',
                'updateAppMessageShareData',
                'updateTimelineShareData',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow'
            ]
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
        // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行
        // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function(){
            if(!location.href.includes('sendTo.html')){
                wx.hideMenuItems({
                    menuList: [
                        //'menuItem:share:timeline',
                        'menuItem:share:qq',
                        'menuItem:share:QZone',
                        'menuItem:share:weiboApp',
                        'menuItem:openWithQQBrowser',
                        'menuItem:openWithSafari',
                        'menuItem:copyUrl'
                        //'menuItem:share:timeline'
                    ]
                });
                wx.updateAppMessageShareData({
                    title: shareData.title,     // 分享标题
                    desc: shareData.desc,       // 分享描述
                    imgUrl: shareData.imgUrl,   // 分享图标
                    link: config.shareUrl+shareData.link,       // 分享链接
                    success: function () { 
                        // 弹窗"分享成功"
                        // 隐藏半透明图
                    }
                });
                // 朋友按钮
                wx.updateTimelineShareData({
                    title: shareData.title,     // 分享标题
                    desc: shareData.desc,       // 分享描述
                    imgUrl: shareData.imgUrl,   // 分享图标
                    link: config.shareUrl+shareData.link,       // 分享链接
                    // type: 'link',    // 分享类型,music、video或link，不填默认为link
                    // dataUrl: '',     // 如果type是music或video，则要提供数据链接，默认为空
                    success:() => { 
                        // 弹窗"分享成功"
                        // 隐藏半透明图
                    }
                });
            }else{
                wx.hideAllNonBaseMenuItem()
            }
        });
    });
}

//获取域名
export function getUrlMain(){
    var domain = document.domain;
    return "https://"+domain;
}
// 获取url参数
export function getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    // var r = window.location.search.substr(1).match(reg); 
    var r = location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}
//验证手机号
export function isMobile(mobileNum){
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(mobileNum);
}
// 千分位
export function formatNumberRgx(num) {  
    var parts = num.toString().split(".");  
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
    return parts.join(".");  
} 

export function checkNum(input) {
    var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
    if (!re.test(input)) {
        return false;
    }else{
        return true;
    }
}

// 对象深拷贝
export function cloneObj(obj) {  
    var newObj = {};  
    if (obj instanceof Array) {  
        newObj = [];  
    }  
    for (var key in obj) {  
        var val = obj[key];  
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。  
        newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
    }  
    return newObj;  
}

// 手机号合法性检测
/* export function checkMobilePhone11(mobilePhone) {
    var varMobilePhone = $.trim(mobilePhone);
    var mobilePhone2 = parseInt(varMobilePhone, 10);
    var bool = false;
    var regexStr = /^1[2,3,4,5,6,7,8,9]\d{9}$/;
    if (mobilePhone2.toString().length == 11
            && eval(regexStr).test(mobilePhone2)) {
        bool = true;
    }
    return bool;
} */

//根据对象属性排序
export function compare(property){
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
  }
}