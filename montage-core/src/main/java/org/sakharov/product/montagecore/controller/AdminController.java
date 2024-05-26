package org.sakharov.product.montagecore.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.AdminListOrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.BidDto;
import org.sakharov.product.montagecore.domain.dto.ClientBlockDto;
import org.sakharov.product.montagecore.domain.dto.CoworkerDto;
import org.sakharov.product.montagecore.domain.dto.ListOrderDto;
import org.sakharov.product.montagecore.domain.dto.OrderAnalyticsDto;
import org.sakharov.product.montagecore.domain.dto.WorkerAnalyticsDto;
import org.sakharov.product.montagecore.service.AnalyticsService;
import org.sakharov.product.montagecore.service.OrderService;
import org.sakharov.product.montagecore.service.WorkerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AdminController {

  private final WorkerService workerService;
  private final OrderService orderService;
  private final AnalyticsService analyticsService;

//  @GetMapping("/all_orders")
//  @PreAuthorize("hasRole('ADMIN')")
//  public ResponseEntity<AdminListOrderInfoDto> getAllOrders() {
//    return ResponseEntity.ok(orderService.getAllOrders());
//  }

  @GetMapping("/all_bids")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<BidDto>> getAllBids() {
    return ResponseEntity.ok(workerService.getAllBids());
  }
  @GetMapping("/all_coworkers")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<CoworkerDto>> getAllWorkers() {
    return ResponseEntity.ok(workerService.getAllWorkers());
  }
  @GetMapping("/all_clients")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<List<ClientBlockDto>> getAllClients() {
    return ResponseEntity.ok(workerService.getAllBlockableClient());
  }

  @GetMapping("/approve_bid")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> getApproveBid(@RequestParam("worker_id") final Long workerId) {
    workerService.approveBid(workerId);
    return ResponseEntity.ok().build();
  }
  @GetMapping("/cancel_bid")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> getCancelBid(@RequestParam("worker_id") final Long workerId) {
    workerService.cancelBid(workerId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/block_user")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<Void> getBlockUser(@RequestParam("user_id") final Long userId) {
    workerService.blockUser(userId);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/order_analytics")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<OrderAnalyticsDto> getOrderAnalytics() {
    return ResponseEntity.ok(analyticsService.getOrderAnalytics());
  }

  @GetMapping("/worker_analytics")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<WorkerAnalyticsDto> getWorkerAnalytics() {
    return ResponseEntity.ok(analyticsService.getWorkerAnalytics());
  }


}
