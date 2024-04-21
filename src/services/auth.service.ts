import { useAuthStore } from 'src/stores/auth.store';
import { LoginDto } from 'src/types/dto/Login.dto';
import { storeToRefs } from 'pinia';
import useApi from 'src/composables/UseApi';
import { RegisterDto } from 'src/types/dto/Register.dto';
import { ResetPasswordDto } from 'src/types/dto/ResetPassword.dto';
import { ForgotPasswordDto } from 'src/types/dto/ForgotPassword.dto';
import { useRouter } from 'vue-router';

export default function useAuthService() {
  const router = useRouter();

  const login = async (payload: LoginDto) => {
    try {
      const { isLoggedIn } = storeToRefs(useAuthStore());
      if (isLoggedIn.value) return true;
      const { post } = useApi('login');
      const { data } = await post(payload);
      data.user.token = data.access_token;
      const { authenticate } = useAuthStore();
      authenticate(data.user, data.token);
    } catch (error: unknown) {
      throw error;
    }
  };

  const register = async (payload: RegisterDto) => {
    try {
      const { post } = useApi('auth/register');
      const { user, token } = await post(payload);
      const { authenticate } = useAuthStore();
      authenticate(user, token);
    } catch (error: unknown) {
      throw error;
    }
  };

  const resendVerification = () => {
    try {
      const { post } = useApi('auth/email/verification-notification');
      return post('');
    } catch (error: unknown) {
      throw error;
    }
  };

  const verifyEmail = (url: string) => {
    try {
      url = url.replace(process.env.API_URL as string, '');
      const { get } = useApi(url);
      return get();
    } catch (error: unknown) {
      throw error;
    }
  };

  const resetPassword = (payload: ResetPasswordDto) => {
    try {
      const { post } = useApi('auth/reset-password');
      return post(payload);
    } catch (error: unknown) {
      throw error;
    }
  };

  const forgotPassword = (payload: ForgotPasswordDto) => {
    try {
      const { post } = useApi('auth/forgot-password');
      return post(payload);
    } catch (error: unknown) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { post } = useApi('logout');
      const { logout } = useAuthStore();
      await post('');
      await logout();
      router.push({ name: 'login' });
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    login,
    register,
    resendVerification,
    verifyEmail,
    resetPassword,
    forgotPassword,
    logout,
  };
}
