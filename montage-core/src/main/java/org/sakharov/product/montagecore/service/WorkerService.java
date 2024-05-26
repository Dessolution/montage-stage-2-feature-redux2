package org.sakharov.product.montagecore.service;

import org.sakharov.product.montagecore.domain.dto.BidDto;
import org.sakharov.product.montagecore.domain.dto.ClientBlockDto;
import org.sakharov.product.montagecore.domain.dto.CoworkerDto;

import java.util.List;

public interface WorkerService {
  List<BidDto> getAllBids();
  List<CoworkerDto> getAllWorkers();

  List<ClientBlockDto> getAllBlockableClient();

  void approveBid(Long workerId);
  void cancelBid(Long workerId);
  void blockUser(Long userId);
}
