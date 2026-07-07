package com.creditscore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditscore.entity.CreditHistory;

public interface CreditHistoryRepository extends JpaRepository<CreditHistory,Long>{

	CreditHistory findByCustomer_CustomerId(Long customerId);
}
