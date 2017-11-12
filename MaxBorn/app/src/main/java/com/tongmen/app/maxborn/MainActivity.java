package com.tongmen.app.maxborn;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.tongmen.app.maxborn.model.PromotionModel;
import com.tongmen.app.maxborn.model.VersionModel;
import com.tongmen.app.maxborn.network.Api;
import com.tongmen.app.maxborn.network.Network;
import com.tongmen.app.maxborn.ui.MainFragment;
import com.tongmen.app.maxborn.utils.DownloadService;
import com.tongmen.app.maxborn.utils.JsonUtil;
import com.tongmen.app.maxborn.utils.StringUtil;

import java.util.concurrent.TimeUnit;

import io.crossbar.autobahn.websocket.WebSocketConnection;
import io.crossbar.autobahn.websocket.WebSocketConnectionHandler;
import io.crossbar.autobahn.websocket.exceptions.WebSocketException;
import io.crossbar.autobahn.websocket.interfaces.IWebSocket;
import io.crossbar.autobahn.websocket.types.ConnectionResponse;
import io.crossbar.autobahn.websocket.types.WebSocketOptions;
import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class MainActivity extends AppCompatActivity {

    private String mHostname = "ws://console.tman.ai";

    Context mContext;
    private MainFragment mainFragment;
    DownloadService.DownloadBinder mDownloadBinder;
    private Disposable mDownloadDisposable;
    private Disposable mVersionDisposable;
    private Disposable mPromotionDisposable;
    private String updateDataTime = "";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext = this;
        Intent intent = new Intent(this, DownloadService.class);
        startService(intent);
        bindService(intent, mConnection, BIND_AUTO_CREATE);//绑定服务

        initView();
        initData();
        startWebSocket();
    }

    @Override
    protected void onDestroy() {
        if (mDownloadDisposable != null) {
            //取消监听
            mDownloadDisposable.dispose();
            mVersionDisposable.dispose();
            mPromotionDisposable.dispose();
        }
        if (mSocketConnection.isConnected()) {
            mSocketConnection.sendClose();
        }
        super.onDestroy();
    }

    private void initView() {
        mainFragment = new MainFragment();

        getSupportFragmentManager().beginTransaction().add(R.id.fl_mainfragment, mainFragment, mainFragment.getTag()).commit();
    }

    /**
     * API  ------
     */

    private void initData() {
        checkVersion();


//        //轮询请求数据
        Observable.interval(5, TimeUnit.SECONDS)
                .doOnNext(new Consumer<Long>() {
                    @Override
                    public void accept(Long aLong) throws Exception {
                        if(!mSocketConnection.isConnected()){
                            startWebSocket();
                        }
                    }
                })
                .subscribe(new Observer<Long>() {
            @Override
            public void onSubscribe(Disposable d) {

            }

            @Override
            public void onNext(Long aLong) {

            }

            @Override
            public void onError(Throwable e) {

            }

            @Override
            public void onComplete() {

            }
        });

    }

    /*
     *  接口调用（暂不使用 使用webSocket）
     */
    private void postData(){
        final Api api = Network.getApi();
        mPromotionDisposable = api.getPromotion()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<PromotionModel>() {
                    @Override
                    public void accept(PromotionModel promotionModel) throws Exception {
                        if (!updateDataTime.equals(promotionModel.getUpdateTime())){
                            Log.d("Promotion:","Refresh");
                            updateDataTime = promotionModel.getUpdateTime();
                            mainFragment.updateDate(promotionModel);
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(Throwable throwable) {
                        Log.d("Promotion:","error");
                    }
                });
    }

    private void checkVersion() {
        final Api api = Network.getApi();
        mVersionDisposable = api.lastVersion()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Consumer<VersionModel>() {
                    @Override
                    public void accept(VersionModel versionModel) throws Exception {
                        Integer versionCode=mContext.getPackageManager().
                                getPackageInfo(mContext.getPackageName(), 0).versionCode;
                        if(versionCode < Integer.parseInt(versionModel.getVersion())){
                            Toast.makeText(MainActivity.this, "发现新版本，开始下载", Toast.LENGTH_SHORT).show();
                            installApk(versionModel.getUrl());
                        }else{
                            Log.d("Version:","当前为最新版本");
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(Throwable throwable) {
                        Log.d("version:","error");
                    }
                });
    }

    /**
     * WebSocket  ------
     */

    private final IWebSocket mSocketConnection = new WebSocketConnection();

    private void startWebSocket() {

        if (!mHostname.startsWith("ws://") && !mHostname.startsWith("wss://")) {
            mHostname = "ws://" + mHostname;
        }

        WebSocketOptions connectOptions = new WebSocketOptions();
        connectOptions.setReconnectInterval(2000);

        try {
            mSocketConnection.connect(mHostname, new WebSocketConnectionHandler() {

                @Override
                public void onConnect(ConnectionResponse response) {
                    mainFragment.updateServiceStatus(0);
                }

                @Override
                public void onOpen() {
                    mainFragment.updateServiceStatus(1);
                }

                @Override
                public void onMessage(String payload) {
                    Log.d("WebSocket",payload);
                    if (!JsonUtil.isGoodJson(payload)){
                        return;
                    }
                    Gson gson = new Gson();
                    PromotionModel promotion = gson.fromJson(payload,PromotionModel.class);
                    if(!StringUtil.equals(updateDataTime, promotion.getUpdateTime())){
                        Log.d("WebSocket:","Refresh UI");
                        updateDataTime = promotion.getUpdateTime();
                        mainFragment.updateDate(promotion);
                    }
                }

                @Override
                public void onClose(int code, String reason) {
                    mainFragment.updateServiceStatus(-1);
                }

                @Override
                public void onPong() {
                    Log.d("WebSocket","onPong");
                }

            }, connectOptions);
        } catch (WebSocketException e) {
            Log.d("WebSocketException", e.toString());
        }
    }

    private  void sendMessage(String post) {
        mSocketConnection.sendMessage(post);
    }


    /**
     * Install APK  ------
     */

    private ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mDownloadBinder = (DownloadService.DownloadBinder) service;
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            mDownloadBinder = null;
        }
    };

    private void installApk(String url){
            if (mDownloadBinder != null) {
                long downloadId = mDownloadBinder.startDownload(url);
                startCheckProgress(downloadId);
            }
    }


    //开始监听进度
    private void startCheckProgress(long downloadId) {
        Observable
                .interval(100, 200, TimeUnit.MILLISECONDS, Schedulers.io())//无限轮询,准备查询进度,在io线程执行
                .filter(times -> mDownloadBinder != null)
                .map(i -> mDownloadBinder.getProgress(downloadId))//获得下载进度
                .takeUntil(progress -> progress >= 100)//返回true就停止了,当进度>=100就是下载完成了
                .distinct()//去重复
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new ProgressObserver());
    }

    //观察者
    private class ProgressObserver implements Observer<Integer> {

        @Override
        public void onSubscribe(Disposable d) {
            mDownloadDisposable = d;
        }

        @Override
        public void onNext(Integer progress) {
            Log.d("download progress:", String.valueOf(progress));
        }

        @Override
        public void onError(Throwable throwable) {
            throwable.printStackTrace();
            Toast.makeText(MainActivity.this, "出错", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onComplete() {
            Log.d("download progress:", String.valueOf(100));
            Toast.makeText(MainActivity.this, "下载完成", Toast.LENGTH_SHORT).show();
        }
    }

}
