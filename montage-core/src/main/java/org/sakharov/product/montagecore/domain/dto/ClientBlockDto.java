package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientBlockDto {
  private Long userId;
  private String surname;
  private String name;
  private String messenger;
  private String email;
  private String info;
}
