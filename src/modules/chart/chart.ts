/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ChartJs from 'chart.js';
import create from '../utils/create';
import locale from '../language/locale';
import config from '../../config';
import DataSetItem from './dataSetItem';
import Abstract from '../abstract/abstract';

// ts
import DataModel from '../data-model/dataModel';
import {
  Dictionary, ChartFilter, ChartDataItem,
} from '../../types/typings';
import Language from '../language/language';

export default class Chart extends Abstract {
  lang: Language;
  parent: HTMLElement;
  elements: Dictionary<HTMLElement|CanvasRenderingContext2D|HTMLCanvasElement|null>;
  dataModel: DataModel;
  filter?: any;
  chartConfig?: any;
  chartData?: any;
  chart?: ChartJs;
  selectItems: Array<Dictionary<string>>;
  selectTimes: Array<Dictionary<string>>;

  constructor(lang: Language, parent: HTMLElement, dataModel: DataModel) {
    super();
    this.parent = parent;
    this.dataModel = dataModel;
    this.elements = {};
    this.lang = lang;
    this.selectItems = [];
    this.selectTimes = [];

    // this.selectItems = locale.chart.selectItems.map((item) => {
    //   const obj = {
    //     id: item.id,
    //     name: item[lang.language],
    //   };
    //   if (item.catType) obj.catType = item.catType;
    //   if (item.userCat !== undefined) obj.userCat = item.userCat;
    //   return obj;
    // });

    // this.selectTimes = locale.chart.selectTimes.data.map((item) => {
    //   const obj = {
    //     id: item.id,
    //     name: item[lang.language],
    //   };
    //   return obj;
    // });

    // to-do dacapicker если будет время

    this.filter = {
      dateTrunc: 'day',
      dateFrom: '',
      dateTo: '',
      catType: [3],
    };

    this.chartSettingsInit();
    this.getData();
    this.loadBlocks();
  }

