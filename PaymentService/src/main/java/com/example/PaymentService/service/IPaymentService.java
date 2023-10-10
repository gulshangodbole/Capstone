package com.example.PaymentService.service;

import com.example.PaymentService.entity.Payment;

import java.util.List;

public interface IPaymentService {
    List<Payment> getAllPayments();

    List<Payment> getPaymentByCustId(int custId);


    Payment getPaymentById(int paymentId);

    Payment createPayment(Payment payment);

    List<Payment> getPaymentByLoanId(int loanId);
}