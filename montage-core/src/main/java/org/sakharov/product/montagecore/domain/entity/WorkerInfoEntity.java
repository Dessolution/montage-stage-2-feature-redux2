package org.sakharov.product.montagecore.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.sakharov.product.montagecore.domain.enums.CutVertical;
import org.sakharov.product.montagecore.domain.enums.LanguageUser;
import org.sakharov.product.montagecore.domain.enums.PaymentMethod;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "worker_info")
public class WorkerInfoEntity extends BaseEntity {

    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "email")
    private String email;
    @Column(name = "messenger")
    private String messenger;
    @Column(name = "portfolio")
    private String portfolio;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "language_user")
    private LanguageUser languageUser;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;
    @Column(name = "approved")
    private Boolean approved;
    @Column(name = "status")
    private String status;


    @OneToOne(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private UserEntity user;


}
