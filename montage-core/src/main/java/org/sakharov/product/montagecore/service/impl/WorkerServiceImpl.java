package org.sakharov.product.montagecore.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.BidDto;
import org.sakharov.product.montagecore.domain.dto.ClientBlockDto;
import org.sakharov.product.montagecore.domain.dto.CoworkerDto;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.repository.UserRepository;
import org.sakharov.product.montagecore.service.WorkerService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class WorkerServiceImpl implements WorkerService {
  private final UserRepository userRepository;
  private final UserSecService userSecService;
  @Override
  public List<BidDto> getAllBids() {
    List<BidDto> bids = new ArrayList<>();
    userRepository.findByWorkerUnapproved().stream().filter(y -> !y.getBlocked()).forEach(x -> {
      BidDto bid = new BidDto();
      bid.setWorkerId(x.getWorker().getId().toString());
      bid.setEmail(x.getWorker().getEmail());
      bid.setName(x.getWorker().getName());
      bid.setSurname(x.getWorker().getSurname());
      bid.setPortfolio(x.getWorker().getPortfolio());
      bid.setRole("Монтажер");
      bid.setMessenger(x.getWorker().getMessenger());
      bid.setId(x.getId().toString());
      bids.add(bid);
    });
    return bids;
  }

  @Override
  public List<CoworkerDto> getAllWorkers() {
    List<UserEntity> workers = userRepository.findByWorkerNotNull();
    final List<CoworkerDto> coworkerDtos = new ArrayList<>();
    workers.stream().filter(y -> !y.getBlocked()).forEach(x -> {
      CoworkerDto dto = new CoworkerDto();
      dto.setName(x.getWorker().getName());
      dto.setSurname(x.getWorker().getSurname());
      dto.setEmail(x.getUsername());
      dto.setId(x.getWorker().getId());
      dto.setUserId(x.getId());
      dto.setStatus(x.getWorker().getStatus());
      dto.setMessenger(x.getWorker().getMessenger());
      dto.setPortfolio(x.getWorker().getPortfolio());
      coworkerDtos.add(
          dto
      );
    });
    return coworkerDtos;
  }
  @Override
  public List<ClientBlockDto> getAllBlockableClient() {
    List<UserEntity> clients = userRepository.findByClientNotNull();
    final List<ClientBlockDto> clientBlockDtos = new ArrayList<>();
    clients.stream().filter(y -> !y.getBlocked()).forEach(x -> {
      ClientBlockDto dto = new ClientBlockDto();
      dto.setName(x.getClient().getName());
      dto.setSurname(x.getClient().getSurname());
      dto.setEmail(x.getUsername());
      dto.setUserId(x.getId());
      dto.setMessenger(x.getClient().getMessenger());
      dto.setInfo(x.getClient().getDescription());
      clientBlockDtos.add(
          dto
      );
    });
    return clientBlockDtos;
  }

  @Override
  public void approveBid(Long workerId) {
    final UserEntity user = userRepository.findByWorkerId(workerId).orElse(null);
    user.getWorker().setApproved(true);
    userRepository.save(user);
  }

  @Override
  public void cancelBid(Long workerId) {
    final UserEntity user = userRepository.findByWorkerId(workerId).orElse(null);
    user.setBlocked(true);
    userRepository.save(user);
  }

  @Override
  public void blockUser(Long userId) {
    final UserEntity user = userRepository.findById(userId).orElse(null);
    user.setBlocked(true);
    userRepository.save(user);
  }
}
