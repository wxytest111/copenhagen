package com.tongmen.app.maxborn.utils;

import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;

/**
 * Created by Nick on 2017/11/11.
 */

public class JsonUtil {

    /**
     * 判断一个字符串是否是json串
     *
     * @param json
     * @return
     */
    public static boolean isGoodJson(String json) {
        if (StringUtil.isEmpty(json)) {
            return false;
        }
        try {
            new JsonParser().parse(json);
            return true;
        } catch (JsonParseException e) {
            return false;
        }
    }

}