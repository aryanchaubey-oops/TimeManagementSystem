// ========================================
// CHECK LOGIN
// ========================================

const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (!currentUser) {
    window.location.href = "login.html";
}


// ========================================
// GET TASKS
// ========================================

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


// ========================================
// GET CATEGORIES
// ========================================

function getCategories() {

    return JSON.parse(
        localStorage.getItem("categories")
    ) || [];

}


// ========================================
// GET CATEGORY NAME
// FIX [object Object] ISSUE
// ========================================

function getCategoryName(category) {

    if (!category) {
        return "General";
    }

    if (typeof category === "object") {

        return (
            category.name ||
            category.categoryName ||
            category.title ||
            "General"
        );

    }

    return category;

}


// ========================================
// CALCULATE PRIORITY
// ========================================

function calculatePriority(deadline, importance) {

    const rules =
        JSON.parse(
            localStorage.getItem("priorityRules")
        ) || {};

    if (!deadline || !importance) {
        return importance || "Low";
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const deadlineDate =
        new Date(deadline);

    deadlineDate.setHours(0, 0, 0, 0);

    const difference =
        deadlineDate - today;

    const daysLeft =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (
        rules[importance] !== undefined &&
        daysLeft <= rules[importance]
    ) {

        if (importance === "High") {
            return "Critical";
        }

        if (importance === "Medium") {
            return "High";
        }

        if (importance === "Low") {
            return "Medium";
        }

    }

    return importance;

}


// ========================================
// FORMAT TIME
// ========================================

function formatTime(totalSeconds) {

    totalSeconds =
        Math.floor(totalSeconds || 0);

    const hours =
        Math.floor(
            totalSeconds / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );

}


// ========================================
// GET USER TASKS
// ========================================

function getUserTasks() {

    tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

    return tasks.filter(
        task =>
            task.userEmail ===
            currentUser.email
    );

}


// ========================================
// ADD TASK
// ========================================

const addTaskForm =
    document.getElementById("addTaskForm");

if (addTaskForm) {

    const categorySelect =
        document.getElementById("category");

    const categories =
        getCategories();

    categories.forEach(
        function (category) {

            const categoryName =
                getCategoryName(category);

            if (!categoryName) {
                return;
            }

            const option =
                document.createElement("option");

            option.value =
                categoryName;

            option.textContent =
                categoryName;

            categorySelect.appendChild(
                option
            );

        }
    );


    addTaskForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document
                    .getElementById("taskName")
                    .value
                    .trim();

            const description =
                document
                    .getElementById("description")
                    .value
                    .trim();

            const category =
                document
                    .getElementById("category")
                    .value;

            const deadline =
                document
                    .getElementById("deadline")
                    .value;

            const importance =
                document
                    .getElementById("importance")
                    .value;

            const status =
                document
                    .getElementById("status")
                    .value;


            if (!category) {

                alert(
                    "Please select a task category."
                );

                return;

            }


            const priority =
                calculatePriority(
                    deadline,
                    importance
                );


            const newTask = {

                id:
                    Date.now(),

                userEmail:
                    currentUser.email,

                name:
                    name,

                description:
                    description,

                category:
                    category,

                deadline:
                    deadline,

                importance:
                    importance,

                priority:
                    priority,

                status:
                    status,

                timeSpent:
                    0,

                timerStartedAt:
                    null,

                createdAt:
                    new Date().toISOString()

            };


            tasks.push(newTask);


            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );


            alert(
                "Task added successfully!"
            );


            window.location.href =
                "tasks.html";

        }
    );

}


// ========================================
// DISPLAY TASKS
// ========================================

