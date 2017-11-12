
import { querypsList, addps, removeps } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'pslist',

  state: {
    pslist: [],
    loading: false,
    skuSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querypsList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *addps({ payload }, { call, put }) {
      yield put({
        type: 'changepsSubmitting',
        payload: true,
      });
      yield call(addps, payload);
      yield put({
        type: 'changepsSubmitting',
        payload: false,
      });
      message.success('添加推荐成功！');
    },
    *removeps({ payload }, { call, put }) {
      yield call(removeps, payload);
      message.success('删除推荐成功！');
    },
  },

  reducers: {
    appendList(state, action) {
      return {
        ...state,
        pslist: state.pslist.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changepsSubmitting(state, { payload }) {
      return {
        ...state,
        skuSubmitting: payload,
      };
    },
  },
};
