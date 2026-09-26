package com.timemanagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String deadline;
    private int importance;
    private String category;
    private String status = "PENDING"; // PENDING / IN_PROGRESS / COMPLETED
    private String priority = "LOW";
    private int timeSpentMinutes = 0; // Time spent tracking

    public Task() {}

    public Task(String name, String description, String deadline, int importance, String category) {
        this.name = name;
        this.description = description;
        this.deadline = deadline;
        this.importance = importance;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public int getImportance() { return importance; }
    public void setImportance(int importance) { this.importance = importance; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public int getTimeSpentMinutes() { return timeSpentMinutes; }
    public void setTimeSpentMinutes(int timeSpentMinutes) { this.timeSpentMinutes = timeSpentMinutes; }
}