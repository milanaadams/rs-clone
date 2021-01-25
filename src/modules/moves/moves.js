import create from '../utils/create';
import locale from '../language/locale';
import generalPoperties from '../utils/general-properties';

export default class Moves {
  constructor(lang, parent, dataModel) {
    this.lang = lang;
    this.dataModel = dataModel;
    this.parent = parent;
    this.elements = {};
    this.loadMovesHistory();
  }

  loadMovesHistory() {
    this.elements.container = create('div', 'moves-history', null, this.parent);
    this.elements.container.style.height = `${document.querySelector('.dashboard__left').offsetHeight}px`;
    if (Object.keys(this.dataModel.allMoves).length === 0) create('p', 'moves-history__no-moves', 'No transactions yet', this.elements.container);

    Object.keys(this.dataModel.allMoves).forEach((item) => {
      const renderingDate = new Date(item);
      const dayBlock = create('div', 'moves-history__day-block', null, this.elements.container);
      create('div', 'moves-history__day-head', `${locale.weekdays[this.lang][renderingDate.getDay()]}, ${renderingDate.getDate()} ${locale.months[this.lang][renderingDate.getMonth()]}`, dayBlock);
      const dayBlockList = create('ul', 'moves-history__day-list', null, dayBlock);
      let dayTotal = 0;
      this.dataModel.allMoves[item].forEach((move) => {
        const dayBlockListItem = create('li', 'moves-history__day-item', null, dayBlockList);
        const dayBlockListItemBody = create('div', 'moves-history__transaction', null, dayBlockListItem);
        const dayBlockTransactionCat = create('div', 'moves-history__transaction-category', null, dayBlockListItemBody);
        const dayBlockTransactionAmount = create('div', 'moves-history__transaction-amount', null, dayBlockListItemBody);
        create('div', 'moves-history__transaction-comment', move.comment, dayBlockListItem);
        create('p', 'moves-history__from-cat', move.cat_from_ref.name, dayBlockTransactionCat);
        create('span', 'moves-history__to-cat', move.cat_to_ref.name, dayBlockTransactionCat);
        const dayBlockAmount = create('p', 'moves-history__amount', `${parseFloat(move.value).toLocaleString(this.lang)} ${locale.currency[this.lang]}`, dayBlockTransactionAmount);
        if (move.cat_to_ref.type === 3) {
          dayBlockAmount.style.color = generalPoperties.negativeMark;
          dayBlockAmount.prepend('- ');
          dayTotal -= parseFloat(move.value);
        }
        if (move.cat_from_ref.type === 1) {
          dayBlockAmount.style.color = generalPoperties.positiveMark;
          dayBlockAmount.prepend('+ ');
          dayTotal += parseFloat(move.value);
        }
      });
      const dayBlockTotal = create('li', 'moves-history__day-item moves-history__total', null, dayBlockList);
      const dayBlockTotalAmount = create('div', 'moves-history__total-amount', null, dayBlockTotal);
      create('span', 'moves-history__total-title', locale.moves.total[this.lang], dayBlockTotal);

      if (dayTotal > 0) {
        dayBlockTotalAmount.textContent = `+ ${dayTotal.toFixed(2)} ${locale.currency[this.lang]}`; dayBlockTotalAmount.style.color = generalPoperties.positiveMark;
      } else if (dayTotal < 0) {
        dayBlockTotalAmount.textContent = `- ${dayTotal.toFixed(2) * -1} ${locale.currency[this.lang]}`;
        dayBlockTotalAmount.style.color = generalPoperties.negativeMark;
      } else dayBlockTotalAmount.textContent = `${dayTotal.toFixed(2)} ${locale.currency[this.lang]}`;
    });
  }
}
