import { stringify } from 'qs';
import request from '../utils/request';
import { gethttpaddress } from '../utils/http';
const Address = gethttpaddress();

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function addVersion(params) {
  return request(`http://${Address}/api/version/add`, {
    method: 'POST',
    body: params,
  });
}

export async function addSKU(params) {
  return request(`http://${Address}/api/sku/add`, {
    method: 'POST',
    body: params,
  });
}

export async function editShop(params) {
  return request(`http://${Address}/api/sku/addShop`, {
    method: 'POST',
    body: params,
  });
}

export async function addType(params) {
  return request(`http://${Address}/api/skutype/add`, {
    method: 'POST',
    body: params,
  });
}

export async function addRegion(params) {
  return request(`http://${Address}/api/region/add`, {
    method: 'POST',
    body: params,
  });
}

export async function addShop(params) {
  return request(`http://${Address}/api/shop/add`, {
    method: 'POST',
    body: params,
  });
}

export async function addEquipment(params) {
  return request(`http://${Address}/api/equipment/add`, {
    method: 'POST',
    body: params,
  });
}

export async function addSKUBrand(params) {
  if(params.pic){
    params.pic=params.pic.file.response.url
  }
  return request(`http://${Address}/api/skubrand/add`, {
    method: 'POST',
    body: params,
  });
}

export async function editRule(params) {
  return request(`http://${Address}/api/rule/add`, {
    method: 'POST',
    body: params,
  });
}

export async function removeSKU(params) {
  return request(`http://${Address}/api/sku/remove/`+params);
}

export async function removeType(params) {
  return request(`http://${Address}/api/skutype/remove/`+params);
}

export async function removeShop(params) {
  return request(`http://${Address}/api/shop/remove/`+params);
}

export async function removeEquipment(params) {
  return request(`http://${Address}/api/equipment/remove/`+params);
}

export async function removeSKUBrand(params) {
  return request(`http://${Address}/api/skubrand/remove/`+params);
}

export async function removeRegion(params) {
  return request(`http://${Address}/api/region/remove/`+params);
}

export async function querySKUTypeTree(params) {
  return request(`http://${Address}/api/skutype/tree?${stringify(params)}`);
}

export async function querySKUTypeList(params) {
  return request(`http://${Address}/api/skutype/type?${stringify(params)}`);
}

export async function queryRegionList(params) {
  return request(`http://${Address}/api/region/list?${stringify(params)}`);
}

export async function queryRSList(params) {
  return request(`http://${Address}/api/region/RSlist?${stringify(params)}`);
}

export async function queryShopList(params) {
  return request(`http://${Address}/api/shop/list`,
    {
      method: 'POST',
      body: params,
  });
}

export async function queryEquipmentList(params) {
  return request(`http://${Address}/api/equipment/list`,
    {
      method: 'POST',
      body: params,
  });
}

export async function querySKUBrandList(params) {
  return request(`http://${Address}/api/skubrand/list`,
    {
      method: 'POST',
      body: params,
  });
}

export async function getParent(params) {
  return request(`http://${Address}/api/region/parent?${stringify(params)}`);
}

export async function getTypeParent(params) {
  return request(`http://${Address}/api/skutype/parent?${stringify(params)}`);
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function querySKUList(params) {
  return request(`http://${Address}/api/sku/all?${stringify(params)}`);
}

export async function queryPskuList(params) {
  return request(`http://${Address}/api/promotion/psku?${stringify(params)}`);
}

export async function addPromotion(params) {
  return request(`http://${Address}/api/promotion/add`, {
    method: 'POST',
    body: params,
  });
}

export async function removePromotion(params) {
  return request(`http://${Address}/api/promotion/remove/`+params);
}

export async function queryPromotionList(params) {
  return request(`http://${Address}/api/promotion/all`,{
  });
}

export async function addPS(params) {
  return request(`http://${Address}/api/promotion/ps`, {
    method: 'POST',
    body: params,
  });
}


export async function addps(params) {
  return request(`http://${Address}/api/promotion/add`, {
    method: 'POST',
    body: params,
  });
}

export async function removeps(params) {
  return request(`http://${Address}/api/promotion/removeps/`+params);
}

export async function querypsList() {
  return request(`http://${Address}/api/promotion/all`);
}


export async function queryVersionList() {
  return request(`http://${Address}/api/version/all`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeMobileLogin(params) {
  return request('/api/login/mobile', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryBehaviorList(params) {
  return request(`http://${Address}/api/RTData/ages`,
    {
      method: 'POST',
      body: params,
    });
}
