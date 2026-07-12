package com.creditscore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.creditscore.Dto.DashboardResponse;
import com.creditscore.repository.AuditLogRepository;
import com.creditscore.repository.CreditHistoryRepository;
import com.creditscore.repository.CreditScoreRepository;
import com.creditscore.repository.CustomerProfileRepository;

@Service
public class DashboardService {
	
	@Autowired
	private CustomerProfileRepository customerProfileRepository;
	
	@Autowired
	private CreditScoreRepository creditScoreRepository;
	
	@Autowired
	private CreditHistoryRepository creditHistoryRepository;
	
	@Autowired
	private AuditLogRepository auditLogRepository;
	
	public DashboardResponse getDashboardData()
	{
		long totalCustomers = customerProfileRepository.count();
		
		long totalScores = creditScoreRepository.count();
		
		long totalHistory = creditHistoryRepository.count();
		
		long totalLogs = auditLogRepository.count();
		
		return new DashboardResponse
			(totalCustomers, totalScores, totalHistory,totalLogs);
	}
}

	
	


