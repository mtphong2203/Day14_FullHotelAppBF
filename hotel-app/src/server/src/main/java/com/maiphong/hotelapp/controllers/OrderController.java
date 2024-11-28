package com.maiphong.hotelapp.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.http.ResponseEntity;
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
import com.maiphong.hotelapp.dtos.order.OrderDTO;
import com.maiphong.hotelapp.services.OrderService;

@RestController
@RequestMapping("api/manager/order")
public class OrderController {

    private final OrderService orderService;
    private final PagedResourcesAssembler<OrderDTO> pageResource;

    public OrderController(OrderService orderService, PagedResourcesAssembler<OrderDTO> page) {
        this.orderService = orderService;
        this.pageResource = page;
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAll() {
        List<OrderDTO> orderDTOs = orderService.getAll();

        if (orderDTOs == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(orderDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getById(@PathVariable UUID id) {
        OrderDTO orderDTO = orderService.getById(id);

        if (orderDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size) {
        if (keyword == null) {
            getAll();
        }

        Pageable pageable = PageRequest.of(page, size);

        Page<OrderDTO> orders = orderService.search(keyword, pageable);

        var orderModel = pageResource.toModel(orders);

        return ResponseEntity.ok(orderModel);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody OrderCreateEditDTO orderCreateEditDTO) {
        boolean isCreated = orderService.create(orderCreateEditDTO);

        if (!isCreated) {
            return ResponseEntity.badRequest().body(isCreated);
        }

        return ResponseEntity.status(201).body(isCreated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody OrderCreateEditDTO orderCreateEditDTO) {
        boolean isUpdated = orderService.update(id, orderCreateEditDTO);

        if (!isUpdated) {
            return ResponseEntity.badRequest().body(isUpdated);
        }

        return ResponseEntity.ok(isUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        boolean isDeleted = orderService.delete(id);

        if (!isDeleted) {
            return ResponseEntity.badRequest().body(isDeleted);
        }

        return ResponseEntity.ok(isDeleted);
    }

}
