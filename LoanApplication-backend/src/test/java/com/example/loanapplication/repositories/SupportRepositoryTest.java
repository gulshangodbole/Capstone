package com.example.loanapplication.repositories;

import com.example.loanapplication.models.Support;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class SupportRepositoryTest {

    @Mock
    private SupportRepository supportRepository;

    private Support support;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        support = new Support();
        support.setStatus("Open");
        support.setName("John Doe");
        support.setEmail("john.doe@example.com");
        support.setContact("1234567890");
        support.setMessage("Test message");
        when(supportRepository.findByStatus("Open")).thenReturn(support);
    }

    @AfterEach
    public void tearDown() {
        supportRepository.deleteAll();
    }

    @Test
    public void testFindByStatusWhenSupportExistsThenReturnSupport() {

        Support foundSupport = supportRepository.findByStatus("Open");
        assertEquals(support, foundSupport);
    }

    @Test
    public void testFindByStatusWhenSupportDoesNotExistThenReturnNull() {
        Support foundSupport = supportRepository.findByStatus("Closed");
        assertNull(foundSupport);
    }
}
