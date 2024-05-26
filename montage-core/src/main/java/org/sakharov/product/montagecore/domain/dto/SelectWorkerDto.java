package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelectWorkerDto {
  private String fullname;
  private Long workerId;
}
