package org.sakharov.product.montagecore.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Status {
    NONE("Не указан"),
    NEW("НОВЫЙ"),
    WORK("В РАБОТЕ"),
    COMPLETED("ЗАВЕРШЕН ИСПОЛНИТЕЛЕМ"),
    ACCEPT("ПРИНЯТ ЗАКАЗЧИКОМ"),
    BOOKED("ЗАБРОНИРОВАН"),
    CANCELLATION("ОТКАЗ");


    private String info;
}
