package com.ibmtraining.dao;
import java.sql.Date;
import java.util.List;
import com.ibmtraining.domain.Guest;

public interface GuestDao {
	
	public List<Guest> findAll();
	
	public Guest find(Long id);
	
	public List<Guest> findByName(String firstName, String middleName, String lastName, String birthDate);
	
	public void add(Guest guest);
	
	public void update(Guest guest);
	
	public void delete(Long id);

}
