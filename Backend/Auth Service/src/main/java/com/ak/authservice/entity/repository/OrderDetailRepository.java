package com.ak.authservice.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ak.authservice.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{

}
