package com.creditscore.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class AuditLog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long logId;
	private String action;
	private LocalDateTime actionTime;
	
	@ManyToOne
	@JoinColumn(name ="customer_id")
	@JsonBackReference
	private CustomerProfile customer;
	
	public AuditLog()
	{
		
	}
	public Long getLogId() {
		return logId;
	}
	public void setLogId(Long logId) {
		this.logId = logId;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public LocalDateTime getActionTime() {
		return actionTime;
	}
	public void setActionTime(LocalDateTime actionTime) {
		this.actionTime = actionTime;
	}
	
}
