package com.creditscore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.creditscore.entity.CreditHistory;

@Repository
public interface CreditHistoryRepository extends JpaRepository<CreditHistory,Long>{
	

  // CreditHistory findByCustomer_CustomerId(Long customerId);

	@Modifying
	@Query("DELETE from CreditHistory c where c.customer.customerId = :customerId")
	void deleteByCustomerId(@Param("customerId") Long customerId);
}
