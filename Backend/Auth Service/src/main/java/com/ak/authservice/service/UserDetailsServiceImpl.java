package com.ak.authservice.service;

import java.util.Optional;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ak.authservice.entity.User;
import com.ak.authservice.entity.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder encoder;

	private final ReentrantLock lock = new ReentrantLock();

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userDetail = userRepository.findByUsername(username);
		return userDetail.map(UserDetailsImpl::new)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with name : " + username));
	}

	public boolean checkUsernameExist(String username) {
		Optional<User> userDetail = userRepository.findByUsername(username);
		if (userDetail.isPresent()) {
			return true;
		} else {
			return false;
		}
	}

	public String addUser(User user) {
		lock.lock();
		try {
			user.setPassword(encoder.encode(user.getPassword()));
			userRepository.save(user);
			return "User added successfully";
		} finally {
			lock.unlock();
		}
	}

	public User authenticatedUser(String username) {
		Optional<User> userInfo = userRepository.findByUsername(username);
		return userInfo.get();
	}

}
