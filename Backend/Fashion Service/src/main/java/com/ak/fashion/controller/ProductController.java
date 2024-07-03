package com.ak.fashion.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ak.fashion.entity.Product;
import com.ak.fashion.servcie.ProductService;

@Component
@RestController
@RequestMapping("/fashion/products")
@CrossOrigin
public class ProductController {

	@Autowired
	private ProductService productService; // Inject ProductService for product operations

	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable int id) {
		Product product = productService.getProductById(id);
		if (product != null) {
			return ResponseEntity.ok(product);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/all")
	public ResponseEntity<List<Product>> getAllProducts() {
		List<Product> products = productService.getAllProducts();
		return ResponseEntity.ok(products);
	}

	@PostMapping("/create")
	public ResponseEntity<Product> createProduct(@RequestBody Product product) {
		double randomValue = (Math.random() * 3.9) + 1;
		product.setRating(Double.parseDouble(String.format("%.1f", randomValue)));
		Product createdProduct = productService.createProduct(product);
		return ResponseEntity.ok(createdProduct);
	}

	@PostMapping("/createmany")
	public ResponseEntity<List<Product>> createProducts(@RequestBody List<Product> productsList) {
		List<Product> products = new ArrayList<>();
		for (Product eachProduct : productsList) {
//		    Product product = new Product();
			double randomValue = (Math.random() * 3.9) + 1;
			eachProduct.setRating(Double.parseDouble(String.format("%.1f", randomValue)));
			int randomQuantity = (int)((Math.random() * 10) + 10);
			eachProduct.getSize().stream().forEach(size -> size.setQuantity(randomQuantity));
			products.add(eachProduct);
		}
		products = productService.createMany(products);
		return ResponseEntity.ok(products);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product product) {
		product.setId(id); // Ensure ID from path matches product object
		Product updatedProduct = productService.updateProduct(product);
		if (updatedProduct != null) {
			return ResponseEntity.ok(updatedProduct);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
		productService.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}
}
