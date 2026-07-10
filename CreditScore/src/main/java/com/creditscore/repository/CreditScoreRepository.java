package com.creditscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.creditscore.entity.CreditScore;

public interface CreditScoreRepository extends JpaRepository<CreditScore,Long> {

	
	CreditScore findByCustomer_CustomerId(Long customerId);
	
		@Modifying
		@Query("DELETE from CreditScore c where c.customer.customerId = :customerId")
		void deleteByCustomerId(@Param("customerId") Long customerId);

	}
