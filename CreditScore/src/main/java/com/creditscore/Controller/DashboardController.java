package com.creditscore.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.creditscore.Dto.DashboardResponse;
import com.creditscore.service.DashboardService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")

public class DashboardController {
	
	@Autowired
	private DashboardService dashboardService;
	
	
	@GetMapping("/dashboard")
	public DashboardResponse getDashboard()
	{
		return dashboardService.getDashboardData();
	}

}
