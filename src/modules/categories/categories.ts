/* eslint-disable @typescript-eslint/lines-between-class-members */
import create from '../utils/create';
import locale from '../language/locale';
import NewUserCategory from './newUserCategory';
import Abstract from '../abstract/abstract';
import MoneyMove from '../money-move/money-move';
import config from '../../config';
import DataModel from '../data-model/dataModel';
// ts
import {
  Dictionary, Category, UserToken,
  UserCategory, UserCatElem,
} from '../../types/typings';

function getCurrentMonth(lang: string): string {
  const currentDate = new Date();
  return `${locale.months[lang][currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

export default class Categories extends Abstract {
  parent: HTMLElement;
  dataModel: DataModel;
  elements: Dictionary<HTMLElement>;
  received: number;
  budget: number;
  lang: string;
  userToken?: UserToken;
  popup?: MoneyMove;
  popUp?: NewUserCategory;
  catList: Array<UserCatElem>;

  constructor(lang: string, parent: HTMLElement, dataModel: DataModel) {
    super();
    this.parent = parent;
    this.dataModel = dataModel;
    this.elements = {};
    this.received = 0;
    this.budget = 0;
    this.lang = lang;
    this.catList = [];
    this.loadBlocks();
  }

  loadBlocks(): void {
    this.dataModel.categories.forEach((block) => {
      const totalBalance = this.getTotalAmount(block.id, 'summa').toLocaleString(this.lang);
      const blockItem = create('div', 'block', null, this.parent);
      const blockHead = create('div', 'block__head', null, blockItem);
      const blockBody = create('div', 'block__body', null, blockItem);

      const blockTitle = create('div', 'block__title', null, blockHead);
      create('h2', 'block__name', locale[block.code].blockName[this.lang], blockTitle);
      create('span', 'block__subtitle', getCurrentMonth(this.lang), blockTitle);

      const blockStats = create('div', 'block__stats', null, blockHead);

      const blockBalance = create('div', 'block__stats-item', null, blockStats);
      create('p', 'block__amount', `${totalBalance} ${locale.currency[this.lang]}`, blockBalance);
      create('span', 'block__subtitle', locale[block.code].totalAmount[this.lang], blockBalance);

      // Budget Plan
      if (block.allowPlan) {
        const totalPlanBudget = this.getTotalAmount(block.id, 'plan').toLocaleString(this.lang);
        const blockStatsReceived = create('div', 'block__stats-item', null, blockStats);
        create('p', 'block__amount', `${totalPlanBudget} ${locale.currency[this.lang]}`, blockStatsReceived);
        create('span', 'block__subtitle', locale[block.code].planAmount[this.lang], blockStatsReceived);
      }

      this.loadCategories(block, blockBody);
    });
  }

  getTotalAmount(catType: number, field: 'plan'|'summa'): number {
    let amount = 0;
    this.dataModel.userCategories.forEach((key) => {
      if (key.type === catType) {
        const val :number = typeof key[field] === 'number' ? key[field] : parseFloat((key[field] || 0).toString());
        amount += val;
      }
    });

    return amount;
  }

  loadCategories(currentCat: Category, parent: HTMLElement): void {
    const currentUserCategories: Array<UserCategory> = [];
    this.dataModel.userCategories.forEach((category) => {
      if (category.type === currentCat.id) currentUserCategories.push(category);
    });
    const blockCategories = create('div', 'block__categories', null, parent);
    currentUserCategories.forEach((item) => {
      const itemCat: UserCatElem = { id: item.id, type: item.type, item };

      const categoryItem = create('div', 'block__categories-item', null, blockCategories);
      const categoryEdit = create('i', 'material-icons block__categories-item-edit', 'edit', categoryItem);
      const categoryDelete = create('i', 'material-icons block__categories-item-edit block__categories-item-delete',
        'delete', categoryItem);
      create('h4', 'block__categories-title', item.name, categoryItem);
      const iconBg = create('div', 'block__categories-img',
        `<i class="material-icons block__categories-icon">${item.icoUrl}</i>`, categoryItem);
      const itemAmountInfo = create('div', 'block__categories-amount', null, categoryItem);
      const itemSum = create('p', 'block__categories-amount-actual',
        `${parseFloat(item.summa.toString()).toLocaleString(this.lang)} ${locale.currency[this.lang]}`, itemAmountInfo);

      itemCat.summElem = itemSum;

      if (currentCat.allowPlan) {
        itemCat.planElem = create('span', 'block__subtitle block__subtitle--centered',
          item.plan || 0, itemAmountInfo);
      }

      if (item.type === 2) {
        iconBg.style.backgroundColor = '#fc0';
        itemSum.style.color = '#f9a825';
      }
      if (item.type === 3) {
        if (item.summa > item.plan) {
          iconBg.style.backgroundColor = '#e53935';
          itemSum.style.color = '#e53935';
        } else {
          iconBg.style.backgroundColor = '#c1c5c9';
          itemSum.style.color = '#0ac38e';
        }
      } else if (item.type === 2) {
        if (item.summa < 0) {
          iconBg.style.backgroundColor = '#e53935';
          itemSum.style.color = '#e53935';
        }
      }
      categoryEdit.addEventListener('click', () => { this.updateCategory(item); });
      categoryDelete.addEventListener('click', () => { this.deleteCategory(item); });
      iconBg.addEventListener('click', () => { this.popup = new MoneyMove(this.lang, item, this.dataModel); });

      itemCat.icon = iconBg;
      this.catList.push(itemCat);
    });
    const categoryItemAdd = create('div', 'block__categories-item block__categories-item--add', null, blockCategories);
    create('div', 'block__categories-img block__categories-img--add',
      '<i class="material-icons block__categories-icon">add</i>', categoryItemAdd);

    function seeMoreLess(block: HTMLElement) {
      for (let i = 8; i < block.children.length; i += 1) {
        block.children[i].classList.toggle('block__categories-item--hidden');
      }
    }

    if (blockCategories.children.length > 8) {
      seeMoreLess(blockCategories);
      const openCloseArrow = create('i', 'material-icons block__categories-item-openClose', 'keyboard_arrow_down', parent);
      openCloseArrow.addEventListener('click', () => {
        openCloseArrow.classList.toggle('block__categories-item-openClose--up');
        seeMoreLess(blockCategories);
      });
    }

    categoryItemAdd.addEventListener('click', () => { this.popUp = new NewUserCategory(this.lang, currentCat.id); });
  }

  updateCategory(category: UserCategory): void {
    this.popUp = new NewUserCategory(this.lang, category.type, category);
  }

  deleteCategory(category: UserCategory): void {
    this.userToken = localStorage.getItem('userToken');

    if (this.userToken) {
      fetch(`${config.server}/api/categories/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userToken}`,
        },
        body: JSON.stringify({
          userCat: {
            id: category.id,
          },
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            this.createCustomEvent('logOut');
          } else {
            response.json().then(() => {
              this.createCustomEvent('userLoggedIn');
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }
  }

  updateUserCat(userCatObj: UserCategory):void {
    const cat: UserCatElem|undefined = this.catList.find((el) => el.id === userCatObj.id);
    if (!cat) return;

    if (cat.summElem) {
      cat.summElem.innerHTML = `${parseFloat(userCatObj.summa.toString()).toLocaleString(this.lang)} ${locale.currency[this.lang]}`;
      cat.item.summa = userCatObj.summa;
    }
    if (cat.planElem) {
      cat.planElem.innerHTML = `${parseFloat((userCatObj.plan || 0).toString()).toLocaleString(this.lang)} ${locale.currency[this.lang]}`;
      cat.item.plan = userCatObj.plan;
    }

    if (cat.summElem && cat.planElem && cat.icon) {
      if (userCatObj.type === 2) {
        cat.icon.style.backgroundColor = '#fc0';
        cat.summElem.style.color = '#f9a825';
      }
      if (userCatObj.type === 3) {
        if (userCatObj.summa > userCatObj.plan) {
          cat.icon.style.backgroundColor = '#e53935';
          cat.summElem.style.color = '#e53935';
        } else {
          cat.icon.style.backgroundColor = '#c1c5c9';
          cat.summElem.style.color = '#0ac38e';
        }
      } else if (userCatObj.type === 2) {
        if (userCatObj.summa < 0) {
          cat.icon.style.backgroundColor = '#e53935';
          cat.summElem.style.color = '#e53935';
        }
      }
    }
  }

  catchEvent(eventName: string, detail: any): void {
    if (eventName.match(/updateUserCat/)) this.updateUserCat(detail);
  }
}
