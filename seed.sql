-- DROP DATABASE IF EXISTS employeeDB;
-- CREATE DATABASE employeeDB;
-- USE employeeDB;


-- CREATE TABLE department (
-- id INT NOT NULL AUTO_INCREMENT,
-- name VARCHAR(30) NOT NULL,
-- PRIMARY KEY (id)
-- );


-- CREATE TABLE position (
-- id INT NOT NULL AUTO_INCREMENT,
-- title VARCHAR(30) NOT NULL,
-- salary VARCHAR(20) NOT NULL,
-- department_id INT,
-- PRIMARY KEY (id)
-- );


-- CREATE TABLE employee (
-- id INT NOT NULL AUTO_INCREMENT,
-- first_name VARCHAR(30) NOT NULL,
-- last_name VARCHAR(30) NOT NULL,
-- role_id INT,
-- manager_id INT,
-- PRIMARY KEY (id)
-- );
-- INSERT INTO department (name)
-- VALUES ("Sales"), ("Finance"), ("Legal"), ("Engineering");
-- INSERT INTO position (title, salary, department_id)
-- VALUES ("Sales Manager", 100000, 1), ("Salesman", 90000, 1), ("Consultant", 80000, 1),
-- ("Accountant", 85000, 2), ("Attorney", 130000, 2), ("Legal Manager", 150000, 2),
-- ("Electrical Engineer", 100000, 3), ("Software Engineer", 120000, 3), ("Field Engineer", 100000, 3);
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Leo", "Silva", 2, 4), ("Mike", "Hume", 2, 3), ("Sarah", "Cullen", 1, NULL),
-- ("Charles", "Pitek", 1, 3), ("Mike", "Aiello", 3, NULL), ("Brian", "Ford", 1, NULL), ("Logan", "Moody", 3, 5),
-- ("Charles", "Cressey", 2, 6), ("Allison", "Bradley", 3, 2);

DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY(id)
);