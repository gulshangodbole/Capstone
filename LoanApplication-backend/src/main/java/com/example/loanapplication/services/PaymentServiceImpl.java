package com.example.loanapplication.services;

import com.example.loanapplication.models.Loan;
import com.example.loanapplication.models.Payment;
import com.example.loanapplication.repositories.PaymentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements IPaymentService{

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private LoanServiceImpl loanService;


    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public List<Payment> getPaymentByCustId(int custId) {
        return paymentRepository.findAllByCustId(custId);
    }

    @Override
    public List<Payment> getPaymentByLoanId(int loanId) {
        return paymentRepository.findAllByLoanId(loanId);
    }

    @Override
    public Payment getPaymentById(int paymentId) {
        return paymentRepository.findById(paymentId).orElse(null);
    }

    @Override
    @Transactional
    public Payment createPayment(Payment payment) {

        Optional<Loan> optionalLoan = Optional.ofNullable(loanService.getLoanById(payment.getLoanId()));

        if(optionalLoan.isPresent()){
            Loan loan = optionalLoan.get();
            int newDueAmount = loan.getDueAmount() - payment.getAmount();
            loanService.updateDueAmount(loan.getId(), newDueAmount);

            return paymentRepository.save(payment);
        }
        else{
            throw new EntityNotFoundException("Loan request with ID " + payment.getLoanId() + " not found");
        }

    }


}
