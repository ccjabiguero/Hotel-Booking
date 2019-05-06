package com.ibmtraining.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hsqldb.jdbc.JDBCDataSource;

import com.ibmtraining.domain.Booking;

public class BookingJdbcDaoImpl implements BookingDao {

	private static BookingJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public BookingJdbcDaoImpl getInstance() {

		BookingJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new BookingJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private BookingJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:BOOKING");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createBookingTable();
		insertInitBookings();

	}

	private void createBookingTable() {
		String createSql = "CREATE TABLE BOOKINGS " + "(id INTEGER IDENTITY PRIMARY KEY, " 
												  + " guests VARCHAR(255), "
												  + " roomId VARCHAR(255), "
												  + " checkIn VARCHAR(255), "
												  + " checkOut VARCHAR(255), "
												  + " totalPrice VARCHAR(255)) ";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitBookings() {

		add(new Booking("guests1....","roomId.....", "checkIn....", "checkOut....", "totalPrice....."));
		add(new Booking("guests2....","roomId.....", "checkIn....", "checkOut....", "totalPrice....."));
		add(new Booking("guests3....","roomId.....", "checkIn....", "checkOut....", "totalPrice....."));
	}

	@Override
	public List<Booking> findAll() {

		return findByAvailRooms(null, null);
	}

	@Override
	public Booking find(Long id) {

		Booking booking = null;

		if (id != null) {
			String sql = "SELECT id, guests,roomId, checkIn, checkOut, totalPrice FROM BOOKINGS where id = ?";
			try (Connection conn = dataSource.getConnection(); 
				PreparedStatement ps = conn.prepareStatement(sql)) {

				ps.setInt(1, id.intValue());
				ResultSet results = ps.executeQuery();

				if (results.next()) {
					booking = new Booking(Long.valueOf(results.getInt("id")), 
													results.getString("guests"),
													results.getString("roomId"),
													results.getString("checkIn"),
													results.getString("checkOut"),
													results.getString("totalPrice"));
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		return booking;
	}

	@Override
	public List<Booking> findByAvailRooms(String checkIn,  String checkOut) {
		List<Booking> bookings = new ArrayList<>();

		String sql = "SELECT id, guests, roomId, checkIn, checkOut, totalPrice FROM BOOKINGS WHERE checkIn LIKE ? AND checkOut LIKE ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(checkIn));
			ps.setString(2, createSearchValue(checkOut));
			
			ResultSet results = ps.executeQuery();

			while (results.next()) {
				Booking booking = new Booking(Long.valueOf(
						results.getInt("id")), 
						results.getString("guests"),
						results.getString("roomId"),
						results.getString("checkIn"),
						results.getString("checkOut"),
						results.getString("totalPrice"));
				bookings.add(booking);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return bookings;
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
	public void add(Booking booking) {
		
		String insertSql = "INSERT INTO BOOKINGS (guests, roomId, checkIn, checkOut, totalPrice) VALUES (?, ?, ?, ?, ?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, booking.getGuests());
			ps.setString(2, booking.getRoomId());
			ps.setString(3, booking.getCheckIn());
			ps.setString(4, booking.getCheckOut());
			ps.setString(5, booking.getTotalPrice());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void update(Booking booking) {
		String updateSql = "UPDATE bookings SET guests = ?, roomId = ?, checkIn = ?, checkOut = ?, totalPrice = ? WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); 
			PreparedStatement ps = conn.prepareStatement(updateSql)) {
				ps.setString(1, booking.getGuests());
				ps.setString(2, booking.getRoomId());
				ps.setString(3, booking.getCheckIn());
				ps.setString(4, booking.getCheckOut());
				ps.setString(5, booking.getTotalPrice());
				ps.setLong(6, booking.getId());
				ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void delete(Long id) {
		String updateSql = "DELETE FROM BOOKINGS WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); 
			PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setLong(1, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

}