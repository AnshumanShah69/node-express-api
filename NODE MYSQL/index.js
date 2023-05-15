const express = require("express");
const mysql = require("mysql");

///create a connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aman@1576",
    database: "nodemysql",
})

///connect to mysql environment
db.connect(err => {
    if (err) {
        throw err
    }
    console.log("mysql connected");
})

const app = express();

///create database
app.get("/createdb", (req, res) => {
    let sql = "create database nodemysql"
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("Database created");
    })
})

//creating a table
app.get("/createemployee", (req, res) => {
    let sql = "create table employee(id int auto_increment,name varchar(20),designation varchar(20),primary key(id)"
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("employee table created");
    })
})

///insert employee
app.get("/employee1", (req, res) => {
    let post = { name: "Jake Smith", designation: "Chief Executive Officer" }
    let sql = "insert into employee set ?"
    let quesy = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send("employee added")
    })
})
app.getemployee("/getemployee", (req, res) => {
    let sql = "Select * from employee"
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        console.log(results);
        res.send("Employee details fetched");
    })
})


///update the employee here
app.get("/updateemployee/:id", (req, res) => {
    let newName = "Updated name"
    let sql = `update employee set name='${newName}' where id= ${req.params.id}`;
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send("Employee updated");
    })
})


///delete from the table
app.get("/deleteemployee/:id", (req, res) => {
    let sql = `delete from employee where id= ${req.params.id}`;
    let query = db.query(sql, err => {
        if (err) {
            throw err;
        }
        res.send("employee deleted");
    })
})

app.listen(3000, () => {
    console.log("Server started on 3000");
})

