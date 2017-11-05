package com.tongmen.app.maxborn;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import com.tongmen.app.maxborn.model.VersionModel;
import com.tongmen.app.maxborn.network.Api;
import com.tongmen.app.maxborn.network.Network;
import com.tongmen.app.maxborn.utils.DownloadService;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;

public class MainActivity extends Activity {

    Context mContext;
    DownloadService.DownloadBinder mDownloadBinder;
    private Disposable mDownloadDisposable;
    private Disposable mNetworkDisposable;

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
    }

    @Override
    protected void onDestroy() {
        if (mDownloadDisposable != null) {
            //取消监听
            mDownloadDisposable.dispose();
        }
        super.onDestroy();
    }

    private void initView() {

    }


    private void initData() {

        final Api api = Network.getApi();
        mNetworkDisposable = api.lastVersion()
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
                        }
                    }
                }, new Consumer<Throwable>() {
                    @Override
                    public void accept(Throwable throwable) {
                        Log.d("version:","error");
                    }
                });

    }

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
