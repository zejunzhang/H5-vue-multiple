import api from './api'
import $http from '../utils/request'

export const actlist = (data) => {
    return $http.post(api.list,data);
}
export const particulars = (data) => {
    return $http.post(api.particulars,data);
}
export const dealDetail = (data) => {
    return $http.post(api.dealDetail,data);
}
export const sendMsgCode = (data) => {
    return $http.post(api.sendMsgCode,data);
}
export const send = (data) => {
    return $http.post(api.send,data);
}
export const receiveParticulars = (data) => {
    return $http.post(api.receiveParticulars,data);
}
export const getMemberInfo = (data) => {
    return $http.post(api.getMemberInfo,data);
}
export const receive = (data) => {
    return $http.post(api.receive,data);
}
export const askPage = (data) => {
    return $http.post(api.askPage,data);
}
export const ask = (data) => {
    return $http.post(api.ask,data);
}
export const askTask = (data) => {
    return $http.post(api.askTask,data);
}
export const sendToAsk = (data) => {
    return $http.post(api.sendToAsk,data);
}
export const sharekey = (data) => {
    return $http.post(api.sharekey,data);
}
export const authorization = (data) => {
    return $http.post(api.authorization,data);
}

