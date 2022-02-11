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

    var createQs =  
    [
      "CREATE TABLE Employees (Name varchar(255) NOT NULL, SSN varchar(255) NOT NULL, Phone varchar(255), Department varchar(255) NOT NULL, FOREIGN KEY(Department) REFERENCES Departments(DNO), PRIMARY KEY (SSN)); ",

      "CREATE TABLE EmployeeChildren (Name varchar(255), Age int, Parent varchar(255) NOT NULL, FOREIGN KEY(Parent) REFERENCES Employees(Name) ON DELETE CASCADE, PRIMARY KEY(Name));",

      "CREATE TABLE Departments (DNO varchar(255), Name varchar(255), Budget int, Manager varchar(255) NOT NULL UNIQUE,  FOREIGN KEY(Manager) REFERENCES Employees(Name), PRIMARY KEY (DNO));",

    ];

    var insertQs =
    [
      "INSERT INTO Employees (Name, Salary, Phone, Department) VALUES ('James St.Patrick', 35000, '0792385960',(SELECT Name FROM Departments WHERE Name='Human Resource')),('Luther Njuguna', 45000, '079893845',(SELECT Name FROM Departments WHERE Name='Accounts')),('Mercy joan', 43000, '0793758395',(SELECT Name FROM Departments WHERE Name='Catering'));",

      "INSERT INTO EmployeeChildren (Name, Age, Parent) VALUES ('Marcus Aurelius',5, (SELECT Name FROM Employees WHERE Name='Luther Njuguna')),('Socrates James',9,(SELECT Name FROM Employees WHERE Name='Luther Njuguna')), ('Alysson Njenga',8,(SELECT Name FROM Employees WHERE Name='Mercy joan')),('Immaculate wanja',14,(SELECT Name FROM Employees WHERE Name='James St.Patrick'));",

      "INSERT INTO Departments (DNO, Name, Budget, Manager) VALUES ('3423','Human Resource',5000000,(SELECT Name FROM Employees WHERE Name='Luther Njuguna')),('3535','Accounts',9000,(SELECT Name FROM Employees WHERE Name='Mercy joan')),('47596','Catering',1489900,(SELECT Name FROM Employees WHERE Name='James St.Patrick'));",

    ];

    for(var query in createQs){
      connection.query(createQs[query], function (err, result) {
        if (err) throw err;
      });
    }
    console.log("Operation Completed!");

  });