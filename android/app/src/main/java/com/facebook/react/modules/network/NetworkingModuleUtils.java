package com.facebook.react.modules.network;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.stetho.okhttp3.StethoInterceptor;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by saurabhmaheshwari on 14/03/18.
 */

public class NetworkingModuleUtils {

    public static NetworkingModule createNetworkingModuleWithCustomClient(ReactApplicationContext context) {

        OkHttpClient client = OkHttpClientProvider.createClient();
        //OkHttpClient customClient = client.newBuilder().addNetworkInterceptor(new StethoInterceptor()).addInterceptor(component.getHeaderInterceptor()).addInterceptor(component.getOauthInterceptor()).addNetworkInterceptor(component.getHttpLoggingInterceptor()).addNetworkInterceptor(new Interceptor() {
        OkHttpClient customClient = client.newBuilder().addNetworkInterceptor(new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request request = chain.request();
                String contentType = request.header("Content-Type");
                Request customRequest = "application/json; charset=utf-8".equals(contentType) ?
                        request.newBuilder()
                                .header("Content-Type", "application/json")
                                .header("Accept", "application/json")
                                .build() : request;

                Response response = chain.proceed(customRequest);
                //return response.newBuilder().addHeader("Content-Encoding","base64").build();
                return response;
            }
        }).addInterceptor(new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request request = chain.request();
                int readTimeout = chain.readTimeoutMillis();
                if (request.url().encodedPath().contains("question_response")) {
                    readTimeout = 20;
                }

                return chain
                        .withReadTimeout(readTimeout, TimeUnit.SECONDS)
                        .proceed(request);
            }
        }).build();
        return new NetworkingModule(context, null, customClient);
    }
}
