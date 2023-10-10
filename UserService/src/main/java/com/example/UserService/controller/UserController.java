package com.example.UserService.controller;

import com.example.UserService.entity.User;
import com.example.UserService.exceptions.ResourceNotFoundException;
import com.example.UserService.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @Valid @RequestBody User updatedUser) {
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
    @PatchMapping("{userId}/updateexpense")
    public ResponseEntity<User> updateUserExpenseSavings(
            @PathVariable Long userId,
            @RequestParam long expense,
            @RequestParam long savings) {


        User updatedUser = userService.updateUserExpenseSavings(userId,expense,savings);
        System.out.println(updatedUser);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
