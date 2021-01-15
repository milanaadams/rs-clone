import chart from 'chart.js';
import create from '../utils/create';
import locale from '../main/locale';

export default class Chart {
  constructor(parent, dataModel) {
    this.parent = parent;
    this.dataModel = dataModel;
    this.elements = {};
    this.lang = 'en';
    console.log(dataModel);
    ///   this.loadBlocks();
    // https://www.chartjs.org/samples/latest/scales/logarithmic/line.html
    // https://www.chartjs.org/docs/latest/
  }
}
