import create from '../utils/create';
import locale from '../language/locale';
import Popup from '../popup/popup';
import config from '../../config';
import Abstract from '../abstract/abstract';

export default class MoneyMove extends Abstract {
  constructor(lang, category, dataModel) {
    super();
    this.currentCategory = category;
    this.dataModel = dataModel;
    this.inputInfo = {
      moveFrom: null,
      moveTo: null,
    };
    this.lang = lang;
    this.elements = {};
    this.loadTransferForm();
  }

  loadTransferForm() {
    this.loadToAndFromCategories();
    const fragment = document.createDocumentFragment();

    // const moveFrom = this.inputInfo.moveFrom ? this.inputInfo.moveFrom.name : '';
    // const moveTo = this.inputInfo.moveTo ? this.inputInfo.moveTo.name : '';

    this.elements.blockWrapper = create('div', 'move', null, fragment);
    this.elements.form = create('form', 'move-form', null, this.elements.blockWrapper);

    this.elements.moveFromBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelFrom[this.lang], this.elements.moveFromBlock);
    this.elements.formSelectFrom = create('select', 'move-form__select', null, this.elements.moveFromBlock);
    this.loadSelectOptions(this.categoriesFrom, this.elements.formSelectFrom,
      this.currentCategory.id);

    this.elements.moveToBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelTo[this.lang], this.elements.moveToBlock);
    this.elements.formSelectTo = create('select', 'move-form__select', null, this.elements.moveToBlock);
    this.loadSelectOptions(this.categoriesTo, this.elements.formSelectTo, this.currentCategory.id);

    this.elements.moveAmountBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelAmount[this.lang], this.elements.moveAmountBlock);
    this.elements.moveAmount = create('input', 'move-form__input', null, this.elements.moveAmountBlock, ['value', 1], ['type', 'number']);
    this.elements.moveAmount.setAttribute('step', '0.01');

    this.elements.moveDateBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelDate[this.lang], this.elements.moveDateBlock);
    this.elements.moveDate = create('input', 'move-form__input', null, this.elements.moveDateBlock, ['type', 'date']);
    this.elements.moveDate.valueAsDate = new Date();

    this.elements.moveCommentBlock = create('div', 'move-form__item move-form__item--long', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelComment[this.lang], this.elements.moveCommentBlock);
    this.elements.moveComment = create('input', 'move-form__input', null, this.elements.moveCommentBlock, ['type', 'text']);

    this.elements.formBtn = create('div', 'move-form__btn', 'submit', this.elements.form);

    this.elements.formBtn.addEventListener('click', () => {
      this.processForm();
    });

    this.popup = new Popup(document.body, fragment);
  }

  loadToAndFromCategories() {
    if (this.currentCategory.type === 3) {
      this.inputInfo.moveTo = this.currentCategory;
      this.categoriesTo = this.dataModel.getAllCagetoryByType(this.currentCategory.type);
      this.categoriesFrom = this.dataModel.getAllCagetoryByType(2);
    } else if (this.currentCategory.type === 2) {
      this.inputInfo.moveFrom = this.currentCategory;
      this.categoriesFrom = this.dataModel.getAllCagetoryByType(this.currentCategory.type);

      this.categoriesTo = this.dataModel.getAllCagetoryByType(2)
        .concat(this.dataModel.getAllCagetoryByType(3));
    } else {
      this.inputInfo.moveFrom = this.currentCategory;
      this.categoriesFrom = this.dataModel.getAllCagetoryByType(this.currentCategory.type);
      this.categoriesTo = this.dataModel.getAllCagetoryByType(2);
    }
  }

  loadSelectOptions(category, parent, selectedId) {
    category.forEach((element) => {
      const optionItem = create('option', 'move-form__option', element.name, parent, ['value', element.id]);
      if (this.currentCategory.type === 2) {
        if (parent === this.elements.formSelectFrom && element.id === selectedId) optionItem.setAttribute('selected', true);
      } else if (element.id === selectedId) optionItem.setAttribute('selected', true);
    });
  }

  processForm() {
    const formFields = [this.elements.formSelectFrom, this.elements.formSelectTo,
      this.elements.moveDate, this.elements.moveAmount];
    formFields.forEach((el) => {
      if (el.value === '') {
        if (this.elements.errorBlock) this.elements.errorBlock.remove();
        this.elements.errorBlock = create('div', 'move-error');
        create('span', 'move-error__text', 'This field should not be empty', this.elements.errorBlock);
        el.parentElement.appendChild(this.elements.errorBlock);
        el.parentElement.addEventListener('click', () => { this.elements.errorBlock.remove(); });
      }
    });
    if (formFields.some((el) => el.value === '')) return;

    this.generateMoneyMove(parseInt(this.elements.formSelectFrom.value, 10),
      parseInt(this.elements.formSelectTo.value, 10), this.elements.moveDate.value,
      parseFloat(this.elements.moveAmount.value), this.elements.moveComment.value);
  }

  generateMoneyMove(catFrom, catTo, transactionDate, amount, userComment) {
    this.userToken = localStorage.getItem('userToken');

    if (this.userToken) {
      fetch(`${config.server}/api/moves/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userToken}`,
        },
        body: JSON.stringify({
          move: {
            cat_from: catFrom,
            cat_to: catTo,
            date: transactionDate,
            value: amount,
            comment: userComment,
          },
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            this.createCustomEvent('logOut');
            this.popup.closePopup();
          } else {
            response.json().then(() => {
              this.createCustomEvent('userLoggedIn');
              this.popup.closePopup();
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
