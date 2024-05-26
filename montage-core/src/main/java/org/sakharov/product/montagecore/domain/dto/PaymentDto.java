package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sakharov.product.montagecore.domain.enums.PaymentStatus;
import org.sakharov.product.montagecore.domain.enums.Status;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
  private String orderPrice;
  private String workerPrice;
  private PaymentStatus paymentStatus;
  private Status orderStatus;
}
