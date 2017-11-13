import { queryVersionList, addVersion } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'vlist',

  state: {
    vlist: [],
    loading: false,
    versionSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryVersionList, payload);
      yield put({
        type: 'appendVList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *addVersion({ payload }, { call, put }) {
      yield put({
        type: 'changeVersionSubmitting',
        payload: true,
      });
      yield call(addVersion, payload);
      yield put({
        type: 'changeVersionSubmitting',
        payload: false,
      });
      message.success('提交成功');
    },
  },

  reducers: {
    appendVList(state, action) {
      return {
        ...state,
        vlist: state.vlist.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeVersionSubmitting(state, { payload }) {
      return {
        ...state,
        versionSubmitting: payload,
      };
    },
  },
};
