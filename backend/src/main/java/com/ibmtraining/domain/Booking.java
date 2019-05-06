package com.ibmtraining.domain;

import java.sql.Date;

public class Booking {

	Long id;
	private String guests;
	private String roomId;
	private String checkIn;
	private String checkOut;
	private String totalPrice;	
	

	public Booking() {
		
	}
	
	public Booking(String guests, String roomId, String checkIn, String checkOut, String totalPrice) {
		this(null, guests,roomId, checkIn,checkOut, totalPrice);
	}

	public Booking(Long id, String guests, String roomId, String checkIn, String checkOut, String totalPrice) {
		this.id = id;
		this.guests = guests;
		this.roomId = roomId;
		this.checkIn = checkIn;
		this.checkOut = checkOut;
		this.totalPrice = totalPrice;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	public String getGuests() {
		return guests;
	}

	public void setGuests(String guests) {
		this.guests = guests;
	}

	public String getRoomId() {
		return roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

	public String getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(String checkIn) {
		this.checkIn = checkIn;
	}

	public String getCheckOut() {
		return checkOut;
	}

	public void setCheckOut(String checkOut) {
		this.checkOut = checkOut;
	}

	public String getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}