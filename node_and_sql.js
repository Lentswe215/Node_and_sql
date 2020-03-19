let {Client} = require('pg')

let client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  port: 5432,
  database: "visitordb"
})

class Visitors {
  constructor(fullName, age, dateOfVisit, timeOfVisit, assistedBy, comments){
    this.fullName = fullName;
    this.age = age;
    this.dateOfVisit = dateOfVisit;
    this.timeOfVisit = timeOfVisit;
    this.assistedBy = assistedBy;
    this.comments = comments;
  }

  addNewVisitor(){
    client.connect()
    .then(()=> client.query("INSERT into visitors(fullname, visitorage, dateofvisit, timeofvisit, assistedby, comments) values ($1,$2,$3,$4,$5,$6)",[this.fullName, this.age, this.dateOfVisit, this.timeOfVisit, this.assistedBy, this.comments]))
    .then(()=> console.log("Visitor successfully saved"))
    .catch((e) => console.log(e))
    .finally(() => client.end())
  }

  listAllVisitors() {
    client.connect()
    .then(() => client.query("SELECT * from visitors"))
    .then(results => console.table(results.rows))
    .catch((e) => console.log(e))
    .finally(()=> client.end())
  }

  deleteVisitor() {
    client.connect()
    .then(()=> client.query("DELETE from visitors WHERE fullname = $1", [this.fullName]))
    .then(()=> console.log("Visitor successfully deleted"))
    .catch((e) => console.log(e))
    .finally(()=> client.end())
  }

}
let visitor = new Visitors();
let visitor2 = new Visitors("Ephraim Mamonong", 25, "12-07-2019", "10:42","Gomolemo Josephs", "It is a great place with wonderful view of the ocean and there is lots of fresh air around")

visitor.listAllVisitors()
// visitor2.deleteVisitor()

// client.connect()
//   .then(() => console.log("Connected successfully"))
//   .then(()=> client.query("select * from employees"))
//   .then(results => console.table(results.rows))
//   .catch(e => console.log(e))
//   .finally(() => client.end())