import create from '../utils/create';
import locale from '../language/locale';
import generalPoperties from '../utils/general-properties';
import config from '../../config';
import Abstract from '../abstract/abstract';
import MovesUpdate from './moves-update';

export default class Moves extends Abstract {
  constructor(lang, parent, dataModel) {
    super();
    this.lang = lang;
    this.dataModel = dataModel;
    this.parent = parent;
    this.elements = {};
    this.moves = [];
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
        const categoryEdit = create('i', 'material-icons moves-history__day-item-update', 'edit', dayBlockListItem);
        const categoryDelete = create('i', 'material-icons moves-history__day-item-update moves-history__day-item-delete', 'delete', dayBlockListItem);
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

        const currentMove = {
          element: dayBlockListItem,
          info: move,
        };
        this.moves.push(currentMove);

        categoryEdit.addEventListener('click', () => { this.popUp = new MovesUpdate(this.lang, move, this.moves); });
        categoryDelete.addEventListener('click', () => { this.deleteCategory(move); });
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

  deleteCategory(category) {
    this.userToken = localStorage.getItem('userToken');

    if (this.userToken) {
      fetch(`${config.server}/api/moves/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userToken}`,
        },
        body: JSON.stringify({
          move: {
            id: category.id,
          },
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            this.createCustomEvent('logOut');
          } else {
            response.json().then((data) => {
              this.createCustomEvent('updateDataModel');
              const currentMoveInd = this.moves.findIndex((move) => move.info.id === data.move);
              this.moves.splice(currentMoveInd, 1);
            }).then(() => {
              setTimeout(() => {
                this.createCustomEvent('updateMovesBlock');
              }, 2000);
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }
  }

  updateMovesBlock() {
    this.elements.container.remove();
    this.elements = {};
    this.moves = [];

    this.loadMovesHistory();
  }

  catchEvent(eventName) {
    if (eventName.match(/updateMovesBlock/)) this.updateMovesBlock();
  }
}
