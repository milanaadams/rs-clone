/* eslint-disable @typescript-eslint/lines-between-class-members */
import create from '../utils/create';
import locale from '../language/locale';
import Popup from '../popup/popup';
import Abstract from '../abstract/abstract';
import config from '../../config';
// ts
import {
  Dictionary, Category, UserToken,
  UserCategory,
} from '../../types/typings';

export default class NewUserCategory extends Abstract {
  catId: number;
  lang: string;
  elements: Dictionary<HTMLElement|HTMLInputElement>;
  icon: string;
  args: Array<any>;
  updateToCategory?: UserCategory;
  addCatPopup?: Popup;
  itemName?: string;
  itemAmount?: string;
  icons?: Array<string>;
  iconBoard: HTMLElement;

  constructor(lang: string, catId: number, ...args: any[]) {
    super();
    this.catId = catId;
    this.lang = lang;
    this.elements = {};
    this.icon = 'home';
    this.args = args;
    this.loadForm();
  }

  loadForm() {
    const fragment = document.createDocumentFragment();

    this.elements.addItemBlock = create('div', 'add-item', null, fragment);
    this.elements.addItemHead = create('div', 'add-item__head', null, this.elements.addItemBlock);

    this.elements.iconBtn = create('div', 'add-item__icon', null, this.elements.addItemBlock);
    this.elements.addForm = create('form', 'add-item__form', null, this.elements.addItemBlock);
    this.elements.newItemName = create('div', 'add-item__form-item', null, this.elements.addForm);
    this.elements.newItemNameInput = create('input', 'add-item__form-name', null, this.elements.newItemName);
    this.elements.newItemAmount = create('div', 'add-item__form-item', null, this.elements.addForm);
    this.elements.newItemAmountInput = create('input', 'add-item__form-amount', null, this.elements.newItemAmount, ['type', 'number']);
    this.elements.formSubmit = create('div', 'add-item__form-submit', locale.addBtn[this.lang], this.elements.addForm);

    this.elements.iconBtnImg = create('i', 'material-icons block__categories-icon', 'home', this.elements.iconBtn);
    this.elements.iconBtn.addEventListener('click', () => { this.selectIcon(); });
    this.elements.newItemAmountInput.setAttribute('step', '0.01');

    switch (this.catId) {
      case 1:
        this.elements.addItemHead.classList.add('add-item__head--income');
        this.elements.iconBtn.classList.add('add-item__icon--income');
        this.elements.addItemHead.textContent = locale.addNewSource.income.title[this.lang];
        this.elements.newItemNameInput.setAttribute('placeholder', locale.addNewSource.income.itemName[this.lang]);
        this.elements.newItemAmountInput.setAttribute('placeholder', locale.addNewSource.income.amount[this.lang]);
        this.elements.formSubmit.classList.add('add-item__form-submit--income');
        break;
      case 2:
        this.elements.addItemHead.classList.add('add-item__head--accounts');
        this.elements.iconBtn.classList.add('add-item__icon--accounts');
        this.elements.addItemHead.textContent = locale.addNewSource.accounts.title[this.lang];
        this.elements.newItemNameInput.setAttribute('placeholder', locale.addNewSource.accounts.itemName[this.lang]);
        this.elements.newItemAmountInput.setAttribute('placeholder', locale.addNewSource.accounts.amount[this.lang]);
        this.elements.formSubmit.classList.add('add-item__form-submit--accounts');
        break;
      case 3:
        this.elements.addItemHead.classList.add('add-item__head--expenses');
        this.elements.iconBtn.classList.add('add-item__icon--expenses');
        this.elements.addItemHead.textContent = locale.addNewSource.expenses.title[this.lang];
        this.elements.newItemNameInput.setAttribute('placeholder', locale.addNewSource.expenses.itemName[this.lang]);
        this.elements.newItemAmountInput.setAttribute('placeholder', locale.addNewSource.expenses.amount[this.lang]);
        this.elements.formSubmit.classList.add('add-item__form-submit--expenses');
        break;
      default:
        this.elements.addItemHead.classList.add('');
    }

    if (this.args.length > 0) {
      [this.updateToCategory] = [this.args[0]];
      switch (this.catId) {
        case 1:
          this.elements.addItemHead.textContent = locale.updateUserCat.income.title[this.lang];
          break;
        case 2:
          this.elements.addItemHead.textContent = locale.updateUserCat.accounts.title[this.lang];
          break;
        case 3:
          this.elements.addItemHead.textContent = locale.updateUserCat.expenses.title[this.lang];
          break;
        default:
          this.elements.addItemHead.classList.add('');
      }

      if (this.updateToCategory) {
        this.elements.iconBtnImg.textContent = this.updateToCategory.icoUrl;
        this.icon = this.updateToCategory.icoUrl;
        this.elements.newItemNameInput.setAttribute('value', this.updateToCategory.name);
        if (this.updateToCategory.type === 1 || this.updateToCategory.type === 3) {
          this.elements.newItemAmountInput.setAttribute('value', this.updateToCategory.plan.toString());
        } else {
          this.elements.newItemAmountInput.setAttribute('value', this.updateToCategory.summa.toString());
        }
      }
      this.elements.formSubmit.textContent = locale.updateBtn[this.lang];
    }

    this.elements.formSubmit.addEventListener('click', () => { this.processForm(); });

    this.addCatPopup = new Popup(document.body, fragment);
  }

