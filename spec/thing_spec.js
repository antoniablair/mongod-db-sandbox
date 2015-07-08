var Thing = require("../app/thing")
var db = require("../app/db");

// we are going to:
// connect to a database
// add three things to the database
// disconnect

describe("Thing", function(){
    beforeEach(function(done){
        db.connect()
        .then(function(){
            // remove every Thing in the database
            return Thing.remove({});
        })
        .then(function(){
            // insert a new Thing in the database
            var rock = new Thing({name: "Rock"});
            return rock.save();
        })
        // if you made it this far you connected to db, and you created a Rock
        // this is a chained promise
        .then(function(){
            // you're creating it in memory - it's not saved tho
            var paper = new Thing({name: "Paper"});
            // return it to the database
            return paper.save();
        })
        
        .then(function(){
            var scissors = new Thing({ name: "Scissors"});
            scissors.save();
        })
        
        .then(function(){
            done();
        });
    });
    
    afterEach(function(done) {
        db.disconnect()
        .then(function(){
            done();
        });
    });
    
    it("exists", function(){
        expect(Thing).toBeDefined();
    });

    describe("find", function(){
        var things;
        // thing object is entry to database
        beforeEach(function(done){
            Thing.find()
            // you can call the function parameter (in this case thingsInDatabase) anything you want -
            // it's coming from the db
                .then(function(thingsInDatabase){
                   things = thingsInDatabase; 
                   done();
                });
        });
        it("there are three things", function(){
       expect(things.length).toEqual(3); 
        });
    });
    
});