package com.monitor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

    @Autowired
    private MonitorService monitorService;

    // Runs every 30 seconds automatically
    @Scheduled(fixedRate = 30000)
    public void scheduledHealthCheck() {
        System.out.println("Running scheduled health check for all services...");
        monitorService.checkAllServices();
    }
}