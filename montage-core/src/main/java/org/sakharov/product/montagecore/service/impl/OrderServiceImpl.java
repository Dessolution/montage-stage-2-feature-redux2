package org.sakharov.product.montagecore.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.AdminListOrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.BookOrderDto;
import org.sakharov.product.montagecore.domain.dto.CreateOrderDto;
import org.sakharov.product.montagecore.domain.dto.ListOrderDto;
import org.sakharov.product.montagecore.domain.dto.OrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.PaymentDto;
import org.sakharov.product.montagecore.domain.dto.PravkiDto;
import org.sakharov.product.montagecore.domain.dto.UpdateOrderDto;
import org.sakharov.product.montagecore.domain.entity.OrderEntity;
import org.sakharov.product.montagecore.domain.entity.RoleEntity;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.domain.enums.PaymentStatus;
import org.sakharov.product.montagecore.domain.enums.Status;
import org.sakharov.product.montagecore.domain.enums.VideoFormat;
import org.sakharov.product.montagecore.domain.mapper.OrderMapper;
import org.sakharov.product.montagecore.repository.OrderRepository;
import org.sakharov.product.montagecore.repository.UserRepository;
import org.sakharov.product.montagecore.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<ListOrderDto> getOwnedOrders(){
        final List<RoleEntity> roles =
            (List<RoleEntity>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        if (roles.stream().anyMatch(x -> x.getAuthority().equals("ROLE_ADMIN"))) {
            return null;
        } else if (checkIfWorker()) {
            return ResponseEntity.ok(getWorkerOrders());
        } else {
            return ResponseEntity.ok(getUserOrders());
        }
    }

    @Override
    public ResponseEntity<ListOrderDto> getPossibleOrders(){
        final Long workerId =  ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getWorker().getId();
        if (!(getWorkerOrders().getOwnedOrders() == null || getWorkerOrders().getOwnedOrders().isEmpty())) {
            return ResponseEntity.ok(new ListOrderDto());
        }
        final List<OrderEntity> orders =
            orderRepository.findAllByStatusIn(List.of(Status.NEW, Status.BOOKED));
        log.warn("" + orders.size());
        final ListOrderDto listOrderDto = new ListOrderDto();
        listOrderDto.setOwnedOrders(
            orders.stream().filter(
                y -> (y.getBookedBy() == null || (y.getBookedBy() != null && !y.getBookedBy().contains(workerId)))
            ).map(
                orderMapper::toShortOrder
            ).collect(Collectors.toList()));
        if (listOrderDto.getOwnedOrders().isEmpty()) return ResponseEntity.accepted().build();
        return ResponseEntity.ok(listOrderDto);
    }

    private ListOrderDto getUserOrders() {
        final List<OrderEntity> orders =
            orderRepository.findAllByUser((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        final ListOrderDto listOrderDto = new ListOrderDto();
        listOrderDto.setOwnedOrders(
            orders.stream().map(
                orderEntity -> {
                    ListOrderDto.ShortOrder shortOrder = orderMapper.toShortOrder(orderEntity);
                    shortOrder.setWorkerId(orderEntity.getWorkerId());
                    shortOrder.setWorker(setWorkerName(orderEntity.getWorkerId()));
                    return shortOrder;
                }
            ).collect(Collectors.toList()));
        return listOrderDto;
    }
    private ListOrderDto getWorkerOrders() {
        final UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final List<OrderEntity> orders =
            orderRepository.findAllByWorkerId(
                user.getWorker().getId()
            );

        if (orders.isEmpty()) return new ListOrderDto();

        final ListOrderDto listOrderDto = new ListOrderDto();
        listOrderDto.setOwnedOrders(
            orders.stream().filter(
                y -> !y.getStatus().equals(Status.ACCEPT)
            ).map(
                orderEntity -> {
                    ListOrderDto.ShortOrder shortOrder = orderMapper.toShortOrder(orderEntity);
                    shortOrder.setWorker(user.getWorker().getName() + " " + user.getWorker().getSurname());
                    return shortOrder;
                }
            ).collect(Collectors.toList()));

        if (listOrderDto.getOwnedOrders().isEmpty()) return new ListOrderDto();

        log.warn("{}", listOrderDto);
        return listOrderDto;
    }

    public ResponseEntity<OrderInfoDto> getOrderInfo(@RequestParam("order_id") final String orderId) {
        final OrderEntity order = orderRepository.findByOrderId(orderId).orElse(new OrderEntity());
        final OrderInfoDto orderInfoDto = orderMapper.toOrderInfo(order);
        if (checkIfWorker() && (Status.NEW.equals(order.getStatus()) || Status.BOOKED.equals(order.getStatus()))) {
            orderInfoDto.setPhone("-");
            orderInfoDto.setExtraContact("-");
        }
        return ResponseEntity.ok(orderInfoDto);
    }

    public ResponseEntity<HttpStatus> createOrder(@RequestBody final CreateOrderDto createOrderDto) {
        log.warn("{}", createOrderDto);
        final OrderEntity orderEntity = orderMapper.toEntity(createOrderDto);
        orderEntity.setOrderId(UUID.randomUUID().toString());
        log.warn(((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
        orderEntity.setUser(
                (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        );
        orderEntity.setStatus(Status.NEW);
        orderEntity.setClientName(orderEntity.getUser().getClient().getName());
        orderRepository.save(orderEntity);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<HttpStatus> createOrderUser(final CreateOrderDto createOrderDto, final UserEntity user) {
        log.warn("{}", createOrderDto);
        final OrderEntity orderEntity = orderMapper.toEntity(createOrderDto);
        orderEntity.setOrderId(UUID.randomUUID().toString());
        orderEntity.setUser(user);
        orderEntity.setStatus(Status.NEW);
        orderEntity.setClientName(createOrderDto.getFullName());
        orderRepository.save(orderEntity);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<HttpStatus> bookOrder(BookOrderDto bookOrderDto) {
        final Long workerId = ((UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getWorker().getId();
        final OrderEntity order = orderRepository.findByOrderId(bookOrderDto.getOrderId()).orElse(null);
        order.setStatus(Status.BOOKED);
        if (order.getBookedBy() == null || order.getBookedBy().isEmpty()) {
            order.setBookedBy(new ArrayList<>());
        }
        if (!order.getBookedBy().contains(workerId)) {
            order.getBookedBy().add(workerId);
            orderRepository.save(order);
        } else {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.ok().build();
    }

    @Override
    public void changeStatus(final String orderId, final String status) {
        final OrderEntity order = orderRepository.findByOrderId(orderId.toString()).orElse(null);
        order.setStatus(Status.valueOf(status));
        orderRepository.save(order);
    }

    @Override
    public void approveBook(String orderId, Long workerId) {
        final OrderEntity order = orderRepository.findByOrderId(orderId.toString()).orElse(null);
        order.setStatus(Status.WORK);
        order.setWorkerId(workerId);
        final UserEntity user = userRepository.findByWorkerId(workerId).orElse(null);
        user.getWorker().setStatus("ЗАНЯТ");
        orderRepository.save(order);
        userRepository.save(user);
    }

    //Пагинация которая возвращает список в 10 записей, не фильтруя их.
    public ResponseEntity<Page<OrderEntity>> getOrders(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderEntity> orders = orderRepository.findAll(pageable);
        return ResponseEntity.ok(orders);
    }

    public ResponseEntity<CreateOrderDto> updateOrderByAdmin(@RequestParam final String orderId, Long newWorkerId, Status newStatus, PaymentStatus newPaymentStatus){
        Optional<OrderEntity> optionalOrder = orderRepository.findByOrderId(orderId);
        if (optionalOrder.isPresent()){
            final OrderEntity order = optionalOrder.get();
            order.setWorkerId(newWorkerId);
            order.setStatus(newStatus);
            order.setPaymentStatus(newPaymentStatus);
            orderRepository.save(order);
            return ResponseEntity.ok().build();
        }
        else{
            return null;
        }
    }


    public AdminListOrderInfoDto filterOrders(Long workerId, Status status, LocalDate projectDeadline, PaymentStatus cash){
        Specification<OrderEntity> spec = Specification.where(null);

        if(workerId != null){
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("workerId"), workerId));
        }
        if(status != null){
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("status"), status));
        }
        if(projectDeadline != null){
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get("projectDeadline"), projectDeadline));
        }
        if(cash != null){
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("paymentStatus"), cash));
        }

        return new AdminListOrderInfoDto(orderRepository.findAll(spec).stream().map(
            orderEntity -> {
                AdminListOrderInfoDto.AdminOrderInfoDto infoDto =
                    orderMapper.toAdminInfoOrder(orderEntity);
                infoDto.setBookedBy(orderEntity.getBookedBy().stream().map(
                    (x) -> new AdminListOrderInfoDto.BookedBy(x, setWorkerName(x))
                ).collect(Collectors.toList()));
                infoDto.setOwnerName(orderEntity.getClientName());
                infoDto.setWorkerName(setWorkerName(orderEntity.getWorkerId()));
                return infoDto;
            }
        ).collect(Collectors.toList()));
    }

    @Override
    public void setPravki(PravkiDto dto) {
        final OrderEntity order = orderRepository.findByOrderId(dto.getOrderId()).orElse(null);
        if (dto.getIsPravki()) {
            order.setStatus(Status.WORK);
            order.setPravki(dto.getPravki());
        } else {
            order.setStatus(Status.ACCEPT);
            final UserEntity user = userRepository.findByWorkerId(order.getWorkerId()).orElse(null);
            user.getWorker().setStatus("СВОБОДЕН");
            userRepository.save(user);
        }
        orderRepository.save(order);
    }

    @Override
    public void setLink(String orderId, String link) {
        final OrderEntity order = orderRepository.findByOrderId(orderId).orElse(null);
        order.setStatus(Status.COMPLETED);
        order.setLinkResult(link);
        orderRepository.save(order);
    }

    @Override
    public void savePayment(String orderId, PaymentDto paymentDto) {
        final OrderEntity order = orderRepository.findByOrderId(orderId).orElse(null);
        if (!PaymentStatus.NONE.equals(paymentDto.getPaymentStatus())) {
            order.setPaymentStatus(paymentDto.getPaymentStatus());
        }
        if (!Status.NONE.equals(paymentDto.getOrderStatus())) {
            order.setStatus(paymentDto.getOrderStatus());
            if (Status.ACCEPT.equals(paymentDto.getOrderStatus())) {
                final UserEntity user  = userRepository.findByWorkerId(order.getWorkerId()).get();
                user.getWorker().setStatus("СВОБОДЕН");
                userRepository.save(user);
            } else if (Status.CANCELLATION.equals(paymentDto.getOrderStatus())) {
                final UserEntity user  = userRepository.findByWorkerId(order.getWorkerId()).get();
                user.getWorker().setStatus("СВОБОДЕН");
                order.setWorkerId(null);
                userRepository.save(user);
            }
        }
        order.setOrderPrice(paymentDto.getOrderPrice());
        order.setWorkerPrice(paymentDto.getWorkerPrice());
        orderRepository.save(order);
    }

    @Override
    public void updateOrder(final String orderId, final UpdateOrderDto updateOrderDto) {
        final OrderEntity order = orderRepository.findByOrderId(orderId).orElse(null);
        orderMapper.updateOrder(updateOrderDto, order);
        orderRepository.save(order);
    }

    @Override
    public List<OrderEntity> getOrdersByWorker(Long workerId) {
        return orderRepository.findAllByWorkerId(workerId);
    }

    private String setWorkerName(final Long workerId) {
        if (workerId == null) return null;
        return userRepository.findByWorkerId(workerId).map(userEntity -> userEntity.getWorker().getName() + " " + userEntity.getWorker().getSurname())
            .orElse(null);
    }
    private boolean checkIfWorker() {
        final List<RoleEntity> roles =
            (List<RoleEntity>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        return roles.stream().anyMatch(x -> x.getAuthority().equals("ROLE_WORKER"));
    }
}



