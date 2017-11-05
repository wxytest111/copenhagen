package com.tongmen.app.maxborn;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import com.tongmen.app.maxborn.api.CustomApiResult;
import com.tongmen.app.maxborn.model.VersionModel;
import com.tongmen.app.maxborn.utils.DownloadService;
import com.zhouyou.http.callback.CallBackProxy;
import com.zhouyou.http.callback.SimpleCallBack;
import com.zhouyou.http.exception.ApiException;
import com.zhouyou.http.request.GetRequest;

import java.util.concurrent.TimeUnit;

import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;

public class MainActivity extends Activity {

    private Button mButton;

    DownloadService.DownloadBinder mDownloadBinder;
    private Disposable mDisposable;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = new Intent(this, DownloadService.class);
        startService(intent);
        bindService(intent, mConnection, BIND_AUTO_CREATE);//绑定服务

        initView();
        initData();
    }

    @Override
    protected void onDestroy() {
        if (mDisposable != null) {
            //取消监听
            mDisposable.dispose();
        }
        super.onDestroy();
    }

    private void initView() {
        mButton = (Button) findViewById(R.id.install_apk);

        mButton.setOnClickListener(v -> {
            installApk();
        });
    }


    private void initData() {
        //todo: 接口返回格式有问题 不可以解析
        GetRequest request = new GetRequest("/version/last");
        request.readTimeOut(30 * 1000)//局部定义读超时
                .execute(new CallBackProxy<CustomApiResult<VersionModel>, VersionModel>(new SimpleCallBack<VersionModel>() {

                    @Override
                    public void onError(ApiException e) {

                    }

                    @Override
                    public void onSuccess(VersionModel versionModel) {

                    }
                }) {
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

    private void installApk(){
        String APK_URL = "https://pro-app-qn.fir.im/9110dae75bc82036bcc9c480510393bc5936b752.apk?attname=app-release.apk_1.0.apk&e=1509826667&token=LOvmia8oXF4xnLh0IdH05XMYpH6ENHNpARlmPc-T:IUPK3hMM1xX2_spjDHStyl5BYDQ=";
            if (mDownloadBinder != null) {
                long downloadId = mDownloadBinder.startDownload(APK_URL);
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
            mDisposable = d;
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
