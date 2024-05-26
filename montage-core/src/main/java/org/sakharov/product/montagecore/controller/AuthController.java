package org.sakharov.product.montagecore.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.CreateOrderDto;
import org.sakharov.product.montagecore.domain.dto.RegisterAndCreateDto;
import org.sakharov.product.montagecore.domain.dto.RegisterDto;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.domain.entity.WorkerInfoEntity;
import org.sakharov.product.montagecore.domain.enums.LanguageUser;
import org.sakharov.product.montagecore.domain.enums.PaymentMethod;
import org.sakharov.product.montagecore.domain.mapper.OrderMapper;
import org.sakharov.product.montagecore.repository.RoleRepository;
import org.sakharov.product.montagecore.service.OrderService;
import org.sakharov.product.montagecore.service.ProfileService;
import org.sakharov.product.montagecore.service.impl.UserSecService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class AuthController {
  private final UserSecService userSecService;
  private final ProfileService profileService;
  private final OrderService orderService;
  private final OrderMapper orderMapper;
  @PostMapping("/register")
  public ResponseEntity<Void> registerHim(@RequestBody final RegisterDto registerDto) {
    try {
      userSecService.loadUserByUsername(registerDto.getUsername());
      return ResponseEntity.unprocessableEntity().build();
    } catch (final UsernameNotFoundException e) {
      log.info("пользователь не найден: {}", registerDto.getUsername());
    }
    try {
      profileService.registerMan(registerDto);
    } catch (final RuntimeException e) {
      log.error("Not registered: ", e);
      return ResponseEntity.internalServerError().build();
    }
    if (registerDto.getIsWorker()) return ResponseEntity.accepted().build();
    return ResponseEntity.ok().build();
  }

  @PostMapping("/create_and_sign_up")
  public ResponseEntity<Void> registerAndCreate(@RequestBody final RegisterAndCreateDto racDto) {
    try {
      userSecService.loadUserByUsername(racDto.getEmail());
      return ResponseEntity.unprocessableEntity().build();
    } catch (final UsernameNotFoundException e) {
      log.info("пользователь не найден: {}", racDto.getEmail());
    }
    try {
      final String[] fullName = racDto.getFullName().split("");
      final String name = fullName[0];
      final String surname = fullName.length > 1 ? fullName[1] : " ";
      final RegisterDto registerDto = new RegisterDto(
          racDto.getEmail(),
          racDto.getPassword(),
          false,
          name,
          surname,
          racDto.getExtraContact(),
          null,
          null,
          null,
          null,
          null,
          null
      );
      final UserEntity user = profileService.registerMan(registerDto);
      final CreateOrderDto createOrderDto = orderMapper.toCreateDto(racDto);
      orderService.createOrderUser(createOrderDto, user);
    } catch (final RuntimeException e) {
      log.error("Not registered: ", e);
      return ResponseEntity.internalServerError().build();
    }
    return ResponseEntity.ok().build();
  }

}
