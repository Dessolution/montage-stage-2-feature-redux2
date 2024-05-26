package org.sakharov.product.montagecore.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.sakharov.product.montagecore.domain.enums.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;


@Table(name = "order_info")
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity extends BaseEntity {
    @Column(name = "order_id")
    private String orderId;
    @Column(name = "client_id")
    private Long clientId;
    @Column(name = "client_name")
    private String clientName;
    @Column(name = "client_number")
    private String clientNumber;
    @Column(name = "client_chat")
    private String clientChat;
    @Column(name = "video_link")
    private String videoLink;
    @Column(name = "task_link")
    private String taskLink;
    @Column(name = "pravki")
    private String pravki;
    @Column(name = "link_result")
    private String linkResult;
    @Column(name = "video_format")
    @Enumerated(value = EnumType.STRING)
    private VideoFormat videoFormat;
    @Column(name = "camera_count")
    @Enumerated(value = EnumType.STRING)
    private Cameras cameraCount;
    @Column(name = "video_time")
    private LocalTime videoTime;
    @Column(name = "project_deadline")
    private LocalDate projectDeadline;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "order_booked_by", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "worker_id")
    private List<Long> bookedBy;
    @Column(name = "worker_id")
    private Long workerId;
    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private Status status;
    @Column(name = "color_correction")
    private Boolean colorCorrection;
    @Column(name = "cutting_vertical_video")
    @Enumerated(value = EnumType.STRING)
    private CutVertical cuttingVerticalVideo;
    @Column(name = "video_subtitles")
    private Boolean videoSubtitles;
    @Column(name = "video_teaser")
    private Boolean videoTeaser;
    @Column(name = "budget")
    private String budget;
    @Column(name = "payment_status")
    @Enumerated(value = EnumType.STRING)
    private PaymentStatus paymentStatus;
    @Column(name = "order_price")
    private String orderPrice;
    @Column(name = "worker_price")
    private String workerPrice;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @PrePersist
    private void prePersist(){
        this.createdDate = LocalDateTime.now();
    }
}
