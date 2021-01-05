import create from '../utils/create';

export default class UserDashboard {
  constructor(parent, headerInfo, dataModel) {
    this.parent = parent;
    this.headerInfo = headerInfo;
    this.dataModel = dataModel;
    create('div', null, 'user dashboard', this.parent);
  }
}
