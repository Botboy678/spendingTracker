package com.tracker.SpendingTracker.Repo;

import com.tracker.SpendingTracker.Models.spendingTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpendingTrackerRepo extends JpaRepository<spendingTracker, Long> {
    Optional<spendingTracker> findTopByOrderByDateDesc();
}
