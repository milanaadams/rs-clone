import create from '../utils/create';
import locale from '../language/locale';
import Popup from '../popup/popup';

export default class MoneyMove {
  constructor(lang, category) {
    this.currentCategory = category;
    this.inputInfo = {
      moveFrom: null,
      moveTo: null,
    };
    this.lang = lang;
    this.elements = {};
    this.loadTransferForm();
  }

  loadTransferForm() {
    if (this.currentCategory.type === 3) {
      this.inputInfo.moveTo = this.currentCategory;
    } else {
      this.inputInfo.moveFrom = this.currentCategory;
    }

    const fragment = document.createDocumentFragment();

    const moveFrom = this.inputInfo.moveFrom ? this.inputInfo.moveFrom.name : '';
    const moveTo = this.inputInfo.moveTo ? this.inputInfo.moveTo.name : '';

    this.elements.blockWrapper = create('div', 'move', null, fragment);
    this.elements.form = create('form', 'move-form', null, this.elements.blockWrapper);

    this.elements.moveFromBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelFrom[this.lang], this.elements.moveFromBlock);
    this.elements.moveFrom = create('input', 'move-form__input', null, this.elements.moveFromBlock, ['value', moveFrom]);
    this.elements.moveFrom.setAttribute('readonly', true);

    this.elements.moveToBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelTo[this.lang], this.elements.moveToBlock);
    this.elements.moveTo = create('input', 'move-form__input', null, this.elements.moveToBlock, ['value', moveTo]);
    this.elements.moveTo.setAttribute('readonly', true);

    this.elements.moveAmountBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelAmount[this.lang], this.elements.moveAmountBlock);
    this.elements.moveAmount = create('input', 'move-form__input', null, this.elements.moveAmountBlock, ['value', 1], ['type', 'number']);
    this.elements.moveAmount.setAttribute('step', '0.01');

    this.elements.moveDateBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelDate[this.lang], this.elements.moveDateBlock);
    this.elements.moveTo = create('input', 'move-form__input', null, this.elements.moveDateBlock, ['type', 'date']);

    this.popup = new Popup(document.body, fragment);
  }
}
