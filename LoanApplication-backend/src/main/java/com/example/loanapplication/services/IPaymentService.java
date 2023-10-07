package com.example.loanapplication.services;

import com.example.loanapplication.models.Payment;

import java.util.List;

public interface IPaymentService {
    List<Payment> getAllPayments();

    List<Payment> getPaymentByCustId(int custId);


    Payment getPaymentById(int paymentId);

    Payment createPayment(Payment payment);

    List<Payment> getPaymentByLoanId(int loanId);
}
