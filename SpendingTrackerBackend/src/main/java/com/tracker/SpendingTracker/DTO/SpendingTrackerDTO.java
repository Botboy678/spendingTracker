package com.tracker.SpendingTracker.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpendingTrackerDTO {

    private LocalDate date;
    private BigDecimal income;
    private BigDecimal startOfDayBalance;
    private BigDecimal coldCash;
    private BigDecimal grocery;
    private BigDecimal fastFood;
    private BigDecimal bills;
    private BigDecimal subscriptions;
    private BigDecimal gas;
    private BigDecimal shopping;
    private BigDecimal miscellaneous;
    private BigDecimal robinHoodTransfer;
    private BigDecimal endOfDayBalance;
    private BigDecimal robinHood;
    private BigDecimal totalAssets;
    private BigDecimal percentChange;

}