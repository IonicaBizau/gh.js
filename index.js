var GitHub = require("../lib");

var gh = new GitHub();
gh.get("users/IonicaBizau", function (err, repos) {
    console.log(err || repos);
});
