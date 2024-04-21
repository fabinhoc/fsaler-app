// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  validations: {
    required: 'Este campo é obrigatório',
    string: 'Este campo não pode ser numérico',
    number: 'Este campo deve ser numério',
    email: 'Este campo deve conter um e-mail válido',
    minLength: {
      number: 'Este campo deve ser pelo menos {minLength}',
      string: 'Este campo deve ter pelo menos {minLength} caracteres',
    },
    passwordConfirmation: 'Senha e confirmação de senha não conferem',
    date: 'Data inválida',
  },
  app: {
    projectName: 'FSaler',
    auth: {
      page: {
        login: {
          forgotPassword: 'Esqueci minha senha',
          createAccount: 'Criar conta',
        },
      },
      component: {
        formLogin: {
          email: 'E-mail',
          password: 'Senha',
          login: 'Entrar',
        },
      },
    },
  },
};
