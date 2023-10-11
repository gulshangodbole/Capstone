package com.example.SupportService.controllers;

import com.example.SupportService.controller.SupportController;
import com.example.SupportService.entity.Support;
import com.example.SupportService.service.SupportServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SupportController.class)
public class SupportControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SupportServiceImpl supportService;

    @Test
    public void testGetAllSupportWhenCalledThenReturnListOfSupport() throws Exception {
        Support support = new Support();
        List<Support> supportList = Arrays.asList(support);

        when(supportService.getAllSupport()).thenReturn(supportList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/support")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]").exists());
    }

    @Test
    public void testGetSupportByIdWhenSupportExistsThenReturnSupport() throws Exception {
        Support support = new Support();
        support.setId(1);

        when(supportService.getSupportById(1)).thenReturn(support);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/support/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));
    }

    @Test
    public void testGetSupportByIdWhenSupportDoesNotExistThenReturnNotFound() throws Exception {
        when(supportService.getSupportById(1)).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/support/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetSupportByStatusWhenSupportExistsThenReturnSupport() throws Exception {
        Support support = new Support();
        support.setStatus("Open");

        when(supportService.getSupportByStatus("Open")).thenReturn(support);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/support/status/Open")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("Open"));
    }

    @Test
    public void testGetSupportByStatusWhenSupportDoesNotExistThenReturnNotFound() throws Exception {
        when(supportService.getSupportByStatus("Open")).thenReturn(null);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/support/status/Open")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateSupportWhenCalledThenReturnCreatedSupport() throws Exception {
        Support support = new Support();
        support.setId(1);
        support.setName("John Doe");
        support.setEmail("johndoe@example.com");
        support.setContact("1234567890");
        support.setMessage("Test message");
        support.setStatus("Open");

        when(supportService.createSupport(Mockito.any(Support.class))).thenReturn(support);

        ObjectMapper objectMapper = new ObjectMapper();
        String supportJson = objectMapper.writeValueAsString(support);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/support")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(supportJson))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("John Doe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("johndoe@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.contact").value("1234567890"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Test message"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("Open"));
    }

    @Test
    public void testUpdateSupportStatusWhenCalledThenReturnUpdatedSupport() throws Exception {
        Support support = new Support();
        support.setId(1);
        support.setStatus("Closed");

        when(supportService.updateSupportStatus(1, "Closed")).thenReturn(support);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/support/1/status/Closed")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.status").value("Closed"));
    }
}
