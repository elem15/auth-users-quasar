import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { HOST } from 'src/constants';
import { setAuthStorage } from 'src/composables/setAuthStorage';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: HOST });
const authApi = axios.create({ baseURL: HOST });
authApi.interceptors.request.use(async (config) => {
  const exp = sessionStorage.getItem('exp');
  let accessToken = sessionStorage.getItem('accessToken');
  if (!exp || +exp < Date.now() + 5000) {
    try {
      const user = localStorage.getItem('user');
      if (!user) throw new Error('User not saved');
      const { refreshToken } = JSON.parse(user);
      const res = await api.get('/auth/refresh', { headers: { Authorization: `Bearer ${refreshToken}` } });
      setAuthStorage(res.data);
      accessToken = res.data.accessToken;
    } catch {
      throw new Error('Error user credentials update')
    }
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
})
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, authApi };
