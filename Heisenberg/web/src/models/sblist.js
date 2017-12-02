import { querySKUBrandList, addSKUBrand, removeSKUBrand } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'sblist',

  state: {
    sblist: [],
    loading: false,
    brandSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querySKUBrandList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *addSKUBrand({ payload }, { call, put }) {
      yield put({
        type: 'changeSKUBrandSubmitting',
        payload: true,
      });
      yield call(addSKUBrand, payload);
      yield put({
        type: 'changeSKUBrandSubmitting',
        payload: false,
      });
      message.success('添加/编辑品牌成功！');
    },
    *removeSKUBrand({ payload }, { call, put }) {
      yield call(removeSKUBrand, payload);
      message.success('删除品牌成功！');
    },
  },

  reducers: {
    appendList(state, action) {
      return {
        ...state,
        sblist: state.sblist.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeSKUBrandSubmitting(state, { payload }) {
      return {
        ...state,
        brandSubmitting: payload,
      };
    },
  },
};
