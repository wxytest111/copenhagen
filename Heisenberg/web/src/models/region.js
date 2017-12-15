import { queryRegionList, addRegion, removeRegion, getParent, queryRSList } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'region',

  state: {
    region: [],
    shop: [],
    reg: {},
    loading: false,
    skuSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      
      const response = yield call(queryRegionList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      
    },
    *queryRSList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      
      const response = yield call(queryRSList, payload);
      yield put({
        type: 'appendRSList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      
    },
    *addRegion({ payload }, { call, put }) {
      yield put({
        type: 'changeSKUSubmitting',
        payload: true,
      });
      yield call(addRegion, payload);
      yield put({
        type: 'changeSKUSubmitting',
        payload: false,
      });
      if(payload.id){
        message.success('编辑区域成功！');
      } else {
        message.success('添加区域成功！');
      }
    },
    *removeRegion({ payload }, { call, put }) {
      yield call(removeRegion, payload);
      message.success('删除区域成功！');
    },
    *getParent({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getParent, payload);
      yield put({
        type: 'append',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },
  reducers: {
    append(state, action) {
      return {
        ...state,
        reg: action.payload,
      };
    },
    appendRSList(state, action) {
      return {
        ...state,
        shop: state.shop.concat(action.payload),
      };
    },
    appendList(state, action) {
      return {
        ...state,
        region: state.region.concat(action.payload),
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
  },
  
};
