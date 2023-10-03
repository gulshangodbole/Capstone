package com.example.loanapplication.repositories;

import com.example.loanapplication.models.Support;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportRepository extends JpaRepository<Support, Integer> {
    Support findByStatus(String status);
}
