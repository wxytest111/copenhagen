import { querySKUList, addSKU, removeSKU, queryRSList, querySKUTypeList, editShop } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'skulist',

  state: {
    shop: [],
    skulist: [],
    skutype: [],
    loading: false,
    skuSubmitting: false,
    shopSubmitting: false,
    
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querySKUList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *querySTList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querySKUTypeList, payload);
      yield put({
        type: 'appendSKUTypeList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *queryRSList({ payload }, { call, put }) {
      // yield put({
      //   type: 'changeLoading',
      //   payload: true,
      // });
      
      const response = yield call(queryRSList, payload);
      yield put({
        type: 'appendRSList',
        payload: Array.isArray(response) ? response : [],
      });
      // yield put({
      //   type: 'changeLoading',
      //   payload: false,
      // });
      
    },
    *addSKU({ payload }, { call, put }) {
      yield put({
        type: 'changeSKUSubmitting',
        payload: true,
      });
      yield call(addSKU, payload);
      yield put({
        type: 'changeSKUSubmitting',
        payload: false,
      });
      if(payload.id){
        message.success('编辑商品成功！');
      } else {
        message.success('添加商品成功！');
      }
    },
    *editShop({ payload }, { call, put }) {
      yield put({
        type: 'changeShopSubmitting',
        payload: true,
      });
      yield call(editShop, payload);
      yield put({
        type: 'changeShopSubmitting',
        payload: false,
      });
      message.success('添加/编辑门店成功！');
    },
    *removeSKU({ payload }, { call, put }) {
      yield call(removeSKU, payload);
      message.success('删除商品成功！');
    },
  },

  reducers: {
    appendList(state, action) {
      return {
        ...state,
        skulist: state.skulist.concat(action.payload),
      };
    },
    appendSKUTypeList(state, action) {
      return {
        ...state,
        skutype: state.skutype.concat(action.payload),
      };
    },
    appendRSList(state, action) {
      return {
        ...state,
        shop: state.shop.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeSKUSubmitting(state, { payload }) {
      return {
        ...state,
        skuSubmitting: payload,
      };
    },
    changeShopSubmitting(state, { payload }) {
      return {
        ...state,
        shopSubmitting: payload,
      };
    },
  },
};
