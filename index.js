import inquirer from "inquirer";
import pg from "pg";
const { Pool } = pg;
import {questions, addDepartmentQuestions, addEmployeeQuestions, addRoleQuestions} from "./libs/questions.js"

// Connect to database
const pool = new Pool({
  user: 'postgres',
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  database: 'employee_db',
});

pool.connect();

const viewAllEmployees = () => {
  pool.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
  });
}

const addEmployee = () => {
  inquirer.prompt(addEmployeeQuestions).then((answers) => {
    pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, res) => {
      if (err) throw err;
      console.log("Employee added successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const updateEmployeeRole = () => {
  pool.query('SELECT first_name, last_name FROM employee', (err, res) => {
    if (err) throw err;
    const employees = res.rows.map(row => `${row.first_name} ${row.last_name}`)
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Select employee',
        choices: employees,
      },
    ])
  });
};

const viewAllRoles = () => {
  pool.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
  });
};

const addRole = () => {

}

const viewAllDepartments = () => {

}

const addDepartment = () => { 

}

const manageEmployees = (answers) => {
  if (answers.option  == "View All Employees") {
    viewAllEmployees()
  } else if (answers.option == "Add Employee") {
    addEmployee()
  } else if (answers.option == "Update Employee Role") {
    updateEmployeeRole()
  } else if (answers.option == "View All Roles") {
    viewAllRoles()
  } else if (answers.option == "Add Role") {
    addRole()
  } else if (answers.option == "View All Departments") {
    viewAllDepartments()
  } else if (answers.option == "Add Department") {
    addDepartment()
  } else {
    console.log("Invalid option");
  }
}

inquirer.prompt(questions).then((answers) => {
  manageEmployees(answers)
}).catch((error) => {
  console.log(error)
});
