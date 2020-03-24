let {
    Visitors,
    // createTable,
    // addNewVisitor,
    // listAllVisitors,
    // deleteVisitor,
    // updateVisitorInfo,
    // selectOneVisitor,
    // deleteAllVisitors
    } = require('../src/node_and_sql')

    let visitor = new Visitors();
    let visitor1 = new Visitors("Lebogang Nkoane", 54, "01-31-2019", "09:23", "Ronald Kingston", "The staff was rude")

    describe("Visitor", function() {
        it("should check if the createTable is defined", function () {
            expect(visitor1.createTable).toBeDefined()
        });
        it("should check if the addNewVisitor is defined", function () {
            expect(visitor1.addNewVisitor).toBeDefined()
        });
        it("should check if the deleteVisitor is defined", function () {
            expect(visitor1.deleteVisitor).toBeDefined()
        });
        it("should check if the updateVisitorInfo is defined", function () {
            expect(visitor1.updateVisitorInfo).toBeDefined()
        });
        it("should check if the selectOneVisitor is defined", function () {
            expect(visitor1.selectOneVisitor).toBeDefined()
        });
        it("Should check if deleteAllVisitors function is defined", () => {
            expect(visitor.deleteAllVisitors).toBeDefined()
        })
        
    });
    describe("Visitor mock test", function() {

        it("spy on the addNewVisitor function", () =>{
            spyOn(visitor, "addNewVisitor")

            visitor.addNewVisitor()
            expect(visitor.addNewVisitor).toHaveBeenCalled()
        })
        it("spy on the createTable function", () =>{
            spyOn(visitor, "createTable")

            visitor.createTable()
            expect(visitor.createTable).toHaveBeenCalled()
        })
        it("spy on the deleteVisitor function", () =>{
            spyOn(visitor, "deleteVisitor")

            visitor.deleteVisitor()
            expect(visitor.deleteVisitor).toHaveBeenCalled()
        })
        it("spy on the updateVisitorinfo function", () =>{
            spyOn(visitor1, "updateVisitorInfo")

            visitor1.updateVisitorInfo()
            expect(visitor1.updateVisitorInfo).toHaveBeenCalled()
        })
        it("spy on the selectOneVisitor function", () =>{
            spyOn(visitor1, "selectOneVisitor")

            visitor1.selectOneVisitor()
            expect(visitor1.selectOneVisitor).toHaveBeenCalled()
        })
        it("spy on the deleteAllVisitors function", () =>{
            spyOn(visitor, "deleteAllVisitors")

            visitor.deleteAllVisitors()
            expect(visitor.deleteAllVisitors).toHaveBeenCalled()
        })
        })
    
