var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "beatsbydre",
    database:"mullaCompany"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql =  
    [
      "CREATE TABLE Employee (SSN varchar(255), Age int, Phone varchar(255), PRIMARY KEY (SSN));",

        "INSERT INTO Employee(SSN, Age, Phone) VALUES ('001',45,'0791670106'),('002',36,'078930483'),('003',48,'072649374');",

      "CREATE TABLE EmployeeChildren (Name varchar(255), Age int, Parent varchar(255), FOREIGN KEY(Parent) REFERENCES Employee(SSN) ON DELETE CASCADE, PRIMARY KEY(Name));",

        "INSERT INTO EmployeeChildren (Name, Age, Parent) VALUES ('Letty muy',7,'001'),('Agather Njau',8,'002'),('Kevin Muhia',14,'003');",

      "CREATE TABLE Department(DNO varchar(255), Manager varchar(255), Name varchar(255), Budget int, PRIMARY KEY(DNO), FOREIGN KEY(Manager) REFERENCES Employee(SSN));",

        "INSERT INTO Department(DNO, Manager, Name, Budget) VALUES('111','001','Security',60000),('222','002','Catering',540000),('333','003','Human Resource',89000);",
      
      "CREATE TABLE Department_employees (Department varchar(255), Employee varchar(255),  PRIMARY KEY(Employee, Department), FOREIGN KEY(Employee) REFERENCES Employee(SSN) ON DELETE CASCADE, FOREIGN KEY (Department) REFERENCES Department(DNO) ON DELETE CASCADE);",

        "INSERT INTO Department_employees (Department,Employee) VALUES ('111','001'),('222','002'),('333','003');"

    ];


    for(var query in sql){
      connection.query(sql[query], function (err, result) {
        if (err) throw err;
      });
    }
    console.log("Operation Completed!");
  });