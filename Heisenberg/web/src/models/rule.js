import { queryRule, removeRule, addRule, editRule } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    ruleSubmitting:false,
    loading: true,
  },

  effects: {
    *editRule({ payload }, { call, put }) {
      yield put({
        type: 'ruleSubmitting',
        payload: true,
      });
      yield call(editRule, payload);
      yield put({
        type: 'ruleSubmitting',
        payload: false,
      });
      message.success('编辑规则成功！');
    },
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    ruleSubmitting(state, { payload }) {
      return {
        ...state,
        ruleSubmitting: payload,
      };
    },
  },
};
