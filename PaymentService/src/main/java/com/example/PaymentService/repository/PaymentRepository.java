package com.example.PaymentService.repository;

import com.example.PaymentService.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    List<Payment> findAllByCustId(int custId);

    List<Payment> findAllByLoanId(int loanId);

}
