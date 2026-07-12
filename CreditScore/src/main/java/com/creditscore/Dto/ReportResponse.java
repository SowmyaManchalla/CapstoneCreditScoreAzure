package com.creditscore.Dto;

public class ReportResponse {
	
	private Long customerId;
	private String customerName;
	private Integer creditScore;
	private String riskCategory;
	
	public ReportResponse(Long customerId, String customerName, Integer creditScore, String riskCategory)
	{
		this.customerId = customerId;
		this.customerName = customerName;
		this.creditScore = creditScore;
		this.riskCategory = riskCategory;
	}
	
	public Long getCustomerId()
	{
		return customerId;
	}
	
	public String getCustomerName()
	{
		return customerName;
	}
	
	public Integer getCreditScore()
	{
		return creditScore;
	}
	public String getRiskCategory()
	{
		return riskCategory;
	}

}
