package com.tongmen.app.maxborn.model;

import java.io.Serializable;

/**
 * Created by Nick on 2017/11/3.
 */

public class VersionModel implements Serializable {


    /**
     * id : 2
     * version : 0.0.1
     * message : 测试升级
     * content : 测试升级
     * url :
     * is_need : 0
     * mobile_type : 0
     * status : 0
     * createAt : 2017-11-20T00:00:00.000Z
     */

    private String version;

    public VersionModel() {
    }



    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }


}
