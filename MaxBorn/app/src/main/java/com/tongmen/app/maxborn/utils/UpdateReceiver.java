package com.tongmen.app.maxborn.utils;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.tongmen.app.maxborn.MainActivity;

/**
 * Created by Nick on 2017/11/5.
 */

public class UpdateReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        // TODO Auto-generated method stub
        if (intent.getAction().equals("android.intent.action.PACKAGE_REPLACED")){
            Intent intent2 = new Intent(context, MainActivity.class);
            intent2.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent2);
        }

    }
}