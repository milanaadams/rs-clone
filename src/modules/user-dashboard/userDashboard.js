import create from '../utils/create';
import removeChildren from '../utils/removeAllChildren';
import Abstract from '../abstract/abstract';
import Categories from '../categories/categories';
import Chart from '../chart';

export default class UserDashboard extends Abstract {
  constructor(parent, headerInfo, dataModel) {
    super();
    this.parent = parent;
    this.elements = {};
    this.headerInfo = headerInfo;
    this.dataModel = dataModel;
    this.loadHeaderInfo();
    this.loadDashboard();
  }

  loadHeaderInfo() {
    create('p', 'header__username', this.dataModel.user, this.headerInfo);
    create('div', 'header__user-icon', null, this.headerInfo);
    this.loadDropdownHeaderMenu();
  }

  loadDropdownHeaderMenu() {
    this.elements.dropdown = create('div', 'header__dropdown', null, this.headerInfo);
    this.elements.dropdownMenu = create('ul', 'header__dropdown-menu', null, this.elements.dropdown);
    this.elements.dropdownMenuEmail = create('li', 'header__dropdown-menu__item', this.dataModel.email, this.elements.dropdownMenu);
    this.elements.logOut = create('li', 'header__dropdown-menu__item', 'Log Out', this.elements.dropdownMenu);

    this.headerInfo.addEventListener('click', () => {
      this.elements.dropdown.classList.toggle('header__dropdown--active');
    });

    this.elements.logOut.style.cursor = 'pointer';
    this.elements.logOut.addEventListener('click', () => {
      removeChildren(this.parent);
      removeChildren(this.headerInfo);
      this.createCustomEvent('logOut');
    });
  }

  loadDashboard() {
    this.elements.dashboard = create('div', 'dashboard', null, this.parent);
    this.elements.dashboardLeft = create('div', 'dashboard__left', null, this.elements.dashboard);
    this.elements.dashboardRight = create('div', 'dashboard__right', null, this.elements.dashboard);
    this.incomeBlock = new Categories(this.elements.dashboardLeft, this.dataModel);
    this.chartBlock = new Chart(this.elements.dashboardLeft, this.dataModel);
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
