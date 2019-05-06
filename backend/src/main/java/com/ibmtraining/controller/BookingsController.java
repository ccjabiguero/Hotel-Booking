package com.ibmtraining.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.lang3.StringUtils;

import com.ibmtraining.domain.Booking;
import com.ibmtraining.service.BookingService;
import com.ibmtraining.service.BookingServiceImpl;

@Path("/bookings")
public class BookingsController {

	private BookingService bookingService;

	public BookingsController() {
		this.bookingService = new BookingServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Booking> getBookings(
			@QueryParam("guests") String guests,
			@QueryParam("roomId") String roomId,
			@QueryParam("checkIn") String checkIn,
			@QueryParam("checkOut") String checkOut,
			@QueryParam("totalPrice") String totalPrice) {

		try {
			List<Booking> bookings;
			if (StringUtils.isAllBlank(guests,roomId, checkIn, checkOut)) {
				bookings = bookingService.findAll();
			} else {
				bookings = bookingService.findByAvailRooms(checkIn,checkOut);
			}
						
			return bookings;
			
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Booking getGuest(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			Booking booking = bookingService.find(longId);
			return booking;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addBooking(Booking booking) {

		try {
			bookingService.add(booking);
			String result = "Booking saved : " + booking.getGuests() + " "
											 + booking.getRoomId() + " "
											 + booking.getCheckIn() + " "
											 + booking.getCheckOut() + " "
											 + booking.getTotalPrice();
			return Response.status(201).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateBooking(@PathParam("id") Long id, Booking booking) {

		try {
			booking.setId(id);
			bookingService.upsert( booking);
			String result = "Booking updated : " + id + " "
												 + booking.getGuests() + " "
												 + booking.getRoomId() + " "
												 + booking.getCheckIn() + " "
												 + booking.getCheckOut() + " "
												 + booking.getTotalPrice();
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@DELETE
	@Path("{id}")
	public Response deleteBooking(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			bookingService.delete(longId);
			String result = "Booking deleted";
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}