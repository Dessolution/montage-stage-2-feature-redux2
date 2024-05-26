package org.sakharov.product.montagecore.config.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.entity.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class SuccessAuthHandler implements AuthenticationSuccessHandler {
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
    final UserEntity user = (UserEntity) authentication.getPrincipal();
    if (user.getBlocked()) {
      response.sendRedirect("/?blocked=true");
    } else if (user.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("ROLE_WORKER")) && !user.getWorker().getApproved()) {
      log.warn("" + user.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("ROLE_WORKER")));
      response.sendRedirect("/?approved=false");
    } else {
      log.warn("" + user.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("ROLE_WORKER")));
      response.sendRedirect("/auth_success");
    }
  }
}
