/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */

import create from '../utils/create';
import Abstract from '../abstract/abstract';
import locale from '../language/locale';
import config from '../../config';

export default class Login extends Abstract {
  parent:HTMLElement;
  login: boolean;
  elements: any;
  lang: string;
  token?: string;
  registerError?: HTMLElement;

  constructor(lang: string, parent: HTMLElement) {
    super();
    this.parent = parent;
    this.login = true;
    this.elements = {};
    this.lang = lang;
    this.generateForm();
  }

  generateForm(): void {
    this.elements.login = create('div', 'login', null, this.parent);
    this.elements.loginInner = create('div', 'login__inner', null, this.elements.login);
    this.elements.title = create('h2', 'login__title', null, this.elements.loginInner);
    this.elements.form = create('form', 'login__form', null, this.elements.loginInner);
    const formItemName = create('div', 'login__form-item', null, this.elements.form);
    const formItemEmail = create('div', 'login__form-item', null, this.elements.form);
    const formItemPass = create('div', 'login__form-item', null, this.elements.form);
    const formItemBtn = create('div', 'login__form-item', null, this.elements.form);
    const loginMeta = create('div', 'login__form-meta', null, this.elements.loginInner);

    if (this.login) this.elements.title.textContent = locale.loginForm.loginTitle[this.lang];
    else this.elements.title.textContent = locale.register.registerTitle[this.lang];

    create('img', 'login__form-icon', null, formItemEmail, ['src', './assets/email-icon.png']);
    create('img', 'login__form-icon', null, formItemPass, ['src', './assets/pass-icon.png']);
    if (!this.login) create('img', 'login__form-icon', null, formItemName, ['src', './assets/username-icon.png']);

    if (!this.login) {
      this.elements.inputName = create('input', 'login__form-input --border',
        null, formItemName, ['type', 'text'],
        ['placeholder', locale.register.registerNamePlaceholder[this.lang]],
        ['name', 'userName']);
    }

    this.elements.inputEmail = create('input', 'login__form-input --border', null,
      formItemEmail,
      ['type', 'email'], ['placeholder', locale.loginForm.emailPlaceholder[this.lang]],
      ['name', 'email']);

    this.elements.inputPass = create('input', 'login__form-input', null, formItemPass,
      ['type', 'password'],
      ['placeholder', locale.loginForm.passPlaceholder[this.lang]], ['name', 'pass']);

    this.elements.inputBtn = create('input', 'login__form-input submit-btn', null, formItemBtn, ['type', 'submit']);

    if (this.login) this.elements.inputBtn.setAttribute('value', locale.loginForm.submitBtn[this.lang]);
    else this.elements.inputBtn.setAttribute('value', locale.register.registerSignup[this.lang]);

    this.elements.errorMessage = create('span', 'login__error-message', '', loginMeta);
    if (this.login) {
      this.elements.register = create('div', 'login__register', locale.loginForm.metaTitle[this.lang], loginMeta);
      this.elements.registerLink = create('span', 'login__register-link', locale.loginForm.metaLink[this.lang], this.elements.register);
      this.elements.registerLink.addEventListener('click', () => { this.login = false; this.switchForm(); });
    } else {
      this.elements.offerLogIn = create('div', 'login__register', locale.register.meta.haveAccount[this.lang], loginMeta);
      this.elements.offerLogInLink = create('span', 'login__register-link',
        locale.register.meta.login[this.lang], this.elements.offerLogIn);
      this.elements.offerLogInLink.addEventListener('click', () => { this.login = true; this.switchForm(); });
    }

    if (this.login) {
      this.elements.form.addEventListener('submit', (evt: Event) => {
        evt.preventDefault();
        this.processForm(this.elements.inputEmail, this.elements.inputPass);
      });
    } else {
      this.elements.form.addEventListener('submit', (evt: Event) => {
        evt.preventDefault();
        this.processForm(this.elements.inputEmail, this.elements.inputPass, this.elements.inputName);
      });
    }
    this.elements.inputEmail.addEventListener('focus', (evt: Event) => { this.removeErrorMsg(<HTMLElement> evt.target); });
    this.elements.inputPass.addEventListener('focus', (evt: Event) => { this.removeErrorMsg(<HTMLElement> evt.target); });
  }

  processForm(...args: Array<HTMLInputElement>): void {
    args.forEach((el) => {
      if (el.value === '') {
        const errorBlock = create('div', 'error');
        create('img', 'error-icon', null, errorBlock, ['src', './assets/input-error.png']);
        create('span', 'error-text', locale.loginForm.emptyField[this.lang], errorBlock);
        if (el.parentElement !== null) {
          const parent: HTMLElement = el.parentElement;
          parent.appendChild(errorBlock);
          errorBlock.addEventListener('click', () => { parent.children[parent.children.length - 1].remove(); });
        }
      }
    });
    if (args.some((el) => el.value === '')) return;

    const [userEmail, userPass, userName] = [...args];
    if (this.login) this.logInUser(userEmail, userPass);
    else this.registerUser(userEmail, userPass, userName);
  }

  removeErrorMsg(input: HTMLElement): void {
    if (input && input.parentElement
       && input.parentElement.children.length === 3) input.parentElement.children[2].remove();
  }

  switchForm(): void {
    while (this.parent.children.length > 0) this.parent.children[0].remove();
    this.generateForm();
  }

  logInUser(userEmail: HTMLInputElement, userPass: HTMLInputElement) : void {
    fetch(`${config.server}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // mode: 'no-cors',
      body: JSON.stringify({
        email: userEmail.value,
        password: userPass.value,
      }),
    })
      .then((response) => response.json().then((data) => {
        while (this.elements.errorMessage.children.length > 0) {
          this.elements.errorMessage.children[0].remove();
        }
        if (response.status === 200) {
          localStorage.setItem('userToken', data.token);
          this.token = data.token;
          this.createCustomEvent('userLoggedIn');
        } else {
          create('p', null, data.error, this.elements.errorMessage);
        }
      }))
      .catch((errMsg) => { throw new Error(errMsg); });
  }

  registerUser(userEmail: HTMLInputElement,
    userPass: HTMLInputElement,
    userName: HTMLInputElement): void {
    fetch(`${config.server}/api/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail.value,
        password: userPass.value,
        name: userName.value,
      }),
    })
      .then((response) => response.json().then((data) => {
        if (response.status === 200) {
          this.showRegisteredSuccessfullyMsg();
        } else {
          if (this.registerError) this.registerError.remove();
          this.registerError = create('p', null, data.error, this.elements.errorMessage);
        }
      }))
      .catch((errMsg) => { throw new Error(errMsg); });
  }

  showRegisteredSuccessfullyMsg(): void {
    while (this.parent.children.length > 0) this.parent.children[0].remove();
    create('div', 'registration-success', locale.loginForm.registerSuccess[this.lang], this.parent);
    setTimeout(() => {
      this.login = true;
      this.switchForm();
    }, 3000);
  }

  catchEvent(eventName: string): void {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
