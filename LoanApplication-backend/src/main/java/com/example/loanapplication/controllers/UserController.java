
package com.example.loanapplication.controllers;

import com.example.loanapplication.models.Support;
import com.example.loanapplication.services.SupportServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.example.loanapplication.entities.User;
import com.example.loanapplication.exceptions.ResourceNotFoundException;
import com.example.loanapplication.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {


    @Autowired
    private UserService userService;


    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteEmp(@PathVariable Long id) throws ResourceNotFoundException {
        return userService.deleteUser(id);
    }

<<<<<<< HEAD
    @DeleteMapping("/user/{id}")
    public Map<String, String> deleteEmp(@PathVariable String id) throws ResourceNotFoundException {
        return userService.deleteEmp(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable String id) {
=======
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
>>>>>>> e7f146d6fa8962e6f48244e785f111c4f3616228
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

<<<<<<< HEAD
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable String id, @Valid @RequestBody User updatedUser) {
=======
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @Valid @RequestBody User updatedUser) {
>>>>>>> e7f146d6fa8962e6f48244e785f111c4f3616228
        try {
            User user = userService.updateUserProfile(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<User> updateUserCreditScoreAndIncome(
            @PathVariable Long userId,
            @RequestParam int creditscore,
            @RequestParam long income) {
                

        User updatedUser = userService.updateUserCreditScoreAndIncome(userId, creditscore,income);
        System.out.println(updatedUser);

        if (updatedUser != null) {
            if (creditscore >= 650) {
                updatedUser.setEligibility("Eligible");
            } else {
                updatedUser.setEligibility("Not Eligible");
            }
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}