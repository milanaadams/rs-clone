/* eslint-disable @typescript-eslint/lines-between-class-members */
import config from '../../config';
import Abstract from '../abstract/abstract';
import * as t from '../../types/typings';

export default class DataModel extends Abstract {
  currentToken: string|null;
  user: string;
  email: string;
  categories: Array<t.Category>;
  blocks: Array<t.Category>;
  userCategories: Array<t.UserCategory>;
  allMoves: t.Dictionary<Array<t.Move>>;
  userToken?: string|undefined|null;

  constructor(data: t.UserInfo) {
    super();
    this.currentToken = localStorage.getItem('userToken');
    this.user = data.user.name;
    this.email = data.user.email;
    this.categories = data.categories;
    this.blocks = data.categories;
    this.userCategories = data.user.userCategories;
    // this.moves = {};
    // this.moves.list = data.user.moves.data.map((move) => {
    //   const newMove = { ...move };
    //   newMove.cat_from = this.userCategories.find((cat) => cat.id === move.cat_from);
    //   newMove.cat_to = this.userCategories.find((cat) => cat.id === move.cat_to);
    //   return newMove;
    // });
    this.allMoves = data.user.allMoves;
    // this.moves.offset = data.user.moves.offset;
  }

  getAllCagetoryByType(type: number): Array<t.UserCategory> {
    const selectedCategories: Array<t.UserCategory> = this
      .userCategories.filter((category) => category.type === type);

    return selectedCategories;
  }

  updateDataModel(): void {
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
            this.createCustomEvent('logOut');
          } else {
            response.json().then((data) => {
              this.user = data.user.name;
              this.email = data.user.email;
              this.categories = data.categories;
              this.blocks = data.categories;
              this.userCategories = data.user.userCategories;
              // this.moves = {};
              // this.moves.list = data.user.moves.data.map((move) => {
              //   const newMove = { ...move };
              //   newMove.cat_from = this.userCategories.find((cat) => cat.id === move.cat_from);
              //   newMove.cat_to = this.userCategories.find((cat) => cat.id === move.cat_to);
              //   return newMove;
              // });
              this.allMoves = data.user.allMoves;
              // this.moves.offset = data.user.moves.offset;

              // console.log(this.allMoves);
            });
          }
        })
        .catch((errMsg) => { throw new Error(errMsg); });
    }
  }

  catchEvent(eventName: string): void {
    if (eventName.match(/updateDataModel/)) this.updateDataModel();
  }
}
