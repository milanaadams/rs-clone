import create from '../utils/create';
import Abstract from '../abstract/abstract';
import '../utils/assets';
import Login from '../login/login';
import DataModel from '../data-model/dataModel';
import UserDashboard from '../user-dashboard/userDashboard';
import removeChildren from '../utils/removeAllChildren';
import config from '../../config';

export default class Main extends Abstract {
  constructor(lang) {
    super();
    this.userToken = null;
    this.elements = {};
    this.lang = lang;
    this.currentLang = this.lang.language;
    this.generateLayout();
  }

  generateLayout() {
    this.elements.pageBackground = create('div', 'page-background', null, document.body);

    this.elements.header = create('header', 'header', null, document.body);
    const headerContainer = create('div', 'container', null, this.elements.header); // header container max-width 1280px
    this.elements.headerInner = create('div', 'header__inner', null, headerContainer);
    this.elements.headerLeft = create('div', 'header__left', null, this.elements.headerInner);
    this.elements.headerRight = create('div', 'header__right', null, this.elements.headerInner);
    this.elements.headerLogo = create('a', 'header__logo', null, this.elements.headerLeft, ['href', '/']);
    create('img', 'header__logo-img', null, this.elements.headerLogo, ['src', './assets/logo.png']);
    create('img', 'header__logo-title', null, this.elements.headerLogo, ['src', './assets/logo-title.png']);

    this.elements.main = create('main', 'main', null, document.body);
    const mainContainer = create('div', 'container', null, this.elements.main);
    this.elements.mainInner = create('div', 'main__inner', null, mainContainer);

    this.elements.footer = create('footer', 'footer', null, document.body);
    const footerContainer = create('div', 'container', null, this.elements.footer);
    this.elements.footerInner = create('div', 'footer__inner', null, footerContainer);
    create('p', 'footer__year', '©2021', this.elements.footerInner);
    const footerCourseLink = create('a', 'footer__course-link', null, this.elements.footerInner, ['href', 'https://rs.school/js/'], ['target', '_blank']);
    footerCourseLink.innerHTML = '<img src="assets/rs-school-js.svg" style = "width: 60px; height: auto" alt="RS School logo">';
    const footerAuthorsInfo = create('div', 'footer__authors-info', null, this.elements.footerInner);
    const authorsInfo = ['f19m', 'milanaadams'];
    authorsInfo.forEach((name) => { create('a', 'footer__authors-link', name, footerAuthorsInfo, ['href', `https://github.com/${name}`], ['target', '_blank']); });

    this.loadContent();
  }

  loadContent() {
    removeChildren(this.elements.mainInner);
    removeChildren(this.elements.headerRight);
    this.userToken = localStorage.getItem('userToken');
    if (this.userToken) {
      fetch(`${config.server}/api/user/getInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userToken}`,
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            this.userToken = null;
            localStorage.removeItem('userToken');
            this.loadLoginForm();
          } else {
            response.json().then((data) => {
              console.log(data);
              this.dataModel = new DataModel(data);
              this.userDashboard = new UserDashboard(this.lang, this.elements.mainInner,
                this.elements.headerRight, this.dataModel);
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }

    if (!this.userToken) {
      this.loadLoginForm();
      const langSwitcher = create('div', 'language-switcher', this.lang.loadLanguageSwitcher(), this.elements.headerRight);
      langSwitcher.addEventListener('click', () => { this.lang.switchLanguage(); });
    }
  }

  loadLoginForm() {
    this.loginForm = new Login(this.currentLang, this.elements.mainInner, true);
  }

  logOut() {
    this.userToken = null;
    localStorage.removeItem('userToken');
    this.loadContent();
  }

  switchAppLang() {
    this.currentLang = this.lang.language;
    this.loadContent();
  }

  catchEvent(eventName) {
    if (eventName.match(/userLoggedIn/)) this.loadContent();
    if (eventName.match(/logOut/)) this.logOut();
    if (eventName.match(/changeLang/)) this.switchAppLang();
  }
}
