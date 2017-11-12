import { queryPromotionList, addPromotion, removePromotion, addPS } from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'promotionlist',

  state: {
    promotionlist: [],
    loading: false,
    promotionSubmitting: false,
    psSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryPromotionList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *addPromotion({ payload }, { call, put }) {
      yield put({
        type: 'changePromotionSubmitting',
        payload: true,
      });
      yield call(addPromotion, payload);
      yield put({
        type: 'changePromotionSubmitting',
        payload: false,
      });
      message.success('添加推荐成功！');
    },
    *removePromotion({ payload }, { call, put }) {
      yield call(removePromotion, payload);
      message.success('删除推荐成功！');
    },
    *addPS({ payload }, { call, put }) {
        yield put({
          type: 'changePSSubmitting',
          payload: true,
        });
        yield call(addPS, payload);
        yield put({
          type: 'changePSSubmitting',
          payload: false,
        });
        message.success('添加绑定成功！');
      },
  },

  reducers: {
    appendList(state, action) {
      return {
        ...state,
        promotionlist: state.promotionlist.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changePromotionSubmitting(state, { payload }) {
      return {
        ...state,
        promotionSubmitting: payload,
      };
    },
    changePSSubmitting(state, { payload }) {
        return {
          ...state,
          psSubmitting: payload,
        };
      },
  },
};
