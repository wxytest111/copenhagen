package com.tongmen.app.maxborn.network;

import com.tongmen.app.maxborn.model.PromotionModel;
import com.tongmen.app.maxborn.model.VersionModel;

import io.reactivex.Observable;
import retrofit2.http.GET;

/**
 * Created by Nick on 2017/11/3.
 */

public interface Api {
    @GET("version/last")
    Observable<VersionModel> lastVersion();

    @GET("promotion/promotion")
    Observable<PromotionModel> getPromotion();
}