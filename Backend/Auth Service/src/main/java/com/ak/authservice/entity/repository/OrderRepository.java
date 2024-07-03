package com.ak.authservice.entity.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ak.authservice.entity.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer>{
    List<Orders>  findByCreatedAtBetween(Date startDate, Date endDate);
}
