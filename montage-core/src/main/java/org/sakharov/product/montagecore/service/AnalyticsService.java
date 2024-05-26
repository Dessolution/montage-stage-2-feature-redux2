package org.sakharov.product.montagecore.service;

import org.sakharov.product.montagecore.domain.dto.OrderAnalyticsDto;
import org.sakharov.product.montagecore.domain.dto.WorkerAnalyticsDto;

public interface AnalyticsService {
  OrderAnalyticsDto getOrderAnalytics();
  WorkerAnalyticsDto getWorkerAnalytics();
}
