package com.creditscore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.creditscore.entity.CustomerProfile;

public interface CustomerProfileRepository extends JpaRepository<CustomerProfile,Long>{

	Optional<CustomerProfile> findByEmail(String email);
}
