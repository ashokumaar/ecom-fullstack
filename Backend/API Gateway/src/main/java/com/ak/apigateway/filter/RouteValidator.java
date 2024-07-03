package com.ak.apigateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Predicate;
import java.util.regex.Pattern;

@Component
public class RouteValidator {

	public static final List<String> openApiEndpoints = List.of("/auth/register", "/auth/generateToken",
			"/auth/welcome", "/fashion/products/all", "/electronics/products/all", "/books/products/all", "/eureka");
	// Dynamic endpoints
	public static final List<Pattern> openApiEndpointPatterns = List.of(Pattern.compile("/auth/checkUsernameExist/.*"));

	public static final List<String> adminApiEndpoints = List.of("/fashion/products/create",
			"/electronics/products/create", "/books/products/create", "/fashion/products/delete",
			"/electronics/products/delete", "/books/products/delete");

	public static final List<String> sellerApiEndpoints = List.of("/auth/seller/isSeller", "/fashion/products/create",
			"/electronics/products/create", "/books/products/create");

	public Predicate<ServerHttpRequest> isSecured = request -> openApiEndpoints.stream()
			.noneMatch(uri -> request.getURI().getPath().contains(uri))
			&& openApiEndpointPatterns.stream()
					.noneMatch(pattern -> pattern.matcher(request.getURI().getPath()).matches());;

	public Predicate<ServerHttpRequest> isAdminEndpoints = request -> adminApiEndpoints.stream()
			.anyMatch(uri -> request.getURI().getPath().contains(uri));

	public Predicate<ServerHttpRequest> isSellerEndpoints = request -> sellerApiEndpoints.stream()
			.anyMatch(uri -> request.getURI().getPath().contains(uri));

}
