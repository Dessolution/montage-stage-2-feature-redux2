package org.sakharov.product.montagecore.service;

import org.sakharov.product.montagecore.domain.dto.AdminListOrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.BookOrderDto;
import org.sakharov.product.montagecore.domain.dto.CreateOrderDto;
import org.sakharov.product.montagecore.domain.dto.ListOrderDto;
import org.sakharov.product.montagecore.domain.dto.OrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.PaymentDto;
import org.sakharov.product.montagecore.domain.dto.PravkiDto;
import org.sakharov.product.montagecore.domain.dto.UpdateOrderDto;
import org.sakharov.product.montagecore.domain.entity.OrderEntity;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.domain.enums.PaymentStatus;
import org.sakharov.product.montagecore.domain.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

  ResponseEntity<ListOrderDto> getOwnedOrders();

  ResponseEntity<ListOrderDto> getPossibleOrders();

  ResponseEntity<OrderInfoDto> getOrderInfo(@RequestParam("order_id") final String orderId);
  ResponseEntity<HttpStatus> createOrder(@RequestBody final CreateOrderDto createOrderDto);
  ResponseEntity<HttpStatus> createOrderUser(final CreateOrderDto createOrderDto, final UserEntity user);
  ResponseEntity<HttpStatus> bookOrder(BookOrderDto bookOrderDto);
  void changeStatus(String orderId, String status);
  void approveBook(String orderId, Long workerId);

  ResponseEntity<CreateOrderDto> updateOrderByAdmin(@RequestParam final String orderId, Long newWorkerId, Status newStatus, PaymentStatus newPaymentStatus);

  AdminListOrderInfoDto filterOrders(Long workerId, Status status, LocalDate projectDeadline, PaymentStatus cash);

  void setPravki(PravkiDto dto);
  void setLink(String orderId, String link);
  void savePayment(String orderId, PaymentDto paymentDto);

  void updateOrder(String orderId, UpdateOrderDto updateOrderDto);

  List<OrderEntity> getOrdersByWorker(Long workerId);
}
