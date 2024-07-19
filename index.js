const inquirer = require('inquirer');
const {operations, addDepartmentQuestions, addEmployeeQuestions, addRoleQuestions} = require('./libs/questions.js');
const { Pool } = require('pg');

console.log(process.env.PASSWORD)

const pool = new Pool({
  user: 'postgres',
  password: 'psql69420',
  host: 'localhost',
  database: 'employee_db',
});

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
  inquirer.prompt(addRoleQuestions).then((answers) => {
    pool.query('INSERT INTO role (role_id, salary, department_id) VALUES ($1, $2, $3)', [answers.role_id, answers.salary, answers.department_id], (err, res) => {
      if (err) throw err;
      console.log("Role added successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const viewAllDepartments = () => {
  pool.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
  });
}

const addDepartment = () => { 
  inquirer.prompt(addDepartmentQuestions).then((answers) => {
    pool.query('INSERT INTO department (department) VALUES ($1)', [answers.department], (err, res) => {
      if (err) throw err;
      console.log("Department added successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const manageEmployees = (operation) => {
  switch (operation) {
    case "View All Employees":
      viewAllEmployees()
      break;
    case "Add Employee":
      addEmployee()
      break;
    case "Update Employee Role":
      updateEmployeeRole()
      break;
    case "View All Roles":
      viewAllRoles()
      break;
    case "Add Role":
      addRole()
      break;
    case "View All Departments":
      viewAllDepartments()
      break;
    case "Add Department":
      addDepartment()
      break;
    default:
      console.log("Invalid option");
  }
}

pool.connect().then(() => {
  inquirer.prompt(operations).then((answer) => {
    manageEmployees(answer.operation)
  }).catch((error) => {
    console.log(error)
  });
}).catch((error) => {
  console.log(error)
})
