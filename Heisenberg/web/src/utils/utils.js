import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import navData from '../common/nav';
import loginData from '../common/login';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = 5, dataArry = [];
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);


    const beginTime = now.getTime() - (day * oneDay);
    for (let index = 0; index < 7; index ++) {
      dataArry.push(beginTime + ((index * oneDay) - 1000))
    }

    return dataArry;
  }
  if (type === 'towWeek') {
    let day = 12, dataArry = [];
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    const beginTime = now.getTime() - (day * oneDay);

    for (let index = 0; index < 14; index++) {
      dataArry.push(beginTime + ((index * oneDay) - 1000))
    }

    return dataArry;
  }

  if (type === 'month') {
    let day = 28, dataArry= [];
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    const beginTime = now.getTime() - (day * oneDay);

    for (let index = 0; index < 30; index++) {
      dataArry.push(beginTime + ((index * oneDay) - 1000))
    }

    return dataArry;
  }

  if (type === 'year') {
    const year = now.getFullYear();

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function getRouteData(path) {
  let routerData = [];
  if (path == 'UserLayout'){
    routerData = loginData;
  }else{
    routerData = navData
  }
  if (!routerData.some(item => item.layout === path) ||
      !(routerData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const dataList = cloneDeep(routerData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(dataList.children);
  return nodeList;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
