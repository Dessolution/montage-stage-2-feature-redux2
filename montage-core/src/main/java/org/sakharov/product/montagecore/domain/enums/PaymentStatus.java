package org.sakharov.product.montagecore.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PaymentStatus {
    NONE("Не указан"),
    WAITING("ОЖИДАЕМ ОПЛАТУ"),
    PREPAYMENT("ВНЕСЕНА ПРЕДОПЛАТА"),
    EXTRAPAYMENT("ВНЕСЕНА ДОПЛАТА"),
    FULL("ПОЛНАЯ ОПЛАТА");

    private String info;
}
