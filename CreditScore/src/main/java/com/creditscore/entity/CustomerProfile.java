package com.creditscore.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
public class CustomerProfile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long customerId;
	
	@NotBlank(message = "Name is required")
	private String firstName;
	private String lastName;
	
	@Email(message = "Invalid email format")
	private String email;
	private String mobile;
	private String occupation;
	private String monthlyIncome;
	private Integer employmentYears;
	
	@OneToOne(fetch=FetchType.LAZY,mappedBy = "customer")
	@JsonManagedReference
	private CreditHistory creditHistory;
	
	@OneToOne(fetch=FetchType.LAZY,mappedBy = "customer")
	@JsonManagedReference
	private CreditScore creditScore;
	
	public CustomerProfile()
	{
		
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getMonthlyIncome() {
		return monthlyIncome;
	}

	public void setMonthlyIncome(String monthlyIncome) {
		this.monthlyIncome = monthlyIncome;
	}

	public Integer getEmploymentYears() {
		return employmentYears;
	}

	public void setEmploymentYears(Integer employmentYears) {
		this.employmentYears = employmentYears;
	}
	


}
