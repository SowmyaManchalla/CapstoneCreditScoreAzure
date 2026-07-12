package com.creditscore.Dto;

public class DashboardResponse {
	
	private long totalCustomers;
	private long totalCreditScores;
	private long totalCreditHistory;
	private long totalAuditLogs;
	
	public DashboardResponse(long totalCustomers, long totalCreditScores,long totalCreditHistory,long totalAuditLogs)
	{
		this.totalCustomers = totalCustomers;
		this.totalCreditScores = totalCreditScores;
		this.totalCreditHistory = totalCreditHistory;
		this.totalAuditLogs = totalAuditLogs;
	}
	
		public long getTotalCustomers()
		{
			return totalCustomers;
			
	}
		public long getTotalCreditScores()
		{
			return totalCreditScores;
		}
		
		public long getTotalCreditHistory()
		{
			return totalCreditHistory;
		}
		public long getTotalAuditLogs()
		{
			return totalAuditLogs;
		}

	}

