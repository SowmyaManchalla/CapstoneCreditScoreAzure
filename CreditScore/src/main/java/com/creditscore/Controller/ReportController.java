package com.creditscore.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditscore.Dto.ReportResponse;
import com.creditscore.service.ReportService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/reports")
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	@GetMapping("/customer/{id}")
	public ReportResponse getCustomerReport(@PathVariable Long id)
	{
		System.out.println("Report request received for ID:"+id);
		return reportService.getReportByCustomerId(id);
	}
}
