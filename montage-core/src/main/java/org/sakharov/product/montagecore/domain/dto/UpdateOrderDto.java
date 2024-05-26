package org.sakharov.product.montagecore.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sakharov.product.montagecore.domain.enums.Cameras;
import org.sakharov.product.montagecore.domain.enums.CutVertical;
import org.sakharov.product.montagecore.domain.enums.VideoFormat;

import java.time.LocalDate;
import java.time.LocalTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrderDto {
  private String fullName;
  private String phone;
  private String extraContact;
  private String videoLink;

  private VideoFormat videoFormat;
  private Cameras cameraCount;
  private LocalTime chrono;
  private LocalDate deadline;

  private String taskLink;
  private Boolean colorCorrection;
  private CutVertical cuttingVerticalVideo;
  private Boolean videoSubtitles;
  private Boolean teaser;
}
