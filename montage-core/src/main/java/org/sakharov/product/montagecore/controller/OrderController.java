package org.sakharov.product.montagecore.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.AdminListOrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.BookOrderDto;
import org.sakharov.product.montagecore.domain.dto.CreateOrderDto;
import org.sakharov.product.montagecore.domain.dto.FilteredOrderRequestDto;
import org.sakharov.product.montagecore.domain.dto.ListOrderDto;
import org.sakharov.product.montagecore.domain.dto.OrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.PaymentDto;
import org.sakharov.product.montagecore.domain.dto.PravkiDto;
import org.sakharov.product.montagecore.domain.dto.UpdateOrderDto;
import org.sakharov.product.montagecore.domain.entity.OrderEntity;
import org.sakharov.product.montagecore.domain.enums.PaymentStatus;
import org.sakharov.product.montagecore.domain.enums.Status;
import org.sakharov.product.montagecore.domain.enums.VideoFormat;
import org.sakharov.product.montagecore.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;


    @PostMapping("/order_create")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<HttpStatus> createOrder(@RequestBody final CreateOrderDto createOrderDto) {

        return orderService.createOrder(createOrderDto);
    }

    @PostMapping("/order_update")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<HttpStatus> updateOrder(@RequestParam("order_id") final String orderId,
                                                  @RequestBody final UpdateOrderDto updateOrderDto) {

        orderService.updateOrder(orderId, updateOrderDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/owned_orders")
    @PreAuthorize("hasAnyRole('USER', 'WORKER')")
    public ResponseEntity<ListOrderDto> getOwnedOrders() {
        return orderService.getOwnedOrders();
    }

    @PostMapping("/order_book")
    @PreAuthorize("hasRole('WORKER')")
    public ResponseEntity<HttpStatus> getOrderBook(@RequestBody BookOrderDto bookOrderDto) {
        return orderService.bookOrder(bookOrderDto);
    }

    @PostMapping("/payment_info")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> savePayment(@RequestParam("order_id") final String orderId,
                                                   @RequestBody PaymentDto paymentDto) {
        orderService.savePayment(orderId, paymentDto);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/possible_orders")
    @PreAuthorize("hasRole('WORKER')")
    public ResponseEntity<ListOrderDto> getPossibleOrders() {
        return orderService.getPossibleOrders();
    }
    @GetMapping("/order_info")
    @PreAuthorize("hasAnyRole('USER', 'WORKER')")
    public ResponseEntity<OrderInfoDto> getOrderInfo(@RequestParam("order_id") final String orderId) {
        return orderService.getOrderInfo(orderId);
    }
    @PostMapping("/update_order")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateOrderDto> updateOrderByAdmin(@RequestParam final String orderId,
                                                             @RequestParam Long newWorkerId, Status newStatus, PaymentStatus newPaymentStatus){
        return orderService.updateOrderByAdmin(orderId, newWorkerId, newStatus, newPaymentStatus);
    }

    @PostMapping("/filtered_orders")
    @PreAuthorize("hasRole('ADMIN')")
    public AdminListOrderInfoDto filterOrders(@RequestBody FilteredOrderRequestDto dto) {
        AdminListOrderInfoDto infoDto = orderService.filterOrders(dto.getWorkerId(), dto.getStatus(), dto.getProjectDeadLine(), dto.getCash());
        log.warn("{}", infoDto);
        return infoDto;
    }

    @PostMapping("/send_pravki")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> filterOrders(@RequestBody PravkiDto dto){
        orderService.setPravki(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/change_status")
    @PreAuthorize("hasAnyRole('USER', 'WORKER', 'ADMIN')")
    public ResponseEntity<Void> changeStatus(@RequestParam("order_id") final String orderId,
                                           @RequestParam("status") final String status) {
        orderService.changeStatus(orderId, status);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/book_with_status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> changeWithStatus(@RequestParam("order_id") final String orderId,
                                             @RequestParam("worker_id") final Long workerId) {
        orderService.approveBook(orderId, workerId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/send_link")
    @PreAuthorize("hasRole('WORKER')")
    public ResponseEntity<Void> setLink(@RequestParam("order_id") final String orderId,
                                             @RequestParam("link") final String link) {
        orderService.setLink(orderId, link);
        return ResponseEntity.ok().build();
    }


}
