package com.ak.authservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ak.authservice.entity.Address;
import com.ak.authservice.entity.User;
import com.ak.authservice.entity.repository.AddressRepository;
import com.ak.authservice.entity.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository addressRepo;

	public User getUserById(int id) {
		return userRepo.findById(id).orElse(null); // Find by ID and return null if not found
	}

	public List<User> getAllUsers() {
		return userRepo.findAll(); // Retrieve all users
	}

	public User createUser(User user) {
		return userRepo.save(user); // Save the new user
	}

//	public User updateUser(User user) {
//		Optional<User> existingUser = userRepo.findById(user.getId());
//		if (existingUser.isPresent()) {
//			User userToUpdate = existingUser.get();
//			// Update relevant fields (consider using a mapper if needed)
//			if (user.getUsername() != null && !user.getUsername().equals(userToUpdate.getUsername())) {
//				userToUpdate.setUsername(user.getUsername());
//			}
//			if (user.getEmail() != null && !user.getEmail().equals(userToUpdate.getEmail())) {
//				userToUpdate.setEmail(user.getEmail());
//			}
//			if (user.getPassword() != null && !user.getPassword().equals(userToUpdate.getPassword())) {
//				userToUpdate.setPassword(user.getPassword());
//			}
//			if (user.getPhone() != null && !user.getPhone().equals(userToUpdate.getPhone())) {
//				userToUpdate.setPhone(user.getPhone());
//			}
//
//			Address2 address = new Address2();
//			
//			if (true) {
//				if (user.getAddress().getStreet() != null
//						&& !user.getAddress().getStreet().equals(userToUpdate.getAddress().getStreet())) {
//					address.setStreet(user.getAddress().getStreet());
////					userToUpdate.setAddress(address);
//				} else {
//					address.setStreet(user.getAddress().getStreet());
//				}
//				if (user.getAddress().getArea() != null
//						&& !user.getAddress().getArea().equals(userToUpdate.getAddress().getArea())) {
//					address.setArea(user.getAddress().getArea());
//
//				} else {
//					address.setArea(user.getAddress().getArea());
//				}
//				if (user.getAddress().getPincode() != 0
//						&& user.getAddress().getPincode() != userToUpdate.getAddress().getPincode()) {
//					address.setPincode(user.getAddress().getPincode());
//				} else {
//					address.setPincode(user.getAddress().getPincode());
//				}
//			}
//			userToUpdate.setAddress(address);
//
//			return userRepo.save(userToUpdate);
//
//		} else {
//			return null; // Handle case where user to update is not found
//		}
//	}

	public User updateUser(User user) {
		Optional<User> existingUser = userRepo.findById(user.getId());
		if (existingUser.isPresent()) {
			User userToUpdate = existingUser.get();

			if (user.getUsername() != null && !user.getUsername().equals(userToUpdate.getUsername())) {
				userToUpdate.setUsername(user.getUsername());
			}
			if (user.getEmail() != null && !user.getEmail().equals(userToUpdate.getEmail())) {
				userToUpdate.setEmail(user.getEmail());
			}
			if (user.getPassword() != null && !user.getPassword().equals(userToUpdate.getPassword())) {
				userToUpdate.setPassword(userToUpdate.getPassword());
			}
			if (user.getPhone() != null && !user.getPhone().equals(userToUpdate.getPhone())) {
				userToUpdate.setPhone(user.getPhone());
			}

			// Update address list
			List<Address> updatedAddresses = new ArrayList<>();
			for (Address incomingAddress : user.getAddressList()) {
				int addressId = incomingAddress.getId(); // Check if address has an ID

				// Existing address update
				if (addressId > 0) {
					Optional<Address> addressToUpdateOptional = addressRepo.findById(addressId);
					if (addressToUpdateOptional.isPresent()) {
						Address addressToUpdate = addressToUpdateOptional.get();
						addressToUpdate.setStreet(incomingAddress.getStreet());
						addressToUpdate.setArea(incomingAddress.getArea());
						addressToUpdate.setCity(incomingAddress.getCity());
						addressToUpdate.setState(incomingAddress.getState());
						addressToUpdate.setPincode(incomingAddress.getPincode());
						addressToUpdate.setDefaultAddress(incomingAddress.isDefaultAddress());
						updatedAddresses.add(addressToUpdate);
					}
				} else { // New address creation
					incomingAddress.setUser(userToUpdate); // Set user reference for new address
					updatedAddresses.add(incomingAddress);
				}
			}

			userToUpdate.setAddressList(updatedAddresses);
			return userRepo.save(userToUpdate);

		} else {
			return null; // Handle case where user to update is not found
		}
	}

	// ✔️✔️
	public ResponseEntity<?> deleteUser(int id) {
		Optional<User> user = userRepo.findById(id);
		if (user.isPresent()) {
			userRepo.deleteById(id);
			return ResponseEntity.ok("Address deleted successfully");
		} else {
			return ResponseEntity.noContent().build();
		}
	}

	// ✔️✔️
	public ResponseEntity<?> addAddress(Address address) {
		if (address.getId() == 0) {
			address = addressRepo.save(address);
			return ResponseEntity.created(null).body("Address created successfully.\n" + address.toString());
		} else {
			address = addressRepo.save(address);
			return ResponseEntity.ok("Address updated successfully.\n" + address);
		}
	}

	// ✔️✔️
	public List<Address> defaultAddress(Address address) {
		List<Address> existList = addressRepo.findByUserId(address.getUser().getId());
		List<Address> updatedList = new ArrayList<>();
		int i = 0;
		for (Address address2 : existList) {
			if (existList.get(i).getId() == address2.getId()) {
				address2.setDefaultAddress(true);
			} else {
				address2.setDefaultAddress(false);
			}
			updatedList.add(address2);
		}
		return addressRepo.saveAll(updatedList);
	}

	// ✔️✔️
	public ResponseEntity<?> deleteAddress(int id) {
		Optional<Address> address = addressRepo.findById(id);
		if (address.isPresent()) {
			addressRepo.deleteById(id);
			return ResponseEntity.ok("Address deleted successfully");
		} else {
			return ResponseEntity.noContent().build();
		}
	}

}
