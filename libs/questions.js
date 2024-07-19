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
      "Add Department"
    ]
  }
]

const addEmployeeQuestions = [
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

const addDepartmentQuestions = [
  {
    "type": "input",
    "name": "department",
    "message": "Enter department name:"
  }
]

const addRoleQuestions = [
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
    "message": "Enter role department id:"
  }
]

module.exports = {operations, addEmployeeQuestions, addDepartmentQuestions, addRoleQuestions};