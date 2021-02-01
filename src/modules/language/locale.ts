import { Dictionary } from '../../types/typings';

const locale: Dictionary<any> = {
  // login form
  loginForm: {
    loginTitle: {
      en: 'login',
      ru: 'вход',
      bel: 'уваход',
    },
    emailPlaceholder: {
      en: 'E-mail',
      ru: 'E-mail адрес',
      bel: 'Адрас E-mail',
    },
    passPlaceholder: {
      en: 'Password',
      ru: 'Пароль',
      bel: 'Пароль',
    },
    submitBtn: {
      en: 'Log In',
      ru: 'Войти',
      bel: 'Увайсці',
    },
    metaTitle: {
      en: 'Don\'t have an account?',
      ru: '',
      bel: '',
    },
    metaLink: {
      en: 'Sign up',
      ru: 'Зарегистрироваться',
      bel: 'Зарэгістравацца',
    },
  },
  // register form
  register: {
    registerTitle: {
      en: 'Register',
      ru: 'Зарегистрироваться',
      bel: 'Зарэгістравацца',
    },
    registerNamePlaceholder: {
      en: 'Name',
      ru: 'Имя',
      bel: 'Імя',
    },
    registerSignup: {
      en: 'Sign up',
      ru: 'Отправить',
      bel: 'Адправіць',
    },
    meta: {
      haveAccount: {
        en: 'Already have an account?',
        ru: 'Есть аккаунт?',
        bel: 'Ёсць акаўнт?',
      },
      login: {
        en: 'Log in',
        ru: 'Войти',
        bel: 'Увайсці',
      },
    },
  },
  // block names
  income: {
    blockName: {
      ru: 'доходы',
      en: 'income',
      bel: 'даходы',
    },
    totalAmount: {
      ru: 'получено',
      en: 'received',
      bel: 'атрымана',
    },
    planAmount: {
      ru: 'бюджет расходов',
      en: 'budget',
      bel: 'бюджэт выдаткаў',
    },
  },

  accounts: {
    blockName: {
      ru: 'счета',
      en: 'accounts',
      bel: 'рахункі',
    },
    totalAmount: {
      ru: 'баланс',
      en: 'balance',
      bel: 'баланс',
    },
  },

  expenses: {
    blockName: {
      ru: 'расходы',
      en: 'expenses',
      bel: 'выдаткі',
    },
    totalAmount: {
      ru: 'потрачено',
      en: 'spent',
      bel: 'выдаткавана',
    },
    planAmount: {
      ru: 'бюджет',
      en: 'budget',
      bel: 'бюджэт',
    },
  },
  // add new item popup
  addNewSource: {
    noEmptyFields: {
      en: 'This field should not be empty',
      ru: 'Поле должно быть заполнено',
      bel: 'Поле павінна быць запоўнена',
    },

    income: {
      title: {
        ru: 'Новый источник дохода',
        en: 'New income source',
        bel: 'Новая крыніца даходу',
      },
      itemName: {
        ru: 'Название источника дохода',
        en: 'Income source name',
        bel: 'Назва крыніцы даходу',
      },
      amount: {
        ru: 'Планируемая сумма дохода',
        en: 'Planned income amount',
        bel: 'Планаваная сума даходу',
      },
    },

    accounts: {
      title: {
        ru: 'Новый счет',
        en: 'New account',
        bel: 'Новы рахунак',
      },
      itemName: {
        ru: 'Название счета',
        en: 'Account name',
        bel: 'Назва рахунку',
      },
      amount: {
        ru: 'Какая сумма на счете',
        en: 'Current amount',
        bel: 'Якая сума на рахунку',
      },
    },

    expenses: {
      title: {
        ru: 'Новая категория расхода',
        en: 'New expense category',
        bel: 'Новая катэгорыя расходу',
      },
      itemName: {
        ru: 'Название категории расхода',
        en: 'Expense category name',
        bel: 'Назва катэгорыі расходу',
      },
      amount: {
        ru: 'Сколько планируете потратить?',
        en: 'Planning to spend per month',
        bel: 'Колькі плануеце выдаткаваць?',
      },
    },
  },

  // update user category popup
  updateUserCat: {
    income: {
      title: {
        ru: 'Обновить источник дохода',
        en: 'Update income source',
        bel: 'Абнавіць крыніцу даходу',
      },
    },

    accounts: {
      title: {
        ru: 'Обновить счет',
        en: 'Update account',
        bel: 'Абнавіць крыніцу',
      },
    },

    expenses: {
      title: {
        ru: 'Обновить категорию расходов',
        en: 'Update expense category',
        bel: 'Абнавіць катэгорыю расходаў',
      },
    },
  },

  // menu
  menu: {
    logout: {
      en: 'Log out',
      ru: 'Выйти',
      bel: 'Выйсці',
    },
  },

  // popup
  updateBtn: {
    en: 'Update',
    ru: 'Обновить',
    bel: 'Абнавіць',
  },

  addBtn: {
    en: 'Add',
    ru: 'Добавить',
    bel: 'Дадаць',
  },

  // transaction move form
  move: {
    labelFrom: {
      en: 'From',
      ru: 'Из',
      bel: 'З',
    },

    labelTo: {
      en: 'To',
      ru: 'В',
      bel: 'У',
    },

    labelAmount: {
      en: 'Amount',
      ru: 'Сумма',
      bel: 'Сума',
    },

    labelDate: {
      en: 'Date',
      ru: 'Дата',
      bel: 'Дата',
    },

    labelComment: {
      en: 'Comment',
      ru: 'Комментарий',
      bel: 'Каментар',
    },

    submitBtn: {
      en: 'Submit',
      ru: 'Отправить',
      bel: 'Адправіць ',
    },
  },

  chart: {
    selectItems: [
      {
        id: 'incExpTotal',
        en: 'Total Income & Expenses',
        ru: 'Суммарные Доходы и Расходы',
        bel: 'Сумарныя Даходы і Выдаткі',
        catType: [1, 3],
      },
      {
        id: 'incTotal',
        en: 'Total Income',
        ru: 'Суммарные Доходы',
        bel: 'Сумарныя Даходы',
        catType: [1],
      },
      {
        id: 'expTotal',
        en: 'Total Expenses',
        ru: 'Суммарные Расходы',
        bel: 'Сумарныя Выдаткі',
        catType: [3],
      },
      {
        id: 'exp',
        en: 'Expenses by category',
        ru: 'Расходы по категориям',
        bel: 'Выдаткі па катэгорыях',
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
          bel: 'Выдаткі па катэгорыях',
        },
        {
          id: 'month',
          en: 'Group by Month',
          ru: 'Группировка по Месяцам',
          bel: 'Групоўка па месяцах',
        },
        {
          id: 'year',
          en: 'Group by Year',
          ru: 'Группировка по Годам',
          bel: 'Групоўка па Годам',
        },
      ],
      titel: {
        en: 'Group by',
        ru: 'Группировка по',
        bel: 'Групоўка па',
      },
    },
  },

  // days of the week
  weekdays: {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ru: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    bel: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацвер', 'Пятніца', 'Субота'],
  },

  months: {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    bel: ['Cтудзень', 'Люты', 'Сакавік', 'Красавік', 'Май', 'Чэрвень', 'Ліпень',
      'Жнівень', 'Верасень', 'Кастрычнік', 'Лістапад', 'Снежань'],
  },
  currency: {
    en: '$',
    ru: '₽',
    bel: 'BYN',
  },

  // moves class
  moves: {
    total: {
      en: 'Total',
      ru: 'Итого',
      bel: 'Усяго',
    },
  },

  // automatic data load
  autoData: {
    en: 'Load Random Data',
    ru: 'Cлучайные данные',
    bel: 'Выпадковыя дадзеныя',
  },

};

export default locale;
