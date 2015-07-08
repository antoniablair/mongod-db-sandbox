// use Q library to create promise


//export an object literal
// in an object literal you have keys and values
// it will use a function as the value

//use promise library
var Q = require("q");
//require mongoose too
var mongoose = require("mongoose");

module.exports = {
    connect: connect,
    disconnect: disconnect
};

function connect(){
    var dfd = Q.defer();
    // to get it to pass without using actual database, fake a promise by using dfd.resolve();
    
    //connect to a database called my_world
    mongoose.connect("mongodb://localhost:27017/my_world");
    // there's a slight delay to connecting to a db so give it a few
    mongoose.connection.on("open", function(){
        dfd.resolve();
    });
    
    return dfd.promise;
}

function disconnect(){
    var dfd = Q.defer();
    mongoose.disconnect(function(){
        dfd.resolve();
    });
    return dfd.promise;
}