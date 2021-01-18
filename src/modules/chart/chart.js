import ChartJs from 'chart.js';
import create from '../utils/create';
import locale from '../language/locale';
import config from '../../config';
import DataSetItem from './dataSetItem';
import Abstract from '../abstract/abstract';

export default class Chart extends Abstract {
  constructor(lang, parent, dataModel) {
    super();
    this.parent = parent;
    this.dataModel = dataModel;
    this.elements = {};
    this.lang = lang;

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

  chartSettingsInit() {
    this.timeFormat = 'DD/MM/YYYY';

    this.chartConfig = {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            format: this.timeFormat,
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

  loadBlocks() {
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
    this.elements.canvas = create('canvas', 'canvas', null, canvasBox, ['width', '200'], ['height', '70'], ['id', 'chart']);
    this.elements.ctx = this.elements.canvas.getContext('2d');
    this.chart = new ChartJs(this.elements.ctx, {
      type: 'line',
      data: this.chartData,
      options: this.chartConfig,
    });
  }

  selectHandler(evt) {
    const { target } = evt;
    const { source } = target.dataset;
    const { value } = evt.target.options[evt.target.selectedIndex];

    const curValue = this[source].find((item) => item.id === value);
    if (!curValue) return;

    console.log(curValue);
    if (source === 'selectItems') {
      this.filter.catType = curValue.catType;
      if (this.filter.userCat !== undefined) delete this.filter.userCat;
      if (curValue.userCat !== undefined) this.filter.userCat = curValue.userCat;
    } else if (source === 'selectTimes') {
      this.filter.dateTrunc = curValue.id;
    }

    this.getData();
  }

  switchAppLang() {
    this.selectItems = locale.chart.selectItems.map((item) => {
      const obj = {
        id: item.id,
        name: item[this.lang.language],
      };
      if (item.catType) obj.catType = item.catType;
      if (item.userCat !== undefined) obj.userCat = item.userCat;
      return obj;
    });

    this.selectTimes = locale.chart.selectTimes.data.map((item) => {
      const obj = {
        id: item.id,
        name: item[this.lang.language],
      };
      return obj;
    });

    this.elements.selectItems.innerHTML = '';
    this.selectItems.forEach((item) => {
      create('option', null, item.name, this.elements.selectItems, ['value', item.id]);
    });

    this.elements.selectTimes.innerHTML = '';
    this.selectTimes.forEach((item) => {
      create('option', null, item.name, this.elements.selectTimes, ['value', item.id]);
    });
  }

  prepareData(data) {
    console.log(data);

    const dynamicColors = function () {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b})`;
    };

    this.chartData.datasets = [];

    this.filter.catType.forEach((typeId) => {
      const dataSetData = data.filter((item) => item.type_id === typeId).map((el) => {
        const obj = {
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
        const newDataSetData = dataSetData.reduce((prev, cur, idx) => {
          if (!prev[cur.userCat]) prev[cur.userCat] = [];
          const newObj = { ...cur };
          delete newObj.userCat;
          prev[cur.userCat].push(newObj);
          return prev;
        }, {});

        Object.keys(newDataSetData).forEach((userCatId) => {
          const title = this.dataModel.userCategories.find(
            (uc) => uc.id === parseInt(userCatId, 10),
          ).name;
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

    this.chart.update();
  }

  getData() {
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
          // this.createCustomEvent('logOut');
          console.log('gg');
        } else {
          response.json().then((data) => {
            this.prepareData(data);
          });
        }
      })
      .catch((errMsg) => { throw new Error(errMsg); });
  }

  catchEvent(eventName) {
    if (eventName.match(/changeLang/)) this.switchAppLang();
  }
}
