import create from '../utils/create';

export default class DataModel {
  constructor(data) {
    console.log(data);
    this.currentToken = localStorage.getItem('userToken');
    //console.log(this.currentToken);
  }
}