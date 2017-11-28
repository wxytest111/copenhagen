import { querySKUTypeList, querySKUTypeTree, addType, removeType, getTypeParent } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'skutype',

  state: {
    skutype: [],
    skulist: [],
    type: {},
    loading: false,
    skuSubmitting: false,
  },

  effects: {
    *tree({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querySKUTypeTree, payload);
      yield put({
        type: 'appendTree',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(querySKUTypeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *addType({ payload }, { call, put }) {
      yield put({
        type: 'changeSKUSubmitting',
        payload: true,
      });
      yield call(addType, payload);
      yield put({
        type: 'changeSKUSubmitting',
        payload: false,
      });
      message.success('添加类型成功！');
    },
    *removeType({ payload }, { call, put }) {
      yield call(removeType, payload);
      message.success('删除类型成功！');
    },
    *getParent({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getTypeParent, payload);
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
    appendTree(state, action) {
      return {
        ...state,
        // ...action.payload, loading: false
        skulist: state.skulist.concat(action.payload),
      };
    },
    append(state, action) {
      return {
        ...state,
        type: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        skutype: state.skutype.concat(action.payload),
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
