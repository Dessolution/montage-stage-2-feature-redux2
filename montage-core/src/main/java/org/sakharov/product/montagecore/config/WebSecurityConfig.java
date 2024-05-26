package org.sakharov.product.montagecore.config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sakharov.product.montagecore.config.filter.AuthFilter;
import org.sakharov.product.montagecore.config.handler.SuccessAuthHandler;
import org.sakharov.product.montagecore.repository.RoleRepository;
import org.sakharov.product.montagecore.service.impl.UserSecService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@Slf4j
public class WebSecurityConfig {
  private final UserSecService userSecService;
  private final SuccessAuthHandler successAuthHandler;
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//    http
//        .authorizeHttpRequests(r ->
//            r.anyRequest().permitAll());
    http
        .csrf(
        )
        .disable()
        .authorizeHttpRequests((requests) -> requests
            .requestMatchers("/static/**", "/view/**").permitAll()
            .requestMatchers("/", "/auth", "/register", "/create_and_sign_up").permitAll()
            .requestMatchers("/auth").rememberMe()
            .anyRequest().authenticated()
        )
//        .addFilterAt(authFilter, UsernamePasswordAuthenticationFilter.class)
        .formLogin(form -> form
            .loginPage("/")
            .loginProcessingUrl("/auth")
            .successHandler(successAuthHandler)
            .failureUrl("/?authenticate=error")
        )
        .logout(logout -> {
          logout.logoutSuccessUrl(
              "/login"
          );
        });

    return http.build();
  }
  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder)
      throws Exception {
    return http.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(userSecService)
        .passwordEncoder(bCryptPasswordEncoder)
        .and()
        .build();
  }
}
