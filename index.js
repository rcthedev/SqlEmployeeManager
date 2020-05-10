const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host:"localhost",
    port: 3000, 
    user:"root", 
    password: "root", 
    database:"company_db", 
    multipleStatements: true
});

connection.connect(function(error) {
    if (error) {
        console.error(error.stack);
        return;
    }
    promptUsr(); 
});

class Minion {
    constructor(id, first_name, last_name, title, department, salary, manager) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }
}

class MinionFunction {
    constructor(id, title, salary, department) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department = department;
    }
}

const firstScreen = {
    type: "list",
    name: "action",
    message: "Input Directive",
    choices: ["View Departments", "View Minion-Functions", "View Minions", "Add Department", "Add Minion-Function", "Add Minion", "Update Minion's Function"]
}

