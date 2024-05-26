package org.sakharov.product.montagecore.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.domain.dto.LoginDto;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class AuthFilter extends AbstractAuthenticationProcessingFilter {

  private final ObjectMapper objectMapper;

  public AuthFilter(final ObjectMapper objectMapper, @Lazy final AuthenticationManager authenticationManager) {
    super(new AntPathRequestMatcher("/auth", "POST"));
    super.setAuthenticationManager(authenticationManager);
    this.objectMapper = objectMapper;
  }



  @Override
  public Authentication attemptAuthentication(
      HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException, IOException, ServletException {

    String username, password;

    try {
      final LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
      username = loginDto.getUsername();
      password = loginDto.getPassword();
    } catch (IOException e) {
      throw new AuthenticationServiceException(e.getMessage(), e);
    }

    UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
        username, password);

    final Authentication authentication = this.getAuthenticationManager().authenticate(authRequest);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    if (authentication.isAuthenticated()) {
      response.sendRedirect("/special");
    }
    return authentication;
  }

}
