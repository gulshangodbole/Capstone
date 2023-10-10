package com.example.LoanService.repository;

import com.example.LoanService.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {
    List<Loan> findAllByCustId(int custId);

    List<Loan> findAllByStatus(String status);
}
