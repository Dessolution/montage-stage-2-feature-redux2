package org.sakharov.product.montagecore.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.ClientContactDto;
import org.sakharov.product.montagecore.domain.dto.ProfileDto;
import org.sakharov.product.montagecore.domain.dto.RegisterDto;
import org.sakharov.product.montagecore.domain.dto.SelectWorkerDto;
import org.sakharov.product.montagecore.domain.dto.UpdateProfileDto;
import org.sakharov.product.montagecore.domain.dto.WorkerContactDto;
import org.sakharov.product.montagecore.domain.entity.ClientInfoEntity;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.domain.entity.WorkerInfoEntity;
import org.sakharov.product.montagecore.domain.mapper.UserMapper;
import org.sakharov.product.montagecore.repository.RoleRepository;
import org.sakharov.product.montagecore.repository.UserRepository;
import org.sakharov.product.montagecore.service.ProfileService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserSecService userSecService;
    private final UserMapper userMapper;

    @Override
    public ProfileDto getProfileInfo(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            ProfileDto profileDto = null;
            if (user.get().getRoles().stream().anyMatch(x -> x.getAuthority().equals("ROLE_USER"))) {
                profileDto = userMapper.toClientProfileInfo(user.get().getClient());
            } else if (user.get().getRoles().stream().anyMatch(x -> x.getAuthority().equals("ROLE_WORKER"))) {
                profileDto = userMapper.toWorkerProfileInfo(user.get().getWorker());
            }
            return profileDto;
        }
        return null;
    }

    @Override
    public void updateProfileInfo(UpdateProfileDto dto, Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            if (user.get().getRoles().stream().anyMatch(x -> x.getAuthority().equals("ROLE_USER"))) {
                userMapper.updateUserProfileInfo(dto, user.get().getClient());
            } else if (user.get().getRoles().stream().anyMatch(x -> x.getAuthority().equals("ROLE_WORKER"))) {
                userMapper.updateWorkerProfileInfo(dto, user.get().getWorker());
            }
            final String password = dto.getPassword();
            if (password != null && !password.trim().isBlank()) user.get().setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
            userRepository.save(user.get());
        }
    }
    @Override
    public List<ClientContactDto> getAllClients(){
        List<UserEntity> users = userRepository.findAll();
        List<ClientContactDto> clients =  users.stream().filter(user -> user.getClientInfo() != null).map(user -> {
            ClientContactDto client = new ClientContactDto();
            client.setUserName(user.getClientInfo().getName());
            client.setUserSurname(user.getClientInfo().getSurname());
            client.setUserEmail(user.getClientInfo().getEmail());
            return client;}).collect(Collectors.toList());
        return clients;
    }

    @Override
    public List<WorkerContactDto> getAllWorkers(){
        List<UserEntity> users = userRepository.findAll();
        List<WorkerContactDto> workers = users.stream().filter(user -> user.getWorker() != null).map(user -> {
            WorkerContactDto worker = new WorkerContactDto();
            worker.setUserName(user.getWorkerInfo().getName());
            worker.setUserSurname(user.getWorkerInfo().getSurname());
            worker.setUserEmail(user.getWorkerInfo().getEmail());
            return worker;}).collect(Collectors.toList());
        return workers;
    }

    @Override
    public List<SelectWorkerDto> getSelectWorkers() {
        return userRepository.findAll().stream().filter(x -> x.getWorker() != null).map(
            y -> new SelectWorkerDto(
                    y.getWorker().getName() + " " + y.getWorker().getSurname(),
                    y.getWorker().getId()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public UserEntity registerMan(final RegisterDto registerDto) {
        final UserEntity entity = new UserEntity();
        entity.setName(registerDto.getUsername());
        entity.setPassword(new BCryptPasswordEncoder().encode(registerDto.getPassword()));
        entity.setBlocked(false);
        if (registerDto.getIsWorker()) {
            entity.setWorker(new WorkerInfoEntity(
                registerDto.getFirstname(),
                registerDto.getSurname(),
                registerDto.getUsername(),
                registerDto.getMessenger(),
                registerDto.getPortfolio(),
                registerDto.getLanguage(),
                registerDto.getCash(),
                false,
                "СВОБОДЕН",
                entity
            ));
            entity.setRoles(List.of(roleRepository.findById(2L).orElse(null)));
        } else {
            entity.setClient(new ClientInfoEntity(
                registerDto.getFirstname(),
                registerDto.getSurname(),
                registerDto.getUsername(),
                registerDto.getMessenger(),
                registerDto.getSocials(),
                registerDto.getInfo(),
                entity
            ));
            entity.setRoles(List.of(roleRepository.findById(1L).orElse(null)));
        }
        return userSecService.createUser(entity);
    }

    @Override
    public ClientContactDto getContact(Long userId) {
        final UserEntity user = userRepository.findById(userId).orElse(null);
        return new ClientContactDto(
            user.getClientInfo().getName(),
            user.getClientInfo().getSurname(),
            user.getUsername(),
            user.getClientInfo().getMessenger()
        );
    }

    @Override
    public WorkerContactDto getWorkerContact(Long workerId) {
        final UserEntity user = userRepository.findByWorkerId(workerId).orElse(null);
        return new WorkerContactDto(
            user.getWorker().getName(),
            user.getWorker().getSurname(),
            user.getUsername(),
            user.getWorker().getMessenger()
        );
    }

}
