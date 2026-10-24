// ========================================
// CHECK LOGIN & SESSION
// ========================================
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "login.html";
}

const tasksUserName = document.getElementById("tasksUserName");
if (tasksUserName) {
    tasksUserName.textContent = currentUser.name;
}

// ========================================
// FETCH TASKS FROM DATABASE
// ========================================
async function fetchUserTasks() {
    try {
        const response = await fetch(`http://localhost:8080/api/tasks?email=${currentUser.email}`);
        if (!response.ok) throw new Error("Failed to fetch tasks");
        return await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

// ========================================
// FORMAT TIME
// ========================================
function formatTime(totalSeconds) {
    totalSeconds = Math.floor(totalSeconds || 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return String(hours).padStart(2, "0") + ":" +
           String(minutes).padStart(2, "0") + ":" +
           String(seconds).padStart(2, "0");
}

// ========================================
// DISPLAY TASKS
// ========================================
async function displayTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) return;

    let userTasks = await fetchUserTasks();

    const searchInput = document.getElementById("searchTask");
    const priorityFilter = document.getElementById("priorityFilter");
    const statusFilter = document.getElementById("statusFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedPriority = priorityFilter ? priorityFilter.value : "ALL";
    const selectedStatus = statusFilter ? statusFilter.value : "ALL";
    const selectedCategory = categoryFilter ? categoryFilter.value : "ALL";

    userTasks = userTasks.filter(task => {
        const matchesSearch = !searchText || task.name.toLowerCase().includes(searchText);
        const matchesPriority = selectedPriority === "ALL" || task.priority === selectedPriority;
        const matchesStatus = selectedStatus === "ALL" || task.status === selectedStatus;
        const matchesCategory = selectedCategory === "ALL" || task.category === selectedCategory;
        return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
    });

    const taskCount = document.getElementById("taskCount");
    if (taskCount) {
        taskCount.textContent = userTasks.length + (userTasks.length === 1 ? " task" : " tasks");
    }

    if (userTasks.length === 0) {
        taskList.innerHTML = `<tr><td colspan="7" class="empty-task-message">No tasks found.</td></tr>`;
        return;
    }

    taskList.innerHTML = "";

    userTasks.forEach(task => {
        const row = document.createElement("tr");
        const priorityClass = "priority-" + task.priority.toLowerCase();
        let currentTime = (task.timeSpentMinutes || 0) * 60;

        row.innerHTML = `
            <td>
                <strong>${task.name}</strong>
                ${task.description ? `<small class="task-description">${task.description}</small>` : ""}
            </td>
            <td>${task.category || "General"}</td>
            <td><span class="priority-badge ${priorityClass}">${task.priority}</span></td>
            <td>${task.deadline || "-"}</td>
            <td><span class="status-badge">${task.status}</span></td>
            <td>
                <div class="time-tracking">
                    <strong>${formatTime(currentTime)}</strong>
                    <div>
                        <button class="action-button start-button" onclick="addTime(${task.id})">+ 10m</button>
                    </div>
                </div>
            </td>
            <td>
                <div class="task-actions">
                    <button class="action-button edit-button" onclick="editTask(${task.id})">Edit</button>
                    <button class="action-button delete-button" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </td>
        `;
        taskList.appendChild(row);
    });
}

// ========================================
// ADD TASK FORM LISTENER
// ========================================
const addTaskForm = document.getElementById("addTaskForm");
if (addTaskForm) {
    addTaskForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("taskName").value.trim();
        const description = document.getElementById("taskDescription").value.trim();
        const category = document.getElementById("category").value;
        const deadline = document.getElementById("deadline").value;
        const importance = Number(document.getElementById("importance").value);

        const newTask = {
            name,
            description,
            category,
            deadline,
            importance,
            status: "PENDING",
            userEmail: currentUser.email
        };

        try {
            const response = await fetch("http://localhost:8080/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) throw new Error("Failed to create task");

            alert("Task added successfully to Database!");
            window.location.href = "tasks.html";
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}

// ========================================
// ADD TIME (10 Minutes)
// ========================================
async function addTime(taskId) {
    try {
        const response = await fetch(`http://localhost:8080/api/tasks/${taskId}/add-time?minutes=10`, {
            method: "PUT"
        });
        if (!response.ok) throw new Error("Failed to add time");
        displayTasks();
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// ========================================
// EDIT TASK
// ========================================
function editTask(taskId) {
    localStorage.setItem("editTaskId", taskId);
    window.location.href = "edit-task.html";
}

// ========================================
// DELETE TASK
// ========================================
async function deleteTask(taskId) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
        const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Failed to delete task");
        displayTasks();
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// ========================================
// LOGOUT
// ========================================
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// ========================================
// INITIAL LOAD
// ========================================
displayTasks();
