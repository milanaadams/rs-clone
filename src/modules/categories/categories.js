import create from '../utils/create';
import locale from '../main/locale';
import NewUserCategory from './newUserCategory';

function getCurrentMonth() {
  const currentDate = new Date();
  const monthNames = ['January', 'February', 'March', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

export default class Categories {
  constructor(parent, dataModel) {
    this.parent = parent;
    this.dataModel = dataModel;
    this.elements = {};
    this.received = 0;
    this.budget = 0;
    this.lang = 'en';
    this.loadBlocks();
  }

  loadBlocks() {
    this.dataModel.categories.forEach((block) => {
      const totalBalance = this.getTotalAmount(block.id, 'summa');
      const blockItem = create('div', 'block', null, this.parent);
      const blockHead = create('div', 'block__head', null, blockItem);
      const blockBody = create('div', 'block__body', null, blockItem);

      const blockTitle = create('div', 'block__title', null, blockHead);
      create('h2', 'block__name', locale[block.code].blockName[this.lang], blockTitle);
      create('span', 'block__subtitle', getCurrentMonth(), blockTitle);

      const blockStats = create('div', 'block__stats', null, blockHead);

      const blockBalance = create('div', 'block__stats-item', null, blockStats);
      create('p', 'block__amount', `$${totalBalance}`, blockBalance);
      create('span', 'block__subtitle', locale[block.code].totalAmount[this.lang], blockBalance);

      // Budget Plan
      if (block.allowPlan) {
        const totalPlanBudget = this.getTotalAmount(block.id, 'plan');
        const blockStatsReceived = create('div', 'block__stats-item', null, blockStats);
        create('p', 'block__amount', `$${totalPlanBudget}`, blockStatsReceived);
        create('span', 'block__subtitle', locale[block.code].planAmount[this.lang], blockStatsReceived);
      }

      this.loadCategories(block, blockBody);
    });
  }

  getTotalAmount(catType, field) {
    let amount = 0;
    this.dataModel.userCategories.forEach((key) => {
      if (key.type === catType) {
        amount += parseFloat(key[field]) || 0;
      }
    });
    return amount;
  }

  loadCategories(currentCat, parent) {
    const currentUserCategories = [];
    this.dataModel.userCategories.forEach((category) => {
      if (category.type === currentCat.id) currentUserCategories.push(category);
    });
    const blockCategories = create('div', 'block__categories', null, parent);
    currentUserCategories.forEach((item) => {
      const categoryItem = create('div', 'block__categories-item', null, blockCategories);
      create('h4', 'block__categories-title', item.name, categoryItem);
      const iconBg = create('div', 'block__categories-img', `<i class="material-icons block__categories-icon">${item.icoUrl}</i>`, categoryItem);
      const itemAmountInfo = create('div', 'block__categories-amount', null, categoryItem);
      const itemSum = create('p', 'block__categories-amount-actual', `$${item.summa}`, itemAmountInfo);
      if (currentCat.allowPlan) create('span', 'block__subtitle block__subtitle--centered', item.plan || 0, itemAmountInfo);
      if (item.type === 2) {
        iconBg.style.backgroundColor = '#fc0';
        itemSum.style.color = '#f9a825';
      }
      if (item.type === 3) {
        iconBg.style.backgroundColor = '#c1c5c9';
        itemSum.style.color = '#0ac38e';
      }
    });
    const categoryItemAdd = create('div', 'block__categories-item block__categories-item--add', null, blockCategories);
    create('div', 'block__categories-img block__categories-img--add', '<i class="material-icons block__categories-icon">add</i>', categoryItemAdd);

    categoryItemAdd.addEventListener('click', () => { this.popUp = new NewUserCategory(currentCat.id, this.lang); });
  }
}
