const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "login.html";
}

function displayProfile() {
    const name = currentUser.name || "User";
    const email = currentUser.email || "-";
    const role = currentUser.role || "USER";

    ['profileHeaderName', 'profileName', 'infoName'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = name;
    });

    ['profileEmail', 'infoEmail'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = email;
    });

    ['profileRole', 'infoRole'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = role;
    });
}

async function updateActivitySummary() {
    try {
        const response = await fetch(`http://localhost:8080/api/tasks?email=${currentUser.email}`);
        if (!response.ok) return;
        const userTasks = await response.json();

        const totalTasks = userTasks.length;
        const completedTasks = userTasks.filter(t => t.status === "COMPLETED").length;
        const pendingTasks = userTasks.filter(t => t.status !== "COMPLETED").length;

        let totalTimeSeconds = 0;
        userTasks.forEach(t => { totalTimeSeconds += (t.timeSpentMinutes || 0) * 60; });

        document.getElementById("profileTotalTasks").textContent = totalTasks;
        document.getElementById("profileCompletedTasks").textContent = completedTasks;
        document.getElementById("profilePendingTasks").textContent = pendingTasks;
        
        const hours = Math.floor(totalTimeSeconds / 3600);
        const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
        document.getElementById("profileTotalTime").textContent = `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:00`;
    } catch (e) {
        console.error(e);
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

displayProfile();
updateActivitySummary();
