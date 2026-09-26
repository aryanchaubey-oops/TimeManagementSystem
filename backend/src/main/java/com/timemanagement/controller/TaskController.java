package com.timemanagement.controller;

import com.timemanagement.model.Task;
import com.timemanagement.repository.TaskRepository;
import com.timemanagement.service.PriorityCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PriorityCalculator priorityCalculator;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        String priority = priorityCalculator.calculatePriority(task);
        task.setPriority(priority);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}/add-time")
    public Task logTimeSpent(@PathVariable Long id, @RequestParam int minutes) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setTimeSpentMinutes(task.getTimeSpentMinutes() + minutes);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id, @RequestParam String status) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setStatus(status);
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}