package com.tongmen.app.maxborn.other;

import com.tongmen.app.maxborn.model.PromotionModel;

/**
 * Created by Nick on 2017/11/9.
 */

public class CallbackEvent {

    private PromotionModel mPromotionModel;
    public CallbackEvent(PromotionModel model) {
        // TODO Auto-generated constructor stub
        mPromotionModel = model;
    }
    public PromotionModel getPromotionModel(){
        return mPromotionModel;
    }
}
