package com.ak.authservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ak.authservice.entity.Cart;
import com.ak.authservice.entity.CartItem;
import com.ak.authservice.entity.repository.CartItemRepository;
import com.ak.authservice.entity.repository.CartRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private CartItemRepository cartItemRepo;

	private final ReentrantLock lock = new ReentrantLock();

	// ✔️
	public List<Cart> getAllCarts() {
		return cartRepo.findAll();
	}

	// ✔️
	public Cart getCartByUserId(int userId) {
		System.out.println(":::::::::::::" + userId);
		return cartRepo.findByUserId(userId);
	}

	// ✔️
	public ResponseEntity<?> createCart(Cart cart) {
		lock.lock();
		try {

			Cart cart2 = cartRepo.findByUserId(cart.getUserId());
			if (cart2 == null) {
				Cart createdCart = cartRepo.save(cart);
				if (createdCart.getItems() != null) {
					List<CartItem> itemsToSave = new ArrayList<>(createdCart.getItems()); // Create a copy
					int i = 0;
					for (CartItem item : itemsToSave) {
						System.out.println("Cart Item Id : " + item.getId());
						item.setProduct(cart.getItems().get(i).getProduct());
						System.out.println(":::::::::::" + item);
						item.setCart(createdCart);
						cartItemRepo.save(item);
						i++;
					}
					return ResponseEntity.ok(createdCart);
				}
				return ResponseEntity.ok(createdCart);
			} else {
				String str = "Cart with User Id : " + cart.getUserId()
						+ " was already present, we can't create a new cart for already existed users. Please use correct REST endpoints ";
				return ResponseEntity.accepted().body(str);
			}
		} finally {
			lock.unlock();
		}
	}

	// ✔️
	public ResponseEntity<?> updateCart(Cart cart) {
		Optional<Cart> existedCart1 = cartRepo.findById(cart.getId());
		if (existedCart1.isPresent()) {
			Cart existedCart2 = existedCart1.get();
			if (existedCart2.getUserId() == cart.getUserId()) {
				List<CartItem> existingCartItems = existedCart2.getItems();
				List<CartItem> comingCartItems = cart.getItems();
				// Update relevant fields (consider using a mapper if needed)
				for (int i = 0; i < comingCartItems.size(); i++) {
					int count = 0;
					for (int j = 0; j < existingCartItems.size(); j++) {
						if (existingCartItems.get(j).getProduct().getId() == comingCartItems.get(i).getProduct()
								.getId()) {
							count++;
							if (existingCartItems.get(j).getQuantity() != comingCartItems.get(i).getQuantity()) {
								existingCartItems.get(j).setQuantity(comingCartItems.get(i).getQuantity());
							}
						}
					}
					if (count == 0) {
						comingCartItems.get(i).setCart(existedCart2);
						existingCartItems.add(comingCartItems.get(i));
					}
				}
				existedCart2.setItems(existingCartItems); // Example update
//				System.out.println("===========\n" + existedCart2.toString() + "\n===========");
				cartRepo.save(existedCart2);
				return ResponseEntity.ok("Cart updated successfully");
			} else {
				String str = "Cart with id : " + cart.getId() + " and User Id : " + cart.getUserId()
						+ " associated with it, doesn't exist in our databse, please check again.";
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(str);
			}

		} else {
			String str = "Cart with id : " + cart.getId() + " doesn't exist in our databse, please check again.";
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(str);
		}

	}

	// ✔️
	public ResponseEntity<?> deleteCart(int cartId) {
		Optional<Cart> cart = cartRepo.findById(cartId);
		if (cart.isPresent()) {
			cartRepo.deleteById(cartId);
			String str = "Cart is with Id : " + cart.get().getId() + " was deleted successfully";
			return ResponseEntity.ok(str);
		}
		return ResponseEntity.notFound().build();

	}

	// ✔️ logic is set for backend purpose not for frontend, whenever ur going to
	// imlement in the frontend just increment the quantity ( quantity =
	// prevQuantity+1 )
	public ResponseEntity<?> addItemToCart(int cartId, CartItem cartItem) {
		Optional<Cart> existingCart = cartRepo.findById(cartId);
		if (existingCart.isPresent()) {
			Cart cartToUpdate = existingCart.get();
			List<CartItem> comingCartItems = cartToUpdate.getItems();
			for (int j = 0; j < cartToUpdate.getItems().size(); j++) {
				if (comingCartItems.get(j).getProduct().getId() == cartItem.getProduct().getId()) {
					if (comingCartItems.get(j).getQuantity() != cartItem.getQuantity()) {
						comingCartItems.get(j).setQuantity(cartItem.getQuantity());
//						CartItem c = 
						cartItemRepo.save(comingCartItems.get(j));
//						System.out.println("=====just quantity updating======\n" + c.toString() + "\n===========");
						return ResponseEntity.ok("Cart Item updated successfully");
					} else {
						return ResponseEntity.ok("Duplicate item (item already exist in the cart items list) ");
					}
				}
			}
			cartItem.setCart(cartToUpdate);
			cartToUpdate.getItems().add(cartItem); // Add the new item
//			System.out.println("=====adding item to cart======\n" + cartToUpdate.toString() + "\n===========");
			cartRepo.save(cartToUpdate);
			return ResponseEntity.ok("Item is added to cart items successfully");
		} else {
			String str = "Cart with id : " + cartId + " doesn't exist in our databse, please check again.";
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(str); // Handle case where cart is not found
		}
	}

	public ResponseEntity<?> updateCartItemQuantity(int cartId, int itemId, Integer quantity) {
		Optional<Cart> existingCart = cartRepo.findById(cartId);
		if (existingCart.isPresent()) {
			Cart cartToUpdate = existingCart.get();
			if (cartItemRepo.existsByCart_IdAndId(cartId, itemId)) {
				System.out.println("========Record Found==========");
				for (CartItem item : cartToUpdate.getItems()) {
					// Update quantity for the matching item
					if (item.getId() == itemId) {
						item.setQuantity(quantity);
						cartItemRepo.save(item);
						return ResponseEntity.ok("Item quantity is updated successfully");
					}
				}
			} else {
				String str = "Unfortunatley, combination of CartId and ItemId was not found";
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(str);
			}
			return null;
		} else {
			String str = "Cart with id : " + cartId + " doesn't exist in our databse, please check again.";
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(str); // Handle case where cart is not found
		}
	}

	// ✔️
	public ResponseEntity<?> removeItemFromCart(int cartId, int itemId) {
		Optional<CartItem> removingCartItem = cartItemRepo.findById(itemId);
		if (removingCartItem.isPresent()) {
			CartItem cartItem = removingCartItem.get();
			cartItemRepo.deleteCartItemById(cartItem.getCart().getId(), cartItem.getId());
			String str = "Deleted cart item with id : " + itemId + " successfully.";
			return ResponseEntity.ok(str);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

	// ✔️
	public ResponseEntity<?> deleteCartItemById(int itemId) {
		Optional<CartItem> deletingCartItem = cartItemRepo.findById(itemId);
		if (deletingCartItem.isPresent()) {
			CartItem cartItem = deletingCartItem.get();
			cartItemRepo.deleteCartItemById(cartItem.getCart().getId(), cartItem.getId());
			String str = "Deleted cart item with id : " + itemId + " successfully.";
			return ResponseEntity.ok(str);
		} else {
			return ResponseEntity.notFound().build();
		}

	}

}
