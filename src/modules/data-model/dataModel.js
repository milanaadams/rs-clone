import create from '../utils/create';

export default class DataModel {
  constructor(data) {
    this.currentToken = localStorage.getItem('userToken');
    this.user = data.user.name;
    this.email = data.user.email;
    console.log(data);
    this.categories = data.categories;
    this.blocks = data.categories;
    this.userCategories = data.user.userCategories;
  }
}
