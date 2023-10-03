package com.example.loanapplication.controllers;

import com.example.loanapplication.models.Support;
import com.example.loanapplication.services.SupportServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:3000")
public class SupportController {
    @Autowired
    private SupportServiceImpl supportService;

    @GetMapping
    public ResponseEntity<List<Support>> getAllSupport() {
        List<Support> supportList = supportService.getAllSupport();
        return new ResponseEntity<>(supportList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Support> getSupportById(@PathVariable int id) {
        Support support = supportService.getSupportById(id);
        if (support != null) {
            return new ResponseEntity<>(support, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Support> getSupportByStatus(@PathVariable String status) {
        Support support = supportService.getSupportByStatus(status);
        if (support != null) {
            return new ResponseEntity<>(support, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Support> createSupport(@RequestBody Support support) {
        Support createdSupport = supportService.createSupport(support);
        return new ResponseEntity<>(createdSupport, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Support> updateSupportStatus(@PathVariable int id, @PathVariable String status) {
        Support updatedSupport = supportService.updateSupportStatus(id, status);
        return new ResponseEntity<>(updatedSupport, HttpStatus.OK);
    }
}
