# ⏱️ Time Management and Task Prioritization System

A full-stack enterprise-grade web application designed to help users efficiently manage their tasks, calculate intelligent priorities based on deadlines and importance levels, and track time productivity. Built with a robust Java Spring Boot backend and an interactive responsive frontend.

---

## 🚀 Key Features

* **User Authentication & Role-Based Access:** Secure registration and login system with distinct user dashboards and administrative control panels (`USER` vs `ADMIN`).
* **Intelligent Task Prioritization:** Dynamic priority calculation (Critical, High, Medium, Low) based on custom rules and approaching deadlines.
* **Category Management:** Custom categorization of tasks (College, Work, Personal, etc.) with real-time tracking.
* **Interactive Dashboard:** Real-time analytics summary displaying total tasks, pending vs. completed items, time spent metrics, and visual completion percentages.
* **Admin Control Center:** System performance metrics, user management, and global priority rule configurations.

---

## 🛠️ Tech Stack

* **Backend:** Java 24, Spring Boot (v3.2.0), Spring Data JPA, Hibernate ORM, Spring Web
* **Database:** MySQL Server, HikariCP Connection Pooling
* **Frontend:** HTML5, CSS3, Modern JavaScript (ES6+), Responsive UI Layouts
* **Build Tool:** Maven
* **Version Control:** Git & GitHub

---

## 🏗️ System Architecture

The application follows a classic **3-Tier Architecture** separating concerns between presentation, business logic, and data persistence:
[ Frontend (HTML/CSS/JS) ]
│ (HTTP REST / JSON)
▼
[ Spring Boot Controller Layer ] (TaskController, Auth Handling)
│
▼
[ Service / Business Logic Layer ] (Priority Calculation & Rules)
│
▼
[ Spring Data JPA / Hibernate ]
│
▼
[ MySQL Database Layer ] (Users, Tasks, Categories, Rules)
---

## 📊 Entity-Relationship (ER) & Database Schema

The system manages core entities linked via relational foreign keys. Below is the structure mapping:

### 1. **User Table (`users`)**
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Long | Primary Key, Auto Increment | Unique identifier for user |
| `name` | VARCHAR(255) | NOT NULL | Full name of the user |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User login email address |
| `password` | VARCHAR(255) | NOT NULL | Encrypted / Plain password |
| `role` | VARCHAR(50) | NOT NULL | Role type (`USER` or `ADMIN`) |

### 2. **Task Table (`tasks`)**
| Column Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | Long | Primary Key, Auto Increment | Unique task ID |
| `task_name` | VARCHAR(255) | NOT NULL | Title of the task |
| `description` | TEXT | Nullable | Detailed task notes |
| `category` | VARCHAR(100) | NOT NULL | Associated task category |
| `deadline` | DATE | NOT NULL | Target completion date |
| `importance` | VARCHAR(50) | NOT NULL | Priority level (Critical, High, Medium, Low) |
| `status` | VARCHAR(50) | NOT NULL | Progress status (Pending, In Progress, Completed) |
| `user_email` | VARCHAR(255) | Foreign Key / Reference | Owner of the task |

---

## ⚙️ Application Workflow

1. **User Onboarding:** Users register via `register.html` or log in through `login.html`. Credentials are authenticated securely.
2. **Dashboard Overview:** Upon successful login, users are routed to `dashboard.html` where statistical summary widgets fetch current task metrics.
3. **Task Lifecycle:** 
   * Users navigate to `add-task.html` to create tasks specifying deadlines and importance levels.
   * Tasks are dynamically evaluated and listed in `tasks.html` with edit/delete options.
4. **Admin Oversight:** Administrators access `admin-dashboard.html` to monitor total platform users, manage database entries, and configure system-wide priority rules.

---

## 🚀 Getting Started & Local Setup

### Prerequisites
* Java JDK 17 or higher (Java 24 compatible)
* MySQL Server installed and running locally
* Maven build tool

### Step-by-Step Installation
1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/aryanchaubey-oops/TimeManagementSystem.git](https://github.com/aryanchaubey-oops/TimeManagementSystem.git)
   cd TimeManagementSystem
   Configure Database:
Open backend/src/main/resources/application.properties and update your MySQL credentials:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/time_management_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
Run the Application:
Execute via your IDE or terminal using Maven:

Bash
mvn spring-boot:run
Access in Browser:
Open your browser and navigate to:
http://localhost:8080
👥 Presented by :
1. Aryan Chaubey (Enrollment ID: 25SCSE1180223)(Team leader)
2. DAMAN PATHAK (25SCSE1180298)(MEMBER)
3. AATIF ALI (25SCSE1180971)(MEMBER)
4. ETHAN SINGH(25SCSE1180950)(MEMBER)
B.Tech Computer Science and Engineering (AI & ML)

Galgotias University