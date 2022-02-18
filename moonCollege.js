var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "beatsbydre",
    database:"moonCollege"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql =  
    [
      "CREATE TABLE UserRank (Id varchar(255) NOT NULL, Title varchar(255), PRIMARY KEY (Id));",

        "INSERT INTO UserRank (Id, Title) VALUES ('01','Beginner'),('02','Amateur'),('03','Professional'),('04','Legend');",

      "CREATE TABLE Professor (Name varchar(255), Age int, SSN varchar(255), ProfessorRank varchar(255), PRIMARY KEY (SSN), FOREIGN KEY (ProfessorRank) REFERENCES UserRank(Id));",

        "INSERT INTO Professor (Name, Age, SSN, ProfessorRank) VALUES ('James St.Patrick', 35, '100','03'),('Luther Njuguna', 45, '200','01'),('Mercy joan', 43, '300','02');",

      "CREATE TABLE Project (ProjectNumber varchar(255), SponsorName varchar(255),Budget int, EndDate date, StartDate date, Manager varchar(255), PRIMARY KEY(ProjectNumber), FOREIGN KEY (Manager) REFERENCES Professor(SSN) ON DELETE CASCADE);",

        "INSERT INTO Project(ProjectNumber, SponsorName, Budget, EndDate,StartDate, Manager) VALUES('001','Julius Caesar',45000, '2020-02-01','2020-01-01', '200'),('002','Mohammed Salah',345000,'2020-01-01','2020-01-01','100'),('003','Kane onyango',76000,'2020-04-01','2020-03-01',300)",

      "CREATE TABLE Office (Id varchar(255), Name varchar(255), PRIMARY KEY(Id));",

        "INSERT INTO Office(Id, Name) VALUES('11','Admission block'),('22','Library'),('33','Students Center')",

      "CREATE TABLE Department (Name varchar(255), Number varchar(255), MainOffice varchar(255), ChairPerson varchar(255),  PRIMARY KEY(Number), FOREIGN KEY (ChairPerson) REFERENCES Professor(SSN) ON DELETE CASCADE, FOREIGN KEY (MainOffice) REFERENCES Office(Id) ON DELETE CASCADE);",

        "INSERT INTO Department (Name, Number, MainOffice, ChairPerson) VALUES ('ICT','111','11','100'),('Medical','222','22','200'),('Education','333','33','300')",

      "CREATE TABLE Department_professors(Dept varchar(255), Professor varchar(255), WorkHours int, FOREIGN KEY(Dept) REFERENCES Department(Number) ON DELETE CASCADE, FOREIGN KEY(Professor) REFERENCES Professor(SSN) ON DELETE CASCADE, PRIMARY KEY(Dept,Professor, WorkHours));",

        "INSERT INTO Department_professors(Dept, Professor, WorkHours) VALUES('111','100',45),('222','200',89),('333','300',19);",

      "CREATE TABLE GraduateDegree(Id varchar(255), Name varchar(255), PRIMARY KEY(Id))",

        "INSERT INTO GraduateDegree VALUES ('212','Computer Science'),('313','Applied Computing'),('414','Electrical Engineering')",

      "CREATE TABLE Graduate(SSN varchar(255), Name varchar(255), Age int, Degree varchar(255),  WorkDepartment varchar(255), PRIMARY KEY(SSN),FOREIGN KEY (WorkDepartment) REFERENCES Department(Number) ON DELETE CASCADE,FOREIGN KEY (Degree) REFERENCES GraduateDegree(Id) ON DELETE CASCADE);",

        "INSERT INTO Graduate(SSN, Age, Degree, Name, WorkDepartment) VALUES ('010',24,'212','James nganga','111'),('020',25,'313','Ajab otieno','222'),('030',26,'414','Lution maxwel','333')",

      "CREATE TABLE Graduate_supervision(Graduate varchar(255), Supervisor varchar(255), Supervisee varchar(255), PRIMARY KEY(Graduate Supervisor, Supervisee), FOREIGN KEY (Graduate) REFERENCES Graduate(SSN) ON DELETE CASCADE, FOREIGN KEY (Supervisor) REFERENCES Graduate(SSN) ON DELETE CASCADE,FOREIGN KEY (Supervisee) REFERENCES Graduate(SSN) ON DELETE CASCADE);",

      "INSERT INTO Graduate_supervision(Graduate, Supervisor, Supervisee) VALUES ('010','020','030'),('020','010','030'),('030','010','020')",

      "CREATE TABLE Graduate_projects(Graduate varchar(255), Supervisor varchar(255), Project varchar(255), FOREIGN KEY (Supervisor) REFERENCES Professor(SSN), FOREIGN KEY (Graduate) REFERENCES Graduate(SSN), FOREIGN KEY (Project) REFERENCES Project(ProjectNumber), PRIMARY KEY(Graduate, Supervisor,Project));",

        "INSERT INTO Graduate_projects(Graduate, Supervisor, Project) VALUES('010','100','001'),('020','200','002'),('030','300','003');"

    ];


    for(var query in sql){
      connection.query(sql[query], function (err, result) {
        if (err) throw err;
      });
    }
    console.log("Operation Completed!");
  });