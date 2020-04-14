let { Visitors } = require("../src/node_and_sql");

let vis1 = new Visitors("George Hooper", 54, "04/27/2019", "12:43", "Dove Reginal", "Expencious")
visitorInfo ={
 visitorName: "George Hooper",
 visitorAge:54,
 dateOfVisit: new Date("04/27/2019"),
 timeOfVisit: "12:43:00",
 assistedBy: "Dove Reginal",
 comments: "Expencious"
}
describe("addNewVisitor", () => {
  it("should add the information to the visitors table",async () => {

     results = await vis1.addNewVisitor()
    
    expect(results[0].fullname).toEqual(visitorInfo.visitorName)
    expect(results[0].visitorsage).toEqual(visitorInfo.visitorAge)
    expect(results[0].dateofvisit).toEqual(visitorInfo.dateOfVisit)
    expect(results[0].timeofvisit).toEqual(visitorInfo.timeOfVisit)
    expect(results[0].assistedby).toEqual(visitorInfo.assistedBy)
    expect(results[0].comments).toEqual(visitorInfo.comments)
  })
});

describe("viewAllVisitors", () => {
  it("should display the information from the visitors table",async () => {
    vis1.addNewVisitor()
     results = await vis1.viewAllVisitors()
 console.table(results)
    expect(results[0].fullname).toEqual(visitorInfo.visitorName)
    expect(results[0].visitorsage).toEqual(visitorInfo.visitorAge)
    expect(results[0].dateofvisit).toEqual(visitorInfo.dateOfVisit)
    expect(results[0].timeofvisit).toEqual(visitorInfo.timeOfVisit)
    expect(results[0].assistedby).toEqual(visitorInfo.assistedBy)
    expect(results[0].comments).toEqual(visitorInfo.comments)
  })
});

describe("deleteVisitor", () => {
  it("should delete the information of 1 visitor from the visitors table",async () => {
    vis1.addNewVisitor()
     results = await vis1.deleteVisitor()
    
    expect(results.rowCount).not.toBeNull()
  })
});

describe("deleteAllVisitors", () => {
  it("should delete the information of all visitors from the visitors table",async () => {
    vis1.addNewVisitor()
     results = await vis1.deleteAllVisitors()
    
    expect(results.rowCount).not.toBeNull()
  })
});


