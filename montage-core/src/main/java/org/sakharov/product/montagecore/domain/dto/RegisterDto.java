package org.sakharov.product.montagecore.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sakharov.product.montagecore.domain.enums.LanguageUser;
import org.sakharov.product.montagecore.domain.enums.PaymentMethod;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class RegisterDto {
  private String username;
  private String password;
  private Boolean isWorker;
  private String firstname;
  private String surname;
  private String messenger;
  private String socials;
  private String info;
  private String portfolio;
  private String role;
  private LanguageUser language;
  private PaymentMethod cash;
}
