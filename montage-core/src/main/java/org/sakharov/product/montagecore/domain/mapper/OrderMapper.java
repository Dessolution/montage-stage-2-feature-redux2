package org.sakharov.product.montagecore.domain.mapper;

import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.sakharov.product.montagecore.domain.dto.AdminListOrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.CreateOrderDto;
import org.sakharov.product.montagecore.domain.dto.ListOrderDto;
import org.sakharov.product.montagecore.domain.dto.OrderInfoDto;
import org.sakharov.product.montagecore.domain.dto.RegisterAndCreateDto;
import org.sakharov.product.montagecore.domain.dto.UpdateOrderDto;
import org.sakharov.product.montagecore.domain.entity.OrderEntity;
import org.sakharov.product.montagecore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface OrderMapper {

  @Mapping(target = "clientChat", source = "extraContact")
  @Mapping(target = "clientNumber", source = "phone")
  @Mapping(target = "projectDeadline", source = "deadline")
  @Mapping(target = "videoTime", source = "chrono")
  @Mapping(target = "clientName", source = "fullName")
  @Mapping(target = "videoTeaser", source = "teaser")
  @Mapping(target = "user", ignore = true)
  @Mapping(target = "workerId", ignore = true)
  @Mapping(target = "orderId", ignore = true)
  OrderEntity toEntity(CreateOrderDto orderDto);
  CreateOrderDto toCreateDto(RegisterAndCreateDto orderDto);

  @Mapping(target = "clientChat", source = "extraContact")
  @Mapping(target = "clientNumber", source = "phone")
  @Mapping(target = "projectDeadline", source = "deadline")
  @Mapping(target = "videoTime", source = "chrono")
  @Mapping(target = "clientName", source = "fullName")
  @Mapping(target = "videoTeaser", source = "teaser")
  @Mapping(target = "user", ignore = true)
  @Mapping(target = "workerId", ignore = true)
  @Mapping(target = "orderId", ignore = true)
  OrderEntity updateOrder(UpdateOrderDto orderDto, @MappingTarget OrderEntity orderEntity);

  @Mapping(source = "clientChat", target = "extraContact")
  @Mapping(source = "clientNumber", target = "phone")
  @Mapping(source = "projectDeadline", target = "deadline")
  @Mapping(target = "workerId", source = "workerId")
  @Mapping(target = "teaser", source = "videoTeaser")
  @Mapping(target = "fullName", source = "clientName")
  @Mapping(target = "chrono", source = "videoTime")
  OrderInfoDto toOrderInfo(OrderEntity orderEntity);

  @Mapping(target = "name", expression = "java(\"Заказ \" + orderEntity.getId())")
  @Mapping(source = "projectDeadline", target = "deadline")
  @Mapping(target = "worker", expression = "java(orderEntity.getWorkerId() == null ? \"Не указан\" : orderEntity.getWorkerId().toString())")
  @Mapping(target = "status", expression = "java(orderEntity.getStatus().getInfo())")
  @Mapping(target = "pravki", source = "pravki")
  @Mapping(target = "additionalInfo", expression = "java(orderEntity.getVideoFormat().getInfo() + \" | камер: \" + orderEntity.getCameraCount().getInfo() + \" | создан: \" + orderEntity.getCreatedDate().toLocalDate().toString())")
  @Mapping(target = "createdDate", expression = "java(orderEntity.getCreatedDate().toLocalDate())")
  ListOrderDto.ShortOrder toShortOrder(OrderEntity orderEntity);

  @Mapping(source = "clientChat", target = "messenger")
  @Mapping(source = "projectDeadline", target = "deadline")
  @Mapping(target = "workerName", ignore = true)
  @Mapping(target = "ownerId", expression = "java(order.getUser().getId())")
  @Mapping(target = "ownerName", ignore = true)
  @Mapping(target = "linkMat", source = "videoLink")
  @Mapping(target = "color", source = "colorCorrection")
  @Mapping(target = "subtles", source = "videoSubtitles")
  @Mapping(target = "cameras", expression = "java(order.getCameraCount().getInfo())")
  @Mapping(target = "cutVertical", expression = "java(order.getCuttingVerticalVideo().getInfo())")
  @Mapping(target = "videoFormat", expression = "java(order.getVideoFormat().getInfo())")
  @Mapping(target = "bookedBy", ignore = true)
  @Mapping(target = "createdDate", expression = "java(order.getCreatedDate().toLocalDate().toString())")
  AdminListOrderInfoDto.AdminOrderInfoDto toAdminInfoOrder(OrderEntity order);
}
