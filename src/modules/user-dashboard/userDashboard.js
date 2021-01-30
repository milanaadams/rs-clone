import create from '../utils/create';
import removeChildren from '../utils/removeAllChildren';
import Abstract from '../abstract/abstract';
import Categories from '../categories/categories';
import locale from '../language/locale';
import Chart from '../chart/chart';
import Moves from '../moves/moves';
import config from '../../config';

export default class UserDashboard extends Abstract {
  constructor(lang, parent, headerInfo, dataModel) {
    super();
    this.parent = parent;
    this.elements = {};
    this.headerInfo = headerInfo;
    this.dataModel = dataModel;
    this.langObj = lang;
    this.lang = lang.language;
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
    const langSwitcher = create('li', 'header__dropdown-menu__item', this.langObj.loadLanguageSwitcher(), this.elements.dropdownMenu);
    this.elements.dropdownMenuEmail = create('li', 'header__dropdown-menu__item', this.dataModel.email, this.elements.dropdownMenu);
    this.elements.populateData = create('li', 'header__dropdown-menu__item', locale.autoData[this.lang], this.elements.dropdownMenu);
    this.elements.logOut = create('li', 'header__dropdown-menu__item', locale.menu.logout[this.lang], this.elements.dropdownMenu);

    this.headerInfo.addEventListener('click', () => {
      this.elements.dropdown.classList.toggle('header__dropdown--active');
      this.elements.dropdown.addEventListener('mouseleave', () => this.elements.dropdown.classList.remove('header__dropdown--active'));
    });
    this.elements.populateData.addEventListener('click', () => {
      this.userToken = localStorage.getItem('userToken');

      if (this.userToken) {
        fetch(`${config.server}/api/user/dataGenerate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.userToken}`,
          },
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
    });

    this.elements.populateData.style.cursor = 'pointer';
    langSwitcher.style.cursor = 'pointer';
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
    this.incomeBlock = new Categories(this.lang, this.elements.dashboardLeft, this.dataModel);
    this.chartBlock = new Chart(this.langObj, this.elements.dashboardLeft, this.dataModel);
    this.movesHistoryBlock = new Moves(this.lang, this.elements.dashboardRight, this.dataModel);
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
