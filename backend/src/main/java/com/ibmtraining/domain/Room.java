package com.ibmtraining.domain;

import java.math.BigDecimal;

public class Room {

	Long id;
	private String roomType;
	private BigDecimal price;

	public Room() {

	}

	public Room(String roomType, BigDecimal price) {
		this(null, roomType, price);
	}

	public Room(Long id, String roomType, BigDecimal price) {
		this.id = id;
		this.roomType = roomType;
		this.price = price;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

}