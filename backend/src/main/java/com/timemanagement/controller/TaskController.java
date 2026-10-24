package com.timemanagement.controller;

import com.timemanagement.model.Task;
import com.timemanagement.repository.TaskRepository;
import com.timemanagement.service.PriorityCalculator;
import com.timemanagement.exception.ResourceNotFoundException;
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
    public List<Task> getAllTasks(@RequestParam(required = false) String email) {
        if (email != null && !email.isEmpty()) {
            return taskRepository.findByUserEmail(email);
        }
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        String priority = priorityCalculator.calculatePriority(task);
        task.setPriority(priority);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        
        task.setName(taskDetails.getName());
        task.setDescription(taskDetails.getDescription());
        task.setDeadline(taskDetails.getDeadline());
        task.setImportance(taskDetails.getImportance());
        task.setCategory(taskDetails.getCategory());
        task.setStatus(taskDetails.getStatus());
        
        String priority = priorityCalculator.calculatePriority(task);
        task.setPriority(priority);
        
        return taskRepository.save(task);
    }

    @PutMapping("/{id}/add-time")
    public Task logTimeSpent(@PathVariable Long id, @RequestParam int minutes) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        task.setTimeSpentMinutes(task.getTimeSpentMinutes() + minutes);
        return taskRepository.save(task);
    }

    @PutMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id, @RequestParam String status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        task.setStatus(status);
        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
}
