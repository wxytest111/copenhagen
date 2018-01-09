import { queryBehaviorList } from '../services/api';
import { message } from 'antd';
export default {
    namespace: 'statist',

    state: {
        statist: [],
        statistloading: false,
        statistSubmitting: false,
    },

    effects: {
        *queryBeList({ payload }, { call, put }) {
            yield put({
                type: 'changeLoading',
                payload: true,
            });

            const response = yield call(queryBehaviorList, payload);
            yield put({
                type: 'appendList',
                payload: Array.isArray(response) ? response : [],
            });
            yield put({
                type: 'changeLoading',
                payload: false,
            });

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
                statist: state.statist.concat(action.payload),
            };
        },
        changeLoading(state, action) {
            return {
                ...state,
                statistloading: action.payload,
            };
        },
        changeSKUSubmitting(state, { payload }) {
            return {
                ...state,
                statistSubmitting: payload,
            };
        },
    },

};
