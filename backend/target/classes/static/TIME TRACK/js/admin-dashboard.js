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
// ADMIN ACCESS CHECK
// ========================================

if (currentUser.role !== "ADMIN") {

    alert(
        "Access denied! Admin only."
    );

    window.location.href =
        "dashboard.html";

}



// ========================================
// LOAD DATA
// ========================================

let users =
    JSON.parse(
        localStorage.getItem("users")
    ) || [];


let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


let categories =
    JSON.parse(
        localStorage.getItem("categories")
    ) || [];



// ========================================
// PERFORMANCE METRICS
// ========================================

function updateMetrics() {

    const totalUsers =
        users.filter(
            user => user.role === "USER"
        ).length;


    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(
            task => task.status === "Completed"
        ).length;


    const pendingTasks =
        tasks.filter(
            task => task.status !== "Completed"
        ).length;


    document.getElementById(
        "totalUsers"
    ).textContent = totalUsers;


    document.getElementById(
        "totalTasks"
    ).textContent = totalTasks;


    document.getElementById(
        "completedTasks"
    ).textContent = completedTasks;


    document.getElementById(
        "pendingTasks"
    ).textContent = pendingTasks;

}


updateMetrics();



// ========================================
// PRIORITY RULE
// ========================================

const priorityRuleForm =
    document.getElementById(
        "priorityRuleForm"
    );


if (priorityRuleForm) {

    priorityRuleForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const importance =
                document.getElementById(
                    "ruleImportance"
                ).value;


            const days =
                document.getElementById(
                    "ruleDays"
                ).value;


            const rules =
                JSON.parse(
                    localStorage.getItem(
                        "priorityRules"
                    )
                ) || [];


            const newRule = {

                id: Date.now(),

                importance: importance,

                days: Number(days)

            };


            rules.push(newRule);


            localStorage.setItem(
                "priorityRules",
                JSON.stringify(rules)
            );


            alert(
                "Priority rule saved successfully!"
            );


            priorityRuleForm.reset();

        }
    );

}



// ========================================
// ADD CATEGORY
// ========================================

const categoryForm =
    document.getElementById(
        "categoryForm"
    );


if (categoryForm) {

    categoryForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const categoryName =
                document.getElementById(
                    "categoryName"
                ).value.trim();


            if (!categoryName) {

                alert(
                    "Please enter a category name."
                );

                return;

            }


            const existingCategory =
                categories.find(
                    category =>
                        category.name.toLowerCase() ===
                        categoryName.toLowerCase()
                );


            if (existingCategory) {

                alert(
                    "Category already exists!"
                );

                return;

            }


            const newCategory = {

                id: Date.now(),

                name: categoryName

            };


            categories.push(
                newCategory
            );


            localStorage.setItem(
                "categories",
                JSON.stringify(categories)
            );


            alert(
                "Category added successfully!"
            );


            document.getElementById(
                "categoryName"
            ).value = "";


            displayCategories();

        }
    );

}



// ========================================
// DISPLAY CATEGORIES
// ========================================

function displayCategories() {

    const categoryList =
        document.getElementById(
            "categoryList"
        );


    if (!categoryList) {
        return;
    }


    const savedCategories =
        JSON.parse(
            localStorage.getItem(
                "categories"
            )
        ) || [];


    if (savedCategories.length === 0) {

        categoryList.innerHTML = `
            <tr>
                <td colspan="2">
                    No categories added yet.
                </td>
            </tr>
        `;

        return;
    }


    categoryList.innerHTML = "";


    savedCategories.forEach(
        function (category) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${category.name}
                </td>

                <td>

                    <button
                        onclick="deleteCategory(${category.id})"
                        style="
                            background:#ff4d4d;
                            color:white;
                            border:none;
                            padding:7px 12px;
                            border-radius:6px;
                            cursor:pointer;
                        "
                    >
                        Delete
                    </button>

                </td>

            `;


            categoryList.appendChild(row);

        }
    );

}


displayCategories();



// ========================================
// DELETE CATEGORY
// ========================================

function deleteCategory(categoryId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this category?"
        );


    if (!confirmDelete) {
        return;
    }


    let savedCategories =
        JSON.parse(
            localStorage.getItem(
                "categories"
            )
        ) || [];


    savedCategories =
        savedCategories.filter(
            category =>
                category.id !== categoryId
        );


    localStorage.setItem(
        "categories",
        JSON.stringify(
            savedCategories
        )
    );


    displayCategories();

}



// ========================================
// USER MANAGEMENT
// ========================================

function displayUsers() {

    const userList =
        document.getElementById(
            "userList"
        );


    if (!userList) {
        return;
    }


    const savedUsers =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const normalUsers =
        savedUsers.filter(
            user => user.role === "USER"
        );


    if (normalUsers.length === 0) {

        userList.innerHTML = `
            <tr>
                <td colspan="4">
                    No users available.
                </td>
            </tr>
        `;

        return;
    }


    userList.innerHTML = "";


    normalUsers.forEach(
        function (user) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>
                        ${user.name}
                    </strong>
                </td>

                <td>
                    ${user.email}
                </td>

                <td>

                    <span class="priority-badge priority-low">
                        ${user.role}
                    </span>

                </td>

                <td>

                    <button
                        onclick="deleteUser(${user.id})"
                        style="
                            background:#ff4d4d;
                            color:white;
                            border:none;
                            padding:7px 12px;
                            border-radius:6px;
                            cursor:pointer;
                        "
                    >
                        Delete
                    </button>

                </td>

            `;


            userList.appendChild(row);

        }
    );

}


displayUsers();



// ========================================
// DELETE USER
// ========================================

function deleteUser(userId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this user?"
        );


    if (!confirmDelete) {
        return;
    }


    let savedUsers =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    savedUsers =
        savedUsers.filter(
            user => user.id !== userId
        );


    localStorage.setItem(
        "users",
        JSON.stringify(savedUsers)
    );


    users = savedUsers;


    displayUsers();


    updateMetrics();


    alert(
        "User deleted successfully!"
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