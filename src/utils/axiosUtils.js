import axios from 'axios';
axios.defaults.baseURL = 'http://www.diningspace.cn:8087';
axios.defaults.timeout = 30000

import { Toast} from "mint-ui";

axios.interceptors.request.use((config) => {
  console.info('***********1111***********');
  console.info('进入请求拦截器');
  console.info('***********2222***********');
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {

  if(response.status == 200){
    return response.data
  }else{
    Toast({
      message: '网络连接异常,请检验您的网络连接',
      position: 'bottom',
      duration: 2000
    });
  }

}, function (error) {
  console.info('***********1111***********');
  console.info(error);
  console.info('***********2222***********');
  // if (axios.isCancel(error)) {
  //   requestList.length = 0
  //   store.dispatch('changeGlobalState', {loading: false})
  //   throw new axios.Cancel('cancel request')
  // } else {
  //   window.ELEMENT.Message.error('网络请求失败', 1000)
  // }
  Toast({
    message: '网络连接异常,请检验您的网络连接11111',
    position: 'bottom',
    duration: 2000
  });
  return Promise.reject(error)
})


export default class axiosRequest {

  static async getRequest(params) {
    // console.info('进入axios.get')
    const response = await axios.get(params.url,{});
    return response;
  }

  static async postRequest(params) {
    // console.info('进入axios.post')
    const response = await axios.post(params.url, params);
    return response;
  }
}

