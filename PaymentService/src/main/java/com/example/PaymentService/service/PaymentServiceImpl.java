package com.example.PaymentService.service;

import com.example.PaymentService.entity.Loan;
import com.example.PaymentService.entity.Payment;
import com.example.PaymentService.exceptions.PaymentCreationException;
import com.example.PaymentService.repository.PaymentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

@Service
public class PaymentServiceImpl implements IPaymentService{

    private final RestTemplate restTemplate;
    private final PaymentRepository paymentRepository;
    @Autowired
    public PaymentServiceImpl(RestTemplate restTemplate, PaymentRepository paymentRepository) {
        this.restTemplate = restTemplate;
        this.paymentRepository = paymentRepository;
    }
    @Value("${loan-service.url}")
    private String loanServiceUrl;


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
        try {
            String url = "http://localhost:8082/api/loan/" + payment.getCustId() + "/loan/" + payment.getLoanId();
            ResponseEntity<Loan> responseEntity = restTemplate.getForEntity(url, Loan.class);

            if (responseEntity.getStatusCode() != HttpStatus.OK) {
                throw new RuntimeException("Failed to get the due amount of the loan");
            }
            System.out.println("response entity"+responseEntity.getBody());
            Loan loan = responseEntity.getBody();
            System.out.println("loans "+loan);
            if (loan != null ) {
                int dueAmount = loan.getDueAmount();
                int newDueAmount = dueAmount - payment.getAmount();
                String putUrl = "http://localhost:8082/api/loan/" + payment.getLoanId() + "/dueAmount?dueAmount=" + newDueAmount;
                ResponseEntity<Void> responseEntity1 = restTemplate.exchange(putUrl, HttpMethod.PUT, null, Void.class);

                return paymentRepository.save(payment);
            } else {
                throw new EntityNotFoundException("No loan requests found for ID " + payment.getLoanId());
            }
        } catch (Exception e) {
            // Handle exceptions or rethrow them as needed
            throw new PaymentCreationException("Failed to create payment", e);
        }
//        Optional<Loan> optionalLoan = Optional.ofNullable(loanService.getLoanById(payment.getLoanId()));
//
//        if(optionalLoan.isPresent()){
//            Loan loan = optionalLoan.get();
//            int newDueAmount = loan.getDueAmount() - payment.getAmount();
//            loanService.updateDueAmount(loan.getId(), newDueAmount);
//
//            return paymentRepository.save(payment);
//        }
//        else{
//            throw new EntityNotFoundException("Loan request with ID " + payment.getLoanId() + " not found");
//        }

    }


}