function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    if (!taskList) {
        return;
    }


    let userTasks =
        getUserTasks();


    const searchInput =
        document.getElementById(
            "searchTask"
        );

    const priorityFilter =
        document.getElementById(
            "priorityFilter"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedPriority =
        priorityFilter
            ? priorityFilter.value
            : "ALL";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "ALL";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "ALL";


    userTasks =
        userTasks.filter(
            function (task) {

                const taskCategory =
                    getCategoryName(
                        task.category
                    );


                const matchesSearch =
                    !searchText ||
                    task.name
                        .toLowerCase()
                        .includes(searchText);


                const matchesPriority =
                    selectedPriority === "ALL" ||
                    task.priority ===
                    selectedPriority;


                const matchesStatus =
                    selectedStatus === "ALL" ||
                    task.status ===
                    selectedStatus;


                const matchesCategory =
                    selectedCategory === "ALL" ||
                    taskCategory ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesPriority &&
                    matchesStatus &&
                    matchesCategory
                );

            }
        );


    const taskCount =
        document.getElementById(
            "taskCount"
        );


    if (taskCount) {

        taskCount.textContent =
            userTasks.length +
            (
                userTasks.length === 1
                    ? " task"
                    : " tasks"
            );

    }


    if (userTasks.length === 0) {

        taskList.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty-task-message">

                    No tasks found.

                </td>

            </tr>

        `;

        return;

    }


    userTasks.sort(
        function (a, b) {

            return (
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );

        }
    );


    taskList.innerHTML = "";


    userTasks.forEach(
        function (task) {

            const row =
                document.createElement("tr");


            const currentPriority =
                calculatePriority(
                    task.deadline,
                    task.importance
                );


            if (
                task.priority !==
                currentPriority
            ) {

                task.priority =
                    currentPriority;

            }


            const categoryName =
                getCategoryName(
                    task.category
                );


            let currentTime =
                task.timeSpent || 0;


            if (task.timerStartedAt) {

                const runningSeconds =
                    Math.floor(
                        (
                            Date.now() -
                            new Date(
                                task.timerStartedAt
                            ).getTime()
                        ) / 1000
                    );

                currentTime +=
                    runningSeconds;

            }


            const priorityClass =
                "priority-" +
                task.priority.toLowerCase();


            let timerButton = "";


            if (task.timerStartedAt) {

                timerButton = `

                    <button
                        class="action-button stop-button"
                        onclick="stopTimer(${task.id})">

                        ⏹ Stop

                    </button>

                `;

            } else {

                timerButton = `

                    <button
                        class="action-button start-button"
                        onclick="startTimer(${task.id})">

                        ▶ Start

                    </button>

                `;

            }


            row.innerHTML = `

                <td>

                    <strong>
                        ${task.name}
                    </strong>

                    ${
                        task.description
                            ? `
                                <small class="task-description">
                                    ${task.description}
                                </small>
                              `
                            : ""
                    }

                </td>


                <td>
                    ${categoryName}
                </td>


                <td>

                    <span
                        class="priority-badge ${priorityClass}">

                        ${task.priority}

                    </span>

                </td>


                <td>
                    ${task.deadline}
                </td>


                <td>

                    <span
                        class="status-badge">

                        ${task.status}

                    </span>

                </td>


                <td>

                    <div class="time-tracking">

                        <strong>
                            ${formatTime(currentTime)}
                        </strong>

                        <div>
                            ${timerButton}
                        </div>

                    </div>

                </td>


                <td>

                    <div class="task-actions">

                        <button
                            class="action-button edit-button"
                            onclick="editTask(${task.id})">

                            ✏️ Edit

                        </button>


                        <button
                            class="action-button delete-button"
                            onclick="deleteTask(${task.id})">

                            🗑 Delete

                        </button>

                    </div>

                </td>

            `;


            taskList.appendChild(row);

        }
    );


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ========================================
// CATEGORY FILTER
// ========================================

function loadCategoryFilter() {

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );

    if (!categoryFilter) {
        return;
    }


    const userTasks =
        getUserTasks();


    const categories =
        new Set();


    userTasks.forEach(
        function (task) {

            categories.add(
                getCategoryName(
                    task.category
                )
            );

        }
    );


    categoryFilter.innerHTML = `

        <option value="ALL">
            All Categories
        </option>

    `;


    Array.from(categories)
        .sort()
        .forEach(
            function (category) {

                if (!category) {
                    return;
                }

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    category;

                option.textContent =
                    category;

                categoryFilter.appendChild(
                    option
                );

            }
        );

}


// ========================================
// SEARCH + FILTER EVENTS
// ========================================

const searchTask =
    document.getElementById(
        "searchTask"
    );

const priorityFilter =
    document.getElementById(
        "priorityFilter"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


if (searchTask) {

    searchTask.addEventListener(
        "input",
        displayTasks
    );

}


if (priorityFilter) {

    priorityFilter.addEventListener(
        "change",
        displayTasks
    );

}


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayTasks
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        displayTasks
    );

}


// ========================================
// CLEAR FILTERS
// ========================================

const clearFilters =
    document.getElementById(
        "clearFilters"
    );


if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        function () {

            if (searchTask) {
                searchTask.value = "";
            }

            if (priorityFilter) {
                priorityFilter.value = "ALL";
            }

            if (statusFilter) {
                statusFilter.value = "ALL";
            }

            if (categoryFilter) {
                categoryFilter.value = "ALL";
            }

            displayTasks();

        }
    );

}


// ========================================
// START TIMER
// ========================================

function startTimer(taskId) {

    tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    const task =
        tasks.find(
            task =>
                task.id === taskId
        );


    if (!task) {
        return;
    }


    if (task.timerStartedAt) {
        return;
    }


    task.timerStartedAt =
        new Date().toISOString();


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

}


// ========================================
// STOP TIMER
// ========================================

function stopTimer(taskId) {

    tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    const task =
        tasks.find(
            task =>
                task.id === taskId
        );


    if (!task) {
        return;
    }


    if (!task.timerStartedAt) {
        return;
    }


    const startTime =
        new Date(
            task.timerStartedAt
        ).getTime();


    const endTime =
        Date.now();


    const elapsedSeconds =
        Math.floor(
            (
                endTime -
                startTime
            ) / 1000
        );


    task.timeSpent =
        (task.timeSpent || 0) +
        elapsedSeconds;


    task.timerStartedAt =
        null;


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

}


// ========================================
// EDIT TASK
// ========================================

function editTask(taskId) {

    localStorage.setItem(
        "editTaskId",
        taskId
    );


    window.location.href =
        "edit-task.html";

}


// ========================================
// EDIT TASK PAGE
// ========================================

const editTaskForm =
    document.getElementById(
        "editTaskForm"
    );


if (editTaskForm) {

    const editTaskId =
        Number(
            localStorage.getItem(
                "editTaskId"
            )
        );


    tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    const task =
        tasks.find(
            task =>
                task.id === editTaskId &&
                task.userEmail ===
                currentUser.email
        );


    if (!task) {

        alert(
            "Task not found!"
        );


        window.location.href =
            "tasks.html";

    } else {


        document.getElementById(
            "editTaskName"
        ).value =
            task.name;


        document.getElementById(
            "editDescription"
        ).value =
            task.description || "";


        const editCategory =
            document.getElementById(
                "editCategory"
            );


        // ========================================
        // FIX CATEGORY OBJECT ISSUE
        // ========================================

        getCategories().forEach(
            function (category) {

                const categoryName =
                    getCategoryName(
                        category
                    );


                if (!categoryName) {
                    return;
                }


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    categoryName;


                option.textContent =
                    categoryName;


                editCategory.appendChild(
                    option
                );

            }
        );


        const savedCategory =
            getCategoryName(
                task.category
            );


        editCategory.value =
            savedCategory;


        document.getElementById(
            "editDeadline"
        ).value =
            task.deadline;


        document.getElementById(
            "editImportance"
        ).value =
            task.importance;


        document.getElementById(
            "editStatus"
        ).value =
            task.status;


        editTaskForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                task.name =
                    document.getElementById(
                        "editTaskName"
                    ).value.trim();


                task.description =
                    document.getElementById(
                        "editDescription"
                    ).value.trim();


                task.category =
                    document.getElementById(
                        "editCategory"
                    ).value;


                task.deadline =
                    document.getElementById(
                        "editDeadline"
                    ).value;


                task.importance =
                    document.getElementById(
                        "editImportance"
                    ).value;


                task.status =
                    document.getElementById(
                        "editStatus"
                    ).value;


                task.priority =
                    calculatePriority(
                        task.deadline,
                        task.importance
                    );


                localStorage.setItem(
                    "tasks",
                    JSON.stringify(tasks)
                );


                alert(
                    "Task updated successfully!"
                );


                localStorage.removeItem(
                    "editTaskId"
                );


                window.location.href =
                    "tasks.html";

            }
        );

    }

}


// ========================================
// DELETE TASK
// ========================================

function deleteTask(taskId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {
        return;
    }


    tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    tasks =
        tasks.filter(
            task =>
                !(
                    task.id === taskId &&
                    task.userEmail ===
                    currentUser.email
                )
        );


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

}


// ========================================
// SHOW USER NAME
// ========================================

const tasksUserName =
    document.getElementById(
        "tasksUserName"
    );


if (tasksUserName) {

    tasksUserName.textContent =
        currentUser.name;

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );


    window.location.href =
        "login.html";

}


// ========================================
// INITIAL LOAD
// ========================================

loadCategoryFilter();

displayTasks();


// ========================================
// LIVE UPDATE
// ========================================

setInterval(
    function () {

        displayTasks();

    },
    1000
);