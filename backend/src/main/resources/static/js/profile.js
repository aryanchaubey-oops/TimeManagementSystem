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
// GET USER TASKS
// ========================================

function getUserTasks() {

    const tasks =
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
// DISPLAY PROFILE
// ========================================

function displayProfile() {

    const name =
        currentUser.name || "User";

    const email =
        currentUser.email || "-";

    const role =
        currentUser.role || "USER";


    // HEADER

    const profileHeaderName =
        document.getElementById(
            "profileHeaderName"
        );

    if (profileHeaderName) {

        profileHeaderName.textContent =
            name;

    }


    // PROFILE CARD

    const profileName =
        document.getElementById(
            "profileName"
        );

    if (profileName) {

        profileName.textContent =
            name;

    }


    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    if (profileEmail) {

        profileEmail.textContent =
            email;

    }


    const profileRole =
        document.getElementById(
            "profileRole"
        );

    if (profileRole) {

        profileRole.textContent =
            role;

    }


    // ACCOUNT INFORMATION

    const infoName =
        document.getElementById(
            "infoName"
        );

    if (infoName) {

        infoName.textContent =
            name;

    }


    const infoEmail =
        document.getElementById(
            "infoEmail"
        );

    if (infoEmail) {

        infoEmail.textContent =
            email;

    }


    const infoRole =
        document.getElementById(
            "infoRole"
        );

    if (infoRole) {

        infoRole.textContent =
            role;

    }

}


// ========================================
// ACTIVITY SUMMARY
// ========================================

function updateActivitySummary() {

    const userTasks =
        getUserTasks();


    const totalTasks =
        userTasks.length;


    const completedTasks =
        userTasks.filter(
            task =>
                task.status ===
                "Completed"
        ).length;


    const pendingTasks =
        userTasks.filter(
            task =>
                task.status !==
                "Completed"
        ).length;


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


    document.getElementById(
        "profileTotalTasks"
    ).textContent =
        totalTasks;


    document.getElementById(
        "profileCompletedTasks"
    ).textContent =
        completedTasks;


    document.getElementById(
        "profilePendingTasks"
    ).textContent =
        pendingTasks;


    document.getElementById(
        "profileTotalTime"
    ).textContent =
        formatTime(
            totalTimeSeconds
        );

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

displayProfile();

updateActivitySummary();


// ========================================
// LIVE UPDATE
// ========================================

setInterval(
    function () {

        updateActivitySummary();

    },
    1000
);