package com.creditscore.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class CreditScore {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long scoreId;
	private Integer score;
	private String riskCategory;
	private LocalDateTime generatedDate;
	
	@OneToOne
	@JoinColumn(name ="customer_id")
	@JsonBackReference("score-ref")
	private CustomerProfile customer;
	
	
	public void setCustomer(CustomerProfile customer)
	{
		this.customer = customer;
	}
	public CreditScore()
	{
		
	}
	public Long getScoreId() {
		return scoreId;
	}
	public void setScoreId(Long scoreId) {
		this.scoreId = scoreId;
	}
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
	}
	public String getRiskCategory() {
		return riskCategory;
	}
	public void setRiskCategory(String riskCategory) {
		this.riskCategory = riskCategory;
	}
	public LocalDateTime getGeneratedDate() {
		return generatedDate;
	}
	public void setGeneratedDate(LocalDateTime generatedDate) {
		this.generatedDate = generatedDate;
	}
	
}
