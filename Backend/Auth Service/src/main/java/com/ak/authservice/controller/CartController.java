package com.ak.authservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ak.authservice.entity.Cart;
import com.ak.authservice.entity.CartItem;
import com.ak.authservice.service.CartService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/carts")
@CrossOrigin
public class CartController {

	@Autowired
	private CartService cartService;
	
	// ✔️
	@GetMapping("/all")
	public List<Cart> getAllCarts(){
		return cartService.getAllCarts();
	}

	// ✔️
	@GetMapping("/{userId}")
	public ResponseEntity<Cart> getCartByUserId(@PathVariable int userId) {
		Cart cart = cartService.getCartByUserId(userId);
		if(cart != null) {
			System.out.println("cart found:"+cart);
			return ResponseEntity.ok(cart);
		} else {
			System.out.println("cart not found:"+cart);
			return ResponseEntity.notFound().build();
		}
//		return (cart != null) ? ResponseEntity.ok(cart) : ResponseEntity.notFound().build();
	}

	// ✔️
	@PostMapping("/create")
	public ResponseEntity<?> createCart(@RequestBody Cart cart) {
		return cartService.createCart(cart);
	}

	// ✔️
	@PutMapping("/update/{cartId}")
	public ResponseEntity<?> updateCart(@PathVariable int cartId, @RequestBody Cart cart) {
		cart.setId(cartId); // Ensure ID from path matches cart object
		return cartService.updateCart(cart);
	}

	// ✔️
	@DeleteMapping("/delete/{cartId}")
	public ResponseEntity<?> deleteCart(@PathVariable int cartId) {
		return cartService.deleteCart(cartId);
	}

	// Additional methods for managing cart items:

	// ✔️
	@PostMapping("/{cartId}/item")
	public ResponseEntity<?> addItemToCart(@PathVariable int cartId, @RequestBody CartItem cartItem) {
		return cartService.addItemToCart(cartId, cartItem);
	}

	@PutMapping("/{cartId}/items/{itemId}")
	public ResponseEntity<?> updateCartItemQuantity(@PathVariable int cartId, @PathVariable int itemId,
			@RequestBody Integer quantity) {
		return cartService.updateCartItemQuantity(cartId, itemId, quantity);
	}

	// ✔️
	@DeleteMapping("/{cartId}/items/{itemId}")
	public ResponseEntity<?> removeItemFromCart(@PathVariable int cartId, @PathVariable int itemId) {
		return cartService.removeItemFromCart(cartId, itemId);
	}

	// ✔️
	@Transactional
	@DeleteMapping("/deleteCartItemById/{itemId}")
	public ResponseEntity<?> deleteCartItemById(@PathVariable int itemId) {
		return cartService.deleteCartItemById(itemId);
	}

}
