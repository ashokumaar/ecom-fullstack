package com.ak.authservice.dto;

public class UserDto {
	
	private int userId;

	public UserDto() {
		super();
	}

	public UserDto(int userId) {
		super();
		this.userId = userId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
	
}
