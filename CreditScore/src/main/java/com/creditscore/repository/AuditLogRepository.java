package com.creditscore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditscore.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog,Long>{

	List<AuditLog> findByCustomer_CustomerId(Long customerId);
}
