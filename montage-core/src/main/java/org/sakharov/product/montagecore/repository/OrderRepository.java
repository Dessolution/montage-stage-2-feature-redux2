package org.sakharov.product.montagecore.repository;

import org.sakharov.product.montagecore.domain.entity.OrderEntity;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.domain.enums.Status;
import org.sakharov.product.montagecore.domain.enums.VideoFormat;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long>, JpaSpecificationExecutor<OrderEntity> {
  Optional<OrderEntity> findByOrderId(String orderId);
  List<OrderEntity> findAllByUser(UserEntity user);
  List<OrderEntity> findAllByWorkerId(Long workerId);
  List<OrderEntity> findAllByStatusIn(List<Status> statuses);
  List<OrderEntity> findAllByProjectDeadline(LocalDate projectDeadline);
  List<OrderEntity> findAllByStatus(Status status);
  List<OrderEntity> findAllByVideoFormat(VideoFormat videoFormat);

  List<OrderEntity> findAllByCreatedDate(Date createdDate);


}
