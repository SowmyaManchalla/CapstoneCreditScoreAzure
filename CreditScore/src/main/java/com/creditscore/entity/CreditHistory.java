package com.creditscore.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class CreditHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long historyId;
	private Integer totalLoans;
	private Integer activeLoans;
	private Integer latePayments;
	private Integer defaults;
	private Double creditCardUsage;
	
	@OneToOne
	@JoinColumn(name="customer_id", updatable = false, nullable = false)
	@JsonBackReference
	@JsonIgnore
	private CustomerProfile customer;
	
	public CreditHistory()
	{
		
	}

	public void setCustomer(CustomerProfile customer)
	{
		this.customer=customer;
	}
	public CustomerProfile getCustomer()
	{
		return this.customer;
	}
	public Long getHistoryId() {
		return historyId;
	}

	public void setHistoryId(Long historyId) {
		this.historyId = historyId;
	}

	public Integer getTotalLoans() {
		return totalLoans;
	}

	public void setTotalLoans(Integer totalLoans) {
		this.totalLoans = totalLoans;
	}

	public Integer getActiveLoans() {
		return activeLoans;
	}

	public void setActiveLoans(Integer activeLoans) {
		this.activeLoans = activeLoans;
	}

	public Integer getLatePayments() {
		return latePayments;
	}

	public void setLatePayments(Integer latePayments) {
		this.latePayments = latePayments;
	}

	public Integer getDefaults() {
		return defaults;
	}

	public void setDefaults(Integer defaults) {
		this.defaults = defaults;
	}

	public Double getCreditCardUsage() {
		return creditCardUsage;
	}

	public void setCreditCardUsage(Double creditCardUsage) {
		this.creditCardUsage = creditCardUsage;
	}
	

}
