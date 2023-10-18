//axios封装
import axios from 'axios';
import {notification} from "antd";

export const image_url = 'http://43.134.172.92'
export const init_url = 'http://43.134.172.92'
// export const init_url = 'http://10.10.20.45:10000'

const request = (option: any,signal=undefined,pass=false) => {
  return new Promise(async (resolve, reject) => {
    const instance = axios.create({
        baseURL: init_url,
        timeout: 10000,
        signal
    });
    //请求拦截
    instance.interceptors.request.use(
      async (config: any) => {
        const token = 'd86f137fdf3d46c69451f0901376cfb1'
        if (token){
            config.headers['oes-token'] = token;
        }
        return config;
      },
      (err: any) => {
        console.log(err);
      },
    );
    //响应拦截
    instance.interceptors.response.use(
      (config: any) => {
        return config;
      },
      (err: any) => {
          // Toast.show({type:'error',text1:'Server Error',text2:"Please contact developer for assistance\n"+err.message})
        reject(err);
      },
    );
    instance(option)
      .then(async(res: any) => {
          // console.log('response',res)
        if (res && res.status === 200) {
        //     useStore.getState().setLoading(false)
        //     //当需要使用error, code, msg时，打开pass直接获取整个数据
            if (pass){
                resolve(res.data)
                return
            }
          if (res.data.code === 200) {
            // Toast.show({type:'success',text1:res.data.code+'',text2:res.data.msg})
            resolve(res.data.data);
          }
          else {
            reject(res.data);
            console.log('error code: ', res.data.code);
          }
        }
        else{
            notification.error({
                message: 'network error',
            })
        }
      })
      .catch((err: any) => {
        reject(err);

      });
  }) as any;
};

export default request;
