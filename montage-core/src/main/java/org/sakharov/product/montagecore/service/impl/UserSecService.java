package org.sakharov.product.montagecore.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.sakharov.product.montagecore.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserSecService implements UserDetailsService {
  private final UserRepository userRepository;
  @Override
  public UserEntity loadUserByUsername(final String username) throws UsernameNotFoundException {
    final UserEntity entity = userRepository.findByName(username).orElse(null);
    if (entity == null) {
      throw new UsernameNotFoundException(username);
    }
    return entity;
  }

  @Transactional
  public UserEntity createUser(final UserEntity newUser) {
    return userRepository.save(newUser);
  }
}
