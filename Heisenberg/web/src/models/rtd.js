import { getListByShop } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'rtd',

  state: {
    rtd: [],
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      
      const response = yield call(getListByShop, payload);
      yield put({
        type: 'append',
        payload: Array.isArray(response) ? response : [],
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
        rtd: state.rtd.concat(action.payload),
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
