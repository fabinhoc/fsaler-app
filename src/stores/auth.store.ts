import { defineStore } from 'pinia';
import { UserType } from 'src/types/User.type';
import { api } from 'src/boot/axios';

const userPrefix = '@ARN:user';
const tokenPrefix = '@ARN:token';

const storageUser = localStorage.getItem(userPrefix) ?? '';
const user = localStorage.getItem(userPrefix)
  ? (JSON.parse(storageUser) as UserType)
  : ({} as UserType);
const token = localStorage.getItem(userPrefix) as string;

export const useAuthStore = defineStore('login', {
  state: () => ({
    user: user,
    token: token,
  }),
  actions: {
    authenticate(user: UserType, token: string) {
      try {
        this.user = user;
        this.token = token;

        localStorage.setItem(userPrefix, JSON.stringify(user));
        localStorage.setItem(tokenPrefix, token);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error: unknown) {
        throw error;
      }
    },

    logout() {
      localStorage.setItem(userPrefix, '');
      localStorage.setItem(tokenPrefix, '');
      this.user = {} as UserType;
      this.token = '';
      api.defaults.headers.common['Authorization'] = '';
    },

    setUser(user: UserType) {
      this.user = user;
      localStorage.setItem(userPrefix, JSON.stringify(user));
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.token && !!state.user.email_verified_at;
    },
  },
});
