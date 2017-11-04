package com.tongmen.app.maxborn;

import android.app.Application;

import com.zhouyou.http.EasyHttp;

import static com.tongmen.app.maxborn.api.Api.BASE_URL;

/**
 * Created by Nick on 2017/11/3.
 */

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        EasyHttp.init(this);
        EasyHttp.getInstance().setBaseUrl(BASE_URL);
        EasyHttp.getInstance().debug("EasyHttp", true);
    }
}