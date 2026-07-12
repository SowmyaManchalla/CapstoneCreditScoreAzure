package com.creditscore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.creditscore.Dto.ReportResponse;
import com.creditscore.repository.CreditScoreRepository;
import com.creditscore.repository.CustomerProfileRepository;
import com.creditscore.entity.CustomerProfile;
import com.creditscore.entity.CreditScore;

@Service
public class ReportService {
	
	@Autowired
	private CustomerProfileRepository customerProfileRepository;
	
	@Autowired
	private CreditScoreRepository creditScoreRepository;
	
	public ReportResponse getReportByCustomerId(Long customerId)
	{
		CustomerProfile customer = customerProfileRepository.findById(customerId).orElseThrow(()->
		new RuntimeException("Customer not found"));
		
		CreditScore creditScore = creditScoreRepository.findById(customerId).orElseThrow(()->
		new RuntimeException("Credit score not found"));
		
		String name = customer.getFirstName() + " " +customer.getLastName();
		
		String riskCategory;
		
		if(creditScore.getScore()>= 750)
		{
			riskCategory = "LOW RISK";
		}
		else if(creditScore.getScore()>=600)
		{
			riskCategory = "MEDIUM RISK";
		}
		else
		{
			riskCategory = "HIGH RISK";
		}
		
		return new ReportResponse(customerId,name,creditScore.getScore(),riskCategory);
				}
	}