package com.example.loanapplication.services;

import com.example.loanapplication.models.Support;
import com.example.loanapplication.repositories.SupportRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupportServiceImpl implements ISupportService{
    @Autowired
    private SupportRepository supportRepository;

    public List<Support> getAllSupport() {
        return supportRepository.findAll();
    }

    public Support createSupport(Support support) {
        return supportRepository.save(support);
    }

    public Support getSupportById(int id) {
        return supportRepository.findById(id).orElse(null);
    }

    @Override
    public Support getSupportByStatus(String status) {
        return supportRepository.findByStatus(status);
    }

    @Override
    public Support updateSupportStatus(int id, String status) {
        Optional<Support> optionalSupport = supportRepository.findById(id);

        if (optionalSupport.isPresent()) {
            Support support = optionalSupport.get();

            // Update the status
            support.setStatus(status);

            // Save the updated support request to the database
            return supportRepository.save(support);
        } else {
            // Handle the case where the support request is not found
            throw new EntityNotFoundException("Support request with ID " + id + " not found");
        }
    }
}
