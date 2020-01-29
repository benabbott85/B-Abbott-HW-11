const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "4585bryant",
    database: "employeeDB"
})


const employeeArray = [];

// function userInput() {
//     inquirer
//         .prompt({
//             type: "input",
//             message: "What is the Team Member being set up?",
//             name: "askName",
//         }
//         ).then(function (response) {
//             employeeArray.push(response.askName);
//             statusEmployee();
//         })
// }

function statusEmployee() {
    console.log("Welcome to the Employee Management System")
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do today?",
                name: "choice",
                choices: ["Add Department",
                    "Add Role",
                    "Add Employee",
                    "View Deparments",
                    "View Roles",
                    "View Employees",
                    "Update Employee Role",
                    "Exit"]
            }).then(function (response) {
                var choice = response.choice;
                switch (choice){
                    case "Add Department":
                        addDepartment();
                        break;
                    case "Add Role":
                        addRole();
                        break;
                    case "Add Employee":
                        addQuestions()
                        break;
                    case "View Departments":
                        viewDepartments();
                        break;
                    case "View Roles":
                        viewRoles();
                        break;
                    case "View Employees":
                        viewEmployees();
                        break;
                    case "Update Employee Role":
                        updateRole();
                        break;
                    case "Exit":
                        connection.end();
                }
            });

}


function addDepartment(){
    inquirer
    .prompt ([
        {
            type: "input",
            message: "What is the new departments name?",
            name: "newDepartment"
        }
    ]). then (function(response){
        var queryString= "INSERT INTO department (name) VALUES (?)";
        var query = connection.query(queryString, response.newDepartment, function (error, response){
            if (error) throw error;
            statusEmployee();
        });
    });
};

function addRole(){
    const depratmentList = [];
    let departmentObjects;
    connection.query("SELECT * FROM deparment", function (error, response){
        if(error) throw error;
        for (const item of response){
            depratmentList.push(item.name);
            departmentObjects= response;
        }
        inquirer
        .prompt ([
            {
                type: "input",
                message: "What is the new role you would like to add?",
                name: "newRole"
            },
            {
                type: "input",
                message: "What is the Salary for the new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "What department is this new role part of?",
                name: "department",
                choices: departmentList
            }
        ]).then(function(response){
            let departmentId;
            for (const item of departmentObjects){
                if (item.name === response.department){
                    departmentId = item.id;
                };
            };
            connection.query (
                "INSERT INTO role SET ?",
                {
                    title: response.newRole,
                    salarry: response.salary,
                    department_id: departmentId
                },
                function (error, response) {
                    if (error) throw error;
                    statusEmployee();
                }
            );
        });
    });
};
function addQuestions() {
    const employeeList =["none"];
    const roleList = [];
    let employeeObjects;
    let roleObjects;

    connection.query("SELECT * FROM employee", function(error, response){
        if (error) throw error;
        for (const item of response){
            employeeList.push(item.first_name + " " + item.last_name);
            employeeObjects = response;
        }
        connection.query("SELECT * FROM role", function (error, response){
            if (error) throw error;
            for (const item of response){
                roleList.push(item.title);
                roleObjects = response;
            }
        })
    })
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the new employees first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the new employees last name?",
                name: "lastName"
            },
            {
                type: "list",
                message: "Select the employees role",
                name: "role",
                choices: roleList
            },
            {
                type: "list",
                message: "Select the new employees manager",
                name: "manager",
                choices: employeeList
            },
            {
                type: "input",
                message: "Would you like to add, remove or update another employee?",
                name: "addContinue",
                choices: ["yes", "no"]
            }
        ]).then(function (response) {
            let managerId;
            let roleId;

            if (response.manager === "none"){
                managerId= null;
            } else {
                for (const item of employeeObjects){
                    if ((item.first_name + " " + item.last_name) === response.manager){
                        managerId = item.id;
                    };
                };
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: roleId,
                        manager_id: managerId
                    },
                    function (error, response){
                        if (error) throw error;
                        statusEmployee();
                    }
                );
            };
        });
};

function viewDepartments(){
    connection.query("SELECT * FROM department", function (error, response){
        if (error) throw error;
        console.table(response);
        statusEmployee();
    });
};

function viewRoles(){
    connection.query("SELECT * FROM role", function (error, response){
        if (error) throw error;
        console.table(response);
        statusEmployee();
    });
};

function viewEmployees(){
    connection.query("SELECT * FROM employee", function (error, response){
        if (error) throw error;
        console.table(response);
        statusEmployee();
    });
};

