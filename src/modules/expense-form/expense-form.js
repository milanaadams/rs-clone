import create from '../utils/create';

export default class ExpenseForm {
  constructor(parent) {
    this.parent = parent;
    this.elements = {};
    this.createExpenseForm();
  }

  createExpenseForm() {
    this.elements.expenseForm = create('form', 'expense-form', null, this.parent);
    this.elements.expenseFormInner = create('div', 'expense-form__inner', null, this.elements.expenseForm);

    this.elements.expenseFormFrom = create('div', 'expense-form__item', null, this.elements.expenseFormInner);
    create('label', 'expense-form__label', 'From', this.elements.expenseFormFrom);
    create('input', 'expense-form__input', null, this.elements.expenseFormFrom);

    this.elements.expenseFormTo = create('div', 'expense-form__item', null, this.elements.expenseFormInner);
    create('label', 'expense-form__label', 'To', this.elements.expenseFormTo);
    create('input', 'expense-form__input', null, this.elements.expenseFormTo);

    this.elements.expenseFormAmount = create('div', 'expense-form__item', null, this.elements.expenseFormInner);
    create('label', 'expense-form__label', 'Amount', this.elements.expenseFormAmount);
    create('input', 'expense-form__input', null, this.elements.expenseFormAmount);

    this.elements.expenseFormDate = create('div', 'expense-form__item', null, this.elements.expenseFormInner);
    create('label', 'expense-form__label', 'Date', this.elements.expenseFormDate);
    create('input', 'expense-form__input', null, this.elements.expenseFormDate);

    this.elements.expenseFormTag = create('div', 'expense-form__item', null, this.elements.expenseFormInner);
    create('label', 'expense-form__label', 'Tag', this.elements.expenseFormTag);
    create('input', 'expense-form__input', null, this.elements.expenseFormTag);

    this.elements.expenseFormComment = create('div', 'expense-form__item', null, this.elements.expenseFormInner);
    create('label', 'expense-form__label', 'Comment', this.elements.expenseFormComment);
    create('input', 'expense-form__input', null, this.elements.expenseFormComment);
  }
}
