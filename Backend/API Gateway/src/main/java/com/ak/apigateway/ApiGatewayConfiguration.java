package com.ak.apigateway;

//@Configuration
public class ApiGatewayConfiguration {
	
//	@Bean
//	public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
//		return builder.routes()
//				.route(p -> p
//						.path("/get")
//						.filters(f -> f.addRequestHeader("MyHeader", "MyURI")
//								.addResponseHeader("param", "MyValue"))
//						.uri("http://httpbin.org:80"))
//				.route(p->p.path("/electronics/**")
//						.uri("lb://electronics-store"))
//				.route(p->p.path("/auth/**")
//						.uri("lb://auth-service"))
//				.route(p -> p
//						.path("/currency-exchange/**")
//						.uri("lb://currency-exchange"))
//				.route(p -> p
//						.path("/currency-conversion/**")
//						.uri("lb:currency-conversion"))
//				.route(p -> p
//						.path("/currency-conversion-feign/**")
//						.uri("lb://currency-conversion"))
//				.route(p -> p
//						.path("/currency-conversion-new/**")
//						.filters(f -> f
//								.rewritePath(
//										"/currency-conversion-new/(?<segment>.*)", 
//										"/currency-conversion-feign/${segment}"))
//						.uri("lb://currency-conversion"))
//				.build();
//	}

}
