package com.ak.authservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ak.authservice.entity.Orders;
import com.ak.authservice.entity.util.DateUtil;
import com.ak.authservice.service.OrdersService;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {
	
	@Autowired
	private OrdersService service;
	
	@GetMapping("/all")
	public List<Orders> getAllOrcers() {
		return service.findAll();
	}

	@GetMapping("/from/{startDate}/to/{endDate}")
	public List<Orders> getOrderByPeriod(@PathVariable(value = "startDate") String startDate, @PathVariable(value="endDate") String endDate) {
		return service.getOrdersByPeriod(DateUtil.stringToDate(startDate), DateUtil.stringToDate(endDate));
	}
	
	@PostMapping(value = "/create")
	@ResponseBody
	public ResponseEntity<String> placeOrder(@RequestBody Orders body) {
		if (body != null) {
			service.placeOrder(body);
			return new ResponseEntity<String>("Order is placed successfully", HttpStatus.CREATED);
		}
		return new ResponseEntity<String>(HttpStatus.OK);
	}

}
