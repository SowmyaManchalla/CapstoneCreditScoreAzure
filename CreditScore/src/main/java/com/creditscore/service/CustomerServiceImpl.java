package com.creditscore.service;

import java.util.List;
import java.lang.RuntimeException;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.creditscore.entity.AuditLog;
import com.creditscore.entity.CreditHistory;
import com.creditscore.entity.CreditScore;
import com.creditscore.entity.CustomerProfile;
import com.creditscore.repository.AuditLogRepository;
import com.creditscore.repository.CreditHistoryRepository;
import com.creditscore.repository.CreditScoreRepository;
import com.creditscore.repository.CustomerProfileRepository;

import jakarta.transaction.Transactional;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerProfileRepository customerProfileRepository;
	
	@Autowired
	private CreditHistoryRepository creditHistoryRepository;
	
	@Autowired
	private CreditScoreRepository creditScoreRepository;
	
	@Autowired
	private AuditLogRepository auditLogRepository;
	
	@Override
	public CustomerProfile saveCustomerProfile(CustomerProfile customerProfile)
	{
	
		return customerProfileRepository.save(customerProfile);
	}
	

	@Override
	public CustomerProfile getCustomerProfile(Long customerId)
	{
		Optional<CustomerProfile> customer = customerProfileRepository.findById(customerId);
		
		return customer.orElse(null);
	}
	
	@Override
	public CustomerProfile updateCustomerProfile(Long customerId, CustomerProfile customerProfile)
	{
		customerProfile.setCustomerId(customerId);
		
		return customerProfileRepository.save(customerProfile);
	}

	@Transactional
	@Override
	public void deleteCustomerProfile(Long customerId)
	{
		if(!customerProfileRepository.existsById(customerId))
		{
			throw new RuntimeException("Profile already deleted");
		}
		creditHistoryRepository.deleteByCustomerId(customerId);
		creditScoreRepository.deleteByCustomerId(customerId);
		
		customerProfileRepository.deleteById(customerId);
		
	}
	
	@Override
	public List<CustomerProfile> getAllCustomerProfiles()
	{
		return customerProfileRepository.findAll();
	}
	
	@Override
	public List<CreditHistory> findAllCreditHistory()
	{
		return creditHistoryRepository.findAll();
	}
	
	@Override
	public List<CreditScore> getAllScores()
	{
		return creditScoreRepository.findAll();
	}
	
	@Override
	public CreditHistory saveCreditHistory(CreditHistory creditHistory, Long customerId)
	{
		CustomerProfile customer = customerProfileRepository.findById(customerId)
				.orElseThrow(()-> new RuntimeException("Customer not found"));
		
		creditHistory.setCustomer(customer);
		return creditHistoryRepository.save(creditHistory);
	}
	@Transactional
	@Override
	public CreditHistory updateCreditHistory(Long id,CreditHistory incomingData)
	{
		
		CreditHistory existingRecord = creditHistoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Record not found"+id));
		
		/*System.out.println("Existing customer:" + existingRecord.getCustomer());
		if(existingRecord.getCustomer()!= null)
		{
			System.out.println("Customer ID:"+ existingRecord.getCustomer().getCustomerId());
		}
		existingRecord.getCustomer().getCustomerId();*/
		
		existingRecord.setTotalLoans(incomingData.getTotalLoans());
		existingRecord.setActiveLoans(incomingData.getActiveLoans());
		existingRecord.setLatePayments(incomingData.getLatePayments());
		existingRecord.setDefaults(incomingData.getDefaults());
		existingRecord.setCreditCardUsage(incomingData.getCreditCardUsage());
		
		if(incomingData.getCustomer()!=null)
		{
			existingRecord.setCustomer(incomingData.getCustomer());
		}
		
		
		return 
				creditHistoryRepository.save(existingRecord);
	
	}
	
	@Override
	public CreditHistory getCreditHistoryByCustomerId(Long historyId)
	{
		Optional<CreditHistory> history = creditHistoryRepository.findById(historyId);
		
		return history.orElse(null);
	}
	
	
	
	@Override
	public CreditScore getCreditScore(Long scoreId)
	{
		Optional<CreditScore> score = creditScoreRepository.findById(scoreId);
		
		return score.orElse(null);
	}
	
	@Override 
	public CreditScore generateCreditScore(Long customerId)
	{
		
		CustomerProfile customer = customerProfileRepository.findById(customerId)
		.orElseThrow(()-> new RuntimeException("Customer not found"));
		
		
		CreditHistory history = creditHistoryRepository.findByCustomer_CustomerId(customerId);
		
		if(history == null)
		{
			throw new RuntimeException("Credit History not found for Customer:" + customerId);
		}
		
		CreditScore creditScore  = new CreditScore();
		
		int score = 850;
		
		//Late payment penalty 
		score -= history.getLatePayments()*20;
		
		//Defaults penalty
		score -= history.getDefaults()*50;
		
		//Active Loan penalty
		score -=history.getActiveLoans()*10;
		
		//Credit card usage penalty
		if(history.getCreditCardUsage()>80)
		{
			score -=50;
		}
		else if(history.getCreditCardUsage()>50)
		{
			score -=20;
		}
		
		//Minimum score
		if(score<300)
		{
			score =300;
		}
		creditScore.setScore(score);
	
		//Risk category
		if(score>=850)
		{
			creditScore.setRiskCategory("Excellent");
		}
		else if (score>=700)
		{
			creditScore.setRiskCategory("Good");
		}
		else if(score>=600)
		{
			creditScore.setRiskCategory("Average");
		}
		else
		{
			creditScore.setRiskCategory("High risk");
		}
		
		creditScore.setGeneratedDate(LocalDateTime.now());
		creditScore.setCustomer(history.getCustomer());
		return creditScoreRepository.save(creditScore);
	}
	
	@Override
	public AuditLog saveAuditLog(AuditLog auditLog)
	{
		auditLog.setActionTime(LocalDateTime.now());
		return auditLogRepository.save(auditLog);
	}
	@Override
	public List<AuditLog> getAuditLogs()
	{
		return auditLogRepository.findAll();
	}


	@Override
	public List<AuditLog> getAuditLogsByCustomerId(Long customerId) {
		// TODO Auto-generated method stub
		return auditLogRepository.findByCustomer_CustomerId(customerId);
	}
	
	
}
