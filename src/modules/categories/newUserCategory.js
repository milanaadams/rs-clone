import create from '../utils/create';
import locale from '../main/locale';
import Popup from '../popup/popup';
import Abstract from '../abstract/abstract';
import config from '../../config'

export default class NewUserCategory extends Abstract {
  constructor(catId, lang) {
    super();
    this.catId = catId;
    this.lang = lang;
    this.elements = {};
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

    this.elements.iconBtn.textContent = 'Icon';
    this.elements.newItemAmountInput.setAttribute('step', '0.01');

    switch (this.catId) {
      case 1:
        this.elements.addItemHead.classList.add('add-item__head--income');
        this.elements.addItemHead.textContent = locale.addNewSource.income.title[this.lang];
        this.elements.newItemNameInput.setAttribute('placeholder', locale.addNewSource.income.itemName[this.lang]);
        this.elements.newItemAmountInput.setAttribute('placeholder', locale.addNewSource.income.amount[this.lang]);
        this.elements.formSubmit.classList.add('add-item__form-submit--income');
        break;
      case 2:
        this.elements.addItemHead.classList.add('add-item__head--accounts');
        this.elements.addItemHead.textContent = locale.addNewSource.accounts.title[this.lang];
        this.elements.newItemNameInput.setAttribute('placeholder', locale.addNewSource.accounts.itemName[this.lang]);
        this.elements.newItemAmountInput.setAttribute('placeholder', locale.addNewSource.accounts.amount[this.lang]);
        this.elements.formSubmit.classList.add('add-item__form-submit--accounts');
        break;
      case 3:
        this.elements.addItemHead.classList.add('add-item__head--expenses');
        this.elements.addItemHead.textContent = locale.addNewSource.expenses.title[this.lang];
        this.elements.newItemNameInput.setAttribute('placeholder', locale.addNewSource.expenses.itemName[this.lang]);
        this.elements.newItemAmountInput.setAttribute('placeholder', locale.addNewSource.expenses.amount[this.lang]);
        this.elements.formSubmit.classList.add('add-item__form-submit--expenses');
        break;
      default:
        this.elements.addItemHead.classList.add('');
    }

    this.elements.formSubmit.addEventListener('click', () => { this.processForm(); });

    const popup = new Popup(document.body, this.fragment);
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
    this.sendToServer();
  }

  sendToServer() {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      fetch(`${config.server}/api/categories/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          "name": this.itemName,
          "type": this.catId,
          "plan": parseFloat(this.itemAmount),
          "summa": 100,
          "icoUrl": "home"
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            //localStorage.removeItem('userToken');
            //window.location.reload();
            response.json().then((data) => {
              console.log(data);
            });
            console.log('nope');
          } else {
            response.json().then((data) => {
              console.log('success');
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }
  }
}
