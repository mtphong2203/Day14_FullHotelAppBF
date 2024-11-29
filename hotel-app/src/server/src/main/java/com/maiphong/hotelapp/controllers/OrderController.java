package com.maiphong.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maiphong.hotelapp.dtos.order.OrderCreateEditDTO;
import com.maiphong.hotelapp.dtos.order.OrderMasterDTO;
import com.maiphong.hotelapp.services.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/orders")
public class OrderController {

    private final OrderService orderService;
    private final PagedResourcesAssembler<OrderMasterDTO> pageResource;

    public OrderController(OrderService orderService, PagedResourcesAssembler<OrderMasterDTO> pageResource) {
        this.orderService = orderService;
        this.pageResource = pageResource;
    }

    @GetMapping
    public ResponseEntity<List<OrderMasterDTO>> getAll() {
        List<OrderMasterDTO> masterDTOs = orderService.getAll();
        return ResponseEntity.ok(masterDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderMasterDTO> getById(@PathVariable String id) {
        OrderMasterDTO orderDTO = orderService.getById(id);
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchPage(@RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "number") String sortBy,
            @RequestParam(required = false, defaultValue = "asc") String order,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size) {

        Pageable pageable = null;

        if (order.equals("asc")) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).ascending());
        } else {
            pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        }

        Page<OrderMasterDTO> orders = orderService.searchPage(keyword, pageable);

        return ResponseEntity.ok(pageResource.toModel(orders));
    }

    @GetMapping("/searchByName")
    public ResponseEntity<List<OrderMasterDTO>> searchByNumber(@RequestParam(required = false) String keyword) {
        var masterDTOs = orderService.searchByName(keyword);
        return ResponseEntity.ok(masterDTOs);
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody OrderCreateEditDTO orderDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = orderService.create(orderDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to create order");
        }

        return ResponseEntity.status(201).body(masterDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @Valid @RequestBody OrderCreateEditDTO orderDTO,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        var masterDTO = orderService.update(id, orderDTO);

        if (masterDTO == null) {
            return ResponseEntity.badRequest().body("Fail to update order");
        }

        return ResponseEntity.ok(masterDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        boolean isDeleted = orderService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body("Fail to delete order");
        }

        return ResponseEntity.ok(isDeleted);
    }

}
