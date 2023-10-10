package com.example.SupportService.repository;

import com.example.SupportService.entity.Support;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportRepository extends JpaRepository<Support, Integer> {
    Support findByStatus(String status);
}

