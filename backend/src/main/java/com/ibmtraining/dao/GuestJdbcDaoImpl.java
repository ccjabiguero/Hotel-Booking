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

import com.ibmtraining.domain.Guest;

public class GuestJdbcDaoImpl implements GuestDao {

	private static GuestJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public GuestJdbcDaoImpl getInstance() {

		GuestJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new GuestJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private GuestJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:GUEST");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createGuestTable();
		insertInitGuests();

	}

	private void createGuestTable() {
		String createSql = "CREATE TABLE GUESTS " + "(id INTEGER IDENTITY PRIMARY KEY, " 
												  + " firstname VARCHAR(255), "
												  + " middlename VARCHAR(255), "
												  + " lastname VARCHAR(255), "
												  + " birthdate VARCHAR(255)) ";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	private void insertInitGuests() {
		Date d1, d2, d3, d4;
		d1 = Date.valueOf("1997-10-30");
		d2 = Date.valueOf( "1998-07-28");
		d3 = Date.valueOf( "2008-12-21");
		d4 = Date.valueOf("2005-05-04");
		
		add(new Guest("Catherine","Cobarrubias", "Jabiguero",d1 ));
		add(new Guest("Karl Neumann","Barnes", "Magno",d2));
		add(new Guest("Jamir","Cobarrubias", "Jabiguero",d3));
		add(new Guest("Franzine","Cobarrubias", "Jabiguero",d4 ));
	}

	@Override
	public List<Guest> findAll() {

		return findByName(null, null);
	}

	@Override
	public Guest find(Long id) {

		Guest guest = null;

		if (id != null) {
			String sql = "SELECT id, firstname,middlename, lastname, birthdate FROM GUESTS where id = ?";
			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

				ps.setInt(1, id.intValue());
				ResultSet results = ps.executeQuery();

				if (results.next()) {
					guest = new Guest(Long.valueOf(results.getInt("id")), 
													results.getString("firstname"),
													results.getString("middlename"),
													results.getString("lastname"),
													results.getDate("birthdate"));
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		return guest;
	}

	@Override
	public List<Guest> findByName(String firstName,  String lastName) {
		List<Guest> guests = new ArrayList<>();

		String sql = "SELECT id, firstname, middlename, lastname, birthdate FROM GUESTS WHERE firstname LIKE ? AND lastname LIKE ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(firstName));
			ps.setString(2, createSearchValue(lastName));
			
			ResultSet results = ps.executeQuery();

			while (results.next()) {
				Guest guest = new Guest(Long.valueOf(
						results.getInt("id")), 
						results.getString("firstname"),
						results.getString("middlename"),
						results.getString("lastname"),
						results.getDate("birthdate"));
				guests.add(guest);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return guests;
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
	public void add(Guest guest) {
		
		String insertSql = "INSERT INTO GUESTS (firstname, middlename, lastname, birthdate) VALUES (?, ?, ?, ?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, guest.getFirstName());
			ps.setString(2, guest.getMiddleName());
			ps.setString(3, guest.getLastName());
			ps.setDate(4, guest.getBirthDate());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void update(Guest guest) {
		String updateSql = "UPDATE guests SET firstname = ?, middlename = ?, lastname = ?, birthdate = ? WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); 
			PreparedStatement ps = conn.prepareStatement(updateSql)) {
				ps.setString(1, guest.getFirstName());
				ps.setString(2, guest.getMiddleName());
				ps.setString(3, guest.getLastName());
				ps.setDate(4, guest.getBirthDate());
				ps.setLong(5, guest.getId());
				ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void delete(Long id) {
		String updateSql = "DELETE FROM GUESTS WHERE id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setLong(1, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

}