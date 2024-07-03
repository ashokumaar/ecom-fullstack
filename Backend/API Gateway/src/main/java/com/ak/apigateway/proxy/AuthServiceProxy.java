package com.ak.apigateway.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "auth-service", url="localhost:8000", configuration = FeignConfig.class)
public interface AuthServiceProxy {

	@GetMapping("/auth/seller/isSeller")
	public Boolean hasRoleSeller();
}
