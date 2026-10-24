package com.timemanagement.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Abstract base entity demonstrating OOP Inheritance and Encapsulation.
 */
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)
    private String createdAt = LocalDateTime.now().toString();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
