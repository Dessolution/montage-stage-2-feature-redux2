package org.sakharov.product.montagecore.service;

import org.sakharov.product.montagecore.domain.dto.ClientContactDto;
import org.sakharov.product.montagecore.domain.dto.UpdateProfileDto;
import org.sakharov.product.montagecore.domain.dto.WorkerContactDto;
import org.sakharov.product.montagecore.domain.dto.ProfileDto;
import org.sakharov.product.montagecore.domain.dto.RegisterDto;
import org.sakharov.product.montagecore.domain.dto.SelectWorkerDto;
import org.sakharov.product.montagecore.domain.entity.UserEntity;

import java.util.List;

public interface ProfileService {
  ProfileDto getProfileInfo(Long userId);
  void updateProfileInfo(UpdateProfileDto dto, Long userId);
  List<ClientContactDto> getAllClients();
  List<WorkerContactDto> getAllWorkers();
  List<SelectWorkerDto> getSelectWorkers();

  UserEntity registerMan(RegisterDto registerDto);
  ClientContactDto getContact(Long userId);
  WorkerContactDto getWorkerContact(Long userId);
}
