package com.ak.books.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ak.books.entity.Product;
import com.ak.books.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repo;

	public List<Product> getAllProducts() {
		return repo.findAll(); // Retrieve all products
	}

	public Product getProductById(int id) {
		return repo.findById(id).orElse(null);
	}

	public Product createProduct(Product product) {
		return repo.save(product);
	}

	public List<Product> createMany(List<Product> products) {
		return repo.saveAll(products);
	}

	public Product updateProduct(Product newProduct) {
		Optional<Product> existingProduct2 = repo.findById(newProduct.getId());
		if (existingProduct2.isPresent()) {
			Product existingProduct = existingProduct2.get();
			existingProduct.setImageUrl(
					newProduct.getImageUrl() != null ? newProduct.getImageUrl() : existingProduct.getImageUrl());
			existingProduct
					.setTitle(newProduct.getTitle() != null ? newProduct.getTitle() : existingProduct.getTitle());
			existingProduct.setDiscountedPrice(newProduct.getDiscountedPrice() != null ? newProduct.getDiscountedPrice()
					: existingProduct.getDiscountedPrice());
			existingProduct
					.setPrice(newProduct.getPrice() != null ? newProduct.getPrice() : existingProduct.getPrice());
			existingProduct.setDiscountPercent(newProduct.getDiscountPercent() != null ? newProduct.getDiscountPercent()
					: existingProduct.getDiscountPercent());
			existingProduct.setQuantity(
					newProduct.getQuantity() != null ? newProduct.getQuantity() : existingProduct.getQuantity());
			existingProduct
					.setTopLevelCategory(newProduct.getTopLevelCategory() != null ? newProduct.getTopLevelCategory()
							: existingProduct.getTopLevelCategory());
			existingProduct.setSecondLevelCategory(
					newProduct.getSecondLevelCategory() != null ? newProduct.getSecondLevelCategory()
							: existingProduct.getSecondLevelCategory());
			existingProduct.setThirdLevelCategory(
					newProduct.getThirdLevelCategory() != null ? newProduct.getThirdLevelCategory()
							: existingProduct.getThirdLevelCategory());

			return repo.save(existingProduct);
		} else {
			return null;
		}
	}

	public void deleteProduct(int id) {
		repo.deleteById(id); // Delete product by ID
	}
}
