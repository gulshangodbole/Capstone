package com.example.SupportService.service;

import com.example.SupportService.entity.Support;

import java.util.List;

public interface ISupportService {
    public List<Support> getAllSupport();

    public Support createSupport(Support support);

    public Support getSupportById(int id);

    public Support getSupportByStatus(String status);

    public Support updateSupportStatus(int id, String status);
}
