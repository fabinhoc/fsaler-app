// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Erro executar ação',
  success: 'Salvo com sucesso',
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
    product: {
      component: {
        productForm: {
          name: 'Nome',
          nameHint: 'Ex: Travesseiro, toalha de mesa, almofada...',
          category: 'Categoria',
          categoryHint: '',
          ean: 'Código de barras',
          eanHint: '',
          price: 'Preço final',
          priceHint: 'Preço final de venda',
          costPrice: 'Preço de custo',
          costPriceHint: '',
          description: 'Descrição',
          descriptionHint: 'Cor branco, tamanho king, ...',
          purchaseDate: 'Data da compra',
          purchaseDateHint: 'dd/mm/yyyy',
          quantity: 'Quantidade',
          quantityHint: '',
          noResults: 'Sem resultados.',
          save: 'Salvar',
          cancel: 'Cancelar',
        },
      },
    },
    client: {
      component: {
        clientForm: {
          name: 'Nome',
          nameHint: 'Digite o nome do cliente',
          phoneNumber: 'Celular',
          phoneNumberHint:
            'Utilize um número de whatsapp para melhor interação com o app',
          description: 'Descrição',
          descriptionHint: '',
          noResults: 'Sem resultados.',
          save: 'Salvar',
          cancel: 'Cancelar',
        },
      },
    },
  },
};
