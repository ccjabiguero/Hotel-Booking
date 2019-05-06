package com.ibmtraining.service;
import java.sql.Date;
import java.util.List;

import javax.ws.rs.PathParam;

import org.apache.commons.lang3.StringUtils;

import com.ibmtraining.dao.BookingDao;
import com.ibmtraining.dao.BookingJdbcDaoImpl;
import com.ibmtraining.domain.Booking;

public class BookingServiceImpl implements BookingService{
	
	BookingDao bookingDao;

	public BookingServiceImpl() {
		this.bookingDao = BookingJdbcDaoImpl.getInstance();
		
	}
	
	@Override
	public List<Booking> findAll() {
		return bookingDao.findAll();
	}

	@Override
	public Booking find(Long id) {
		return bookingDao.find(id);
	}

	@Override
	public List<Booking> findByAvailRooms(String checkIn, String checkOut) {
		return bookingDao.findByAvailRooms(checkIn, checkOut);
	}

	@Override
	public void add(Booking booking) {
		if (validate(booking)) {
			System.out.println("add booking");
			bookingDao.add(booking);
		} else {
			throw new IllegalArgumentException("Fields checkIn and checkOut cannot be blank.");
		}
	}

	@Override
	public void upsert(Booking booking) {
		if (validate(booking)) {
			if(booking.getId() != null && booking.getId() >= 0) {
				System.out.println("update booking");
				bookingDao.update(booking);
				
			} else {
				System.out.println("add booking");
				bookingDao.add(booking);
			}
		} else {
			throw new IllegalArgumentException("Fields checkIn and checkOut cannot be blank.");
		}
	}
	
	@Override
	public void delete(Long id) {
		System.out.println("Booking ID "+ id +" deleted");
		bookingDao.delete(id);
	}
	
	private boolean validate(Booking booking) {
		return !StringUtils.isAnyBlank(booking.getGuests() + " "
				 + booking.getRoomId() + " "
				 + booking.getCheckIn() + " "
				 + booking.getCheckOut() + " "
				 + booking.getTotalPrice());
	}

}