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

//choices
const addDepartment = [{
    type: "input",
    name: "id",
    message: "State Minions department Id!"
},

{
    type: "input",
    name: "department",
    message: "State Minions Department Name!"
}]

const addMinionFunction = [{
    type: "input",
    name: "id",
    message: "State Minion-Function ID!"
},

{
    type: "input",
    name: "title",
    message: "State Minions-Function title!"
},
{
    type: "input",
    name: "salary",
    message: "State Minions-Function reward!"
},
{
    type: "input",
    name: "department",
    message: "State Minions-Function Department!"
}]

const addMinion = [{
    type: "input",
    name: "id",
    message: "Minion ID"
},

{
    type: "input",
    name: "first",
    message: "Minion First Name"
},
{
    type: "input",
    name: "last",
    message: "Minion last name?"
},
{
    type: "input",
    name: "role",
    message: "Minion's Function"
},{
    type: "input",
    name: "manager",
    message: "Overseer's Id (If alive)"
}

]

const UpdateMinionsFunction = [{
    type: "input",
    name: "id",
    message: "State Minions id!"
},

{
    type: "input",
    name: "role",
    message: "Minion's new function (by ID)!"
}]


