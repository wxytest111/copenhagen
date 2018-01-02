import { query as queryUsers, queryCurrent, feedbackAdd } from '../services/user';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    currentUser: {},
    status:undefined,
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *advise({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(feedbackAdd, payload);
      yield put({
        type: 'changeStatus',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeStatus(state, { payload }) {
      if (payload.code == 200){
        message.success('意见与反馈提交成功，我们会及时查看并处理！');
      }else{
        message.error('意见与反馈提交失败，请重试！');
      }
      
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    saveCurrentUser(state, action) {code
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },

  },
};
