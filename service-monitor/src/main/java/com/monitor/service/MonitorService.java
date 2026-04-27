package com.monitor.service;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.monitor.dto.ServiceRequest;
import com.monitor.model.MonitoredService;
import com.monitor.repository.ServiceRepository;

@Service
public class MonitorService {

    @Autowired
    private ServiceRepository serviceRepository;

    // Get all services
    public List<MonitoredService> getAllServices() {
        return serviceRepository.findAll();
    }

    // Register a new service
    public MonitoredService addService(ServiceRequest request) {
        MonitoredService service = new MonitoredService();
        service.setName(request.getName());
        service.setUrl(request.getUrl());
        service.setDescription(request.getDescription());
        service.setStatus("UNKNOWN");
        return serviceRepository.save(service);
    }

    // Delete a service
    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }

    // Check health of a single service manually
    public MonitoredService checkHealth(Long id) {
        MonitoredService service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found"));
        return pingAndUpdate(service);
    }

    // Called by scheduler — ping all services
    public void checkAllServices() {
        List<MonitoredService> services = serviceRepository.findAll();
        for (MonitoredService service : services) {
            pingAndUpdate(service);
        }
    }

    // Core ping logic
    private MonitoredService pingAndUpdate(MonitoredService service) {
        long start = System.currentTimeMillis();
        try {
            URL url = new URL(service.getUrl());
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(2000); // 2 seconds timeout
            connection.setReadTimeout(2000);
            connection.connect();

            int responseCode = connection.getResponseCode();
            long responseTime = System.currentTimeMillis() - start;

            if (responseCode >= 200 && responseCode < 300) {
                if (responseTime > 1500) {
                    service.setStatus("DEGRADED"); // slow response
                } else {
                    service.setStatus("UP");
                }
            } else {
                service.setStatus("DOWN");
            }
            service.setResponseTime(responseTime);
            connection.disconnect();

        } catch (Exception e) {
            service.setStatus("DOWN");
            service.setResponseTime(null);
        }

        service.setLastChecked(LocalDateTime.now());
        return serviceRepository.save(service);
    }
}