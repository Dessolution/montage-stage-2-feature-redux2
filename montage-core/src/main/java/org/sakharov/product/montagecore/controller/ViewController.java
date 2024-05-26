package org.sakharov.product.montagecore.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.entity.RoleEntity;
import org.sakharov.product.montagecore.repository.RoleRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Controller
@Slf4j
@RequiredArgsConstructor
public class ViewController {
  private final RoleRepository roleRepository;

  @GetMapping("/")
  public String getIndex(@RequestParam(value = "approved", required = false) String approved) {
    return "index";
  }
  @GetMapping("/auth_success")
  public String test() {
    final String view;
    final List<RoleEntity> roles =
        (List<RoleEntity>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
    if (roles.stream().anyMatch(x -> x.getAuthority().equals("ROLE_ADMIN"))) {
      view = "lk_admin";
    } else if (roles.stream().anyMatch(x -> x.getAuthority().equals("ROLE_WORKER"))) {
      view = "lk_worker";
    } else if (roles.stream().anyMatch(x -> x.getAuthority().equals("ROLE_USER"))) {
      view = "lk_client";
    } else {
      view = "index";
    }
    return "redirect:" + view;
  }
  @GetMapping("/lk_client")
  @PreAuthorize("hasRole('USER')")
  public String client() {
    return "client";
  }
  @GetMapping("/lk_worker")
  @PreAuthorize("hasRole('WORKER')")
  public String worker() {
    return "worker";
  }
  @GetMapping("/lk_admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String admin() {
    return "admin";
  }
}
