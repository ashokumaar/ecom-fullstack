package com.ak.fashion.servcie;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ak.fashion.entity.Product;
import com.ak.fashion.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepo;

	public List<Product> getAllProducts() {
		return productRepo.findAll(); // Retrieve all products
	}

	public Product getProductById(int id) {
		return productRepo.findById(id).orElse(null); // Find by ID and return null if not found
	}

	public Product createProduct(Product product) {
		return productRepo.save(product); // Save the new product
	}

	public List<Product> createMany(List<Product> products) {
		  return productRepo.saveAll(products);
		}
//	public Product updateProduct(Product product) {
//		Optional<Product> existingProduct = productRepo.findById(product.getId());
//		if (existingProduct.isPresent()) {
//			Product productToUpdate = existingProduct.get();
//			// Update relevant fields (consider using a mapper if needed)
//			if (product.getTitle() != null && !productToUpdate.getTitle().equals(product.getTitle())) {
//				productToUpdate.setTitle(product.getTitle()); // Example update
//			}
//			productToUpdate.setStock(product.getStock());
//			productToUpdate.setRating(product.getRating());
//			if (product.getImage() != null && !productToUpdate.getImage().equals(product.getImage())) {
//				productToUpdate.setImage(product.getImage());
//			}
//			if (product.getPriceIn() != null && !productToUpdate.getPriceIn().equals(product.getPriceIn())) {
//				productToUpdate.setPriceIn(product.getPriceIn());
//			}
//			if (product.getPriceOut() != null && !productToUpdate.getPriceOut().equals(product.getPriceOut())) {
//				productToUpdate.setPriceOut(product.getPriceOut());
//			}
//			if (product.getDescription() != null
//					&& !productToUpdate.getDescription().equals(product.getDescription())) {
//				productToUpdate.setDescription(product.getDescription());
//			}
//			if (product.getCategory() != null && !productToUpdate.getCategory().equals(product.getCategory())) {
//				productToUpdate.setCategory(product.getCategory());
//			}
//			if (product.getStock() != 0 && productToUpdate.getStock() != (product.getStock())) {
//				productToUpdate.setStock(product.getStock());
//			}
//			if (product.getRating() != 0 && productToUpdate.getRating() != (product.getRating())) {
//				productToUpdate.setRating(product.getRating());
//			}
//			// ... update other fields as needed
//
//			return productRepo.save(productToUpdate);
//
//		} else {
//
//			return null; // Handle case where product to update is not found
//
//		}
//	}

	public Product updateProduct(Product newProduct) {
		Optional<Product> existingProduct2 = productRepo.findById(newProduct.getId());
		if (existingProduct2.isPresent()) {
			Product existingProduct = existingProduct2.get();
			
			existingProduct.setImageUrl(
					newProduct.getImageUrl() != null ? newProduct.getImageUrl() : existingProduct.getImageUrl());
			existingProduct
					.setBrand(newProduct.getBrand() != null ? newProduct.getBrand() : existingProduct.getBrand());
			existingProduct
					.setTitle(newProduct.getTitle() != null ? newProduct.getTitle() : existingProduct.getTitle());
			existingProduct
					.setColor(newProduct.getColor() != null ? newProduct.getColor() : existingProduct.getColor());
			existingProduct.setDiscountedPrice(newProduct.getDiscountedPrice() != null ? newProduct.getDiscountedPrice()
					: existingProduct.getDiscountedPrice());
			existingProduct
					.setPrice(newProduct.getPrice() != null ? newProduct.getPrice() : existingProduct.getPrice());
			existingProduct.setDiscountPercent(newProduct.getDiscountPercent() != null ? newProduct.getDiscountPercent()
					: existingProduct.getDiscountPercent());
			existingProduct.setQuantity(
					newProduct.getQuantity() != null ? newProduct.getQuantity() : existingProduct.getQuantity());
//			existingProduct.setSize(newProduct.getSize() != null ? newProduct.getSize() : existingProduct.getSize());
			existingProduct
					.setTopLevelCategory(newProduct.getTopLevelCategory() != null ? newProduct.getTopLevelCategory()
							: existingProduct.getTopLevelCategory());
			existingProduct.setSecondLevelCategory(
					newProduct.getSecondLevelCategory() != null ? newProduct.getSecondLevelCategory()
							: existingProduct.getSecondLevelCategory());
			existingProduct.setThirdLevelCategory(
					newProduct.getThirdLevelCategory() != null ? newProduct.getThirdLevelCategory()
							: existingProduct.getThirdLevelCategory());
			existingProduct.setDescription(newProduct.getDescription() != null ? newProduct.getDescription()
					: existingProduct.getDescription());

			return productRepo.save(existingProduct);
		} else {
			return null;
		}
	}

	public void deleteProduct(int id) {
		productRepo.deleteById(id); // Delete product by ID
	}

}
