var mongoose = require("mongoose");

// schema takes an object literal that describes properties of your thing

var thingSchema = mongoose.Schema({
    name: String
});

//gives you access to the db
var Thing = mongoose.model("thing", thingSchema);

module.exports = Thing;