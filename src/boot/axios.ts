import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

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
const api = axios.create({ baseURL: process.env.API_URL });
api.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
api.defaults.headers.common['X-Localization'] =
  localStorage.getItem('user-lang') ?? 'pt-BR';
const key = '@ARN:token';
api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
  key
)}`;

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === 401) {
        const key = '@ARN:token';
        localStorage.setItem(key, '');
      }
    }
  );
});

export { api };
