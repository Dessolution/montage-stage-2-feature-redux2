package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerAnalyticsDto {
  List<AnalysisDto> items;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class AnalysisDto {
    private String worker;
    private String status;
    private Integer orderDone;
    private Integer rubSelf;
    private Integer usdSelf;
    private Integer azSelf;
    private Integer rubPlatform;
    private Integer usdPlatform;
    private Integer azPlatform;
  }
}
