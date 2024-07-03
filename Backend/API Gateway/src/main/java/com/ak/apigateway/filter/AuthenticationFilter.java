package com.ak.apigateway.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ak.apigateway.util.JwtUtil;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

//	@Value("${}")
//	private String authServiceHost;

	@Autowired
	private RouteValidator validator;

	@Autowired
	private JwtUtil jwtUtil;

	public AuthenticationFilter() {
		super(Config.class);
	}

	@Override
	public GatewayFilter apply(Config config) {
		return (exchange, chain) -> {
			if (validator.isSecured.test(exchange.getRequest())) {
				int count = 0;
				System.out.println("===1====API GATE WAY :: invoked");
				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("missing authorization header");
				}
				String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
				if (authHeader != null && authHeader.startsWith("Bearer ")) {
					authHeader = authHeader.substring(7);
				}
				try {
					System.out.println("==2==== Validating.......");
					jwtUtil.validateToken(authHeader); // Exception may occurs if token has expired or invalid random
														// token (ex: from attackers)
					System.out.println("........token is valid ======");
					String username = jwtUtil.extractUsername(authHeader);
					System.out.println("::::::: username :: " + username);

					if (validator.isSellerEndpoints.test(exchange.getRequest())) {
						String url = "http://localhost:8000/auth/seller/isSeller";
						HttpHeaders httpHeaders = new HttpHeaders();
						httpHeaders.add("Authorization", "Bearer " + authHeader);
						HttpEntity<String> requestEntity = new HttpEntity<String>(null, httpHeaders);
						ResponseEntity<Boolean> isSeller = new RestTemplate().exchange(url, HttpMethod.GET,
								requestEntity, Boolean.class);
						if (isSeller.getStatusCode() == HttpStatus.OK) {
							System.out.println(":::::::Yes its SELLER:::::::");
							return chain.filter(exchange);
						} else {
							System.out.println(":::::::Not a SELLER:::::::");
							count = 1;
							throw new RuntimeException();
						}
					}

					if (validator.isAdminEndpoints.test(exchange.getRequest())) {
						String url = "http://localhost:8000/auth/admin/isAdmin";
						HttpHeaders httpHeaders = new HttpHeaders();
						httpHeaders.add("Authorization", "Bearer " + authHeader);
						HttpEntity<String> requestEntity = new HttpEntity<String>(null, httpHeaders);
						ResponseEntity<Boolean> isAdmin = new RestTemplate().exchange(url, HttpMethod.GET,
								requestEntity, Boolean.class);
						if (isAdmin.getStatusCode() == HttpStatus.OK) {
							System.out.println(":::::::Yes its ADMIN:::::::");
							return chain.filter(exchange);
						} else {
							System.out.println(":::::::Not an ADMIN:::::::");
							count = 2;
							throw new RuntimeException();
						}
					}

				} catch (Exception e) {
					System.out.println("invalid access... or check if token has expired!");
					if (count == 0) {
						throw new RuntimeException("Unauthorized access to application");
					} else if (count == 1) {
						throw new RuntimeException("Unauthorized access! Requires role: ROLE_SELLER");
					} else if (count == 2) {
						throw new RuntimeException("Unauthorized access! Requires role: ROLE_ADMIN");
					}
				}
			}
			System.out.println("===3===== chain.filter(exchange) going to call now....");
			return chain.filter(exchange);

		};
	}

	public static class Config {

	}
}
