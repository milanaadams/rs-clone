import create from '../utils/create';
import locale from '../language/locale';

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

    Object.keys(this.dataModel.allMoves).forEach((item) => {
      const renderingDate = new Date(item);
      const dayBlock = create('div', 'moves-history__day-block', null, this.elements.container);
      create('div', 'moves-history__day-head', `${locale.weekdays[this.lang][renderingDate.getDay()]}, ${renderingDate.getDate()} ${locale.months[this.lang][renderingDate.getMonth()]}`, dayBlock);
      const dayBlockList = create('ul', 'moves-history__day-list', null, dayBlock);
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
          dayBlockAmount.style.color = '#e53935';
          dayBlockAmount.prepend('- ');
        }
        if (move.cat_from_ref.type === 1) {
          dayBlockAmount.style.color = '#03a879';
          dayBlockAmount.prepend('+ ');
        }
      });
    });
  }
}
