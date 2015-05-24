var GitHub = require("../lib")
  , Lien = require("lien")
  ;

const PORT = 7000
    , HOST = "http://localhost:" + PORT + "/"
    ;

var apiServer = new Lien({
    port: PORT
});

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

      debugger;
    lien.end(res);
});

apiServer.on("load", function (err) {
    if (err) { throw err; }

    var gh = new GitHub({ host: HOST });
    gh.get("users/IonicaBizau/repos", { all: true }, function (err, repos) {
        console.log(err || repos);
    });
});
