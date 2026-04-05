package com.tracker.SpendingTracker.Services;

import com.tracker.SpendingTracker.DTO.SpendingTrackerDTO;
import com.tracker.SpendingTracker.DTOMapper.mapDTO;
import com.tracker.SpendingTracker.Models.spendingTracker;
import com.tracker.SpendingTracker.Repo.SpendingTrackerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpendingTrackerServices {

    private final SpendingTrackerRepo spendingTrackerRepo;
    private static final Logger logger = LoggerFactory.getLogger(SpendingTrackerServices.class);

    // ===================== PUBLIC METHODS =====================

    public List<SpendingTrackerDTO> getDailyTransactions() {
        List<spendingTracker> spendingTrackerList = spendingTrackerRepo.findAll();
        List<SpendingTrackerDTO> dtoList = new ArrayList<>();
        for (spendingTracker s : spendingTrackerList) {
            dtoList.add(mapDTO.mapSpendingTrackerDto(s));
        }
        return dtoList;
    }
    public void addFirstTransaction(SpendingTrackerDTO dto) {
        try {
            spendingTracker entity = new spendingTracker();
            entity.setDate(dto.getDate());
            entity.setIncome(nullSafe(dto.getIncome()));
            entity.setStartOfDayBalance(dto.getStartOfDayBalance());
            entity.setColdCash(nullSafe(dto.getColdCash()));
            entity.setGrocery(nullSafe(dto.getGrocery()));
            entity.setFastFood(nullSafe(dto.getFastFood()));
            entity.setBills(nullSafe(dto.getBills()));
            entity.setSubscriptions(nullSafe(dto.getSubscriptions()));
            entity.setGas(nullSafe(dto.getGas()));
            entity.setShopping(nullSafe(dto.getShopping()));
            entity.setMiscellaneous(nullSafe(dto.getMiscellaneous()));
            entity.setRobinHoodTransfer(nullSafe(dto.getRobinHoodTransfer()));
            entity.setRobinHood(nullSafe(dto.getRobinHood()));
            entity.setEndOfDayBalance(dto.getEndOfDayBalance());
            entity.setTotalAssets(dto.getTotalAssets());
            entity.setPercentChange(dto.getPercentChange());

            spendingTrackerRepo.save(entity);
        } catch (Exception e) {
            logger.error("Error saving daily transaction: ", e);
        }
    }
    public void addDailyTransaction(SpendingTrackerDTO dto) {
        try {
            if(spendingTrackerRepo.count() == 0) {
                addFirstTransaction(dto);
                return;
            }
            Optional<spendingTracker> previousEntry = spendingTrackerRepo.findTopByOrderByDateDesc();

            BigDecimal previousTotalAssets = previousEntry
                    .map(spendingTracker::getTotalAssets)
                    .orElse(BigDecimal.ZERO);

            BigDecimal startOfDayBalance = previousEntry
                    .map(spendingTracker::getEndOfDayBalance)
                    .orElse(BigDecimal.ZERO);

            BigDecimal endOfDayBalance = calculateEndOfDayBalance(
                    startOfDayBalance,
                    nullSafe(dto.getIncome()),
                    nullSafe(dto.getColdCash()),
                    nullSafe(dto.getGrocery()),
                    nullSafe(dto.getFastFood()),
                    nullSafe(dto.getBills()),
                    nullSafe(dto.getSubscriptions()),
                    nullSafe(dto.getGas()),
                    nullSafe(dto.getShopping()),
                    nullSafe(dto.getMiscellaneous()),
                    nullSafe(dto.getRobinHoodTransfer())
            );

            BigDecimal totalAssets = calculateTotalAssets(endOfDayBalance, nullSafe(dto.getRobinHood()));
            BigDecimal percentChange = calculatePercentChange(totalAssets, previousTotalAssets);

            spendingTracker entity = new spendingTracker();
            entity.setDate(dto.getDate());
            entity.setIncome(nullSafe(dto.getIncome()));
            entity.setStartOfDayBalance(startOfDayBalance);
            entity.setColdCash(nullSafe(dto.getColdCash()));
            entity.setGrocery(nullSafe(dto.getGrocery()));
            entity.setFastFood(nullSafe(dto.getFastFood()));
            entity.setBills(nullSafe(dto.getBills()));
            entity.setSubscriptions(nullSafe(dto.getSubscriptions()));
            entity.setGas(nullSafe(dto.getGas()));
            entity.setShopping(nullSafe(dto.getShopping()));
            entity.setMiscellaneous(nullSafe(dto.getMiscellaneous()));
            entity.setRobinHoodTransfer(nullSafe(dto.getRobinHoodTransfer()));
            entity.setRobinHood(nullSafe(dto.getRobinHood()));
            entity.setEndOfDayBalance(endOfDayBalance);
            entity.setTotalAssets(totalAssets);
            entity.setPercentChange(percentChange);

            spendingTrackerRepo.save(entity);
            logger.info("Successfully saved transaction for date: {}", dto.getDate());

        } catch (Exception e) {
            logger.error("Error saving daily transaction: ", e);
        }
    }

    public void editTransaction(Long id, SpendingTrackerDTO dto) {
        try {
            spendingTracker existing = spendingTrackerRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));

            if (dto.getDate() != null) existing.setDate(dto.getDate());
            if (dto.getIncome() != null) existing.setIncome(dto.getIncome());
            if (dto.getColdCash() != null) existing.setColdCash(dto.getColdCash());
            if (dto.getGrocery() != null) existing.setGrocery(dto.getGrocery());
            if (dto.getFastFood() != null) existing.setFastFood(dto.getFastFood());
            if (dto.getBills() != null) existing.setBills(dto.getBills());
            if (dto.getSubscriptions() != null) existing.setSubscriptions(dto.getSubscriptions());
            if (dto.getGas() != null) existing.setGas(dto.getGas());
            if (dto.getShopping() != null) existing.setShopping(dto.getShopping());
            if (dto.getMiscellaneous() != null) existing.setMiscellaneous(dto.getMiscellaneous());
            if (dto.getRobinHoodTransfer() != null) existing.setRobinHoodTransfer(dto.getRobinHoodTransfer());
            if (dto.getRobinHood() != null) existing.setRobinHood(dto.getRobinHood());

            // Recalculate derived fields using the updated entity values
            BigDecimal endOfDayBalance = calculateEndOfDayBalance(
                    existing.getStartOfDayBalance(),
                    nullSafe(existing.getIncome()),
                    nullSafe(existing.getColdCash()),
                    nullSafe(existing.getGrocery()),
                    nullSafe(existing.getFastFood()),
                    nullSafe(existing.getBills()),
                    nullSafe(existing.getSubscriptions()),
                    nullSafe(existing.getGas()),
                    nullSafe(existing.getShopping()),
                    nullSafe(existing.getMiscellaneous()),
                    nullSafe(existing.getRobinHoodTransfer())
            );

            BigDecimal totalAssets = calculateTotalAssets(endOfDayBalance, nullSafe(existing.getRobinHood()));

            existing.setEndOfDayBalance(endOfDayBalance);
            existing.setTotalAssets(totalAssets);

            spendingTrackerRepo.save(existing);
            logger.info("Successfully edited transaction with id: {}", id);

        } catch (Exception e) {
            logger.error("Error editing transaction: ", e);
        }
    }

    // ===================== PRIVATE HELPERS =====================

    private BigDecimal calculateEndOfDayBalance(
            BigDecimal startOfDayBalance,
            BigDecimal income,
            BigDecimal coldCash,
            BigDecimal grocery,
            BigDecimal fastFood,
            BigDecimal bills,
            BigDecimal subscriptions,
            BigDecimal gas,
            BigDecimal shopping,
            BigDecimal miscellaneous,
            BigDecimal robinHoodTransfer) {

        return startOfDayBalance
                .add(income)
                .add(coldCash)
                .subtract(grocery)
                .subtract(fastFood)
                .subtract(bills)
                .subtract(subscriptions)
                .subtract(gas)
                .subtract(shopping)
                .subtract(miscellaneous)
                .subtract(robinHoodTransfer);
    }

    private BigDecimal calculateTotalAssets(BigDecimal endOfDayBalance, BigDecimal robinHood) {
        return endOfDayBalance.add(robinHood);
    }

    private BigDecimal calculatePercentChange(BigDecimal current, BigDecimal previous) {
        if (previous.compareTo(BigDecimal.ZERO) == 0) return BigDecimal.ZERO;
        return current.subtract(previous)
                .divide(previous, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"));
    }

    private BigDecimal nullSafe(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }
}