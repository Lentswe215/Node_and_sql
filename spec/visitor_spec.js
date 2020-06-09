let { Visitors } = require('../src/visitor')

let visitor_instance = new Visitors()
visitorInfo ={
    fullname: "George Hooper",
    visitorAge:54,
    dateOfVisit: new Date("04/27/2019"),
    timeOfVisit: "12:43:00",
    assistedBy: "Dove Reginal",
    comments: "Expencious"
   }

   describe("addNewVisitor", () => {
    it("should add the information to the visitors table",async () => {

       results = await visitor_instance.addNewVisitor("George Hooper",54, "04-27-2019", "12:43", "Dove Reginal", "Expencious")
      
      expect(results[0].fullname).toEqual(visitorInfo.fullname)
      expect(results[0].visitorsage).toEqual(visitorInfo.visitorAge)
      expect(results[0].dateofvisit).toEqual(visitorInfo.dateOfVisit)
      expect(results[0].timeofvisit).toEqual(visitorInfo.timeOfVisit)
      expect(results[0].assistedby).toEqual(visitorInfo.assistedBy)
      expect(results[0].comments).toEqual(visitorInfo.comments)
    })
  })


  describe("viewAllVisitors", () => {
    it("should show all visitors", async ()=>{

      await visitor_instance.addNewVisitor("George Hooper",54, "04-27-2019", "12:43", "Dove Reginal", "Expencious")

      results = await visitor_instance.listAllVisitors()
      // console.log(results[0])
    expect(results[0].visitorid).not.toBeNaN()
    expect(results[0].fullname).toBe(visitorInfo.fullname)
    expect(results[0].visitorsage).toBe(visitorInfo.visitorAge)
    expect(results[0].dateofvisit).toEqual(visitorInfo.dateOfVisit)
    expect(results[0].timeofvisit).toEqual(visitorInfo.timeOfVisit)
    expect(results[0].assistedby).toBe(visitorInfo.assistedBy)
    expect(results[0].comments).toBe(visitorInfo.comments)

    })
  })
    describe("deleteAllVisitors", ()=>  {
    it("should delete visitors", async () => {
      await visitor_instance.addNewVisitor("Paul Newton", 43, "2019-08-11", "13:23", "Frank Machine", "I loved the place")
      results = await visitor_instance.deleteAllVisitors()
      expect(results.rowCount).not.toBeNull()
    })
  });