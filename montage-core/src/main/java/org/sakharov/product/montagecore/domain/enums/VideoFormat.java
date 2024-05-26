package org.sakharov.product.montagecore.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum VideoFormat {
  PODCAST("ВИДЕОПОДКАСТ, ИНТЕРВЬЮ"),
  LESSON("ВИДЕОУРОК, ВИДЕОЛЕКЦИЯ, \"ГОВОРЯЩАЯ ГОЛОВА\""),
  REELS("ВЕРТИКАЛЬНЫЕ ВИДЕО (REELS, SHORTS)"),
  OTHER("ДРУГОЕ"),
  LED("ЗАПИСЬ НА ПРОЗРАЧНОЙ LED-ДОСКЕ");

  private String info;
}
