///////////////////////////////////////////////////////////////////////////////
//
//   AutobahnJava - http://crossbar.io/autobahn
//
//   Copyright (c) Crossbar.io Technologies GmbH and contributors
//
//   Licensed under the MIT License.
//   http://www.opensource.org/licenses/mit-license.php
//
///////////////////////////////////////////////////////////////////////////////

package io.crossbar.autobahn.wamp.utils;

import java.util.concurrent.Executor;
import java.util.concurrent.ForkJoinPool;

import io.crossbar.autobahn.wamp.interfaces.ITransport;

public class Platform {

    /**
     * Checks if code is running on Android.
     *
     * @return boolean representing whether the underlying platform
     *     is Android based
     */
    public static boolean isAndroid() {
        return System.getProperty("java.vendor").equals("The Android Project");
    }

    /**
     * Automatically returns a WebSocket based transport for WAMP based on the
     * underlying platform.
     *
     * @param webSocketURL websocket url to use for initializing of the transport
     * @return an instance of ITransport suitable for the underlying platform.
     * @throws RuntimeException most probably if the path of transport we are trying
     *     to initialize changed OR its constructor changed.
     */
    public static ITransport autoSelectTransport(String webSocketURL) throws RuntimeException {
        Class<?> transportClass;

        try {
            if (isAndroid()) {
                transportClass = Class.forName("io.crossbar.autobahn.wamp.transports.AndroidWebSocket");
            } else {
                transportClass = Class.forName("io.crossbar.autobahn.wamp.transports.NettyWebSocket");
            }

            return (ITransport) transportClass.getConstructor(String.class).newInstance(webSocketURL);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    /**
     * Auto selects the Executor based on the underlying platform.
     * On Android we want autobahn to call the user facing code's
     * callbacks on the main thread so that apps are able to update the UI.
     *
     * @return Executor instance suitable for current platform
     */
    public static Executor autoSelectExecutor() {
        if (Platform.isAndroid()) {
            return new CurrentThreadExecutor();
        } else {
            return ForkJoinPool.commonPool();
        }
    }
}
