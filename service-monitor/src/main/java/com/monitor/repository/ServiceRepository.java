package com.monitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.monitor.model.MonitoredService;

@Repository
public interface ServiceRepository extends JpaRepository<MonitoredService, Long> {

}