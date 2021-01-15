const locale = {
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

  chart: {
    selectItems: [
      {
        id: 'incExp',
        en: 'Income & Expenses',
        ru: 'Доходы и расходы',
      },
      {
        id: 'inc',
        en: 'Income',
        ru: 'Доходы',
      },
      {
        id: 'exp',
        en: 'Expenses',
        ru: 'Расходы',
      },
    ],
  },

};

export default locale;
