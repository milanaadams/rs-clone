/* eslint-disable class-methods-use-this */
import create from '../utils/create';
import Abstract from '../abstract/abstract';

export default class Login extends Abstract {
  constructor(parent) {
    super();
    this.parent = parent;
    this.login = true;
    this.elements = {};
    this.generateForm();
  }

  generateForm() {
    this.elements.login = create('div', 'login', null, this.parent);
    this.elements.loginInner = create('div', 'login__inner', null, this.elements.login);
    this.elements.title = create('h2', 'login__title', null, this.elements.loginInner);
    this.elements.form = create('form', 'login__form', null, this.elements.loginInner);
    const formItemName = create('div', 'login__form-item', null, this.elements.form);
    const formItemEmail = create('div', 'login__form-item', null, this.elements.form);
    const formItemPass = create('div', 'login__form-item', null, this.elements.form);
    const formItemBtn = create('div', 'login__form-item', null, this.elements.form);
    const loginMeta = create('div', 'login__form-meta', null, this.elements.loginInner);

    if (this.login) this.elements.title.textContent = 'Login';
    else this.elements.title.textContent = 'Register';

    create('img', 'login__form-icon', null, formItemEmail, ['src', './assets/email-icon.png']);
    create('img', 'login__form-icon', null, formItemPass, ['src', './assets/pass-icon.png']);
    if (!this.login) create('img', 'login__form-icon', null, formItemName, ['src', './assets/username-icon.png']);

    if (!this.login) this.elements.inputName = create('input', 'login__form-input --border', null, formItemName, ['type', 'text'], ['placeholder', 'Name'], ['name', 'userName']);
    this.elements.inputEmail = create('input', 'login__form-input --border', null, formItemEmail, ['type', 'email'], ['placeholder', 'E-mail'], ['name', 'email']);
    this.elements.inputPass = create('input', 'login__form-input', null, formItemPass, ['type', 'password'], ['placeholder', 'Password'], ['name', 'pass']);
    this.elements.inputBtn = create('input', 'login__form-input submit-btn', null, formItemBtn, ['type', 'submit']);

    if (this.login) this.elements.inputBtn.setAttribute('value', 'Log In');
    else this.elements.inputBtn.setAttribute('value', 'Sign Up');

    this.elements.errorMessage = create('span', 'login__error-message', '', loginMeta);
    if (this.login) {
      this.elements.register = create('div', 'login__register', 'Don\'t have an account?', loginMeta);
      this.elements.registerLink = create('span', 'login__register-link', 'Sign up', this.elements.register);
      this.elements.registerLink.addEventListener('click', () => { this.login = false; this.switchForm(); });
    } else {
      this.elements.offerLogIn = create('div', 'login__register', 'Already have an account?', loginMeta);
      this.elements.offerLogInLink = create('span', 'login__register-link', 'Log in', this.elements.offerLogIn);
      this.elements.offerLogInLink.addEventListener('click', () => { this.login = true; this.switchForm(); });
    }

    if (this.login) this.elements.form.addEventListener('submit', (e) => { e.preventDefault(); this.processForm(this.elements.inputEmail, this.elements.inputPass); });
    else this.elements.form.addEventListener('submit', (e) => { e.preventDefault(); this.processForm(this.elements.inputEmail, this.elements.inputPass, this.elements.inputName); });
    this.elements.inputEmail.addEventListener('focus', (evt) => { this.removeErrorMsg(evt.target); });
    this.elements.inputPass.addEventListener('focus', (evt) => { this.removeErrorMsg(evt.target); });
  }

  processForm(...args) {
    args.forEach((el) => {
      if (el.value === '') {
        const errorBlock = create('div', 'error');
        create('img', 'error-icon', null, errorBlock, ['src', './assets/input-error.png']);
        create('span', 'error-text', 'This field should not be empty', errorBlock);
        el.parentElement.appendChild(errorBlock);
        errorBlock.addEventListener('click', () => { el.parentElement.children[el.parentElement.children.length - 1].remove(); });
      }
    });
    if (args.some((el) => el.value === '')) return;

    if (this.login) this.logInUser(...args);
    else this.registerUser(...args);
  }

  removeErrorMsg(input) {
    if (input.parentElement.children.length === 3) input.parentElement.children[2].remove();
  }

  switchForm() {
    while (this.parent.children.length > 0) this.parent.children[0].remove();
    this.generateForm();
  }

  logInUser(userEmail, userPass) {
    fetch('https://f19m-rsclone-back.herokuapp.com/api/login', {
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
        }
        if (response.status === 400) {
          create('p', null, data.error, this.elements.errorMessage);
        }
      }))
      .catch((errMsg) => { throw new Error(errMsg); });
  }

  registerUser(userEmail, userPass, userName) {
    fetch('https://f19m-rsclone-back.herokuapp.com/api/registration', {
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
          create('p', null, data.error, this.elements.errorMessage);
        }
      }))
      .catch((errMsg) => { throw new Error(errMsg); });
  }

  showRegisteredSuccessfullyMsg() {
    while (this.parent.children.length > 0) this.parent.children[0].remove();
    create('div', 'registration-success', 'You have successfully registered!', this.parent);
    setTimeout(() => {
      this.login = true;
      this.switchForm();
    }, 3000);
  }

  catchEvent(eventName) {
    if (this.evtArr.indexOf(eventName) === -1) {
      throw new Error('Wrong custom event name.');
    }
  }
}
