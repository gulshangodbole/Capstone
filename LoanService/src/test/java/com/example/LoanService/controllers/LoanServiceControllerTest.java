package com.example.LoanService.controllers;

import com.example.LoanService.controller.LoanController;
import com.example.LoanService.entity.Loan;
import com.example.LoanService.service.LoanServiceImpl;
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

@WebMvcTest(LoanController.class)
class LoanControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LoanServiceImpl loanService;

    @Test
    public void testGetAllLoansWhenLoansExistThenReturnListOfLoans() throws Exception {
        Loan loan1 = new Loan(1, 1, 100000, 10, "Home", "Home", "pending", 100000);
        Loan loan2 = new Loan(2, 1, 150000, 12, "Masters", "Education", "pending", 150000);
        List<Loan> loans = Arrays.asList(loan1, loan2);

        when(loanService.getAllLoans()).thenReturn(loans);
        mockMvc.perform(get("/api/loan"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":1,\"custId\":1,\"loanAmount\":100000,\"loanTerm\":10,\"loanPurpose\":\"Home\",\"loanType\":\"Home\",\"status\":\"pending\",\"dueAmount\":100000},{\"id\":2,\"custId\":1,\"loanAmount\":150000,\"loanTerm\":12,\"loanPurpose\":\"Masters\",\"loanType\":\"Education\",\"status\":\"pending\",\"dueAmount\":150000}]"));
    }

    @Test
    public void testGetAllLoansWhenNoLoansExistThenReturnEmptyList() throws Exception {
        when(loanService.getAllLoans()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/loan"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    public void testGetLoanByCustIdWhenLoansExistThenReturnListOfLoans() throws Exception {
        Loan loan = new Loan(3, 4, 100000, 10, "Home", "Home", "pending", 100000);
        List<Loan> loans = Arrays.asList(loan);
        when(loanService.getLoanByCustId(4)).thenReturn(loans);

        mockMvc.perform(get("/api/loan/4"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":3,\"custId\":4,\"loanAmount\":100000,\"loanTerm\":10,\"loanPurpose\":\"Home\",\"loanType\":\"Home\",\"status\":\"pending\",\"dueAmount\":100000}]"));
    }

    @Test
    public void testGetLoansByCustIdWhenNoLoansExistThenReturnNotFound() throws Exception {
        when(loanService.getLoanByCustId(1)).thenReturn(null);

        mockMvc.perform(get("/api/loan/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetLoanByLoanIdWhenLoanExistThenReturnListOfLoan() throws Exception {
        Loan loan = new Loan(3, 2, 100000, 10, "Home", "Home", "pending", 100000);
        when(loanService.getLoanById(3)).thenReturn(loan);

        mockMvc.perform(get("/api/loan/2/loan/3"))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"id\":3,\"custId\":2,\"loanAmount\":100000,\"loanTerm\":10,\"loanPurpose\":\"Home\",\"loanType\":\"Home\",\"status\":\"pending\",\"dueAmount\":100000}"));
    }

    @Test
    public void testGetLoanByLoanIdWhenNoLoansExistThenReturnNotFound() throws Exception {
        when(loanService.getLoanById(1)).thenReturn(null);

        mockMvc.perform(get("/api/loan/1/loan/1"))
                .andExpect(status().isNotFound());
    }
    @Test
    public void testGetLoanByStatusWhenLoanExistsThenReturnLoan() throws Exception {
        Loan loan = new Loan(3, 2, 100000, 10, "Home", "Home", "pending", 100000);
        List<Loan> loans = Arrays.asList(loan);
        when(loanService.getLoanByStatus("pending")).thenReturn(loans);

        mockMvc.perform(get("/api/loan/status/pending"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":3,\"custId\":2,\"loanAmount\":100000,\"loanTerm\":10,\"loanPurpose\":\"Home\",\"loanType\":\"Home\",\"status\":\"pending\",\"dueAmount\":100000}]"));
    }

    @Test
    public void testGetLoanByStatusWhenLoanDoesNotExistThenReturnNotFound() throws Exception {
        when(loanService.getLoanByStatus("accepted")).thenReturn(null);

        mockMvc.perform(get("/api/loan/status/accepted"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateLoanWhenLoanIsCreatedThenReturnLoan() throws Exception {
        Loan loan = new Loan(3, 2, 100000, 10, "Home", "Home", "pending", 100000);

        when(loanService.createLoan(any(Loan.class))).thenReturn(loan);

        mockMvc.perform(post("/api/loan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loan)))
                .andExpect(status().isCreated())
                .andExpect(content().json("{\"id\":3,\"custId\":2,\"loanAmount\":100000,\"loanTerm\":10,\"loanPurpose\":\"Home\",\"loanType\":\"Home\",\"status\":\"pending\",\"dueAmount\":100000}"));
    }
}
