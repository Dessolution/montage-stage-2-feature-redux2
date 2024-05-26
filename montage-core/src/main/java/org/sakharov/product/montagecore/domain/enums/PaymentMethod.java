package org.sakharov.product.montagecore.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PaymentMethod {
    TRANSFER("ПО КАРТЕ");

    private String info;
}
