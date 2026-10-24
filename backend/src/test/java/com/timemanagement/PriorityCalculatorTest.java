package com.timemanagement;

import com.timemanagement.model.Task;
import com.timemanagement.service.PriorityCalculator;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

public class PriorityCalculatorTest {

    private final PriorityCalculator priorityCalculator = new PriorityCalculator();

    @Test
    public void testHighPriorityByDeadline() {
        Task task = new Task();
        // Deadline set to tomorrow (1 day left)
        task.setDeadline(LocalDate.now().plusDays(1).toString());
        task.setImportance(2);

        String priority = priorityCalculator.calculatePriority(task);
        assertEquals("HIGH", priority, "Tasks due within 2 days should be HIGH priority");
    }

    @Test
    public void testHighPriorityByImportance() {
        Task task = new Task();
        // Deadline far in the future, but high importance (5)
        task.setDeadline(LocalDate.now().plusDays(10).toString());
        task.setImportance(5);

        String priority = priorityCalculator.calculatePriority(task);
        assertEquals("HIGH", priority, "Tasks with importance >= 4 should be HIGH priority");
    }

    @Test
    public void testLowPriorityTask() {
        Task task = new Task();
        // Deadline far in the future and low importance
        task.setDeadline(LocalDate.now().plusDays(10).toString());
        task.setImportance(1);

        String priority = priorityCalculator.calculatePriority(task);
        assertEquals("LOW", priority, "Tasks with distant deadlines and low importance should be LOW");
    }
}
