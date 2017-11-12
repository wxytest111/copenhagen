package com.tongmen.app.maxborn.model;

import java.util.List;

/**
 * Created by Nick on 2017/11/8.
 */

public class PromotionModel {


    /**
     * id : 1
     * name : 双11
     * desc : 双11促销活动
     * SKUlist : [{"name":"可口可乐","Id":1,"desc":"第二瓶半价","pic":"http://fujian.cn-bj.ufileos.com/Coca-Cola.jpg","price":"3.00"},{"name":"奥妙洗衣粉","Id":2,"desc":"双11打包促销","pic":"http://fujian.cn-bj.ufileos.com/OMO.jpg","price":"6.00"},{"name":"百威啤酒","Id":3,"desc":"新品半价促销","pic":"http://fujian.cn-bj.ufileos.com/Budweiser.jpg","price":"1.50"}]
     * personInfo : {"gender":"女","age":27,"isGlass":"否","isHat":"否","frequency":59,"preferSKU":"饮品","pic":"http://fujian.cn-bj.ufileos.com/thumbnailPhoto.jpg"}
     * updateTime : 2017-11-11T04:23:49.403Z
     */

    private int id;
    private String name;
    private String desc;
    private PersonInfoBean personInfo;
    private String updateTime;
    private List<SKUlistBean> SKUlist;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public PersonInfoBean getPersonInfo() {
        return personInfo;
    }

    public void setPersonInfo(PersonInfoBean personInfo) {
        this.personInfo = personInfo;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public List<SKUlistBean> getSKUlist() {
        return SKUlist;
    }

    public void setSKUlist(List<SKUlistBean> SKUlist) {
        this.SKUlist = SKUlist;
    }

    public static class PersonInfoBean {
        /**
         * gender : 女
         * age : 27
         * isGlass : 否
         * isHat : 否
         * frequency : 59
         * preferSKU : 饮品
         * pic : http://fujian.cn-bj.ufileos.com/thumbnailPhoto.jpg
         */

        private String gender;
        private int age;
        private String isGlass;
        private String isHat;
        private int frequency;
        private String preferSKU;
        private String pic;

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        public String getIsGlass() {
            return isGlass;
        }

        public void setIsGlass(String isGlass) {
            this.isGlass = isGlass;
        }

        public String getIsHat() {
            return isHat;
        }

        public void setIsHat(String isHat) {
            this.isHat = isHat;
        }

        public int getFrequency() {
            return frequency;
        }

        public void setFrequency(int frequency) {
            this.frequency = frequency;
        }

        public String getPreferSKU() {
            return preferSKU;
        }

        public void setPreferSKU(String preferSKU) {
            this.preferSKU = preferSKU;
        }

        public String getPic() {
            return pic;
        }

        public void setPic(String pic) {
            this.pic = pic;
        }
    }

    public static class SKUlistBean {
        /**
         * name : 可口可乐
         * Id : 1
         * desc : 第二瓶半价
         * pic : http://fujian.cn-bj.ufileos.com/Coca-Cola.jpg
         * price : 3.00
         */

        private String name;
        private int Id;
        private String desc;
        private String pic;
        private String price;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getId() {
            return Id;
        }

        public void setId(int Id) {
            this.Id = Id;
        }

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public String getPic() {
            return pic;
        }

        public void setPic(String pic) {
            this.pic = pic;
        }

        public String getPrice() {
            return price;
        }

        public void setPrice(String price) {
            this.price = price;
        }
    }
}
