import { queryShopList, addShop, removeShop} from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'shop',

  state: {
    shop: [],
    shoploading: false,
    shopSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      
      const response = yield call(queryShopList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      
    },
    *addShop({ payload }, { call, put }) {
      yield put({
        type: 'changeSKUSubmitting',
        payload: true,
      });
      yield call(addShop, payload);
      yield put({
        type: 'changeSKUSubmitting',
        payload: false,
      });
      message.success('添加/编辑门店成功！');
    },
    *removeShop({ payload }, { call, put }) {
      yield call(removeShop, payload);
      message.success('删除门店成功！');
    },
  },
  reducers: {
    append(state, action) {
      return {
        ...state,
        reg: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        shop: state.shop.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        shoploading: action.payload,
      };
    },
    changeSKUSubmitting(state, { payload }) {
      return {
        ...state,
        shopSubmitting: payload,
      };
    },
  },
  
};
