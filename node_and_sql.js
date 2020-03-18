let {Client} = require('pg')

let client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  port: 5432,
  database: "umuzi"
})

client.connect()
  .then(() => console.log("Connected successfully"))
  .then(()=> client.query("Insert into employees(Name, Surname) values($1, $2)", ["Ephraim","Mamonong"]))
  .then(()=> client.query("select * from employees"))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e))
  .finally(() => client.end())