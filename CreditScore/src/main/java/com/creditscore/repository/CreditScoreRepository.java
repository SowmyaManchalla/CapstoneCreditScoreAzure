package com.creditscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditscore.entity.CreditScore;

public interface CreditScoreRepository extends JpaRepository<CreditScore,Long> {
	
	CreditScore findByCustomer_CustomerId(Long customerId);

}
