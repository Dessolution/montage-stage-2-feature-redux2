package org.sakharov.product.montagecore.repository;

import org.sakharov.product.montagecore.domain.entity.ClientInfoEntity;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByName(String name);
  Optional<UserEntity> findByWorkerId(Long workerId);

  @Query("select u from UserEntity u where u.worker IS NOT NULL and u.worker.approved = false")
  List<UserEntity> findByWorkerUnapproved();
  @Query("select u from UserEntity u where u.worker IS NOT NULL")
  List<UserEntity> findByWorkerNotNull();
  @Query("select u from UserEntity u where u.client IS NOT NULL")
  List<UserEntity> findByClientNotNull();
}
