package org.sakharov.product.montagecore.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.AdminListOrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.OrderAnalyticsDto;
import org.sakharov.product.montagecore.domain.dto.WorkerAnalyticsDto;
import org.sakharov.product.montagecore.domain.entity.OrderEntity;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.domain.enums.PaymentStatus;
import org.sakharov.product.montagecore.domain.enums.Status;
import org.sakharov.product.montagecore.repository.UserRepository;
import org.sakharov.product.montagecore.service.AnalyticsService;
import org.sakharov.product.montagecore.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static org.sakharov.product.montagecore.domain.enums.Status.ACCEPT;
import static org.sakharov.product.montagecore.domain.enums.Status.CANCELLATION;
import static org.sakharov.product.montagecore.domain.enums.Status.COMPLETED;
import static org.sakharov.product.montagecore.domain.enums.Status.NEW;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {
  private final OrderService orderService;
  private final UserRepository userRepository;
  @Override
  public OrderAnalyticsDto getOrderAnalytics() {
    AtomicInteger newO = new AtomicInteger();
    AtomicInteger acc = new AtomicInteger();
    AtomicInteger ref = new AtomicInteger();
    AtomicInteger comp = new AtomicInteger();
    final List<AdminListOrderInfoDto.AdminOrderInfoDto> list = orderService.filterOrders(null, null, null, null).getOrders();
    int all = list.size();
    list.forEach(
        x -> {
          switch (x.getStatus()) {
            case ACCEPT -> acc.addAndGet(1);
            case NEW -> newO.addAndGet(1);
            case CANCELLATION -> ref.addAndGet(1);
            case COMPLETED -> comp.addAndGet(1);
          }
        }
    );
    int inProg = all - (newO.intValue() + acc.intValue() + ref.intValue() + comp.intValue());
    return new OrderAnalyticsDto(newO.intValue(), all, inProg, comp.intValue(), acc.intValue(), ref.intValue());
  }

  @Override
  public WorkerAnalyticsDto getWorkerAnalytics() {
    List<UserEntity> workers = userRepository.findByWorkerNotNull();
    final WorkerAnalyticsDto analyticsDto = new WorkerAnalyticsDto();
    final List<WorkerAnalyticsDto.AnalysisDto> analysisDtoList = new ArrayList<>();
    workers.forEach(
        x -> {
          int sumForSelf = 0;
          int sumForPlatform = 0;
          int count = 0;
          final WorkerAnalyticsDto.AnalysisDto dto = new WorkerAnalyticsDto.AnalysisDto();
          dto.setWorker(x.getWorker().getName() + " " + x.getWorker().getSurname());
          dto.setStatus(x.getWorker().getStatus());
          List<OrderEntity> orders = orderService.getOrdersByWorker(x.getWorker().getId()).stream().filter(
              or -> ACCEPT.equals(or.getStatus()) && PaymentStatus.FULL.equals(or.getPaymentStatus())
          ).toList();
          for(OrderEntity order : orders) {
            count += 1;
            sumForSelf += zeroOrNumber(order.getWorkerPrice());
            sumForPlatform += zeroOrNumber(order.getOrderPrice()) - zeroOrNumber(order.getWorkerPrice());
          }
          dto.setOrderDone(count);
          switch (x.getWorker().getLanguageUser()) {
            case RUSSIAN -> {
              dto.setRubSelf(sumForSelf);
              dto.setRubPlatform(sumForPlatform);
            }
            case ENGLISH -> {
              dto.setUsdSelf(sumForSelf);
              dto.setUsdPlatform(sumForPlatform);
            }
            case AZER -> {
              dto.setAzSelf(sumForSelf);
              dto.setAzPlatform(sumForPlatform);
            }
          }
          analysisDtoList.add(dto);
        }
    );
    analyticsDto.setItems(analysisDtoList);
    return analyticsDto;
  }

  private int zeroOrNumber(String number) {
      return number == null ? 0 : Integer.parseInt(number);
  }
}
