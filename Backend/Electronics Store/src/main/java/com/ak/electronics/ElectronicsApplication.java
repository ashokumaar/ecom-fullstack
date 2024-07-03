package com.ak.electronics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ElectronicsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElectronicsApplication.class, args);
	}

}
