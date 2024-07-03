package com.ak.authservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity(name = "Address")
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Address_Seq_Generator")
	@SequenceGenerator(name = "Address_Seq_Generator", sequenceName = "ADDRESS_SEQ", initialValue = 1000, allocationSize = 1)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="user_id", updatable = true)
	private User user;

	private String street;

	private String area;

	private String city;

	private String state;

	private int pincode;

	private boolean defaultAddress;

	public Address() {
		super();
	}

	public Address(int id, User user, String street, String area, String city, String state, int pincode,
			boolean defaultAddress) {
		super();
		this.id = id;
		this.user = user;
		this.street = street;
		this.area = area;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.defaultAddress = defaultAddress;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public boolean isDefaultAddress() {
		return defaultAddress;
	}

	public void setDefaultAddress(boolean defaultAddress) {
		this.defaultAddress = defaultAddress;
	}

	@Override
	public String toString() {
		return "Address2 [id=" + id + ", user_id=" + user.getId() + ", street=" + street + ", area=" + area
				+ ", city=" + city + ", state=" + state + ", pincode=" + pincode + ", defaultAddress=" + defaultAddress
				+ "]";
	}

}
