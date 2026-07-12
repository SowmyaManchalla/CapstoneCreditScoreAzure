package com.creditscore.service;

import java.util.List;

import com.creditscore.entity.AuditLog;
import com.creditscore.entity.CreditHistory;
import com.creditscore.entity.CreditScore;
import com.creditscore.entity.CustomerProfile;

public interface CustomerService {
	
	CustomerProfile saveCustomerProfile(CustomerProfile customerProfile);
	CustomerProfile getCustomerProfile(Long customerId);
	CustomerProfile updateCustomerProfile(Long customerId, CustomerProfile customerProfile);
	List<CustomerProfile> getAllCustomerProfiles();
	
	
	void deleteCustomerProfile(Long customerId);
	
	CreditHistory saveCreditHistory(CreditHistory creditHistory, Long customerId);
	CreditHistory getCreditHistoryByCustomerId(Long customerId);
	CreditHistory updateCreditHistory(Long historyId, CreditHistory creditHistory);
	List<CreditHistory> findAllCreditHistory();
	List<CreditScore> getAllScores();
	
	CreditScore getCreditScore(Long scoreId);
	CreditScore generateCreditScore(Long customerId);
	
	AuditLog saveAuditLog(AuditLog auditLog);
	
	List<AuditLog> getAuditLogs();
	List<AuditLog> getAuditLogsByCustomerId(Long customerId);

}
