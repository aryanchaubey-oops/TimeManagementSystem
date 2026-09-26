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
// USER TASKS
// ========================================

function getUserTasks() {

    return tasks.filter(
        task =>
            task.userEmail ===
            currentUser.email
    );

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
// UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];

    const userTasks =
        getUserTasks();


    // ====================================
    // TOTAL TASKS
    // ====================================

    const totalTasks =
        userTasks.length;


    // ====================================
    // COMPLETED TASKS
    // ====================================

    const completedTasks =
        userTasks.filter(
            task =>
                task.status === "Completed"
        ).length;


    // ====================================
    // PENDING TASKS
    // ====================================

    const pendingTasks =
        userTasks.filter(
            task =>
                task.status !== "Completed"
        ).length;


    // ====================================
    // TOTAL TIME
    // ====================================

    let totalTimeSeconds = 0;


    userTasks.forEach(
        function (task) {

            let taskTime =
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


                taskTime +=
                    runningSeconds;

            }


            totalTimeSeconds +=
                taskTime;

        }
    );


    // ====================================
    // SHOW SUMMARY
    // ====================================

    document.getElementById(
        "totalTasks"
    ).textContent =
        totalTasks;


    document.getElementById(
        "completedTasks"
    ).textContent =
        completedTasks;


    document.getElementById(
        "pendingTasks"
    ).textContent =
        pendingTasks;


    document.getElementById(
        "totalTime"
    ).textContent =
        formatTime(
            totalTimeSeconds
        );


    // ====================================
    // COMPLETION PERCENTAGE
    // ====================================

    let completionPercentage = 0;


    if (totalTasks > 0) {

        completionPercentage =
            Math.round(
                (
                    completedTasks /
                    totalTasks
                ) * 100
            );

    }


    document.getElementById(
        "completionPercentage"
    ).textContent =
        completionPercentage + "%";


    // ====================================
    // PRIORITY COUNTS
    // ====================================

    const criticalTasks =
        userTasks.filter(
            task =>
                task.priority === "Critical"
        ).length;


    const highTasks =
        userTasks.filter(
            task =>
                task.priority === "High"
        ).length;


    const mediumTasks =
        userTasks.filter(
            task =>
                task.priority === "Medium"
        ).length;


    const lowTasks =
        userTasks.filter(
            task =>
                task.priority === "Low"
        ).length;


    document.getElementById(
        "criticalTasks"
    ).textContent =
        criticalTasks;


    document.getElementById(
        "highTasks"
    ).textContent =
        highTasks;


    document.getElementById(
        "mediumTasks"
    ).textContent =
        mediumTasks;


    document.getElementById(
        "lowTasks"
    ).textContent =
        lowTasks;

}


// ========================================
// CATEGORY SUMMARY
// ========================================

function displayCategorySummary() {

    const categorySummary =
        document.getElementById(
            "categorySummary"
        );


    if (!categorySummary) {
        return;
    }


    const userTasks =
        getUserTasks();


    if (userTasks.length === 0) {

        categorySummary.innerHTML = `

            <div class="progress-box">

                <h3>
                    0
                </h3>

                <p>
                    No Tasks
                </p>

            </div>

        `;

        return;

    }


    // COUNT TASKS BY CATEGORY

    const categoryCounts = {};


    userTasks.forEach(
        function (task) {

            const category =
                task.category ||
                "General";


            if (
                categoryCounts[category]
            ) {

                categoryCounts[category]++;

            } else {

                categoryCounts[category] = 1;

            }

        }
    );


    categorySummary.innerHTML = "";


    Object.keys(
        categoryCounts
    ).forEach(
        function (category) {

            const box =
                document.createElement(
                    "div"
                );


            box.className =
                "progress-box";


            box.innerHTML = `

                <h3>
                    ${categoryCounts[category]}
                </h3>

                <p>
                    ${category}
                </p>

            `;


            categorySummary.appendChild(
                box
            );

        }
    );

}


// ========================================
// RECENT TASKS
// ========================================

function displayRecentTasks() {

    const recentTasks =
        document.getElementById(
            "recentTasks"
        );


    if (!recentTasks) {
        return;
    }


    const userTasks =
        getUserTasks();


    if (userTasks.length === 0) {

        recentTasks.innerHTML = `

            <tr>

                <td colspan="5">
                    No recent tasks.
                </td>

            </tr>

        `;

        return;

    }


    // NEWEST TASKS FIRST

    const sortedTasks =
        [...userTasks].sort(
            function (a, b) {

                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );

            }
        );


    // SHOW ONLY 5

    const latestTasks =
        sortedTasks.slice(0, 5);


    recentTasks.innerHTML = "";


    latestTasks.forEach(
        function (task) {

            const row =
                document.createElement(
                    "tr"
                );


            const priorityClass =
                "priority-" +
                task.priority.toLowerCase();


            row.innerHTML = `

                <td>

                    <strong>
                        ${task.name}
                    </strong>

                </td>


                <td>
                    ${task.category || "General"}
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
                    ${task.status}
                </td>

            `;


            recentTasks.appendChild(
                row
            );

        }
    );

}


// ========================================
// SHOW USER NAME
// ========================================

const dashboardUserName =
    document.getElementById(
        "dashboardUserName"
    );


if (dashboardUserName) {

    dashboardUserName.textContent =
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

updateDashboard();

displayCategorySummary();

displayRecentTasks();


// ========================================
// LIVE UPDATE
// ========================================

setInterval(
    function () {

        updateDashboard();

        displayCategorySummary();

        displayRecentTasks();

    },
    1000
);