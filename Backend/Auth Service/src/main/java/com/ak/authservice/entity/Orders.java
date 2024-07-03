package com.ak.authservice.entity;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Orders_Seq_Generator")
	@SequenceGenerator(name = "Orders_Seq_Generator", sequenceName = "Orders_SEQUENCE", allocationSize = 1, initialValue = 1000)
	@Column(name = "id", nullable = false)
	private int orderId;
	
	private int customerId;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "orders_id")
    private List<OrderDetail> items;
	
    @Column(name = "created_at")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    private double totalPrice;
    
    @PrePersist
    private void prePersist(){
        createdAt = new Date();
    }

	public Orders() {
		super();
	}

	public Orders(int orderId, int customerId, List<OrderDetail> items, Date createdAt, double totalPrice) {
		super();
		this.orderId = orderId;
		this.customerId = customerId;
		this.items = items;
		this.createdAt = createdAt;
		this.totalPrice = totalPrice;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public List<OrderDetail> getItems() {
		return items;
	}

	public void setItems(List<OrderDetail> items) {
		this.items = items;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	@Override
	public String toString() {
		return "Orders [orderId=" + orderId + ", customerId=" + customerId + ", items=" + items + ", createdAt="
				+ createdAt + ", totalPrice=" + totalPrice + "]";
	}

	
    
}
