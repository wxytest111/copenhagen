import { queryRegionList, addRegion, removeRegion, getParent } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'region',

  state: {
    region: [],
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
      message.success('添加区域成功！');
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
