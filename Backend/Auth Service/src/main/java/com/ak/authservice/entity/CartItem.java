package com.ak.authservice.entity;

import com.ak.authservice.entity.pojo.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_items")
public class CartItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CartItem_Sequence_Generator")
	@SequenceGenerator(name = "CartItem_Sequence_Generator", sequenceName = "CARTITEM_SEQ", allocationSize = 1, initialValue = 100)
	@Column(name = "id", nullable = false)
	private int id;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REMOVE)
	@JoinColumn(name = "cart_id", updatable = true)
	private Cart cart;

//	@ManyToOne
//	@JoinColumn(name = "product_id", updatable = true)
	@Embedded
	private Product product = new Product();

	private int quantity;

	public CartItem() {
		super();
	}

	public CartItem(int id, Cart cart, Product product, int quantity) {
		super();
		this.id = id;
		this.cart = cart;
		this.product = product;
		this.quantity = quantity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

//	@Override
//	public String toString() {
//		return "CartItem [id=" + id + ", cart=" + cart + ", product=" + product + ", quantity=" + quantity + "]";
//	}
	
}
