package com.ak.authservice.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "carts")
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Cart_Sequence_Generator")
	@SequenceGenerator(name = "Cart_Sequence_Generator", sequenceName = "CART_SEQ", allocationSize = 1, initialValue = 100)
	@Column(name = "id", nullable = false)
	private int id;

//	@ManyToOne
//	@JoinColumn(name = "user_id", updatable = true)
	private int userId;

	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = false)
	private List<CartItem> items;

	public Cart(int id, int userId, List<CartItem> items) {
		super();
		this.id = id;
		this.userId = userId;
		this.items = items;
	}

	public Cart() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public void setItems(List<CartItem> items) {
		this.items = items;
	}

}