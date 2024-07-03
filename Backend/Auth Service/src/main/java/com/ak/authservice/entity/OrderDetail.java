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

@Entity
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "OrderDetail_Seq_Generator")
	@SequenceGenerator(name = "OrderDetail_Seq_Generator", sequenceName = "OrderDetail_SEQUENCE", allocationSize = 1, initialValue = 1000)
	@Column(name = "id", nullable = false)
	private int orderSubId;
	
    @JsonIgnore
    @JoinColumn( name = "orders_id", referencedColumnName = "id")
	@ManyToOne(cascade = CascadeType.REMOVE)
    private Orders order;
    
	@Embedded
	private Product product = new Product();
	
    private int units;
    
    private double price;
    
    private String status = "Ordered";

	public OrderDetail() {
		super();
	}

	public OrderDetail(int orderSubId, Orders order, Product product, int units, double price, String status) {
		super();
		this.orderSubId = orderSubId;
		this.order = order;
		this.product = product;
		this.units = units;
		this.price = price;
		this.status = status;
	}

	public int getOrderSubId() {
		return orderSubId;
	}

	public void setOrderSubId(int orderSubId) {
		this.orderSubId = orderSubId;
	}

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getUnits() {
		return units;
	}

	public void setUnits(int units) {
		this.units = units;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "OrderDetail [orderSubId=" + orderSubId + ", order=" + order + ", product=" + product + ", units="
				+ units + ", price=" + price + ", status=" + status + "]";
	}
}
