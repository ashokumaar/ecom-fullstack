package com.ak.electronics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("electronics")
public class ElectronicsController {
	
	@GetMapping("/hello")
	public String helloWorld() {
		return "Hello world";
	}

}
