package com.example.loanapplication.repositories;


import com.example.loanapplication.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    List<Payment> findAllByCustId(int custId);

    List<Payment> findAllByLoanId(int loanId);

}
