import { querySKUList, addSKU, removeSKU } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'skulist',

  state: {
    skulist: [],
    loading: false,
    skuSubmitting: false,
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
      message.success('添加商品成功！');
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
