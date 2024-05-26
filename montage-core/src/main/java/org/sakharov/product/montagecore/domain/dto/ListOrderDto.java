package org.sakharov.product.montagecore.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListOrderDto {
  private List<ShortOrder> ownedOrders;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class ShortOrder {
    private String name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate deadline;
    private String orderId;
    private String worker;
    private Long workerId;
    private String status;
    private String pravki;
    private String linkResult;
    private String additionalInfo;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate createdDate;
  }
}
