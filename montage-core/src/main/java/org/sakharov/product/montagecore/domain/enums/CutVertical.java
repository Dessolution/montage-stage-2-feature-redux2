package org.sakharov.product.montagecore.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CutVertical {
  LESS_TWO("1-2"),
  LESS_FOUR("3-4"),
  MORE_FIVE("5+"),
  NONE("Нет");

  private String info;
}
