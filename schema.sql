DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Switch to the newly created database to continue with table creation
\c employee_db

CREATE TABLE department (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) UNIQUE NOT NULL
);

INSERT INTO department VALUES (
	('Sales'),
	('Engineering'),
	('Finance'),
	('Legal'),
	('Human Resources');
);


CREATE TABLE role (
	id SERIAL PRIMARY KEY,
	title VARCHAR(30) UNIQUE NOT NULL,
	salary DECIMAL NOT NULL,
	department_id INT NOT NULL,
	FOREIGN KEY (department_id) REFERENCES department(id)
);


INSERT INTO role (title, salary, department_id) VALUES (
	('Salesperson', 100000, 1),
	('Engineer', 120000, 2),
	('Accountant', 125000, 3),
	('Lawyer', 130000, 4),
	('HR Representative', 110000, 5);
)

CREATE TABLE employee (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
	manager_id INT,
	FOREIGN KEY (role_id) REFERENCES role(id),
	FOREIGN KEY (manager_id) REFERENCES employee(id)
);

