package com.ibmtraining.domain;

import java.sql.Date;

public class Guest {

	Long id;
	private String firstName;
	private String middleName;
	private String lastName;
	private String birthDate;
	
	public Guest() {
		
	}
	
	public Guest(String firstName, String middleName, String lastName, String birthDate) {
		this(null, firstName,middleName, lastName,birthDate);
	}

	public Guest(Long id, String firstName, String middleName, String lastName, String birthDate) {
		this.id = id;
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.birthDate = birthDate;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	
}