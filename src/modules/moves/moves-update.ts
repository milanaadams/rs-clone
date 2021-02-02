/* eslint-disable @typescript-eslint/lines-between-class-members */
import create from '../utils/create';
import locale from '../language/locale';
import Popup from '../popup/popup';
import config from '../../config';
import Abstract from '../abstract/abstract';

// ts
import {
  UserToken, Dictionary,
  Move as MoveInterface,
} from '../../types/typings';

export default class MovesUpdate extends Abstract {
  lang: string;
  move:MoveInterface;
  elements: Dictionary<HTMLElement|HTMLInputElement>;
  popup?: Popup;
  userToken?: UserToken;

  constructor(lang: string, move:MoveInterface/* , movesDataObj */) {
    super();
    this.lang = lang;
    this.move = move;
    this.elements = {};
    // this.movesDataObj = movesDataObj;

    this.loadMoveUpdateForm();
  }

  loadMoveUpdateForm(): void {
    const fragment = document.createDocumentFragment();

    this.elements.blockWrapper = create('div', 'move', null, fragment);
    this.elements.form = create('form', 'move-form', null, this.elements.blockWrapper);

    this.elements.moveAmountBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelAmount[this.lang], this.elements.moveAmountBlock);
    this.elements.moveAmount = create('input', 'move-form__input',
      null, this.elements.moveAmountBlock, ['value', this.move.value], ['type', 'number']);
    this.elements.moveAmount.setAttribute('step', '0.01');

    this.elements.moveDateBlock = create('div', 'move-form__item', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelDate[this.lang], this.elements.moveDateBlock);
    this.elements.moveDate = create('input', 'move-form__input', null, this.elements.moveDateBlock, ['type', 'date']);
    (<HTMLInputElement> this.elements.moveDate).valueAsDate = new Date(this.move.date);

    this.elements.moveCommentBlock = create('div', 'move-form__item move-form__item--long', null, this.elements.form);
    create('label', 'move-form__label', locale.move.labelComment[this.lang], this.elements.moveCommentBlock);
    this.elements.moveComment = create('input', 'move-form__input', null, this.elements.moveCommentBlock, ['type', 'text']);
    (<HTMLInputElement> this.elements.moveComment).value = this.move.comment;

    this.elements.formBtn = create('button', 'move-form__btn', locale.move.submitBtn[this.lang], this.elements.form);

    this.elements.formBtn.addEventListener('click', () => {
      this.elements.formBtn.setAttribute('disabled', 'true');
      this.processForm();
    });

    this.popup = new Popup(document.body, fragment);
  }

  processForm(): void {
    const formFields = [this.elements.moveDate, this.elements.moveAmount];
    formFields.forEach((el) => {
      if ((<HTMLInputElement>el).value === '') {
        if (this.elements.errorBlock) this.elements.errorBlock.remove();
        this.elements.errorBlock = create('div', 'move-error');
        create('span', 'move-error__text', 'This field should not be empty', this.elements.errorBlock);
        if (el.parentElement) el.parentElement.appendChild(this.elements.errorBlock);
        if (el.parentElement) {
          el.parentElement.addEventListener('click', () => {
            this.elements.errorBlock.remove();
            this.elements.formBtn.removeAttribute('disabled');
          });
        }
      }
    });
    if (formFields.some((el) => (<HTMLInputElement>el).value === '')) return;

    this.updateMoneyMove(
      (<HTMLInputElement> this.elements.moveDate).value,
      parseFloat((<HTMLInputElement> this.elements.moveAmount).value),
      (<HTMLInputElement> this.elements.moveComment).value,
    );
  }

  updateMoneyMove(transactionDate: string, amount: number, userComment: string): void {
    this.userToken = localStorage.getItem('userToken');

    if (this.userToken) {
      this.elements.blackOut = create('div', 'blackout', null, document.querySelector('.moves-history'));
      this.elements.loader = create('div', 'loader', null, document.querySelector('.moves-history'));
      if (this.popup) this.popup.closePopup();
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
            this.elements.loader.remove();
            this.elements.blackOut.remove();
          } else {
            response.json().then((data) => {
              this.createCustomEvent('updateUserCat', data.cat_from);
              this.createCustomEvent('updateUserCat', data.cat_to);
              this.createCustomEvent('updateDataModel');
            // }).then(() => {
            //   setTimeout(() => {
            //     this.createCustomEvent('updateMovesBlock');
            //     this.elements.loader.remove();
            //     this.elements.blackOut.remove();
            //   }, 3000);
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }
  }

  dataModelUpdated():void {
    this.elements.loader.remove();
    this.elements.blackOut.remove();
    this.createCustomEvent('updateMovesBlock');
  }

  catchEvent(eventName: string): void {
    if (eventName.match(/dataModelUpdated/)) this.dataModelUpdated();
  }
}