function updateRole() {
    var employeeList = ["none"];
    var employeeObjects;
    const roleList = [];
    let roleObjects;
    connection.query("SELECT * FROM employee", function (error, response){
        if (error) throw error;
        for (const item of response){
            employeeList.push(item.first_name + " " + item.last_name);
            employeeObjects = response;
        }
        connection.query("SELECT * FROM role", function (error, response){
            if (error) throw error;
            for (const item of response){
                roleList.push(item.title);
                roleObjects= response;
            }
        })
        inquirer
        .prompt ([
            {
                type: "list",
                message: "Which employees role would you like to change?",
                name: "employee",
                choices: employeeList
            },
            {
                type: "list",
                message: "What would you like their new role to be?",
                name: "newRole",
                choices: roleList
            }
        ]).then(function (response){
            let employeeId;
            let roleId;
            if (response.employee === "none"){
                statusEmployee();
            } else {
                for (const item of employeeObjects){
                    if ((item.first_name + " " + item.last_name) === response.employee){
                        employeeId = item.id;

                    };
                };
            };
            for (const item of roleObjects){
                if ((item.title) === response.newRole){
                    roleId = item.id;
                };
            };
            connection.query ("UPDATE employee SET ? WHERE?",
            [
                {
                    role_id : roleId
                },
                {
                    id : employeeId
                }
            ],
            function (error, response){
                if(error) throw error;
                statusEmployee()
            });
            
            
        });
    });
};

connection.connect(function(error){
    if(error) throw error;
})

statusEmployee();

// function removeQuestions() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "Enter reason for termination:",
//                 name: "removeReason",
//             },
//             {
//                 type: "input",
//                 message: "Enter termination date for employee?",
//                 name: "removeDate",
//             },
//             {
//                 type: "input",
//                 message: "Would you like to add, remove, or update another employee?",
//                 name: "removeContinue",
//                 choices: ["yes", "no"]
//             }
//         ]).then(function (response) {
//             const remove = new Remove(response.removeReason, response.removeDate, response.removeContinue);
//             employeeArray.push(remove);
//             if (response.removeContinue === "no") {
//                 afterPrompts();
//             } else {
//                 statusEmployee();
//             }
//         })

//     return connection.query(
//         "DELETE FROM employee WHERE id=?"
//     )
// }

// function updateQuestions() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "Enter the employees new role:",
//                 name: "updateRole",
//                 choices: ["VP Sales", "Sales Manager", "Software Engineer", "Quality Assurance"]
//             },
//             {
//                 type: "input",
//                 message: "Enter the employees new salary/hourly rate:",
//                 name: "updateSalary",
//             },
//             {
//                 type: "input",
//                 message: "Would you like to add, remove, or update another employee?",
//                 name: "updateContinue",
//                 choices: ["yes", "no"]
//             }

//         ]).then(function (response) {
//             const update = new Update(response.updateRole, response.updateSalary, response.updateContinue);
//             employeeArray.push(update);
//             if (response.updateContinue === "no") {
//                 afterPrompts();
//             } else {
//                 statusEmployee();
//             }
//         });

//     return connection.query(
//         "UPDATE employee SET role_id =?"
//     )
// }

// function viewQuestions() {
//     inquirer
//     // .prompt([
//     //     {
//     //         type: "input",
//     //         message: "Would you like to view all employees at this company?",
//     //         name: "viewAll",
//     //         choices: ["yes", "no"]
//     //     },
//     //     {
//     //         type:"input",
//     //         message: "Would you like to add, remove, or update another employee?",
//     //         name: "viewContinue",
//     //         choices: ["yes", "no"]
//     //     }

//     // ]) .then (function (response){
//     //     const view = new View (response.viewAll, response.viewContinue);
//     //     employeeArray.push(view);
//     //     if (response.viewContinue === "no"){
//     //         afterPrompts();
//     //     } else {
//     //         statusEmployee();
//     //     }

//     // })
//     return connection.query(
//         ("SELECT * FROM employee", function (error, response) {
//             if (error) throw error;
//             console.table(response)
//             userInput()
//         })

//     )
//         =


// function viewDepartment() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 message: "Which deparments employees would you like to see?",
//                 name: "departmentEmployees"
//             },
//             {
//                 type: "input",
//                 message: "Would you like to add, remove, or update another employee?",
//                 name: "deparmentContinue",
//                 choices: ["yes", "no"]
//             }
//         ]).then(function (response) {
//             const deparment = new Department(response.departmentEmployees, response.deparmentContinue);
//             employeeArray.push(department);
//             if (response.departmentContinue === "no") {
//                 afterPrompts();
//             } else {
//                 statusEmployee();
//             }
//         })
//     return connection.query(
//         "SELECT * department.id, department.name FROM department"
//     )
// }

// function viewRole() {
//     //     inquirer
//     //     .prompt ([
//     //         {
//     //             type: "input",
//     //             message: "Which roles would you like to see a list of?",
//     //             name: "roleEmloyees"
//     //         },
//     //         {
//     //             type: "input",
//     //             message: "Would you like to add, remove, or update another employee?",
//     //             name: "roleContinue",
//     //             choices: ["yes", "no"]
//     //         }

//     //     ]).then (function(response){
//     //         const role = new Role (response.roleEmployees, response.roleContinue);
//     //         employeeArray.push(role);
//     //         if (response.roleContinue === "no"){
//     //             afterPrompts();
//     //         } else {
//     //             statusEmployee();
//     //         }
//     //     })
//     return connection.query(
//         "SELECT * position.title, position.salary, position.department_id FROM position")
// }



// function afterPrompts() {
//     const outputHtml = generateHTML(employeeArray);

//     fs.writeFile(`${employeeArray[0]}.html`, outputHtml, (error) => {
//         if (error) throw error;
//         console.log(`The team profile has been saved to ${employeeArray[0]}.html`)
//     })
// }

// userInput();