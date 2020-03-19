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
  updateVisitorInfo(columnToUpdate, newInfo){

    client.connect()
    .then(() => client.query("UPDATE visitors SET "+columnToUpdate+" = $1 WHERE fullname = $2", [newInfo, this.fullName]))
    .then(() => console.log("Visitor information successfully updated"))
    .catch((e)=> console.log(e))
    .finally(()=> client.end())
  }

  selectOneVisitor(visitorID){
    client.connect()
    .then(()=> client.query("SELECT * from visitors WHERE visitorid = $1", [visitorID]))
    .then(results => console.table(results.rows))
    .catch((e) => console.log(e))
    .finally(()=> client.end())
  }
  
  deleteAllVisitors() {
    client.connect()
    .then(() => client.query("DELETE from visitors"))
    .then(() => console.log("Visitors Successfully deleted"))
    .catch((e) => console.log(e))
    .finally(() => client.end())
  }
}
let visitor = new Visitors();
let visitor1 = new Visitors("Lebogang Nkoane", 54, "01-31-2019", "09:23", "Ronald KingSton", "The staff was rude")
let visitor2 = new Visitors("Katlego Maboe")

// visitor1.addNewVisitor()
// visitor.deleteAllVisitors()
// visitor2.updateVisitorInfo("assistedby", "George Lopez")
// visitor2.deleteVisitor()

// client.connect()
//   .then(() => console.log("Connected successfully"))
//   .then(()=> client.query("select * from employees"))
//   .then(results => console.table(results.rows))
//   .catch(e => console.log(e))
//   .finally(() => client.end())