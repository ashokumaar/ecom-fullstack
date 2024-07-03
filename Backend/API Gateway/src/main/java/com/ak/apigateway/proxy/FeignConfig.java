package com.ak.apigateway.proxy;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;
import feign.RequestTemplate;

@Configuration
public class FeignConfig {

	private static String token;

	public void setToken(String token) {
		System.out.println("setting token =========" + token);
		FeignConfig.token = token;
	}

	public static String getToken() {
		return token;
	}

	@Bean
	public RequestInterceptor requestInterceptor() {
		return new RequestInterceptor() {
			@Override
			public void apply(RequestTemplate requestTemplate) {
				FeignConfig.getToken();
				requestTemplate.header("Authorization", "Bearer " + FeignConfig.getToken());
				System.out.println(requestInterceptor() + " invoked...");
			}
		};
	}
//	@Bean
//    public RequestInterceptor requestInterceptor() {
//        return new RequestInterceptor() {
//            @Override
//            public void apply(RequestTemplate requestTemplate) {
//                ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
//                if (requestAttributes != null) {
//                    String jwtToken = requestAttributes.getRequest().getHeader("X-Internal-Auth");
//                    if (jwtToken != null) {
//                        requestTemplate.header("Authorization", "Bearer " + jwtToken);
//                    }
//                }
//            }
//        };
}
