package com.ak.books.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Product_Sequence_Generator")
	@SequenceGenerator(name = "Product_Sequence_Generator", sequenceName = "PROD_SEQ", allocationSize = 1, initialValue = 7000)
	@Column(name = "id", nullable = false)
	private int id;

	private String title;
	private String imageUrl;
    private Double discountedPrice;
    private Double price;
    private Integer discountPercent;
    private Double rating;
    private Integer quantity;
    private String isbn;
	private int pageCount;
	@Column(length = 3000)
	private String shortDescription;
	@Column(length = 3000)
	private String longDescription;
    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "", joinColumns = @JoinColumn(name = "product_id"))
	@Column(name = "author")
	private List<String> authors = new ArrayList<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "", joinColumns = @JoinColumn(name = "product_id"))
	@Column(name = "category")
	private List<String> categories = new ArrayList<>();

	public Product() {
		super();
	}

	public Product(int id, String title, String imageUrl, Double discountedPrice, Double price, Integer discountPercent,
			Double rating, Integer quantity, String isbn, int pageCount, String shortDescription,
			String longDescription, String topLevelCategory, String secondLevelCategory, String thirdLevelCategory,
			List<String> authors, List<String> categories) {
		super();
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.discountedPrice = discountedPrice;
		this.price = price;
		this.discountPercent = discountPercent;
		this.rating = rating;
		this.quantity = quantity;
		this.isbn = isbn;
		this.pageCount = pageCount;
		this.shortDescription = shortDescription;
		this.longDescription = longDescription;
		this.topLevelCategory = topLevelCategory;
		this.secondLevelCategory = secondLevelCategory;
		this.thirdLevelCategory = thirdLevelCategory;
		this.authors = authors;
		this.categories = categories;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public String getLongDescription() {
		return longDescription;
	}

	public void setLongDescription(String longDescription) {
		this.longDescription = longDescription;
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

	public List<String> getAuthors() {
		return authors;
	}

	public void setAuthors(List<String> authors) {
		this.authors = authors;
	}

	public List<String> getCategories() {
		return categories;
	}

	public void setCategories(List<String> categories) {
		this.categories = categories;
	}
	
}
