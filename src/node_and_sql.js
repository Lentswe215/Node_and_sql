let { Client } = require("pg");

let client = new Client({
  user: "user",
  password: "pass",
  host: "localhost",
  port: 5432,
  database: "visitordb",
});
class Visitors {
  constructor(fullname, age, dateofvisit, timeofvisit, assistedby, comments) {
    this.fullname = fullname;
    this.age = age;
    this.dateofvisit = dateofvisit;
    this.timeofvisit = timeofvisit;
    this.assistedby = assistedby;
    this.comments = comments;
    client.connect();
  }

  async addNewVisitor() {
    try {
      let results = await client.query(
        "INSERT into visitors(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values($1,$2,$3,$4,$5,$6) ON CONFLICT(fullname) DO UPDATE SET dateofvisit = EXCLUDED.dateofvisit  RETURNING *",
        [
          this.fullname,
          this.age,
          this.dateofvisit,
          this.timeofvisit,
          this.assistedby,
          this.comments,
        ]
      );
      return results.rows;
    } catch (error) {
      throw error;
    }
  }

  async viewAllVisitors() {
    try {
      let results = await client.query("SELECT * from visitors");
      return results.rows;
    } catch (error) {
      throw "Cannot view all visitors " + error;
    }
  }

  async deleteVisitor() {
    try {
      let results = await client.query(
        "DELETE from visitors WHERE fullname = $1 RETURNING *",
        [this.fullname]
      );
      return results;
    } catch (error) {
      throw "Cannot delele a visitor " + error;
    }
  }

  async updateVisitorInfo(columnToUpdate, newInfo) {
    try {
      let results = await client.query(
        "UPDATE visitors SET " +
          columnToUpdate +
          "= $1 WHERE fullname = $2 RETURNING *",
        [newInfo, this.fullname]
      );
      return results.rows;
    } catch (error) {
      throw "Cannot update visitor information" + error;
    }
  }

  async viewOneVisitor(visitorid) {
    try {
      let results = await client.query(
        "SELECT * from visitors WHERE visitorid = $1",
        [visitorid]
      );
      return results.rows;
    } catch (error) {
      throw "Visitor cannot be viewed " + error;
    }
  }

  async deleteAllVisitors() {
    try {
      let results = await client.query("DELETE FROM visitors");
      return results;
    } catch (error) {
      throw "Visitors cannot be deleted " + error;
    }
  }
}

module.exports = {
  Visitors
};
