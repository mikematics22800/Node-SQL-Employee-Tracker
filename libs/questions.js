export const questions = [
  {  
    "type": "list",
    "name": "option",
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

export const addEmployeeQuestions = [
  {
    "type": "input",
    "name": "first_name",
    "message": "Enter employee first name"
  },
  {
    "type": "input",
    "name": "last_name",
    "message": "Enter employee last name"
  },
  {
    "type": "input",
    "name": "role_id",
    "message": "Enter employee role id"
  },
  {
    "type": "input",
    "name": "manager_id",
    "message": "Enter employee manager id"
  }
]

export const addDepartmentQuestions = [
  {
    "type": "input",
    "name": "department",
    "message": "Enter department name"
  }
]

export const addRoleQuestions = [
  {
    "type": "input",
    "name": "role_id",
    "message": "Enter role id"
  },
  {
    "type": "input",
    "name": "salary",
    "message": "Enter role salary"
  },
  {
    "type": "input",
    "name": "department_id",
    "message": "Enter role department id"
  }
]