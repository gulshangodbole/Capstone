package com.example.loanapplication.repositories;

import com.example.loanapplication.models.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {
    Loan findByCustId(int custId);

    Loan findByStatus(String status);
}
