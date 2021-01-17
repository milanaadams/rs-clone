import create from '../utils/create';
import locale from '../main/locale';
import Popup from '../popup/popup';
import Abstract from '../abstract/abstract';

export default class NewUserCategory extends Abstract {
  constructor(catId, lang, ...args) {
    super();
    this.catId = catId;
    this.lang = lang;
    this.elements = {};
    this.icon = 'home';
    this.args = args;
    this.loadForm();
  }

  loadForm() {
    this.fragment = document.createDocumentFragment();

    this.elements.addItemBlock = create('div', 'add-item', null, this.fragment);
    this.elements.addItemHead = create('div', 'add-item__head', null, this.elements.addItemBlock);

    this.elements.iconBtn = create('div', 'add-item__icon', null, this.elements.addItemBlock);
    this.elements.addForm = create('form', 'add-item__form', null, this.elements.addItemBlock);
    this.elements.newItemName = create('div', 'add-item__form-item', null, this.elements.addForm);
    this.elements.newItemNameInput = create('input', 'add-item__form-name', null, this.elements.newItemName);
    this.elements.newItemAmount = create('div', 'add-item__form-item', null, this.elements.addForm);
    this.elements.newItemAmountInput = create('input', 'add-item__form-amount', null, this.elements.newItemAmount, ['type', 'number']);
    this.elements.formSubmit = create('div', 'add-item__form-submit', 'Add', this.elements.addForm);

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

    if (this.args) {
      this.updateToCategory = this.args[0];
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
      this.elements.iconBtnImg.textContent = this.updateToCategory.icoUrl;
      this.icon = this.updateToCategory.icoUrl;
      this.elements.newItemNameInput.setAttribute('value', this.updateToCategory.name);
      if (this.updateToCategory.type === 1 || this.updateToCategory.type === 3) {
        this.elements.newItemAmountInput.setAttribute('value', this.updateToCategory.plan);
      } else {
        this.elements.newItemAmountInput.setAttribute('value', this.updateToCategory.summa);
      }
      this.elements.formSubmit.textContent = 'Update';
    }

    this.elements.formSubmit.addEventListener('click', () => { this.processForm(); });

    this.addCatPopup = new Popup(document.body, this.fragment);
  }

  processForm() {
    const formFields = [this.elements.newItemNameInput, this.elements.newItemAmountInput];
    formFields.forEach((el) => {
      if (el.value === '') {
        const errorBlock = create('div', 'error error--add');
        create('span', 'error-text', 'This field should not be empty', errorBlock);
        el.parentElement.appendChild(errorBlock);
        el.parentElement.addEventListener('click', () => { errorBlock.remove(); });
      }
    });
    if (formFields.some((el) => el.value === '')) return;

    this.itemName = this.elements.newItemNameInput.value;
    this.itemAmount = this.elements.newItemAmountInput.value;
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
    const iconBoard = create('div', 'icon-board', null, document.body);
    const iconBoardInner = create('div', 'icon-board__inner', null, iconBoard);

    iconBoard.addEventListener('mouseleave', () => { iconBoard.remove(); });

    this.icons.forEach((icon) => {
      const iconItem = create('div', 'icon-board__item', null, iconBoardInner);
      const iconImg = create('i', 'material-icons block__categories-icon icon-board__item-img', icon, iconItem);

      iconItem.addEventListener('click', () => {
        this.elements.iconBtnImg.textContent = iconImg.textContent;
        this.icon = icon;
        iconBoard.remove();
      });
    });
  }

  sendToServer() {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      if (this.catId === 1 || this.catId === 3) {
        fetch('https://f19m-rsclone-back.herokuapp.com/api/categories/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            "name": this.itemName,
            "type": this.catId,
            "plan": parseFloat(this.itemAmount),
            "icoUrl": this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                this.addCatPopup.closePopup();
              });
            }
          })
          .catch((errMsg) => { throw new Error(errMsg); });
      } else if (this.catId === 2) {
        fetch('https://f19m-rsclone-back.herokuapp.com/api/categories/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            "name": this.itemName,
            "type": this.catId,
            "summa": parseFloat(this.itemAmount),
            "icoUrl": this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                this.addCatPopup.closePopup();
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
      if (this.updateToCategory.type === 1 || this.updateToCategory.type === 3) {
        fetch('https://f19m-rsclone-back.herokuapp.com/api/categories/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            "id": this.updateToCategory.id,
            "name": this.itemName,
            "plan": parseFloat(this.itemAmount),
            "icoUrl": this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                this.addCatPopup.closePopup();
              });
            }
          })
          .catch((errMsg) => { throw new Error(errMsg); });
      } else if (this.updateToCategory.type === 2) {
        fetch('https://f19m-rsclone-back.herokuapp.com/api/categories/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            "id": this.updateToCategory.id,
            "name": this.itemName,
            "summa": parseFloat(this.itemAmount),
            "icoUrl": this.icon,
          }),
        })
          .then((response) => {
            if (response.status !== 200) {
              this.createCustomEvent('logOut');
              this.addCatPopup.closePopup();
            } else {
              response.json().then(() => {
                this.createCustomEvent('userLoggedIn');
                this.addCatPopup.closePopup();
              });
            }
          })
          .catch((errMsg) => { throw new Error(errMsg); });
      }
    }
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
