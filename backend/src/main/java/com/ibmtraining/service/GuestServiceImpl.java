package com.ibmtraining.service;
import java.sql.Date;
import java.util.List;

import javax.ws.rs.PathParam;

import org.apache.commons.lang3.StringUtils;

import com.ibmtraining.dao.GuestDao;
import com.ibmtraining.dao.GuestJdbcDaoImpl;
import com.ibmtraining.domain.Guest;

public class GuestServiceImpl implements GuestService{
	
	GuestDao guestDao;

	public GuestServiceImpl() {
		this.guestDao = GuestJdbcDaoImpl.getInstance();
		
	}
	
	@Override
	public List<Guest> findAll() {
		return guestDao.findAll();
	}

	@Override
	public Guest find(Long id) {
		return guestDao.find(id);
	}

	@Override
	public List<Guest> findByName(String firstName, String middleName, String lastName, String birthDate) {
		return guestDao.findByName(firstName, middleName, lastName, birthDate);
	}

	@Override
	public void add(Guest guest) {
		if (validate(guest)) {
			System.out.println("add guest");
			guestDao.add(guest);
		} else {
			throw new IllegalArgumentException("Fields firstName and lastName cannot be blank.");
		}
	}

	@Override
	public void upsert(Guest guest) {
		if (validate(guest)) {
			if(guest.getId() != null && guest.getId() >= 0) {
				System.out.println("update guest");
				guestDao.update(guest);
				
			} else {
				System.out.println("add guest");
				guestDao.add(guest);
			}
		} else {
			throw new IllegalArgumentException("Fields firstName and lastName cannot be blank.");
		}
	}
	
	@Override
	public void delete(Long id) {
		System.out.println("Guest ID "+ id +" deleted");
		guestDao.delete(id);
	}
	
	private boolean validate(Guest guest) {
		return !StringUtils.isAnyBlank(guest.getFirstName(), guest.getLastName());
	}

}