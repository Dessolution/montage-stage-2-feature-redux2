package org.sakharov.product.montagecore.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sakharov.product.montagecore.domain.enums.Cameras;
import org.sakharov.product.montagecore.domain.enums.CutVertical;
import org.sakharov.product.montagecore.domain.enums.PaymentStatus;
import org.sakharov.product.montagecore.domain.enums.Status;
import org.sakharov.product.montagecore.domain.enums.VideoFormat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminListOrderInfoDto {

  private List<AdminOrderInfoDto> orders;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class AdminOrderInfoDto {
    private Long id;
    private String linkMat;
    private String messenger;
    private String phone;
    private String taskLink;
    private String linkResult;
    private Boolean color;
    private Boolean subtles;
    private String videoFormat;
    private String cameras;
    private String cutVertical;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime videoTime;
    private Boolean videoTeaser;
    private Status status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate deadline;
    private List<BookedBy> bookedBy;
    private String workerName;
    private Long ownerId;
    private Long workerId;
    private String ownerName;
    private String orderId;
    private PaymentStatus paymentStatus;
    private String orderPrice;
    private String workerPrice;
    private String createdDate;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class BookedBy {
    private Long key;
    private String value;
  }
}
