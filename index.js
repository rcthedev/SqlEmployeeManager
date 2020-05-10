const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

let username;
let password;


// class Minion {
//     constructor(id, first_name, last_name, title, department, salary, manager) {
//         this.id = id;
//         this.first_name = first_name;
//         this.last_name = last_name;
//         this.title = title;
//         this.department = department;
//         this.salary = salary;
//         this.manager = manager;
//     }
// }

// class MinionFunction {
//     constructor(id, title, salary, department) {
//         this.id = id;
//         this.title = title;
//         this.salary = salary;
//         this.department = department;
//     }
// }

const login = [{
    type: "input",
    name: "username",
    message: "What is your MySQL username?"
},

{
    type: "input",
    name: "password",
    message: "What is your MySQL password?"
}]

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

let QueryTimer = function(){
    return new Promise(resolve =>{
        setTimeout(function(){
            resolve(null)
        }, 1700)
    })
}

let init = function(){// runs initial prompt then starts main loop
  
    inquirer.prompt(login).then(function(data){
        const SQLConnectionData = {
            host: "localhost",
            port: 3306,
            user: data.username,
            password: data.password,
            database: "company_db",
            multipleStatements: true
        }


let SQLQuery = function(yourQuery, yourVars){
        // create connection
        let connection = mysql.createConnection(SQLConnectionData);
        //query connection
        connection.query(yourQuery, yourVars, function(err, result){
            if (err){
                console.log(err.code)
                console.log("An error has occured. Check that your inputs were valid and that your username and password were inputted correctly")
                console.log(err)
            }
            else{// log and close connection
                console.log(" ")
                console.table(result)
                console.log("Operation Successful.")
                connection.end()
            }
        })
    }
    


    let SQLStaticQuery = function(yourQuery){
        // create connection
        let connection = mysql.createConnection(SQLConnectionData);
        //query connection
        connection.query(yourQuery, function(err, result){
            if (err){
                console.log(err.code)
                console.log("An error has occured. Check that your inputs were valid and that your username and password were inputted correctly")
                console.log(err)
            }
            else{// log and close connection
                console.log(" ")
                console.table(result)
                console.log("Operation Successful.")
                connection.end()
            }
        })
    }
        
    let restart = function(){
        inquirer.prompt(firstScreen).then(function(data){
            switch(data.action){
                case "View Departments":
                    SQLStaticQuery("select * FROM department")
                    QueryTimer().then(()=>{
                        console.log(" ")
                        restart()
                    })
                break;

                case "View Minion-Functions":
                    SQLStaticQuery("select * FROM roles")
                    QueryTimer().then(()=>{
                        console.log(" ")
                        restart()
                    })
                break;

                case "View Minions":
                    SQLStaticQuery("select * FROM employee")
                    QueryTimer().then(()=>{
                        console.log(" ")
                        restart()
                    })
                break;

                case "Add Department":
                    inquirer.prompt(addDepartment).then(function(data){
                        SQLQuery("insert into department VALUES(?,?);", [data.id, data.department])
                        restart()
                    });
                break;

                case "Add Minion-Function":
                        
                    inquirer.prompt(addMinionFunction).then(function(data){
                        console.log(data)
                        SQLStaticQuery("select id into @departmentVar from department where depName = " + '"' +  data.department + '"' + " limit 1; insert into roles VALUES(" + data.id + ", " + '"' + data.title + '"' + ", " + data.salary + ", @departmentVar);")
                        QueryTimer().then(()=>{
                            console.log(" ")
                            restart()
                        })
                    });
                break;

                case "Add Minion":
                    inquirer.prompt(addMinion).then(function(data){
                        let queryString = "select id into @rolesVar from roles where title = " +  '"' + data.role + '"' + " limit 1; insert into employee VALUES( " + data.id + ', "'+ data.first + '", "' + data.last + '", @rolesVar, ' + data.manager + ");"
                        SQLStaticQuery(queryString)
                        QueryTimer().then(()=>{
                            console.log(" ")
                            restart()
                        })
                    });
                break;

                case "Update Minion's Function":
                    inquirer.prompt(UpdateMinionsFunction).then(function(data){
                        SQLQuery("update employee set role_id = ? where id = ?;", [data.role, data.id])
                        QueryTimer().then(()=>{
                            console.log(" ")
                            restart()
                        })
                    });
                break;
            }
        }
    )}
    restart()
})
}
init()