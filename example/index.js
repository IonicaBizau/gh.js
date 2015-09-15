// Dependencies
var GitHub = require("../lib");

// Create a new instance
var gh = new GitHub();
gh.get("users/IonicaBizau", function (err, repos) {
    console.log(err || repos);
});
