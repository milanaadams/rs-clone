import ChartJs from 'chart.js';
import create from '../utils/create';
import locale from '../main/locale';

export default class DataSetItem {
  constructor(label, data, fill=false, borderColor, backgroundColor, borderWidth) {
    this.label = label;
    this.data = data;
    this.fill = fill;
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
    this.borderWidth = borderWidth;
  }

}
