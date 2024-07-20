const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();
const { operations, addDep, addEmp, addRole, delDep, delEmp, delRole, updEmpRole, updEmpMgr, viewBudget, viewEmpByDep, viewEmpByMgr } = require('./utils/questions');

// Create a new pool to access employee database
const pool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  database: 'employee_db',
});

// Display all employee records in CLI
const viewAllEmployees = async () => {
  try {
    const res = await pool.query('SELECT * FROM employee');
    console.table(res.rows);
  } catch (err) {
    console.log(err);
  }
};

// Create new employee from user input
const addEmployee = async () => {
  try {
    const answers = await inquirer.prompt(addEmp);
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
    console.log("Employee added successfully");
  } catch (err) {
    console.log(err)
  }
}

// Update employee's role from on user input
const updateEmployeeRole = async () => {
  try {
    const answers = await inquirer.prompt(updEmpRole);
    await pool.query('UPDATE employee SET role_id = $1 WHERE employee_id = $2', [answers.role_id, answers.employee_id]);
  } catch (err) {
    console.log(err)
  }
};

// Displays all roles in CLI
const viewAllRoles = async () => {
  try {
    const res = await pool.query('SELECT * FROM role');
    console.table(res.rows);
  } catch (err) {
    console.log(err)
  }
};

// Create new role from user input
const addNewRole = async () => {
  try {
    const answers =  await inquirer.prompt(addRole);
    await pool.query('INSERT INTO role (role_id, salary, department_id) VALUES ($1, $2, $3)', [answers.role_id, answers.salary, answers.department_id]);
    console.log("Role added successfully");
  } catch (err) {
    console.log(err)
  }
}

// Display all departments in CLI
const viewAllDepartments = async () => {
  try {
    const res = await pool.query('SELECT * FROM department');
    console.table(res.rows);
  } catch (err) {
    console.log(err)
  }
}

// Creates new department based on user input
const addDepartment = async () => { 
  try {
    const answers = await inquirer.prompt(addDep);
    await pool.query('INSERT INTO department (department) VALUES ($1)', [answers.department]);
    console.log("Department added successfully");
  } catch (err) {
    console.log(err)
  }
}

// Deletes employee based on user input
const deleteEmployee = async () => {
  try {
    const answers = await inquirer.prompt(delEmp);
    await pool.query('DELETE FROM employee WHERE employee_id = $1', [answers.employee_id]);
    console.log("Employee deleted successfully");
  } catch (err) {
    console.log(err)
  }
}

// Deletes role based on user input
const deleteRole = async () => {
  try {
    const answers = await inquirer.prompt(delRole);
    await pool.query('DELETE FROM role WHERE role_id = $1', [answers.role_id]);
    console.log("Role deleted successfully");
  } catch(err) {
    console.log(err)
  }
}

// Deletes department based on user input
const deleteDepartment = async () => {
  try {
    const answers = await inquirer.prompt(delDep);
    await pool.query('DELETE FROM department WHERE department_id = $1', [answers.department_id]);
    console.log("Department deleted successfully");
  } catch(err) {
    console.log(err)
  }
}

// Updates employee manager based on user input
const updateEmployeeManager = async () => {
  try {
    const answers = await inquirer.prompt(updEmpMgr);
    await pool.query('UPDATE employee SET manager_id = $1 WHERE employee_id = $2', [answers.manager_id, answers.employee_id]);
    console.log("Employee manager updated successfully");
  } catch (err) {
    console.log(err)
  }
}

// Displays all employees under specified manager in CLI
const viewEmployeesByManager = async () => {
  try {
    const res = await pool.query('SELECT manager_id FROM employee');
    console.table(res.rows);
  } catch(err) {
    console.log(err)
  }
}

// Displays all employees in specified department in CLI
const viewEmployeesByDepartment = async () => {
  try {
    const res = await pool.query('SELECT department_id FROM employee');
    console.table(res.rows);
  } catch(err) {
    console.log(err)
  }
}

// Displays total budget for specified department in CLI
const viewDepartmentBudget = async () => {
  try {
    const res = await pool.query('SELECT department_id FROM role');
    console.table(res.rows);
  } catch(err) {
    console.log(err)
  }
}

// Performs operation based on user input
const manageEmployees = (operation) => {
  switch (operation) {
    case "View All Employees":
      viewAllEmployees().then(() => {
        promptOperation()
      })
      break;
    case "Add Employee":
      addEmployee().then(() => {
        promptOperation()
      })
      break;
    case "Update Employee Role":
      updateEmployeeRole().then(() => {
        promptOperation()
      })
      break;
    case "View All Roles":
      viewAllRoles().then(() => {
        promptOperation()
      })
      break;
    case "Add Role":
      addNewRole().then(() => {
        promptOperation()
      })
      break;
    case "View All Departments":
      viewAllDepartments().then(() => {
        promptOperation()
      })
      break;
    case "Add Department":
      addDepartment().then(() => {
        promptOperation()
      })
      break;
    case "Delete Employee":
      deleteEmployee().then(() => {
        promptOperation()
      })
      break;
    case "Delete Role":
      deleteRole().then(() => {
        promptOperation()
      })
      break;
    case "Delete Department":
      deleteDepartment().then(() => {
        promptOperation()
      })
      break;
    case "Update Employee Manager":
      updateEmployeeManager().then(() => {
        promptOperation()
      })
      break;
    case "View Employees by Manager":
      viewEmployeesByManager().then(() => {
        promptOperation()
      })
      break;
    case "View Employees by Department":
      viewEmployeesByDepartment().then(() => {
        promptOperation()
      })
      break;
    case "View Total Utilized Budget by Department":
      viewDepartmentBudget().then(() => {
        promptOperation()
      })
      break;
    case "Quit":
      pool.end()
      break;
  }
}

const promptOperation = () => {
  inquirer.prompt(operations).then((answer) => {
    manageEmployees(answer.operation)
  }).catch((error) => {
    console.log(error)
  });
}

// Connect to the database then prompt user to select operation
pool.connect().then(() => {
  promptOperation()
}).catch((error) => {
  console.log(error)
})
