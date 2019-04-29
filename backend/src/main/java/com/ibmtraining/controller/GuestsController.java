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

import com.ibmtraining.domain.Guest;
import com.ibmtraining.service.GuestService;
import com.ibmtraining.service.GuestServiceImpl;

@Path("/guests")
public class GuestsController {

	private GuestService guestService;

	public GuestsController() {
		this.guestService = new GuestServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Guest> getGuests(
			@QueryParam("firstName") String firstName,
			@QueryParam("middleName") String middleName,
			@QueryParam("lastName") String lastName,
			@QueryParam("birthDate") String birthDate) {

		try {
			List<Guest> guests;
			if (StringUtils.isAllBlank(firstName,middleName, lastName, birthDate)) {
				guests = guestService.findAll();
			} else {
				guests = guestService.findByName(firstName, lastName);
			}
						
			return guests;
			
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Guest getGuest(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			Guest guest = guestService.find(longId);
			return guest;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addGuest(Guest guest) {

		try {
			guestService.add(guest);
			String result = "Guest saved : " + guest.getFirstName() + " "
											 + guest.getMiddleName() + " "
											 + guest.getLastName() + " "
											 + guest.getBirthDate();
			return Response.status(201).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateGuest(@PathParam("id") Long id, Guest guest) {

		try {
			guest.setId(id);
			guestService.upsert( guest);
			String result = "Guest updated : " + id + " "
											   + guest.getFirstName() + " "
											   + guest.getMiddleName() + " "
											   + guest.getLastName() + " "
											   + guest.getBirthDate();
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@DELETE
	@Path("{id}")
	public Response deleteGuest(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			guestService.delete(longId);
			String result = "Guest deleted";
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}