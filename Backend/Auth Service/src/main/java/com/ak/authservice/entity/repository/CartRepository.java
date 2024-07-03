package com.ak.authservice.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ak.authservice.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
	
	Cart findByUserId(int userId);

}
