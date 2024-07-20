const operations = [
  {  
    "type": "list",
    "name": "operation",
    "message": "What would you like to do?",
    "choices": [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Update Employee Manager",
      "View Employees by Manager",
      "View Employees by Department",
      "Delete Employee",
      "Delete Role",
      "Delete Department",
      "View Total Utilized Budget by Department",
      "Quit"
    ]
  }
]

const addDep = [
  {
    "type": "input",
    "name": "department",
    "message": "Enter department name:"
  }
]

const addEmp = [
  {
    "type": "input",
    "name": "first_name",
    "message": "Enter first name:"
  },
  {
    "type": "input",
    "name": "last_name",
    "message": "Enter last name:"
  },
  {
    "type": "input",
    "name": "role_id",
    "message": "Enter role id:"
  },
  {
    "type": "input",
    "name": "manager_id",
    "message": "Enter manager id:"
  }
]

const addRole = [
  {
    "type": "input",
    "name": "role_id",
    "message": "Enter role id:"
  },
  {
    "type": "input",
    "name": "salary",
    "message": "Enter role salary:"
  },
  {
    "type": "input",
    "name": "department_id",
    "message": "Enter department id:"
  }
]

const delDep = [
  {
    "type": "input",
    "name": "department_id",
    "message": "Enter depeartment id:"
  },
]

const delEmp = [
  {
    "type": "input",
    "name": "employee_id",
    "message": "Enter employee id:"
  },
]

const delRole = [
  {
    "type": "input",
    "name": "role_id",
    "message": "Enter role id:"
  },
]

const updEmpRole = [
  {
    "type": "input",
    "name": "employee_id",
    "message": "Enter employee id:"
  },
  {
    "type": "input",
    "name": "role_id",
    "message": "Enter role id:"
  }
]

const updEmpMgr = [
  {
    "type": "input",
    "name": "employee_id",
    "message": "Enter employee id:"
  },
  {
    "type": "input",
    "name": "manager_id",
    "message": "Enter manager id:"
  }

]

const viewBudget = [
  {
    "type": "input",
    "name": "department_id",
    "message": "Enter department id:"
  },
]

const viewEmpByDep = [
  {
    "type": "list",
    "name": "department_id",
    "message": "Enter department id:"
  },
]

const viewEmpByMgr = [
  {
    "type": "list",
    "name": "manager_id",
    "message": "Enter manager id:"
  },
]

module.exports = { operations, addDep, addEmp, addRole, delDep, delEmp, delRole, updEmpRole, updEmpMgr, viewBudget, viewEmpByDep, viewEmpByMgr }