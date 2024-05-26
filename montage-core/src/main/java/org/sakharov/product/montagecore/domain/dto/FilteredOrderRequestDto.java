package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sakharov.product.montagecore.domain.enums.PaymentStatus;
import org.sakharov.product.montagecore.domain.enums.Status;
import org.sakharov.product.montagecore.domain.enums.VideoFormat;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilteredOrderRequestDto {
  private Long workerId;
  private PaymentStatus cash;
  private LocalDate projectDeadLine;
  private Status status;
}
