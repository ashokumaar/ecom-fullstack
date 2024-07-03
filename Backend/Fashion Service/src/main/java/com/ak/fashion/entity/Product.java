package com.ak.fashion.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Product_Sequence_Generator")
	@SequenceGenerator(name = "Product_Sequence_Generator", sequenceName = "PROD_SEQ", allocationSize = 1, initialValue = 5000)
	@Column(name = "id", nullable = false)
	private int id;
	
	private String imageUrl;
    private String brand;
    private String title;
    private String color;
    private Double discountedPrice;
    private Double price;
    private Integer discountPercent;
    private Double rating;
    private Integer quantity;

    @ElementCollection
    private List<Size> size = new ArrayList<>();

    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;
    private String description;
//	private int seller;
//	private String title;
//	private String image;
//	private Double priceIn;
//	private Double priceOut;
//	private String description;
//	private String category;
//	private int stock;
//	private Double rating;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Double getDiscountedPrice() {
		return discountedPrice;
	}
	public void setDiscountedPrice(Double discountedPrice) {
		this.discountedPrice = discountedPrice;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Integer getDiscountPercent() {
		return discountPercent;
	}
	public void setDiscountPercent(Integer discountPercent) {
		this.discountPercent = discountPercent;
	}
	public Double getRating() {
		return rating;
	}
	public void setRating(Double rating) {
		this.rating = rating;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public List<Size> getSize() {
		return size;
	}
	public void setSize(List<Size> size) {
		this.size = size;
	}
	public String getTopLevelCategory() {
		return topLevelCategory;
	}
	public void setTopLevelCategory(String topLevelCategory) {
		this.topLevelCategory = topLevelCategory;
	}
	public String getSecondLevelCategory() {
		return secondLevelCategory;
	}
	public void setSecondLevelCategory(String secondLevelCategory) {
		this.secondLevelCategory = secondLevelCategory;
	}
	public String getThirdLevelCategory() {
		return thirdLevelCategory;
	}
	public void setThirdLevelCategory(String thirdLevelCategory) {
		this.thirdLevelCategory = thirdLevelCategory;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Product() {
		super();
	}

	public Product(int id, String imageUrl, String brand, String title, String color, Double discountedPrice,
			Double price, Integer discountPercent, Integer quantity, List<Size> size, String topLevelCategory,
			String secondLevelCategory, String thirdLevelCategory, String description) {
		super();
		this.id = id;
		this.imageUrl = imageUrl;
		this.brand = brand;
		this.title = title;
		this.color = color;
		this.discountedPrice = discountedPrice;
		this.price = price;
		this.discountPercent = discountPercent;
		this.quantity = quantity;
		this.size = size;
		this.topLevelCategory = topLevelCategory;
		this.secondLevelCategory = secondLevelCategory;
		this.thirdLevelCategory = thirdLevelCategory;
		this.description = description;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", imageUrl=" + imageUrl + ", brand=" + brand + ", title=" + title + ", color="
				+ color + ", discountedPrice=" + discountedPrice + ", price=" + price + ", discountPercent="
				+ discountPercent + ", quantity=" + quantity + ", size=" + size.toString() + ", topLevelCategory="
				+ topLevelCategory + ", secondLevelCategory=" + secondLevelCategory + ", thirdLevelCategory="
				+ thirdLevelCategory + ", description=" + description + "]";
	}

}