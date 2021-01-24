const locale = {
  // login form
  loginForm: {
    loginTitle: {
      en: 'login',
      ru: 'вход',
    },
    emailPlaceholder: {
      en: 'E-mail',
      ru: 'E-mail адрес',
    },
    passPlaceholder: {
      en: 'Password',
      ru: 'Пароль',
    },
    submitBtn: {
      en: 'Log In',
      ru: 'Войти',
    },
    metaTitle: {
      en: 'Don\'t have an account?',
      ru: '',
    },
    metaLink: {
      en: 'Sign up',
      ru: 'Зарегистрироваться',
    },
  },
  // register form
  register: {
    registerTitle: {
      en: 'Register',
      ru: 'Зарегистрироваться',
    },
    registerNamePlaceholder: {
      en: 'Name',
      ru: 'Имя',
    },
    registerSignup: {
      en: 'Sign up',
      ru: 'Отправить',
    },
    meta: {
      haveAccount: {
        en: 'Already have an account?',
        ru: 'Есть аккаунт?',
      },
      login: {
        en: 'Log in',
        ru: 'Войти',
      },
    },
  },
  // block names
  income: {
    blockName: {
      ru: 'доходы',
      en: 'income',
    },
    totalAmount: {
      ru: 'получено',
      en: 'received',
    },
    planAmount: {
      ru: 'бюджет расходов',
      en: 'budget',
    },
  },

  accounts: {
    blockName: {
      ru: 'счета',
      en: 'accounts',
    },
    totalAmount: {
      ru: 'в наличии',
      en: 'balance',
    },
  },

  expenses: {
    blockName: {
      ru: 'расходы',
      en: 'expenses',
    },
    totalAmount: {
      ru: 'потрачено',
      en: 'spent',
    },
    planAmount: {
      ru: 'бюджет',
      en: 'budget',
    },
  },
  // add new item popup
  addNewSource: {

    income: {
      title: {
        ru: 'Новый источник дохода',
        en: 'New income source',
      },
      itemName: {
        ru: 'Название источника дохода',
        en: 'Income source name',
      },
      amount: {
        ru: 'Планируемая сумма дохода',
        en: 'Planned income amount',
      },
    },

    accounts: {
      title: {
        ru: 'Новый счет',
        en: 'New account',
      },
      itemName: {
        ru: 'Название счета',
        en: 'Account name',
      },
      amount: {
        ru: 'Какая сумма на счете',
        en: 'Current amount',
      },
    },

    expenses: {
      title: {
        ru: 'Новая категория расхода',
        en: 'New expense category',
      },
      itemName: {
        ru: 'Название категории расхода',
        en: 'Expense category name',
      },
      amount: {
        ru: 'Сколько планируете потратить?',
        en: 'Planning to spend per month',
      },
    },
  },

  // update user category popup
  updateUserCat: {
    income: {
      title: {
        ru: 'Обновить источник дохода',
        en: 'Update income source',
      },
    },

    accounts: {
      title: {
        ru: 'Обновить счет',
        en: 'Update account',
      },
    },

    expenses: {
      title: {
        ru: 'Обновить категорию расходов',
        en: 'Update expense category',
      },
    },
  },

  // menu
  menu: {
    logout: {
      en: 'Log out',
      ru: 'Выйти',
    },
  },

  // popup
  updateBtn: {
    en: 'Update',
    ru: 'Обновить',
  },

  addBtn: {
    en: 'Add',
    ru: 'Добавить',
  },

  // transaction move form
  move: {
    labelFrom: {
      en: 'From',
      ru: 'Из',
    },

    labelTo: {
      en: 'To',
      ru: 'В',
    },

    labelAmount: {
      en: 'Amount',
      ru: 'Сумма',
    },

    labelDate: {
      en: 'Date',
      ru: 'Дата',
    },

    labelComment: {
      en: 'Comment',
      ru: 'Комментарий',
    },
  },

  chart: {
    selectItems: [
      {
        id: 'incExpTotal',
        en: 'Total Income & Expenses',
        ru: 'Суммарные Доходы и Расходы',
        catType: [1, 3],
      },
      {
        id: 'incTotal',
        en: 'Total Income',
        ru: 'Суммарные Доходы',
        catType: [1],
      },
      {
        id: 'expTotal',
        en: 'Total Expenses',
        ru: 'Суммарные Расходы',
        catType: [3],
      },
      {
        id: 'exp',
        en: 'Expenses by category',
        ru: 'Расходы по категориям',
        catType: [3],
        userCat: 0,
      },
    ],
    selectTimes: {
      data: [
        {
          id: 'day',
          en: 'Group by Day',
          ru: 'Группировка по Дням',
        },
        {
          id: 'month',
          en: 'Group by Month',
          ru: 'Группировка по Месяцам',
        },
        {
          id: 'year',
          en: 'Group by Year',
          ru: 'Группировка по Годам',
        },
      ],
      titel: {
        en: 'Group by',
        ru: 'Группировка по',
      },
    },
  },

  // days of the week
  weekdays: {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  },

  months: {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  },
  currency: {
    en: '$',
    ru: '₽',
  },

};

export default locale;
