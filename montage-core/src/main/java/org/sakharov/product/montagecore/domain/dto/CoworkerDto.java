package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoworkerDto {
  private Long id;
  private Long userId;
  private String surname;
  private String name;
  private String messenger;
  private String email;
  private String portfolio;
  private String status;
}
