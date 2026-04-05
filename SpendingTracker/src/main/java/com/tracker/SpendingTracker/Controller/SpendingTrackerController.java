package com.tracker.SpendingTracker.Controller;

import com.tracker.SpendingTracker.DTO.SpendingTrackerDTO;
import com.tracker.SpendingTracker.Services.SpendingTrackerServices;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/spendingTracker")
@RequiredArgsConstructor
public class SpendingTrackerController {
    private final SpendingTrackerServices spendingTrackerServices;
    private static final Logger logger = LoggerFactory.getLogger(SpendingTrackerController.class);

    @PutMapping("/add")
    public ResponseEntity<String> addDailyTransaction(@RequestBody SpendingTrackerDTO spendingTrackerDTO) {
        spendingTrackerServices.addDailyTransaction(spendingTrackerDTO);
        logger.info("Successfully called spendingTrackerServices Method");
        return new ResponseEntity<>("Successfully Added Transactions", HttpStatus.ACCEPTED);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<String> editTransaction(@PathVariable Long id, @RequestBody SpendingTrackerDTO spendingTrackerDTO) {
        spendingTrackerServices.editTransaction(id, spendingTrackerDTO);
        return new ResponseEntity<>("Successfully Updated Transaction", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<SpendingTrackerDTO>> getAllDailyTransactions() {
        List<SpendingTrackerDTO> dtoList = spendingTrackerServices.getDailyTransactions();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

}
