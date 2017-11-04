package com.tongmen.app.maxborn.api;

import com.zhouyou.http.model.ApiResult;

/**
 * Created by Nick on 2017/11/4.
 */

public class CustomApiResult<T> extends ApiResult<T> {

        @Override
        public boolean isOk() {
            return true;//因为此数据结构没有code,就是不去判断code的值了,认为是成功的
        }
}