  chartSettingsInit(): void {
    const timeFormat = 'DD/MM/YYYY';

    this.chartConfig = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            format: timeFormat,
            tooltipFormat: 'll',
          },
          scaleLabel: {
            display: false,
            labelString: 'Date',
          },
        }],
        yAxes: [{
          scaleLabel: {
            display: false,
            labelString: 'value',
          },
        }],
      },
    };
  }

  loadBlocks(): void {
    const blockItem = create('div', 'block', null, this.parent);
    const blockHead = create('div', 'block__head', null, blockItem);
    const blockBody = create('div', 'block__body', null, blockItem);

    this.elements.selectItems = create('select', 'chart-select', null, blockHead, ['source', 'selectItems']);
    // this.selectItems.forEach((item) => {
    //   create('option', null, item.name, this.elements.selectItems, ['value', item.id]);
    // });
    this.elements.selectItems.addEventListener('change', (evt) => this.selectHandler(evt));

    this.elements.selectTimes = create('select', 'chart-select', null, blockHead, ['source', 'selectTimes']);
    // this.selectTimes.forEach((item) => {
    //   create('option', null, item.name, this.elements.selectTimes, ['value', item.id]);
    // });
    this.elements.selectTimes.addEventListener('change', (evt) => this.selectHandler(evt));
    this.switchAppLang();

    this.chartData = {};
    const canvasBox = create('div', 'canvasBox', null, blockBody);
    this.elements.canvas = create('canvas', 'canvas', null, canvasBox, ['width', '200'], ['height', '300'], ['id', 'chart']);
    this.elements.ctx = (<HTMLCanvasElement> this.elements.canvas).getContext('2d');
    if (this.elements.ctx) {
      this.chart = new ChartJs(this.elements.ctx, {
        type: 'line',
        data: this.chartData,
        options: this.chartConfig,
      });
    }
  }

  selectHandler(evt: Event): void {
    const { target } = evt;
    if (!target || (target && !(<HTMLElement>target).dataset)) return;
    const { source } = (<HTMLElement>target).dataset;
    const { value } = (<HTMLSelectElement>evt.target).options[(<HTMLSelectElement>evt.target).selectedIndex];

    if (!source) return;

    if (source === 'selectItems') {
      const curValue = this.selectItems.find((item) => item.id === value);
      if (!curValue) return;
      this.filter.catType = curValue.catType;
      if (this.filter.userCat !== undefined) delete this.filter.userCat;
      if (curValue.userCat !== undefined) this.filter.userCat = curValue.userCat;
    } else if (source === 'selectTimes') {
      const curValue = this.selectTimes.find((item) => item.id === value);
      if (!curValue) return;
      this.filter.dateTrunc = curValue.id;
    }

    this.getData();
  }

  switchAppLang(): void {
    this.selectItems = locale.chart.selectItems.map((item: Dictionary<any>) => {
      const obj: ChartFilter = {
        id: item.id,
        name: item[this.lang.language],
      };
      if (item.catType) obj.catType = item.catType;
      if (item.userCat !== undefined) obj.userCat = item.userCat;
      return obj;
    });

    this.selectTimes = locale.chart.selectTimes.data.map((item: Dictionary<any>) => {
      const obj = {
        id: item.id,
        name: item[this.lang.language],
      };
      return obj;
    });

    if (this.elements.selectItems) {
      (<HTMLElement> this.elements.selectItems).innerHTML = '';
      this.selectItems.forEach((item) => {
        create('option', null, item.name, <HTMLElement> this.elements.selectItems, ['value', item.id]);
      });
    }

    if (this.elements.selectTimes) {
      (<HTMLElement> this.elements.selectTimes).innerHTML = '';
      this.selectTimes.forEach((item) => {
        create('option', null, item.name, <HTMLElement> this.elements.selectTimes, ['value', item.id]);
      });
    }
  }

  prepareData(data: any): void {
    const dynamicColors = (): string => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b})`;
    };

    this.chartData.datasets = [];

    this.filter.catType.forEach((typeId: number) => {
      const dataSetData: Array<ChartDataItem> = data.filter((item: any) => item.type_id === typeId).map((el: any) => {
        const obj: ChartDataItem = {
          y: el.sum,
          x: new Date(el.date),
        };
        if (this.filter.userCat !== undefined) {
          obj.userCat = el.user_cat_id;
        }
        return obj;
      });

      let color;
      if (this.filter.userCat !== undefined) {
        const newDataSetObj :Dictionary<any> = {};
        const newDataSetData = dataSetData.reduce((prev, cur) => {
          if (cur.userCat) {
            if (!prev[cur.userCat]) prev[cur.userCat] = [];
            const newObj = { ...cur };
            delete newObj.userCat;
            prev[cur.userCat].push(newObj);
          }
          return prev;
        }, newDataSetObj);

        Object.keys(newDataSetData).forEach((userCatId) => {
          const userCat = this.dataModel.userCategories.find(
            (uc) => uc.id === parseInt(userCatId, 10),
          );
          const title = userCat ? userCat.name : '';
          const dataList = newDataSetData[userCatId];
          color = dynamicColors();

          const dataSet = new DataSetItem(title, dataList, false, color, color, 2);
          this.chartData.datasets.push(dataSet);
        });
      } else {
        let title;

        if (typeId === 1) {
          title = locale.income.blockName[this.lang.language];
          title = title[0].toUpperCase() + title.slice(1);
          color = 'blue';
        } else {
          title = locale.expenses.blockName[this.lang.language];
          title = title[0].toUpperCase() + title.slice(1);
          color = 'red';
        }

        const dataSet = new DataSetItem(title, dataSetData, false, color, color, 2);
        this.chartData.datasets.push(dataSet);
      }
    });

    if (this.chart) this.chart.update();
  }

  getData(): void {
    const userToken = localStorage.getItem('userToken');

    fetch(`${config.server}/api/moves/getDataByCatType`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        filter: this.filter,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          this.createCustomEvent('logOut');
        } else {
          response.json().then((data) => {
            this.prepareData(data);
          });
        }
      })
      .catch((errMsg) => { throw new Error(errMsg); });
  }

  catchEvent(eventName: string): void {
    if (eventName.match(/changeLang/)) this.switchAppLang();
  }
}
