package com.ibmtraining.controller;

import java.math.BigDecimal;
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

import com.ibmtraining.domain.Room;
import com.ibmtraining.service.RoomService;
import com.ibmtraining.service.RoomServiceImpl;

@Path("/rooms")
public class RoomsController {

	private RoomService roomService;

	public RoomsController() {
		this.roomService = new RoomServiceImpl();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Room> getRooms(
			@QueryParam("roomType") String roomType, 
			@QueryParam("price") BigDecimal price) {

		try {
			List<Room> rooms;
			
			if (StringUtils.isAllBlank(roomType ) && price == null) {
				rooms = roomService.findAll();
			} else {
				rooms = roomService.findByRoomType(roomType);
			}
						
			return rooms;
			
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Room getRoom(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			Room room = roomService.find(longId);
			return room;
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addRoom(Room room) {

		try {
			roomService.add(room);
			String result = "Room saved : " + room.getRoomType() + " " 
											+ room.getPrice();
			return Response.status(201).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateRoom(@PathParam("id") Long id, Room room) {

		try {
			room.setId(id);
			roomService.upsert(room);
			String result = "Room updated : " + id + " " 
											  + room.getRoomType() + " " 
											  + room.getPrice();
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}

	}

	@DELETE
	@Path("{id}")
	public Response deleteRoom(@PathParam("id") String id) {

		try {
			Long longId = Long.parseLong(id);
			roomService.delete(longId);
			String result = "Room deleted";
			return Response.status(200).entity(result).build();
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}
}