import { queryEquipmentList, addEquipment, removeEquipment} from '../services/api';
import { message } from 'antd';
export default {
  namespace: 'equipment',

  state: {
    equipment: [],
    equipmentloading: false,
    equipmentSubmitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      
      const response = yield call(queryEquipmentList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      
    },
    *addEquipment({ payload }, { call, put }) {
      yield put({
        type: 'changeEquipmentSubmitting',
        payload: true,
      });
      yield call(addEquipment, payload);
      yield put({
        type: 'changeEquipmentSubmitting',
        payload: false,
      });
      message.success('添加/编辑设备成功！');
    },
    *removeEquipment({ payload }, { call, put }) {
      yield call(removeEquipment, payload);
      message.success('删除设备成功！');
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
        equipment: state.equipment.concat(action.payload),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        equipmentloading: action.payload,
      };
    },
    changeEquipmentSubmitting(state, { payload }) {
      return {
        ...state,
        equipmentSubmitting: payload,
      };
    },
  },
  
};
