package com.monitor.controller;

import com.monitor.dto.ServiceRequest;
import com.monitor.model.MonitoredService;
import com.monitor.service.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private MonitorService monitorService;

    // GET all services
    @GetMapping
    public ResponseEntity<List<MonitoredService>> getAllServices() {
        return ResponseEntity.ok(monitorService.getAllServices());
    }

    // POST register a new service
    @PostMapping
    public ResponseEntity<MonitoredService> addService(@RequestBody ServiceRequest request) {
        return ResponseEntity.ok(monitorService.addService(request));
    }

    // DELETE a service
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {
        monitorService.deleteService(id);
        return ResponseEntity.ok("Service deleted successfully");
    }

    // GET manually trigger health check for one service
    @GetMapping("/{id}/check")
    public ResponseEntity<MonitoredService> checkHealth(@PathVariable Long id) {
        return ResponseEntity.ok(monitorService.checkHealth(id));
    }

    // GET all services filtered by status
    @GetMapping("/status")
    public ResponseEntity<List<MonitoredService>> getAllServices(
            @RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(monitorService.getAllServices()
                    .stream()
                    .filter(s -> s.getStatus().equalsIgnoreCase(status))
                    .toList());
        }
        return ResponseEntity.ok(monitorService.getAllServices());
    }
}