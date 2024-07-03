package com.ak.authservice.entity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ak.authservice.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Integer>{
	
	List<Address> findByUserId(int userId); 
}
