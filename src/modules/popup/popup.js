import create from '../utils/create';

export default class Popup {
  constructor(parent, content) {
    this.parent = parent;
    this.content = content;
    this.elements = {};
    this.loadPopup();
  }

  loadPopup() {
    this.elements.blackOut = create('div', 'blackout');
    this.parent.prepend(this.elements.blackOut);

    this.elements.blackOut.addEventListener('click', () => { this.closePopup(); });

    document.body.classList.add('lock');

    this.elements.popup = create('div', 'popup', this.content);
    this.parent.prepend(this.elements.popup);
  }

  closePopup() {
    document.body.classList.remove('lock');
    this.elements.popup.remove();
    this.elements.blackOut.remove();
  }
}
