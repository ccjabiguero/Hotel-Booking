package com.ibmtraining.dao;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hsqldb.jdbc.JDBCDataSource;

import com.ibmtraining.domain.Room;

public class RoomJdbcDaoImpl implements RoomDao {

	private static RoomJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public RoomJdbcDaoImpl getInstance() {

		RoomJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new RoomJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private RoomJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:ROOM");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createRoomTable();
		insertInitRooms();

	}

	private void createRoomTable() {
		String createSql = "CREATE TABLE ROOMS " + "(id INTEGER IDENTITY PRIMARY KEY, " 
												 + " roomtype VARCHAR(255), "
												 + " price DECIMAL(14,2))";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitRooms() {

		BigDecimal juniorPrice = new BigDecimal("1500.00");
		BigDecimal royalPrice = new BigDecimal("2100.00");
		BigDecimal familyPrice = new BigDecimal("2500.00");
		BigDecimal plazaPrice = new BigDecimal("3000.00");
		BigDecimal presidentialPrice = new BigDecimal("5000.00");
		add(new Room("Junior Suite",juniorPrice));
		add(new Room("Royal Suite",royalPrice));
		add(new Room("Family Suite",familyPrice));
		add(new Room("Plaza Suite",plazaPrice));
		add(new Room("Presidential Suite",presidentialPrice));
	}

	@Override
	public List<Room> findAll() {

		return findByRoomType(null);
	}

	@Override
	public Room find(Long id) {

		Room room = null;

		if (id != null) {
			String sql = "SELECT id, roomtype, price FROM ROOMS where id = ?";
			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

				ps.setInt(1, id.intValue());
				ResultSet results = ps.executeQuery();

				if (results.next()) {
					room = new Room(Long.valueOf(results.getInt("id")), 
												 results.getString("roomtype"),
												 results.getBigDecimal("price"));
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		return room;
	}

	@Override
	public List<Room> findByRoomType(String roomType) {
		List<Room> rooms = new ArrayList<>();

		String sql = "SELECT id, roomtype, price FROM ROOMS WHERE roomtype LIKE ? ";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(roomType));
			ResultSet results = ps.executeQuery();

			while (results.next()) {
				Room room = new Room(Long.valueOf(
						results.getInt("id")), 
						results.getString("roomtype"),
						results.getBigDecimal("price"));
				rooms.add(room);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return rooms;
	}

	private String createSearchValue(String string) {
		
		String value;
		
		if (StringUtils.isBlank(string)) {
			value = "%";
		} else {
			value = string;
		}
		
		return value;
	}
	
	@Override
	public void add(Room room) {
		
		String insertSql = "INSERT INTO ROOMS (roomtype, price) VALUES (?, ?)";
		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, room.getRoomType());
			ps.setBigDecimal(2, room.getPrice());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void update(Room room) {
		String updateSql = "UPDATE rooms SET roomtype = ?, price = ? WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setString(1, room.getRoomType());
			ps.setBigDecimal(2, room.getPrice());
			ps.setLong(3, room.getId());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void delete(Long id) {
		String updateSql = "DELETE FROM rooms WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setLong(1, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

}