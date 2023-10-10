package com.example.loanapplication.repositories;

import com.example.loanapplication.models.Payment;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class PaymentRepositoryTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    public void testFindAllByCustIdWhenPaymentsExistThenReturnPayments() {
        // Arrange
        Payment payment1 = new Payment(1, 1, 1000, 1);
        Payment payment2 = new Payment(2, 2, 2000, 1);
        List<Payment> expectedPayments = Arrays.asList(payment1, payment2);

        when(paymentRepository.findAllByCustId(1)).thenReturn(expectedPayments);

        // Act
        List<Payment> payments = paymentRepository.findAllByCustId(1);

        // Assert
        assertThat(payments).hasSize(2);
        assertThat(payments).extracting(Payment::getCustId).containsOnly(1);
    }

    @Test
    public void testFindAllByCustIdWhenNoPaymentsExistThenReturnEmptyList() {
        // Arrange
        when(paymentRepository.findAllByCustId(1)).thenReturn(Arrays.asList());

        // Act
        List<Payment> payments = paymentRepository.findAllByCustId(1);

        // Assert
        assertThat(payments).isEmpty();
    }

    @Test
    public void testFindAllByLoanIdWhenPaymentsExistThenReturnPayments() {
        // Arrange
        Payment payment1 = new Payment(1, 1, 1000, 1);
        Payment payment2 = new Payment(2, 1, 2000, 2);
        List<Payment> expectedPayments = Arrays.asList(payment1, payment2);

        when(paymentRepository.findAllByLoanId(1)).thenReturn(expectedPayments);

        // Act
        List<Payment> payments = paymentRepository.findAllByLoanId(1);

        // Assert
        assertThat(payments).hasSize(2);
        assertThat(payments).extracting(Payment::getLoanId).containsOnly(1);
    }

    @Test
    public void testFindAllByLoanIdWhenNoPaymentsExistThenReturnEmptyList() {
        // Arrange
        when(paymentRepository.findAllByLoanId(1)).thenReturn(Arrays.asList());

        // Act
        List<Payment> payments = paymentRepository.findAllByLoanId(1);

        // Assert
        assertThat(payments).isEmpty();
    }
}