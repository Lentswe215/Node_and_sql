let {Pool} = require('pg')
       
let pool = new Pool({
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
  async createTable() {
    
    try{
     await pool.connect()
    await pool.query("CREATE TABLE Visitors(visitorID SERIAL PRIMARY KEY, fullname VARCHAR(50), visitorsage INT, dateofvisit DATE, timeofvisit TIME, assistedBy VARCHAR(50), comments VARCHAR(100))")
   
  }
    catch(e) {
    console.log(e)
    }
    
    finally{
     return "Successfully created the table"
     
      }
  }

  async addNewVisitor(){
    try {
   await pool.connect()
   await pool.query("INSERT into visitors(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values ($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING",[this.fullName, this.age, this.dateOfVisit, this.timeOfVisit, this.assistedBy, this.comments])
    }
    catch(e){
      console.log(e)
    }
    finally{
     return "Visitor successfully saved"
    }
  }

  async listAllVisitors() {
    try{
    await pool.connect()
    let {rows} = await pool.query("SELECT * from visitors")
    console.table(rows)
    }
    catch(e){
      console.log(e)
    }
  }

  async deleteVisitor() {
    try{
    await pool.connect()
    await pool.query("DELETE from visitors WHERE fullname = $1", [this.fullName])

    }
    catch(e){
      console.log(e)
    }
    finally{
      return "Visitor successfully deleted"
    }
  }

  async updateVisitorInfo(columnToUpdate, newInfo){
    try{
   await pool.connect()
   await pool.query("UPDATE visitors SET "+columnToUpdate+" = $1 WHERE fullname = $2", [newInfo, this.fullName])
   
    }
    catch(e){
      throw Error("Visitor information not update")
    }
    finally{
      await pool.end()
      return "Visitor information successfully updated"
    }
  }

  async selectOneVisitor(visitorID){
    try{
   await pool.connect()
     let {rows} =await pool.query("SELECT * from visitors WHERE visitorid = $1", [visitorID])
     console.table(rows)
    }
    catch(e){
      console.log(e)
    }
  }
  
  async deleteAllVisitors() {
    try{
    pool.connect()
     pool.query("DELETE from visitors")
     console.log()
    }
    catch(e){
      console.log(e)
    }
    finally{
     return "Visitors Successfully deleted"
    }
  }
}
let visitor = new Visitors();
let visitor1 = new Visitors("Lebogang Nkoane", 54, "01-31-2019", "09:23", "Ronald Kingston", "The staff was rude")
let visitor2 = new Visitors("Katlego Maboe", 22, "03-23-2019", "11:23", "Palesa Bengu", "Bzksdhgghod;hODHDOghOIAHGDSIIDHhdiZDhcnncsdkkk")

console.log(visitor1.updateVisitorInfo())


module.exports = {
Visitors
}
