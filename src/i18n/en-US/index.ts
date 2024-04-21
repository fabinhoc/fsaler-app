// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  validations: {
    required: 'This field is required',
    string: 'This field must not be a numeric value',
    number: 'This field must be numeric',
    email: 'This field must be a valid e-mail',
    minLength: {
      number: 'This field must be greater than {minLength}',
      string: 'This field must have at least {minLength} characters',
    },
    passwordConfirmation: 'Password and Password Confirmation does not match',
    date: 'Invalid date',
  },
  app: {
    projectName: 'FSaler',
    auth: {
      page: {
        login: {
          forgotPassword: 'Forgot my password',
          createAccount: "I don't have an account",
        },
      },
      component: {
        formLogin: {
          email: 'Email',
          password: 'Password',
          login: 'Login',
        },
      },
    },
  },
};
