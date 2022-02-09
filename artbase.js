var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "beatsbydre",
    database:"artbase"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var createQs =  
    [
      "CREATE TABLE Artists (Name varchar(255) NOT NULL, Age int, Style varchar(255), BirthPlace varchar(255), PRIMARY KEY (Name));",

      "CREATE TABLE ArtworkGroups (Name varchar(255), PRIMARY KEY(Name));",

      "CREATE TABLE Artworks (Title varchar(255),Type varchar(255), Price int, YearMade Date, ArtistName varchar(255),  FOREIGN KEY (ArtistName) REFERENCES Artists(Name), ArtworkGroup varchar(255), FOREIGN KEY (ArtworkGroup) REFERENCES ArtworkGroups(Name), PRIMARY KEY (Title));",

      "CREATE TABLE Customers ( Name varchar(255), Address varchar(255), TotalBilled int, ArtistInterest varchar(255), FOREIGN KEY (ArtistInterest) REFERENCES Artists(Name),ArtworkGroupInterest varchar(255),  FOREIGN KEY (ArtworkGroupInterest) REFERENCES  ArtworkGroups(Name), PRIMARY KEY(Name));"
    ];

    var insertQs =
    [
      // "INSERT INTO Artists(Name, Age, Style, BirthPlace) VALUES ('James St.Patrick', 35, 'Modelling','Nairobi'),('Luther Njuguna', 45, 'Painting','Nairobi'),('Mercy joan', 43, 'Sculpture','Kisumu');",

      // "INSERT INTO ArtworkGroups(Name) VALUES ('portraits'),('still lifes'), ('works by Picasso'),('works of the 19th century');",

      // "INSERT INTO Artworks (Title, Type, Price, YearMade, ArtistName, ArtworkGroup) VALUES ('Birth of jesus','Painting',34000000, 1901, (SELECT Name FROM Artists WHERE Name='Luther Njuguna'),(SELECT Name FROM ArtworkGroups WHERE Name = 'still lifes')),('Mona Lisa','Painting',56000000, 1960, (SELECT Name FROM Artists WHERE Name='James St.Patrick'),(SELECT Name FROM ArtworkGroups WHERE Name = 'works of the 19th century')),('Ifle tower','Painting',890000000,1908, (SELECT Name FROM Artists WHERE Name='Mercy joan'),(SELECT Name FROM ArtworkGroups WHERE Name = 'works by Picasso'));",

      "INSERT INTO Customers(Name, Address, TotalBilled, ArtistInterest, ArtworkGroupInterest) VALUES ('Bridget Atieno', '31st street, Juja',4503990,(SELECT Name FROM Artists WHERE Name='Mercy joan'),(SELECT Name FROM ArtworkGroups WHERE Name = 'works by Picasso')),('Kennedy Njeri', 'Olesampei North',430000000,(SELECT Name FROM Artists WHERE Name='James St.Patrick'),(SELECT Name FROM ArtworkGroups WHERE Name = 'still lifes')),('Immaculate wanja', 'Nai road, Nakuru',890000000,(SELECT Name FROM Artists WHERE Name='Luther Njuguna'),(SELECT Name FROM ArtworkGroups WHERE Name = 'portraits'));"
    ];

    for(var query in insertQs){
      connection.query(insertQs[query], function (err, result) {
        if (err) throw err;
      });
    }
    console.log("Operation Completed!");



  });