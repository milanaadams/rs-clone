/* eslint-disable @typescript-eslint/lines-between-class-members */
import create from '../utils/create';
import locale from '../language/locale';
import Popup from '../popup/popup';
import config from '../../config';
import Abstract from '../abstract/abstract';

// ts
import {
  UserToken, Dictionary,
  UserCategory, IputInfoMove,
} from '../../types/typings';
import DataModel from '../data-model/dataModel';

export default class MoneyMove extends Abstract {
  lang: string;
  currentCategory: UserCategory;
  dataModel: DataModel;
  inputInfo : IputInfoMove;
  elements: Dictionary<HTMLElement|HTMLInputElement>;
  userToken?: UserToken;
  categoriesFrom?: Array<UserCategory>;
  categoriesTo?: Array<UserCategory>;
  popup?: Popup;

  constructor(lang: string, category: UserCategory, dataModel: DataModel) {
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

  loadTransferForm(): void {
    this.loadToAndFromCategories();
    const fragment = document.createDocumentFragment();

    this.elements.blockWrapper = create('div', 'move', null, fragment);
    this.elements.form = create('form', 'move-form', null, this.elements.blockWrapper);

    this.elements.moveFromBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelFrom[this.lang], this.elements.moveFromBlock);
    this.elements.formSelectFrom = create('select', 'move-form__select', null, this.elements.moveFromBlock);
    if (this.categoriesFrom) {
      this.loadSelectOptions(this.categoriesFrom, this.elements.formSelectFrom,
        this.currentCategory.id);
    }

    this.elements.moveToBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelTo[this.lang], this.elements.moveToBlock);
    this.elements.formSelectTo = create('select', 'move-form__select', null, this.elements.moveToBlock);
    if (this.categoriesTo) { this.loadSelectOptions(this.categoriesTo, this.elements.formSelectTo, this.currentCategory.id); }

    this.elements.moveAmountBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelAmount[this.lang], this.elements.moveAmountBlock);
    this.elements.moveAmount = create('input', 'move-form__input', null, this.elements.moveAmountBlock, ['value', 1], ['type', 'number']);
    this.elements.moveAmount.setAttribute('step', '0.01');

    this.elements.moveDateBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelDate[this.lang], this.elements.moveDateBlock);
    this.elements.moveDate = create('input', 'move-form__input', null, this.elements.moveDateBlock, ['type', 'date']);
    (<HTMLInputElement> this.elements.moveDate).valueAsDate = new Date();

    this.elements.moveCommentBlock = create('div', 'move-form__item move-form__item--long', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelComment[this.lang], this.elements.moveCommentBlock);
    this.elements.moveComment = create('input', 'move-form__input', null, this.elements.moveCommentBlock, ['type', 'text']);

    this.elements.formBtn = create('div', 'move-form__btn', locale.move.submitBtn[this.lang], this.elements.form);

    this.elements.formBtn.addEventListener('click', () => {
      this.processForm();
    });

    this.popup = new Popup(document.body, fragment);
  }

  loadToAndFromCategories(): void {
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

  loadSelectOptions(category: Array<UserCategory>, parent: HTMLElement|HTMLInputElement, selectedId: number): void {
    category.forEach((element) => {
      const optionItem = create('option', 'move-form__option', element.name, parent, ['value', element.id]);
      if (this.currentCategory.type === 2) {
        if (parent === this.elements.formSelectFrom && element.id === selectedId) optionItem.setAttribute('selected', true.toString());
      } else if (element.id === selectedId) optionItem.setAttribute('selected', true.toString());
    });
  }

  processForm(): void {
    const formFields = [this.elements.formSelectFrom, this.elements.formSelectTo,
      this.elements.moveDate, this.elements.moveAmount];
    formFields.forEach((el) => {
      if ((<HTMLInputElement>el).value === '') {
        if (this.elements.errorBlock) this.elements.errorBlock.remove();
        this.elements.errorBlock = create('div', 'move-error');
        create('span', 'move-error__text', 'This field should not be empty', this.elements.errorBlock);
        if (el.parentElement) el.parentElement.appendChild(this.elements.errorBlock);
        if (el.parentElement) el.parentElement.addEventListener('click', () => { this.elements.errorBlock.remove(); });
      }
    });
    if (formFields.some((el) => (<HTMLInputElement>el).value === '')) return;

    this.generateMoneyMove(
      parseInt((<HTMLInputElement> this.elements.formSelectFrom).value, 10),
      parseInt((<HTMLInputElement> this.elements.formSelectTo).value, 10),
      (<HTMLInputElement> this.elements.moveDate).value,
      parseFloat((<HTMLInputElement> this.elements.moveAmount).value),
      (<HTMLInputElement> this.elements.moveComment).value,
    );
  }

  generateMoneyMove(catFrom:number, catTo: number, transactionDate: string, amount:number, userComment:string): void {
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
            if (this.popup) this.popup.closePopup();
          } else {
            response.json().then(() => {
              this.createCustomEvent('userLoggedIn');
              if (this.popup) this.popup.closePopup();
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }
  }

  catchEvent(eventName: string) : void {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
