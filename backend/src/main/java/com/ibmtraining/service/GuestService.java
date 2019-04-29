package com.ibmtraining.service;

import java.sql.Date;
import java.util.List;

import com.ibmtraining.domain.Guest;

public interface GuestService {

	public List<Guest> findAll();
	
	public Guest find(Long id);
	
	public List<Guest> findByName(String firstName, String lastName);
	
	public void add(Guest guest);
	
	public void upsert( Guest guest);
	
	public void delete(Long id);

}