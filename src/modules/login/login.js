import create from '../utils/create';

export default class Login {
  constructor(parent) {
    this.parent = parent;
    this.stat = {};
    this.elements = {};
    this.generateLoginForm();
  }

  generateLoginForm() {
    this.elements.login = create('div', 'login', null, this.parent);
    this.elements.title = create('h2', 'login__title', 'Login', this.elements.login);
    this.elements.form = create('form', 'login__form', null, this.elements.login);
    const formItemEmail = create('div', 'login__form-item', null, this.elements.form);
    const formItemPass = create('div', 'login__form-item', null, this.elements.form);
    const formItemBtn = create('div', 'login__form-item', null, this.elements.form);
    const loginMeta = create('div', 'login__form-meta', null, this.elements.login);

    create('img', 'login__form-icon', null, formItemEmail, ['src', './assets/email-icon.png']);
    create('img', 'login__form-icon', null, formItemPass, ['src', './assets/pass-icon.png']);

    this.elements.inputEmail = create('input', 'login__form-input', null, formItemEmail, ['type', 'email'], ['placeholder', 'E-mail'], ['name', 'email']);
    this.elements.inputPass = create('input', 'login__form-input', null, formItemPass, ['type', 'password'], ['placeholder', 'Password'], ['name', 'email']);
    this.elements.inputBtn = create('input', 'login__form-input submit-btn', null, formItemBtn, ['type', 'submit'], ['value', 'Log In']);

    this.elements.forgotPass = create('span', 'login__forgot-pass', 'Forgot password?', loginMeta);
    this.elements.Register = create('div', 'login__register', 'Don\'t have an account?', loginMeta);
    this.elements.RegisterLink = create('span', 'login__register-link', 'Sign up', this.elements.Register);

    this.elements.form.addEventListener('submit', (e) => { e.preventDefault(); this.processForm(this.elements.inputEmail, this.elements.inputPass); });
  }

  processForm(...args) {
    args.forEach((el) => {
      if (el.value === '') {
        const errorBlock = create('div', 'error');
        create('img', 'error-icon', null, errorBlock, ['src', './assets/input-error.png']);
        create('span', 'error-text', 'This field should not be empty', errorBlock);
        el.parentElement.appendChild(errorBlock);
        this.stat.error = true;
        errorBlock.addEventListener('click', () => { el.parentElement.children[el.parentElement.children.length - 1].remove(); this.stat.error = false;});
      }
    });
  }
}
