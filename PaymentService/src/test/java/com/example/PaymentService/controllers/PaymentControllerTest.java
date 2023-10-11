package com.example.PaymentService.controllers;

import com.example.PaymentService.controller.PaymentController;
import com.example.PaymentService.entity.Payment;
import com.example.PaymentService.service.PaymentServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PaymentController.class)
class PaymentControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PaymentServiceImpl paymentService;

    @Test
    public void testGetAllPaymentsWhenPaymentsExistThenReturnListOfPayments() throws Exception {
        Payment payment1 = new Payment(1, 1, 1000, 1);
        Payment payment2 = new Payment(2, 2, 2000, 2);
        List<Payment> payments = Arrays.asList(payment1, payment2);

        when(paymentService.getAllPayments()).thenReturn(payments);

        mockMvc.perform(get("/api/payment"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"paymentId\":1,\"loanId\":1,\"amount\":1000,\"custId\":1},{\"paymentId\":2,\"loanId\":2,\"amount\":2000,\"custId\":2}]"));
    }

    @Test
    public void testGetAllPaymentsWhenNoPaymentsExistThenReturnEmptyList() throws Exception {
        when(paymentService.getAllPayments()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/payment"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    public void testGetPaymentByCustIdWhenPaymentsExistThenReturnListOfPayments() throws Exception {
        Payment payment = new Payment(1, 1, 1000, 1);
        List<Payment> payments = Arrays.asList(payment);

        when(paymentService.getPaymentByCustId(1)).thenReturn(payments);

        mockMvc.perform(get("/api/payment/customer/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"paymentId\":1,\"loanId\":1,\"amount\":1000,\"custId\":1}]"));
    }

    @Test
    public void testGetPaymentByCustIdWhenNoPaymentsExistThenReturnNotFound() throws Exception {
        when(paymentService.getPaymentByCustId(1)).thenReturn(null);

        mockMvc.perform(get("/api/payment/customer/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetPaymentByLoanIdWhenPaymentsExistThenReturnListOfPayments() throws Exception {
        Payment payment = new Payment(1, 1, 1000, 1);
        List<Payment> payments = Arrays.asList(payment);

        when(paymentService.getPaymentByLoanId(1)).thenReturn(payments);

        mockMvc.perform(get("/api/payment/loan/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"paymentId\":1,\"loanId\":1,\"amount\":1000,\"custId\":1}]"));
    }

    @Test
    public void testGetPaymentByLoanIdWhenNoPaymentsExistThenReturnNotFound() throws Exception {
        when(paymentService.getPaymentByLoanId(1)).thenReturn(null);

        mockMvc.perform(get("/api/payment/loan/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetPaymentByIdWhenPaymentExistsThenReturnPayment() throws Exception {
        Payment payment = new Payment(1, 1, 1000, 1);

        when(paymentService.getPaymentById(1)).thenReturn(payment);

        mockMvc.perform(get("/api/payment/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"paymentId\":1,\"loanId\":1,\"amount\":1000,\"custId\":1}"));
    }

    @Test
    public void testGetPaymentByIdWhenPaymentDoesNotExistThenReturnNotFound() throws Exception {
        when(paymentService.getPaymentById(1)).thenReturn(null);

        mockMvc.perform(get("/api/payment/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreatePaymentWhenPaymentIsCreatedThenReturnPayment() throws Exception {
        Payment payment = new Payment(1, 1, 1000, 1);

        when(paymentService.createPayment(any(Payment.class))).thenReturn(payment);

        mockMvc.perform(post("/api/payment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(payment)))
                .andExpect(status().isCreated())
                .andExpect(content().json("{\"paymentId\":1,\"loanId\":1,\"amount\":1000,\"custId\":1}"));
    }
}
