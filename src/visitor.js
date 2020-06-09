require('dotenv').config()
let {Pool} = require("pg");

let pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    host: process.env.DB_HOST,
    port: 5432,
    database:  process.env.DB_DATABASE
});

class Visitors {
    constructor() {
        this.successMessage
        this.errorMessage
        this.myQuery
        this.myParams
    }

    async myTryCatch() {
        try {
           let results =  await pool.query(this.myQuery, this.myParams)
           
           console.log(this.successMessage)
           return results 
        } catch (err) {
            throw `${this.errorMessage} ${err}`;
        } 
    };

    async createTable() {
        this.myQuery = "CREATE TABLE visitors(visitorID SERIAL PRIMARY KEY, fullname VARCHAR(50), visitorsage INT, dateofvisit DATE, timeofvisit TIME, assistedBy VARCHAR(50), comments VARCHAR(100) )"
        this.myParams=[]
        this.successMessage = "Table successfully created";
        this.errorMessage = "Table couldn't created";
        await this.myTryCatch();

    }

    async addNewVisitor(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) {
        this.myQuery= "INSERT into visitors(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values($1,$2,$3,$4,$5,$6) RETURNING *"
        this.myParams= [
            fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments
          ]
        this.successMessage="Visitor added"
        this.errorMessage= "Visitor could not be added"
        let res = await this.myTryCatch()
        return res.rows

    }

    async listAllVisitors() {
        this.myQuery ="SELECT * from visitors"
        this.myParams=[]
        this.successMessage= "Visitors listed successfully"
        this.errorMessage = "Visitors cannot be listed";
        let results = await this.myTryCatch();
        return results.rows
    }

    async deleteVisitor(visitorid) {
       
        this.myQuery ="DELETE from visitors WHERE visitorid = $1" 
        this.myParams = [visitorid];
        this.errorMessage = "Visitor couldn't be deleted";
        this.successMessage = "Visitor successfully deleted";
        let results = await this.myTryCatch();
        return results
    }

    async updateVisitorInfo(visitorid, fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) {
        let insert = "INSERT into visitors(visitorid, fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values($1,$2,$3,$4,$5,$6,$7)"
        let conflict = "ON CONFLICT(visitorid) DO UPDATE SET"
        let fields = "fullname= EXCLUDED.fullname, visitorsage = EXCLUDED.visitorsage,dateofvisit = EXCLUDED.dateofvisit, timeofvisit = EXCLUDED.timeofvisit, assistedby = EXCLUDED.assistedby, comments = EXCLUDED.comments  RETURNING *"
        this.myQuery = `${insert} ${conflict} ${fields}`
        this.myParams = [visitorid, fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments]
        this.errorMessage = "Unable to update visitor information";
        this.successMessage = "Visitor successfully updated";
        let results = await this.myTryCatch();
        return results.rows
    }
    async selectOneVisitor(visitorID) {
       
        this.myQuery ="SELECT * FROM visitors WHERE visitorid = $1" 
        this.myParams = [visitorID];
        this.successMessage = "Visitor selected"
        this.errorMessage = "Visitor cannot be selected";
        let results = await this.myTryCatch();
        return results.rows;
    }

    async deleteAllVisitors() {
        this.myQuery = "DELETE from visitors"
        this.successMessage = "Visitors Successfully deleted";
        this.errorMessage = "Unable to delete visitor";
        this.myParams=[]
        let results = await this.myTryCatch();
        return results
    }
}
module.exports = {
    Visitors
};
