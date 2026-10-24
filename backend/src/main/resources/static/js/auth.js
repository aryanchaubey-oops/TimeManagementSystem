// ========================================
// REGISTER (Connected to Spring Boot REST API)
// ========================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const role = document.getElementById("role").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Registration failed!");
            }

            alert("Account created successfully in Database!");
            window.location.href = "login.html";
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}

// ========================================
// LOGIN (Connected to Spring Boot REST API)
// ========================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Invalid email or password!");
            }

            const user = await response.json();

            // Save logged-in user session
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("Login successful!");

            if (user.role === "ADMIN") {
                window.location.href = "admin-dashboard.html";
            } else {
                window.location.href = "dashboard.html";
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    });
}
