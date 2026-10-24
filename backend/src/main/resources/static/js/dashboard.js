// ========================================
// CHECK LOGIN
// ========================================
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "login.html";
}

const dashboardUserName = document.getElementById("dashboardUserName");
if (dashboardUserName) {
    dashboardUserName.textContent = currentUser.name;
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
// UPDATE DASHBOARD METRICS FROM DATABASE
// ========================================
async function updateDashboard() {
    try {
        const response = await fetch(`http://localhost:8080/api/tasks?email=${currentUser.email}`);
        if (!response.ok) throw new Error("Failed to fetch dashboard data");
        const userTasks = await response.json();

        const totalTasks = userTasks.length;
        const completedTasks = userTasks.filter(t => t.status === "COMPLETED").length;
        const pendingTasks = userTasks.filter(t => t.status !== "COMPLETED").length;

        let totalTimeSeconds = 0;
        userTasks.forEach(t => {
            totalTimeSeconds += (t.timeSpentMinutes || 0) * 60;
        });

        document.getElementById("totalTasks").textContent = totalTasks;
        document.getElementById("completedTasks").textContent = completedTasks;
        document.getElementById("pendingTasks").textContent = pendingTasks;
        document.getElementById("totalTime").textContent = formatTime(totalTimeSeconds);

        let completionPercentage = 0;
        if (totalTasks > 0) {
            completionPercentage = Math.round((completedTasks / totalTasks) * 100);
        }
        document.getElementById("completionPercentage").textContent = completionPercentage + "%";

        // Priority breakdown
        const highTasks = userTasks.filter(t => t.priority === "HIGH").length;
        const mediumTasks = userTasks.filter(t => t.priority === "MEDIUM").length;
        const lowTasks = userTasks.filter(t => t.priority === "LOW").length;

        const highEl = document.getElementById("highTasks");
        const medEl = document.getElementById("mediumTasks");
        const lowEl = document.getElementById("lowTasks");
        const critEl = document.getElementById("criticalTasks");

        if (highEl) highEl.textContent = highTasks;
        if (medEl) medEl.textContent = mediumTasks;
        if (lowEl) lowEl.textContent = lowTasks;
        if (critEl) critEl.textContent = highTasks; // mapping critical to high

        // Category summary
        displayCategorySummary(userTasks);
        displayRecentTasks(userTasks);

    } catch (error) {
        console.error("Error updating dashboard:", error);
    }
}

function displayCategorySummary(userTasks) {
    const categorySummary = document.getElementById("categorySummary");
    if (!categorySummary) return;

    if (userTasks.length === 0) {
        categorySummary.innerHTML = `<div class="progress-box"><h3>0</h3><p>No Tasks</p></div>`;
        return;
    }

    const categoryCounts = {};
    userTasks.forEach(task => {
        const cat = task.category || "General";
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    categorySummary.innerHTML = "";
    Object.keys(categoryCounts).forEach(cat => {
        const box = document.createElement("div");
        box.className = "progress-box";
        box.innerHTML = `<h3>${categoryCounts[cat]}</h3><p>${cat}</p>`;
        categorySummary.appendChild(box);
    });
}

function displayRecentTasks(userTasks) {
    const recentTasks = document.getElementById("recentTasks");
    if (!recentTasks) return;

    if (userTasks.length === 0) {
        recentTasks.innerHTML = `<tr><td colspan="5">No recent tasks.</td></tr>`;
        return;
    }

    const latestTasks = [...userTasks].slice(-5).reverse();
    recentTasks.innerHTML = "";

    latestTasks.forEach(task => {
        const row = document.createElement("tr");
        const priorityClass = "priority-" + task.priority.toLowerCase();
        row.innerHTML = `
            <td><strong>${task.name}</strong></td>
            <td>${task.category || "General"}</td>
            <td><span class="priority-badge ${priorityClass}">${task.priority}</span></td>
            <td>${task.deadline || "-"}</td>
            <td>${task.status}</td>
        `;
        recentTasks.appendChild(row);
    });
}

// ========================================
// LOGOUT
// ========================================
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// ========================================
// INITIAL LOAD & INTERVAL
// ========================================
updateDashboard();
setInterval(updateDashboard, 5000);
