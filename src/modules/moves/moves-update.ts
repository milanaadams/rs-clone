import create from '../utils/create';
import locale from '../language/locale';
import Popup from '../popup/popup';
import config from '../../config';
import Abstract from '../abstract/abstract';

export default class MovesUpdate extends Abstract {
  constructor(lang, move, movesDataObj) {
    super();
    this.lang = lang;
    this.move = move;
    this.elements = {};
    this.movesDataObj = movesDataObj;

    this.loadMoveUpdateForm();
  }

  loadMoveUpdateForm() {
    this.fragment = document.createDocumentFragment();

    this.elements.blockWrapper = create('div', 'move', null, this.fragment);
    this.elements.form = create('form', 'move-form', null, this.elements.blockWrapper);

    this.elements.moveAmountBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelAmount[this.lang], this.elements.moveAmountBlock);
    this.elements.moveAmount = create('input', 'move-form__input', null, this.elements.moveAmountBlock, ['value', this.move.value], ['type', 'number']);
    this.elements.moveAmount.setAttribute('step', '0.01');

    this.elements.moveDateBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelDate[this.lang], this.elements.moveDateBlock);
    this.elements.moveDate = create('input', 'move-form__input', null, this.elements.moveDateBlock, ['type', 'date']);
    this.elements.moveDate.valueAsDate = new Date(this.move.date);

    this.elements.moveCommentBlock = create('div', 'move-form__item move-form__item--long', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelComment[this.lang], this.elements.moveCommentBlock);
    this.elements.moveComment = create('input', 'move-form__input', null, this.elements.moveCommentBlock, ['type', 'text']);
    this.elements.moveComment.value = this.move.comment;

    this.elements.formBtn = create('div', 'move-form__btn', locale.move.submitBtn[this.lang], this.elements.form);

    this.elements.formBtn.addEventListener('click', () => {
      this.processForm();
    });

    this.popup = new Popup(document.body, this.fragment);
  }

  processForm() {
    const formFields = [this.elements.moveDate, this.elements.moveAmount];
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

    this.updateMoneyMove(this.elements.moveDate.value,
      parseFloat(this.elements.moveAmount.value), this.elements.moveComment.value);
  }

  updateMoneyMove(transactionDate, amount, userComment) {
    this.userToken = localStorage.getItem('userToken');

    if (this.userToken) {
      fetch(`${config.server}/api/moves/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userToken}`,
        },
        body: JSON.stringify({
          move: {
            id: this.move.id,
            value: amount,
            comment: userComment,
            date: transactionDate,
          },
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            this.createCustomEvent('logOut');
            this.popup.closePopup();
          } else {
            response.json().then(() => {
              this.createCustomEvent('updateDataModel');
              this.popup.closePopup();
            }).then(() => {
              setTimeout(() => {
                this.createCustomEvent('updateMovesBlock');
              }, 2000);
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
