package com.creditscore.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditscore.entity.AuditLog;
import com.creditscore.entity.CreditHistory;
import com.creditscore.entity.CreditScore;
import com.creditscore.entity.CustomerProfile;
import com.creditscore.service.CustomerService;

@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/profile")
	/*public CustomerProfile saveCustomerProfile(@Valid @RequestBody CustomerProfile customerProfile)
	{
		return customerService.saveCustomerProfile(customerProfile);
	}
	*/
	
	public ResponseEntity<?> saveCustomerProfile(@Valid @RequestBody CustomerProfile customerProfile)
	{
		try
		{
			CustomerProfile savedProfile = customerService.saveCustomerProfile(customerProfile);
			return new ResponseEntity<> (savedProfile, HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>("Error creating profile:" +e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping("/profile/{id}")
	public CustomerProfile getCustomerProfile(@PathVariable Long id)
	{
		return customerService.getCustomerProfile(id);
	}
	@PutMapping("/profile/{id}")
	public CustomerProfile updateCustomerProfile(@PathVariable Long id, @RequestBody CustomerProfile customerProfile)
	{
		return customerService.updateCustomerProfile(id, customerProfile);
	}
	@DeleteMapping("/profile/{id}")
	public String deleteCustomerProfile(@PathVariable Long id)
	{
		customerService.deleteCustomerProfile(id);
		
		return "Customer Profile deleted successfully";
	}
	
	@PostMapping("/{id}/history")
	public CreditHistory saveCreditHistory(@RequestBody CreditHistory creditHistory,@PathVariable Long id)
	{
	    return customerService.saveCreditHistory(creditHistory,id);
	}

	@GetMapping("/history/{id}")
	
	public CreditHistory getCreditHistory(@PathVariable Long id)
	{
		return customerService.getCreditHistory(id);
	}
	
	@PutMapping("/history/{id}")
	public CreditHistory updateCreditHistory(@PathVariable Long id,@RequestBody CreditHistory creditHistory)
	{
		return customerService.updateCreditHistory(id, creditHistory);
	}
	
	
	@PostMapping("/generate-score/{id}")
	/*public CreditScore generateCreditScore(@PathVariable Long id)
	{
		return customerService.generateCreditScore(id);
	}*/
	
	public ResponseEntity<?> generateScore(@PathVariable("id") Long id)
	{
		try
		{
			var result = customerService.generateCreditScore(id);
			return ResponseEntity.ok(result);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
		
		
	}
	
	@GetMapping("/score/{id}")
	public CreditScore getCreditScore(@PathVariable Long id)
	{
		return customerService.getCreditScore(id);
	}
	@PostMapping("/audit-log")
	public AuditLog saveAuditLog
	(@RequestBody AuditLog auditLog)
	{
		return customerService.saveAuditLog(auditLog);
	}
	
	@GetMapping("/audit-logs")
	public List<AuditLog> getAuditLogs()
	{
		return customerService.getAuditLogs();
	}
}
