package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sakharov.product.montagecore.domain.enums.LanguageUser;
import org.sakharov.product.montagecore.domain.enums.PaymentMethod;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileDto {
  private String name;
  private String surname;
  private String password;
  private String email;
  private String portfolio;
  private String messenger;
  private String channel;
  private String description;
  private LanguageUser language;
  private PaymentMethod payment;
}
