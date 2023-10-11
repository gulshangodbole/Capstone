package com.example.PaymentService.services;

import com.example.PaymentService.entity.Loan;
import com.example.PaymentService.entity.Payment;
import com.example.PaymentService.repository.PaymentRepository;
import com.example.PaymentService.service.PaymentServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PaymentServiceImplTest {

    @Mock
    private PaymentRepository paymentRepository;

//    @Mock
//    private LoanServiceImpl loanService;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    private Payment payment;
    private Loan loan;

    @BeforeEach
    public void setUp() {
        payment = new Payment(1, 1, 1000, 1);
        loan = new Loan();
        loan.setId(1);
        loan.setDueAmount(2000);
    }

    @Test
    public void testGetAllPaymentsWhenPaymentsExistThenReturnPayments() {
        when(paymentRepository.findAll()).thenReturn(Arrays.asList(payment));

        List<Payment> payments = paymentService.getAllPayments();

        assertEquals(1, payments.size());
        verify(paymentRepository, times(1)).findAll();
    }

    @Test
    public void testGetPaymentByCustIdWhenPaymentsExistForCustIdThenReturnPayments() {
        when(paymentRepository.findAllByCustId(1)).thenReturn(Arrays.asList(payment));

        List<Payment> payments = paymentService.getPaymentByCustId(1);

        assertEquals(1, payments.size());
        verify(paymentRepository, times(1)).findAllByCustId(1);
    }

    @Test
    public void testGetPaymentByLoanIdWhenPaymentsExistForLoanIdThenReturnPayments() {
        when(paymentRepository.findAllByLoanId(1)).thenReturn(Arrays.asList(payment));

        List<Payment> payments = paymentService.getPaymentByLoanId(1);

        assertEquals(1, payments.size());
        verify(paymentRepository, times(1)).findAllByLoanId(1);
    }

    @Test
    public void testGetPaymentByIdWhenPaymentExistsForIdThenReturnPayment() {
        when(paymentRepository.findById(1)).thenReturn(Optional.of(payment));

        Payment foundPayment = paymentService.getPaymentById(1);

        assertEquals(payment, foundPayment);
        verify(paymentRepository, times(1)).findById(1);
    }

//    @Test
//    public void testCreatePaymentWhenLoanExistsForLoanIdThenReturnSavedPayment() {
//        when(loanService.getLoanById(1)).thenReturn(loan);
//        when(paymentRepository.save(payment)).thenReturn(payment);
//
//        Payment savedPayment = paymentService.createPayment(payment);
//
//        assertEquals(payment, savedPayment);
//        verify(paymentRepository, times(1)).save(payment);
//    }
//
//    @Test
//    public void testCreatePaymentWhenLoanDoesNotExistForLoanIdThenThrowEntityNotFoundException() {
//        when(loanService.getLoanById(1)).thenReturn(null);
//
//        assertThrows(EntityNotFoundException.class, () -> paymentService.createPayment(payment));
//        verify(paymentRepository, times(0)).save(payment);
//    }
}
