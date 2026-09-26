package com.timemanagement.service;

import com.timemanagement.model.Task;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Component
public class PriorityCalculator {

    public String calculatePriority(Task task) {
        try {
            if (task.getDeadline() == null || task.getDeadline().trim().isEmpty()) {
                return "LOW";
            }

            LocalDate deadlineDate;
            String deadlineStr = task.getDeadline().trim();

            if (deadlineStr.contains("-")) {
                String[] parts = deadlineStr.split("-");
                if (parts[0].length() == 4) {
                    // Format: yyyy-MM-dd (HTML date picker output)
                    deadlineDate = LocalDate.parse(deadlineStr);
                } else {
                    // Format: dd-MM-yyyy
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
                    deadlineDate = LocalDate.parse(deadlineStr, formatter);
                }
            } else {
                return "LOW";
            }

            LocalDate today = LocalDate.now();
            long daysLeft = ChronoUnit.DAYS.between(today, deadlineDate);
            int importance = task.getImportance();            // 1. Agar deadline nikal gayi ya importance >= 4 aur 2 din se kam hain -> HIGH
            if (daysLeft <= 2 || importance >= 4) {
                return "HIGH";
            } else if (daysLeft <= 5 || importance >= 3) {
                return "MEDIUM";
            } else {
                return "LOW";
            }

        } catch (Exception e) {
            System.out.println("Date parsing error: " + e.getMessage());
            return "MEDIUM";
        }
    }
}