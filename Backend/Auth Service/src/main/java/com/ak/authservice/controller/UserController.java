package com.ak.authservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ak.authservice.entity.Address;
import com.ak.authservice.entity.User;
import com.ak.authservice.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	// ✔️✔️
	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable int id) {
		User user = userService.getUserById(id);
		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.status(404).body("User not found in our database");
		}
	}

	// ✔️✔️
	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@PostMapping("/createUser")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		User createdUser = userService.createUser(user);
		return ResponseEntity.ok(createdUser);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user) {
		user.setId(id); // Ensure ID from path matches user object
		User updatedUser = userService.updateUser(user);
		if (updatedUser != null) {
			return ResponseEntity.ok(updatedUser);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// ✔️✔️
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable int id) {
		return userService.deleteUser(id);
	}

	// ✔️✔️
	@PostMapping("/addAddress")
	public ResponseEntity<?> addAddress(@RequestBody Address address) {
		return userService.addAddress(address);
	}
	
	// ✔️✔️
	@PutMapping("/defaultAddress")
	public ResponseEntity<String> defaultAddress(@RequestBody Address address) {
		userService.defaultAddress(address);
		return ResponseEntity.ok("Default address changed successfully");
	}
	
	// ✔️✔️
	@DeleteMapping("/deleteAddress/{id}")
	public ResponseEntity<?> deleteAddress(@PathVariable int id) {
		return userService.deleteAddress(id);
	}
	
}
