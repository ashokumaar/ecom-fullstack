package com.ak.authservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ak.authservice.entity.AuthRequest;
import com.ak.authservice.entity.User;
import com.ak.authservice.service.JwtService;
import com.ak.authservice.service.UserDetailsImpl;
import com.ak.authservice.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	private UserDetailsServiceImpl service;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@GetMapping("/welcome")
	public ResponseEntity<String> welcome() {
		return ResponseEntity.ok("Welcome this endpoint is not secure");
	}

	// public access
	@GetMapping("/checkUsernameExist/{username}")
	public boolean checkUsernameExist(@PathVariable String username) {
		System.out.println("checking username() invoked, " + username);
		return service.checkUsernameExist(username);
	}

	// public access
	@PostMapping("/register")
	public String registerUser(@RequestBody User user) {
		user.setRoles(List.of("ROLE_USER"));
//		if (user.getAddressList() == null) {
//			Address address = new Address();
//			address.setPincode(0);
//			List<Address> addressList = new ArrayList<>();
//			addressList.add(address);
//			
//			user.setAddressList(addressList);
//		}
		return service.addUser(user);
	}

	// public access
	@PostMapping("/generateToken")
	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		System.out.println("================" + authRequest.getUsername() + "============" + authRequest.getPassword()
				+ "\n==============Generating Token==============");
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			System.out.println("=== authenticateAndGetToken :: authenticated ===");
			return jwtService.generateToken(authRequest.getUsername());
		} else {
			System.out.println("=== authenticateAndGetToken :: not authenticated ===");
			return "Invalid user request !";
		}
	}

	// public access
	@GetMapping("/validateToken/{token}")
	public String validateToken(@PathVariable String token) {
		jwtService.validateToken(token);
		return "valid token";
	}

	@GetMapping("/me")
	public ResponseEntity<?> authenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
		User user = service.authenticatedUser(userDetailsImpl.getUsername());
		System.out.println("User :: " + user);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/user/userProfile")
//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public String userProfile() {
		System.out.println("=========== userProfile() method invoked successfully ================ ");
		return "Welcome to User Profile";
	}

	@GetMapping("/seller/sellerProfile")
	public ResponseEntity<String> sellerProfile() {
		System.out.println("=========== sellerProfile() method invoked successfully ================ ");
		return ResponseEntity.ok("Welcome to seller profile");
	}

	@GetMapping("/seller/isSeller")
	public boolean hasRoleSeller() {
		System.out.println("Yes you have seller authority");
		return true;
	}

	@GetMapping("/admin/isAdmin")
	public boolean hasRoleAdmin() {
		System.out.println("Yes you have admin authority");
		return true;
	}

	// Needs the ADMIN role (filter added in AuthConfig.java)
	@GetMapping("/admin/adminProfile")
	public String adminProfile() {
		System.out.println("=========== adminProfile() method invoked successfully ================ ");
		return "Welcome to Admin Profile";
	}

}
