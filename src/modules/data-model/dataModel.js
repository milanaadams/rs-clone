import create from '../utils/create';

export default class DataModel {
  constructor(data) {
    this.currentToken = localStorage.getItem('userToken');
    this.user = data.user.name;
    this.email = data.user.email;
    this.categories = data.categories;
    this.blocks = data.categories;
    this.userCategories = data.user.userCategories;
    this.moves = {};
    this.moves.list = data.user.moves.data.map((move) => {
      const newMove = { ...move };
      newMove.cat_from = this.userCategories.find((cat) => cat.id === move.cat_from);
      newMove.cat_to = this.userCategories.find((cat) => cat.id === move.cat_to);
      return newMove;
    });
    this.moves.offset = data.user.moves.offset;
  }
}
