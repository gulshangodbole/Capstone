package com.example.loanapplication.services;

import com.example.loanapplication.models.Support;
import com.example.loanapplication.repositories.SupportRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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
public class SupportServiceImplTest {

    @Mock
    private SupportRepository supportRepository;

    @InjectMocks
    private SupportServiceImpl supportService;

    private Support support;

    @BeforeEach
    public void setUp() {
        support = new Support();
        support.setId(1);
        support.setName("Test Support");
        support.setEmail("test@test.com");
        support.setContact("1234567890");
        support.setMessage("Test Message");
        support.setStatus("Open");
    }

    @Test
    @DisplayName("Test Get All Support When Supports Exist Then Return Supports")
    public void testGetAllSupportWhenSupportsExistThenReturnSupports() {
        when(supportRepository.findAll()).thenReturn(Arrays.asList(support));

        List<Support> supports = supportService.getAllSupport();

        assertEquals(1, supports.size());
        assertEquals(support, supports.get(0));
    }

    @Test
    @DisplayName("Test Create Support When Support Created Then Return Support")
    public void testCreateSupportWhenSupportCreatedThenReturnSupport() {
        when(supportRepository.save(support)).thenReturn(support);

        Support createdSupport = supportService.createSupport(support);

        assertEquals(support, createdSupport);
    }

    @Test
    @DisplayName("Test Get Support By Id When Support Exists Then Return Support")
    public void testGetSupportByIdWhenSupportExistsThenReturnSupport() {
        when(supportRepository.findById(1)).thenReturn(Optional.of(support));

        Support foundSupport = supportService.getSupportById(1);

        assertEquals(support, foundSupport);
    }

    @Test
    @DisplayName("Test Get Support By Status When Support Exists Then Return Support")
    public void testGetSupportByStatusWhenSupportExistsThenReturnSupport() {
        when(supportRepository.findByStatus("Open")).thenReturn(support);

        Support foundSupport = supportService.getSupportByStatus("Open");

        assertEquals(support, foundSupport);
    }

    @Test
    @DisplayName("Test Update Support Status When Support Exists Then Return Updated Support")
    public void testUpdateSupportStatusWhenSupportExistsThenReturnUpdatedSupport() {
        when(supportRepository.findById(1)).thenReturn(Optional.of(support));
        when(supportRepository.save(support)).thenReturn(support);

        Support updatedSupport = supportService.updateSupportStatus(1, "Closed");

        assertEquals("Closed", updatedSupport.getStatus());
    }

    @Test
    @DisplayName("Test Update Support Status When Support Not Exists Then Throw EntityNotFoundException")
    public void testUpdateSupportStatusWhenSupportNotExistsThenThrowEntityNotFoundException() {
        when(supportRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> supportService.updateSupportStatus(1, "Closed"));
    }
}
