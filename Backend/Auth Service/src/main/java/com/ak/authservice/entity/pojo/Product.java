package com.ak.authservice.entity.pojo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Product {

	@Column(name="prod_id")
	private int prodId;

	private String title;
	
	public Product() {
		super();
	}

	public Product(int prodId, String title) {
		super();
		this.prodId = prodId;
		this.title = title;
	}

	public int getId() {
		return prodId;
	}

	public void setId(int prodId) {
		this.prodId = prodId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "Product [id=" + prodId + ", title=" + title + "]";
	}

}