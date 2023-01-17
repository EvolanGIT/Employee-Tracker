// Imports
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const db = require("./connection/connect.js");


// this object starts the whole tracker.
const questions = () => {
    return inquirer.prompt([
    {
        type: 'list',
        name: 'Start',
        message: 'What would you like to do?',
        choices: ['View All Employees','Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
])
    .then((data) => {
    switch (data.Start) {
        case 'View All Employees':
            viewEmp();
        case 'Add Employee':
            addEmp();
        case 'Update Employee Role':
            updateEmpRole();
        case 'View All Roles':
            viewRoles();
        case 'Add Role':
            addRole();
        case 'View All Departments':
            viewDept();
        case 'Add Department':
            addDept();
        case 'Quit':
            db.quit();
            return
    }})
    .catch((err) => {
        console.error(err);
    });
}

// View Employees
function viewEmp() {
    db.query('SELECT * from employee;', (err, results) =>{
        if (err) throw err;
        console.table(results);
        questions();
    });
}

// View Roles
function viewRoles() {
    db.query('SELECT roles.id, roles.title, roles.salary, department.name AS Department FROM roles INNER JOIN department ON roles.department_id = department.id;', 
    (err, results) =>{
        if (err) throw err;
        console.table(results);
        questions();
    });
}

// View Department
function viewDept() {
    db.query('SELECT * FROM department;', (err, results) =>{
        if (err) throw err;
        console.table(results);
        questions();
    });
}

// This function adds the employee information through inquirer and maps the rest of the columns to use where pertinent.
function addEmp() {
    db.query(
        'SELECT id, first_name, last_name FROM employee', (err,results) => {
            empLi = results.map((employee) => {
            return {
                name: employee.first_name + "/" + employee.last_name,
                value: employee.id
            };
        });
        empLi.push({name: "None", value: "null"});
        db.query('SELECT id, title FROM roles', (err,results) => {
            roleList = results.map((role) =>{
                return {
                    name: role.title,
                    value: role.id
                };
            })
        });
        inquirer.prompt([
            {
                type: "input",
                message: "What's the First Name?",
                name: "firstName",
            },
            {
                type: "input",
                message: "What's the Last Name?",
                name: "lastName",
            },
            {
                type: "list",
                message: "Employee's Role?",
                name: "employeeRole",
                choices: roleList,
            },
            {
                type: "list",
                message: "Employee's Manager?",
                name: "empManager",
                choices: empLi,
            },
        ])
        .then((data) =>{
            let newEmp = data;
            let { firstName, lastName } = newEmp;
            db.query('INSERT INTO employee SET ?',
            {
                first_name: firstName,
                last_name: lastName,
                roles_id: newEmployee.employeeRole,
                manager_Id: newEmployee.empManager
            },
            (err,results) => {
                if (err) console.err(err);
                console.log('New Employee Added successfully.')
                questions();
            }
        )})
    })};


// This function adds a new role to be used wherever needed.
function addRole() {
    db.query("SELECT * FROM department", function (err, results) {
        deptList = results.map((department) => {
        return {
            name: department.title,
            value: department.id,
        };
        });
        inquirer.prompt([
            {
            type: "input",
            message: "Name of Role?",
            name: "title",
            },
            {
            type: "input",
            message: "Salary of the Role?",
            name: "salary",
            },
            {
            type: "list",
            message: "Department role is under?",
            name: "department_id",
            choices: deptList,
            }
        ])
        .then((data) => {
            const sql = `INSERT INTO roles SET ?`;
            db.query(sql, data, function (err, results) {
            if (err) throw err;
            console.log(`Role ${data.title} has been added.`);
            StarterQuestions();
        });
    });
});
}

// This function adds a new Department to the database.
function addDept() {
    inquirer.prompt [(
        {
            type: 'input',
            name: 'newDept',
            message: "Please Specify the new Department's name"
        }
    )]
    then((data) =>{
        let newDept = data;
        let { department } = newDept;
    db.query (
        "INSERT INTO department SET ?",
        { title: department },
        function (err, results) {
        console.table(results);
        console.log("New Department added to the Database.");
        questions();
        });
    });
}

// this function updates the role of any given Employee.
function updateEmpRole() {
    db.query("SELECT id, title FROM roles", function (err, results) {
        roleList = results.map((role) => {
        return { name: role.title, value: role.id };
        });
        db.query("SELECT id, first_name, last_name FROM employee",
        function (err, results) {
            employeeList = results.map((employee) => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
            };
            });
    
    inquirer.prompt([
        {
        type: "list",
        message: "Select employee to update",
        name: "updateEmployee",
        choices: employeeList,
        },
        {
        type: "list",
        message: "Employees new role?",
        name: "newEmployeeRole",
        choices: roleList,
        },
        ])
        .then((data) => {
        db.query("UPDATE employee SET roles_Id = ? WHERE id = ?",
        [data.newEmployeeRole, data.updateEmployee],
        function (err, results) {
        console.log("Employees role is updated!");
        questions();
        });
    });
    });
});
}

questions;