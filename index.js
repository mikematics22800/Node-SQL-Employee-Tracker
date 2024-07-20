const inquirer = require('inquirer');
const pool = require('./utils/pool');
const { operations, addDep, addEmp, addRole, delDep, delEmp, delRole, updEmpRole, updEmpMgr, viewBudget, viewEmpByDep, viewEmpByMgr } = require('./utils/questions');

// Displays all employee records in CLI
const viewAllEmployees = () => {
  pool.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
  });
}

// Adds an employee
const addEmployee = () => {
  inquirer.prompt(addEmp).then((answers) => {
    pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, res) => {
      if (err) throw err;
      console.log("Employee added successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

// Updates employee role
const updateEmployeeRole = () => {
  inquirer.prompt(updEmpRole).then((answers) => {
    pool.query('UPDATE employee SET role_id = $1 WHERE employee_id = $2', [answers.role_id, answers.employee_id], (err, res) => {
      if (err) throw err;
      console.log("Employee role updated successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
};

// Displays all roles in CLI
const viewAllRoles = () => {
  pool.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
  });
};

// Adds a new role
const addNewRole = () => {
  inquirer.prompt(addRole).then((answers) => {
    pool.query('INSERT INTO role (role_id, salary, department_id) VALUES ($1, $2, $3)', [answers.role_id, answers.salary, answers.department_id], (err, res) => {
      if (err) throw err;
      console.log("Role added successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

// Displays all departments in CLI
const viewAllDepartments = () => {
  pool.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res.rows);
  });
}

// Adds a new department
const addDepartment = () => { 
  inquirer.prompt(addDep).then((answers) => {
    pool.query('INSERT INTO department (department) VALUES ($1)', [answers.department], (err, res) => {
      if (err) throw err;
      console.log("Department added successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const deleteEmployee = () => {
  inquirer.prompt(delEmp).then((answers) => {
    pool.query('DELETE FROM employee WHERE employee_id = $1', [answers.employee_id], (err, res) => {
      if (err) throw err;
      console.log("Employee deleted successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const deleteRole = () => {
  inquirer.prompt(delRole).then((answers) => {
    pool.query('DELETE FROM role WHERE role_id = $1', [answers.role_id], (err, res) => {
      if (err) throw err;
      console.log("Role deleted successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const deleteDepartment = () => {
  inquirer.prompt(delDep).then((answers) => {
    pool.query('DELETE FROM department WHERE department_id = $1', [answers.department_id], (err, res) => {
      if (err) throw err;
      console.log("Department deleted successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const updateEmployeeManager = () => {
  inquirer.prompt(updEmpMgr).then((answers) => {
    pool.query('UPDATE employee SET manager_id = $1 WHERE employee_id = $2', [answers.manager_id, answers.employee_id], (err, res) => {
      if (err) throw err;
      console.log("Employee manager updated successfully");
    });
  }).catch((error) => {
    console.log(error)
  });
}

const viewEmployeesByManager = () => {
  inquirer.prompt(viewEmpByMgr).then((answers) => {
    pool.query('SELECT first_name, last_name FROM employee WHERE manager_id = $1', [answers.manager_id], (err, res) => {
      if (err) throw err;
      console.table(res.rows);
    });
  }).catch((error) => {
    console.log(error)
  })
}

const viewEmployeesByDepartment = () => {
  inquirer.prompt(viewEmpByDep).then((answers) => {
    pool.query('SELECT first_name, last_name FROM employee WHERE department_id = $1', [answers.department_id], (err, res) => {
      if (err) throw err;
      console.table(res.rows);
    });
  }).catch((error) => {
    console.log(error)
  })
}

const viewDepartmentBudget = () => {
  inquirer.prompt(viewBudget).then((answers) => {
    pool.query('SELECT SUM(salary) FROM role WHERE department_id = $1', [answers.department_id], (err, res) => {
      if (err) throw err;
      console.table(res.rows);
    });
  }).catch((error) => {
    console.log(error)
  })
}

// Performs operation based on user input
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
      addNewRole()
      break;
    case "View All Departments":
      viewAllDepartments()
      break;
    case "Add Department":
      addDepartment()
      break;
    case "Delete Employee":
      deleteEmployee()
      break;
    case "Delete Role":
      deleteRole()
      break;
    case "Delete Department":
      deleteDepartment()
      break;
    case "Update Employee Manager":
      updateEmployeeManager()
      break;
    case "View Employees by Manager":
      viewEmployeesByManager()
      break;
    case "View Employees by Department":
      viewEmployeesByDepartment()
      break;
    case "View Total Utilized Budget by Department":
      viewDepartmentBudget()
      break;
  }
}

// Connect to the database then prompt user to select operation
pool.connect().then(() => {
  inquirer.prompt(operations).then((answer) => {
    manageEmployees(answer.operation)
  }).catch((error) => {
    console.log(error)
  });
}).catch((error) => {
  console.log(error)
})
