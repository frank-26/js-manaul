import axios from 'axios';
import { message } from 'antd';
// import { userMobx } from 'models/user/user.mobx';

const defaultHeader = {
  'Content-Type': 'application/json'
};

interface FetchInterface {
  method: string;
  endpoint?: string;
  data?: object;
  authToken?: string;
  headers?: object;
  url: string;
  params?: object;
}

export default function fetch<T>({
  method,
  endpoint,
  data = {},
  headers = defaultHeader,
  ...others
}: FetchInterface): Promise<T> {
  return new Promise((resolve, reject) => {
    axios({
      method,
      baseURL: endpoint,
      data,
      headers,
      ...others
    })
      .then(res => {
        if (res.status >= 200 && res.status < 400) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          message.info('用户权限过期，需重新认证');
          // userMobx.reAuth(endpoint);
        } else {
          let errorMessage = err.message;
          if (err.response) {
            errorMessage = err.response.data.msg;
          }
          message.error(errorMessage!);
          reject(err);
        }
      });
  });
}
