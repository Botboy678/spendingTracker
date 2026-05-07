package com.tracker.SpendingTracker.DTOMapper;

import com.tracker.SpendingTracker.DTO.SpendingTrackerDTO;
import com.tracker.SpendingTracker.Models.spendingTracker;

import java.math.BigDecimal;
import java.time.LocalDate;

public class mapDTO {
    public static SpendingTrackerDTO mapSpendingTrackerDto(spendingTracker spendingTracker) {
        if (spendingTracker == null) {
            return SpendingTrackerDTO.builder()
                    .date(LocalDate.now())
                    .income(BigDecimal.ZERO)
                    .startOfDayBalance(BigDecimal.ZERO)
                    .coldCash(BigDecimal.ZERO)
                    .grocery(BigDecimal.ZERO)
                    .fastFood(BigDecimal.ZERO)
                    .bills(BigDecimal.ZERO)
                    .subscriptions(BigDecimal.ZERO)
                    .gas(BigDecimal.ZERO)
                    .shopping(BigDecimal.ZERO)
                    .miscellaneous(BigDecimal.ZERO)
                    .robinHoodTransfer(BigDecimal.ZERO)
                    .endOfDayBalance(BigDecimal.ZERO)
                    .robinHood(BigDecimal.ZERO)
                    .totalAssets(BigDecimal.ZERO)
                    .percentChange(BigDecimal.ZERO)
                    .build();
        }

        return SpendingTrackerDTO.builder()
                .date(spendingTracker.getDate())
                .income(spendingTracker.getIncome())
                .startOfDayBalance(spendingTracker.getStartOfDayBalance())
                .coldCash(spendingTracker.getColdCash())
                .grocery(spendingTracker.getGrocery())
                .fastFood(spendingTracker.getFastFood())
                .bills(spendingTracker.getBills())
                .subscriptions(spendingTracker.getSubscriptions())
                .gas(spendingTracker.getGas())
                .shopping(spendingTracker.getShopping())
                .miscellaneous(spendingTracker.getMiscellaneous())
                .robinHoodTransfer(spendingTracker.getRobinHoodTransfer())
                .endOfDayBalance(spendingTracker.getEndOfDayBalance())
                .robinHood(spendingTracker.getRobinHood())
                .totalAssets(spendingTracker.getTotalAssets())
                .percentChange(spendingTracker.getPercentChange())
                .build();
    }
}