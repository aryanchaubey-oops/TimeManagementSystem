// ========================================
// REGISTER
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const role =
            document.getElementById("role").value;


        // ====================================
        // CHECK PASSWORD
        // ====================================

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // ====================================
        // GET EXISTING USERS
        // ====================================

        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        // ====================================
        // CHECK DUPLICATE EMAIL
        // ====================================

        const existingUser =
            users.find(
                user => user.email === email
            );


        if (existingUser) {

            alert("Email already registered!");

            return;
        }


        // ====================================
        // CREATE NEW USER
        // ====================================

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            role: role

        };


        // ====================================
        // SAVE USER
        // ====================================

        users.push(newUser);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        alert(
            "Account created successfully!"
        );


        // ====================================
        // GO TO LOGIN
        // ====================================

        window.location.href =
            "login.html";

    });

}



// ========================================
// LOGIN
// ========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "email"
                ).value.trim().toLowerCase();


            const password =
                document.getElementById(
                    "password"
                ).value;


            // =================================
            // GET USERS
            // =================================

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            // =================================
            // FIND USER
            // =================================

            const user =
                users.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            // =================================
            // INVALID LOGIN
            // =================================

            if (!user) {

                alert(
                    "Invalid email or password!"
                );

                return;
            }


            // =================================
            // SAVE CURRENT USER
            // =================================

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            alert(
                "Login successful!"
            );


            // =================================
            // ROLE BASED REDIRECT
            // =================================

            if (user.role === "ADMIN") {

                window.location.href =
                    "admin-dashboard.html";

            } else {

                window.location.href =
                    "dashboard.html";

            }

        }
    );

}