package org.sakharov.product.montagecore.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderInfoDto {
  private String orderId;
  private String fullName;
  private String videoLink;
  private String extraContact;
  private String phone;
  private String taskLink;
  private Boolean colorCorrection;
  private Boolean videoSubtitles;
  private Boolean teaser;
  private String videoFormat;
  private String cameraCount;
  private Long workerId;
  private String pravki;
  private String linkResult;
  private String cuttingVerticalVideo;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
  private LocalTime chrono;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private LocalDate deadline;
}
