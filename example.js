const {Pool, Client} = require('pg')

let pool = new Pool({
    host: "localhost",
    database: "visitordb",
    user: "user",
    password: "pass",
    port: 5432
});

pool.connect((err) => {
    if(err) console.log(err)
    else console.log("Connected successfully!");
    });

let createTable = ()=> {
    pool.query('CREATE TABLE Visits(visitorID SERIAL PRIMARY KEY, name VARCHAR(50), visitorsAge INT, dateofvisit DATE, timeofvisit TIME, assistor VARCHAR(50), comments VARCHAR(100))',(error, respond) => {
       console.log(error, respond)
       console.log("Successfully created table")
    })
}

createTable()