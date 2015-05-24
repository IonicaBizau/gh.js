// Dependencies
var GitHub = require("../lib")
  , Lien = require("lien")
  , Assert = require("assert")
  ;

// Constants
const PORT = 7000
    , HOST = "http://localhost:" + PORT + "/"
    ;

// Initialize the API server
var apiServer = new Lien({
    port: PORT
});

// Add the API route
apiServer.page.add("/users/IonicaBizau/repos", function (lien) {
    var repos = [
            {
                "name": "foo"
              , "full_name": "IonicaBizau/foo"
            },
            {
                "name": "foo"
              , "full_name": "IonicaBizau/foo"
            }
        ]
      , perPage = parseInt(lien.search.per_page) || 2
      , page = parseInt(lien.search.page) || 1
      , start = (page - 1) * perPage
      , res = repos.slice(start, start + perPage)
      ;

    lien.end(res);
});

// Server start
it("should wait until the server starts", function (cb) {
    // TODO
    return cb();
    if (apiServer.isStarted()) {
        return cb();
    }
    apiServer.on("load", function (err) {
        Assert.equal(err, null);
        cb();
    });
});

// Get all items
it("should get all the items using all:true", function (cb) {
    var gh = new GitHub({ host: HOST });
    gh.get("users/IonicaBizau/repos", { all: true }, function (err, repos) {
        Assert.equal(err, null);
        Assert.equal(repos.length, 2);
        Assert.equal(repos[0].name, "foo");
        cb();
    });
});