  processForm(): void {
    const formFields = [this.elements.newItemNameInput, this.elements.newItemAmountInput];
    formFields.forEach((el) => {
      if ((<HTMLInputElement>el).value === '') {
        if (this.elements.errorBlock) this.elements.errorBlock.remove();
        this.elements.errorBlock = create('div', 'error error--add');
        create('span', 'error-text', locale.addNewSource.noEmptyFields[this.lang], this.elements.errorBlock);
        if (el.parentElement) {
          el.parentElement.appendChild(this.elements.errorBlock);
          el.parentElement.addEventListener('click', () => { this.elements.errorBlock.remove(); });
        }
      }
    });
    if (formFields.some((el) => (<HTMLInputElement>el).value === '')) return;

    this.itemName = (<HTMLInputElement> this.elements.newItemNameInput).value;
    this.itemAmount = (<HTMLInputElement> this.elements.newItemAmountInput).value;
    if (this.updateToCategory) {
      this.sendUpdate();
    } else {
      this.sendToServer();
    }
  }

  selectIcon() {
    this.icons = ['home', 'savings', 'account_balance_wallet', 'account_balance', 'local_grocery_store',
      'vpn_key', 'restaurant', 'subway', 'add_shopping_cart', 'audiotrack', 'cleaning_services',
      'account_box', 'alarm', 'analytics', 'anchor', 'api', 'article', 'arrow_right_alt', 'autorenew',
      'book_online', 'bookmark_border', 'build', 'calendar_today', 'card_giftcard', 'card_travel', 'check_circle_outline',
      'commute', 'credit_card', 'done_all', 'eco', 'extension', 'face', 'favorite_border', 'flight_takeoff', 'grade',
      'important_devices', 'language', 'leaderboard', 'perm_identity', 'pets', 'settings_cell', 'settings_voice',
      'shopping_cart', 'tour', 'work_outline', 'airplay', 'business', 'chat', 'mail_outline', 'location_on'];
    this.iconBoard = create('div', 'icon-board', null, document.body);
    const iconBoardInner = create('div', 'icon-board__inner', null, this.iconBoard);

    this.iconBoard.addEventListener('mouseleave', () => { this.iconBoard.remove(); });

    this.icons.forEach((icon) => {
      const iconItem = create('div', 'icon-board__item', null, iconBoardInner);
      const iconImg = create('i', 'material-icons block__categories-icon icon-board__item-img', icon, iconItem);

      iconItem.addEventListener('click', () => {
        this.elements.iconBtnImg.textContent = iconImg.textContent;
        this.icon = icon;
        this.iconBoard.remove();
      });
    });
  }

  sendToServer() {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      if (this.catId === 1 || this.catId === 3) {
        fetch(`${config.server}/api/categories/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            name: this.itemName,
            type: this.catId,
            plan: parseFloat(this.itemAmount || '0'),
            icoUrl: this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              if (this.addCatPopup) this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                if (this.addCatPopup) this.addCatPopup.closePopup();
              });
            }
          })
          .catch((errMsg) => { throw new Error(errMsg); });
      } else if (this.catId === 2) {
        fetch(`${config.server}/api/categories/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            name: this.itemName,
            type: this.catId,
            summa: parseFloat(this.itemAmount || '0'),
            icoUrl: this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              if (this.addCatPopup) this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                if (this.addCatPopup) this.addCatPopup.closePopup();
              });
            }
          })
          .catch((errMsg) => { throw new Error(errMsg); });
      }
    }
  }

  sendUpdate() {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      if (this.updateToCategory && (this.updateToCategory.type === 1 || this.updateToCategory.type === 3)) {
        fetch(`${config.server}/api/categories/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            id: this.updateToCategory.id,
            name: this.itemName,
            plan: parseFloat(this.itemAmount || '0'),
            icoUrl: this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              if (this.addCatPopup) this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                if (this.addCatPopup) this.addCatPopup.closePopup();
              });
            }
          })
          .catch((errMsg) => { throw new Error(errMsg); });
      } else if (this.updateToCategory && this.updateToCategory.type === 2) {
        fetch(`${config.server}/api/categories/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            id: this.updateToCategory.id,
            name: this.itemName,
            summa: parseFloat(this.itemAmount || '0'),
            icoUrl: this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              if (this.addCatPopup) this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                if (this.addCatPopup) this.addCatPopup.closePopup();
              });
            }
          })
          .catch((errMsg) => { throw new Error(errMsg); });
      }
    }
  }

  catchEvent(eventName: string): void {
    if (eventName.match(/removeIconBoard/)) if (this.iconBoard) this.iconBoard.remove();
  }
}
