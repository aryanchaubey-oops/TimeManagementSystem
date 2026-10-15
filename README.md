# Time Management & Task Prioritization System

A Java-based web application developed to demonstrate core Java programming concepts, object-oriented design, Spring Boot architecture, database integration, transaction management, collections, generics, and exception handling.

The project models task allocation, scheduling, and priority calculation with a modern 3-tier architecture.

Project status: Review 1 — Core backend, database persistence, and web integration implemented; advanced authentication and analytics planned for Review 2.
Repository: GitHub — time-management-system

## Table of Contents
- Project Overview
- Objectives
- Features
- Technologies Used
- System Architecture
- Database Design
- Project Structure
- Prerequisites
- Installation and Setup
- How to Run
- Java Concepts Demonstrated
- Exception Handling
- Security Considerations
- Current Limitations
- Future Enhancements
- Contributing

## Project Overview
Managing daily schedules and tasks requires structured tracking, priority sorting, and persistent data storage. 
The Time Management & Task Prioritization System provides a robust Java backend and web interface that models these operations and demonstrates how a full-stack application interacts with a relational database.

The project uses Spring Boot, Spring Data JPA, and MySQL for persistent data operations. Its service layer coordinates business logic and priority calculations, while the repository layer handles database queries.

## Objectives
- Apply object-oriented programming principles to a practical full-stack application.
- Implement database operations using MySQL and Spring Data JPA.
- Organize code using a layered MVC architecture.
- Manage tasks and priorities with robust validation.
- Demonstrate transaction commit and rollback.
- Use Java collections, generics, streams, and custom exceptions.
- Establish a foundation for a web-based productivity platform.

## Features

### Task Management
- Create, read, update, and delete task records.
- Organize tasks by priority levels (High, Medium, Low).
- Associate tasks with individual users.
- Track task completion status and due dates.

### Priority Calculation & Scheduling
- Automatically compute and assign task priorities based on urgency and deadlines.
- Filter and sort tasks dynamically using Java Streams.

### Web Integration
- Responsive web dashboard built with HTML, CSS, and JavaScript using Fetch API.
- RESTful endpoints connecting frontend views to the Spring Boot backend.

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Java 21** | Core application logic and object-oriented design |
| **Spring Boot 3.2.0** | Web framework, dependency injection, and REST controllers |
| **Spring Data JPA / Hibernate** | Database persistence and ORM mapping |
| **Maven** | Dependency management and project building |
| **MySQL 8** | Relational database storage |
| **HTML / CSS / JavaScript** | Frontend user interface and client-side rendering |
| **Git & GitHub** | Version control and source code hosting |

## System Architecture
The project follows a 3-tier layered architecture that separates domain models, business logic, persistence, and presentation.