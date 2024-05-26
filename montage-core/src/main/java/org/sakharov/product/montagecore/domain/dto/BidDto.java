package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidDto {
  private String id;
  private String name;
  private String surname;
  private String role;
  private String email;
  private String messenger;
  private String portfolio;
  private String workerId;
}
