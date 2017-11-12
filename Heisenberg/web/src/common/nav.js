import BasicLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';
import BlankLayout from '../layouts/BlankLayout';

import Analysis from '../routes/Dashboard/Analysis';
import Monitor from '../routes/Dashboard/Monitor';
import Workplace from '../routes/Dashboard/Workplace';

import TableList from '../routes/List/TableList';
import CoverCardList from '../routes/List/CoverCardList';
import CardList from '../routes/List/CardList';
import FilterCardList from '../routes/List/FilterCardList';
import SearchList from '../routes/List/SearchList';
import BasicList from '../routes/List/BasicList';

import BasicProfile from '../routes/Profile/BasicProfile';
import AdvancedProfile from '../routes/Profile/AdvancedProfile';

import BasicForm from '../routes/Forms/BasicForm';
import AdvancedForm from '../routes/Forms/AdvancedForm';
import StepForm from '../routes/Forms/StepForm';
import Step2 from '../routes/Forms/StepForm/Step2';
import Step3 from '../routes/Forms/StepForm/Step3';

import Exception403 from '../routes/Exception/403';
import Exception404 from '../routes/Exception/404';
import Exception500 from '../routes/Exception/500';

import Success from '../routes/Result/Success';
import Error from '../routes/Result/Error';

import Login from '../routes/User/Login';
import Register from '../routes/User/Register';
import RegisterResult from '../routes/User/RegisterResult';

import VersionList from '../routes/Version/VersionList';
import SKUList from '../routes/SKU/SKUList';
import PromotionList from '../routes/Promotion/PromotionList';

const data = [{
  component: BasicLayout,
  layout: 'BasicLayout',
  name: '首页', // for breadcrumb
  path: '',
  children: [ {
    name: '应用管理',
    path: 'vlist',
    icon: 'appstore',
    children: [{
      name: '应用列表',
      path: 'version-list',
      component: VersionList,
    }],
  }, {
    name: '商品管理',
    path: 'sku',
    icon: 'barcode',
    children: [{
      name: '商品列表',
      path: 'sku-list',
      component: SKUList,
    }],
  }, {
    name: '推荐管理',
    path: 'promotion',
    icon: 'gift',
    children: [{
      name: '推荐列表',
      path: 'promotion-list',
      component: PromotionList,
    }],
  }],
}, {
  component: UserLayout,
  layout: 'UserLayout',
  children: [],
}, {
  component: BlankLayout,
  layout: 'BlankLayout',
  children: []
}];

export function getNavData() {
  return data;
}

export default data;
