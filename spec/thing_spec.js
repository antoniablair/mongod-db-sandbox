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
    
    describe("findOne", function(){
        var name;
        // when using db, it's asynchronous, so put the done in there
        beforeEach(function(done){
           Thing.findOne({name: "Rock"})
           // when you're done finding it, pass the rock that you found back
            .then(function(rock){
                name = rock.name;
                done();
            });
        });
        
        it("it should return a rock", function(){
            expect(name).toEqual("Rock");
        })
    });
    
    describe("creating a thing that exists", function(){
        var error;
        beforeEach(function(done) {
           var badRock = new Thing({name: "Rock"});
           // use a callback with a save with this function(e,x) thing
           badRock.save(function(e,x){
               error = e;
               console.log(e);
               console.log(x);
               done();
           })
           // I expect my promise to not be resolved. I expect the promise to be rejected.
        //   .catch(function(e){
        //       error = e;
        //       done();
        //   });
        });
       it("returns an error", function(){
           // in node, null is still 'defined'. only undefined is not defined.
        //   expect(error).toBeDefined();
            expect(error).not.toEqual(null);
       }); 
    });
    
    
});