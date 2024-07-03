package com.ak.books.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ak.books.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer>{

}
