package com.tongmen.app.maxborn.model;

/**
 * Created by Nick on 2017/11/3.
 */

public class VersionModel {


    /**
     * id : 2
     * version : 0.0.1
     * message : 测试升级
     * content : 测试升级
     * url : http://fujian.ufile.ucloud.com.cn/app.apk
     * is_need : 0
     * mobile_type : 0
     * status : 0
     * createAt : 2017-11-04T00:00:00.000Z
     */

    int id;
    String version;
    String message;
    String content;
    String url;
    int is_need;
    int mobile_type;
    int status;
    String createAt;

    @Override
    public String toString() {
        return "VersionModel{" +
                "id='" + id + '\'' +
                ", version='" + version + '\'' +
                ", message='" + message + '\'' +
                ", content='" + content + '\'' +
                ", url='" + url + '\'' +
                ", is_need='" + is_need + '\'' +
                ", mobile_type='" + mobile_type + '\'' +
                ", status='" + status + '\'' +
                ", createAt='" + createAt + '\'' +
                '}';
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getIs_need() {
        return is_need;
    }

    public void setIs_need(int is_need) {
        this.is_need = is_need;
    }

    public int getMobile_type() {
        return mobile_type;
    }

    public void setMobile_type(int mobile_type) {
        this.mobile_type = mobile_type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreateAt() {
        return createAt;
    }

    public void setCreateAt(String createAt) {
        this.createAt = createAt;
    }
}
