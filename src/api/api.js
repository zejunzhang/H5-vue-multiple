const api = {
        'list': 'activity/stamp/list',                  //点标列表
        'particulars': 'activity/stamp/particulars',    //点标详情
        'dealDetail': 'activity/stamp/dealDetail',      //点标交易明细
        'ask': 'activity/stamp/ask',                    //进入索要/赠送页面
        'sendMsgCode': 'activity/stamp/sendSmsCode',    //验证码
        'send': 'activity/stamp/send',                  //发起赠送任务接口
        'authorization': 'weChatAuth/authorization',    //微信授权
        'getMemberInfo': 'activity/stamp/getMemberInfo',//根据微信授权查openId
        'askPage': 'activity/stamp/askPage',            //赠送分享页面
        'receive': 'activity/stamp/receive',            //领取点标
        'askTask': 'activity/stamp/askTask',            //索要点标
        'sendToAsk': 'activity/stamp/sendToAsk',        //索要分享的送他点标接口
        'sharekey': 'weChatAuth/sharekey',              //分享签名地址
}
export default api;