package com.tongmen.app.maxborn.ui;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.tongmen.app.maxborn.R;
import com.tongmen.app.maxborn.model.PromotionModel;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.Unbinder;

/**
 * Created by Nick on 2017/11/8.
 */

public class MainFragment extends Fragment {
    @BindView(R.id.tv_promotion_title)
    TextView tvPromotionTitle;

    @BindView(R.id.ll_prod_list)
    LinearLayout llProdItemList;

    @BindView(R.id.pb_prod_list)
    ProgressBar pbProdList;

    //User View
    @BindView(R.id.iv_user_head)
    ImageView ivUserHead;

    @BindView(R.id.tv_age)
    TextView tvUserAge;

    @BindView(R.id.tv_frequency)
    TextView tvUserFrequency;

    @BindView(R.id.tv_gender)
    TextView tvUserGender;

    @BindView(R.id.tv_glasses)
    TextView tvUserGlasses;

    @BindView(R.id.tv_hat)
    TextView tvUserHat;

    @BindView(R.id.tv_prefer)
    TextView tvUserPrefer;

    @BindView(R.id.tv_status)
    TextView tvStatus;
    Context mContext;


    private Unbinder unbinder;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_main, container, false);
        unbinder = ButterKnife.bind(this, view);
        mContext = getContext();
        return view;
    }


    public void updateDate(PromotionModel data) {
        updateUserInfo(data.getPersonInfo());
        tvPromotionTitle.setText(data.getDesc());
        llProdItemList.removeAllViews();
        for (PromotionModel.SKUlistBean item : data.getSKUlist()){
            addSKU(item);
        }
        Log.d("WebSocket:","Refresh UI Finish!");

    }

    private void updateUserInfo(PromotionModel.PersonInfoBean data) {
        Glide.with(mContext).load(data.getPic()).into(ivUserHead);
        tvUserAge.setText(""+data.getAge());
        tvUserFrequency.setText(data.getFrequency() + "次");
        tvUserGender.setText(data.getGender());
        tvUserGlasses.setText(data.getIsGlass());
        tvUserPrefer.setText(data.getPreferSKU());
        tvUserHat.setText(data.getIsHat());
    }

    private void addSKU(PromotionModel.SKUlistBean model) {
        LayoutInflater mInflater= LayoutInflater.from(getActivity());
        View contentView = mInflater.inflate(R.layout.item_prod_obje, null);
        LinearLayout.LayoutParams param = new LinearLayout.LayoutParams(
                0,
                LinearLayout.LayoutParams.WRAP_CONTENT, 1.0f);
        contentView.setLayoutParams(param);
        ImageView iv = contentView.findViewById(R.id.iv_prod_item_temp);
        Glide.with(mContext).load(model.getPic()).into(iv);

        TextView tv = contentView.findViewById(R.id.tv_prod_title_temp);
        tv.setText(model.getName());

        TextView tvP = contentView.findViewById(R.id.tv_prod_price_temp);
        tvP.setText(model.getPrice());

        TextView tvD = contentView.findViewById(R.id.tv_prod_describe_temp);
        tvD.setText(model.getDesc());

        llProdItemList.addView(contentView);
    }

    public void updateServiceStatus(int status) {
        switch (status)
        {
            case 0://连接中
                tvStatus.setText("正在连接");
                tvStatus.setTextColor(getResources().getColor(R.color.colorYellow));
                break;
            case 1://连接成功
                tvStatus.setText("正在运行");
                tvStatus.setTextColor(getResources().getColor(R.color.colorGreen));
                break;
            case -1://连接失败
                tvStatus.setText("服务器断开");
                tvStatus.setTextColor(getResources().getColor(R.color.colorRed));
                break;
        }
    }

    @Override
    public void onDestroyView() {
        unbinder.unbind();
        super.onDestroyView();
    }


}