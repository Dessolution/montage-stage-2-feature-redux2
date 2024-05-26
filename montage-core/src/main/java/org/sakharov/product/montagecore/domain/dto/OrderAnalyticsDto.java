package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAnalyticsDto {

  private Integer newOrders;
  private Integer allOrders;
  private Integer inProgress;
  private Integer completed;
  private Integer accepted;
  private Integer refusal;
}
