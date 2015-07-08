// loads a module. You still need to export the module in the file 
// itself to be able to use it though.
var db = require("../app/db");

describe("db", function(){
    describe("connecting", function(){
        
        //before our test, we'll connect to database
   var connected;
   //if pass in done function, a callback is expecting a done function.
   // jasmine will look at the call-back and parameters and will pass you a done.
   // it will give 5 seconds and if you don't rune done, it will time out. 
   // so you have to call it. 
   beforeEach(function(done){
       db.connect()
        .then(function(){
            connected = true;
            return db.disconnect();
        })
        // when the first promise is done, do another promise (chain them)
        .then(function(){
            done();
        });
   });
   
   it("can connect", function(){
       //this is how it tells it connected to db
      expect(connected).toEqual(true); 
   });
   //after test, disconnect from database

    //to-do: add disconnect test
    });
   
});