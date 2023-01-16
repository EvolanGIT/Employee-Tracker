const inquirer = require('inquirer');
const fs = require('fs');

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
            updateEmp();
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
