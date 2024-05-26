package org.sakharov.product.montagecore.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LanguageUser {
    RUSSIAN("РУССКИЙ"),
    ENGLISH("АНГЛИЙСКИЙ"),
    AZER("АЗЕРБАЙДЖАНСКИЙ");

    private String info;
}
