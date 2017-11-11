import { queryVersionList } from '../services/api';

export default {
  namespace: 'vlist',

  state: {
    vlist: [],
    loading: false,
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
  },
};
