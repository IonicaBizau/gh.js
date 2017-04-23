"use strict";

const tester = require("tester")
    , GitHub = require("../lib")
    , Lien = require("lien")
    ;

// Constants
const PORT = 7000
    , HOST = "http://localhost:" + PORT + "/"
    ;

tester.describe("gh.js", t => {
    t.it("starts the localhost API server", cb => {
        // Initialize the API server
        let apiServer = new Lien({
            port: PORT
        });

        // Add the API route
        apiServer.addPage("/users/IonicaBizau/repos", lien => {
            let repos = [
                    {
                        "name": "foo"
                      , "full_name": "IonicaBizau/foo"
                    },
                    {
                        "name": "foo"
                      , "full_name": "IonicaBizau/foo"
                    }
                ]
              , perPage = parseInt(lien.query.per_page) || 2
              , page = parseInt(lien.query.page) || 1
              , start = (page - 1) * perPage
              , res = repos.slice(start, start + perPage)
              ;

            lien.end(res);
        });

        apiServer.on("load", cb);
    });

    var gh = new GitHub({ host: HOST });
    t.should("should get all the items using all:true", cb => {
        gh.get("users/IonicaBizau/repos", { all: true }, (err, repos) => {
            t.expect(err).toBe(null);
            t.expect(repos.length).toBe(2);
            t.expect(repos[0].name).toBe("foo");
            cb();
        });
    });

    t.should("should get all the items using all:true", () => {
        t.expect(() => {
            gh.get("users/IonicaBizau/");
        }).toThrow(/Do not add any trailing slash/);
        t.expect(() => {
            gh.get("/users/IonicaBizau");
        }).toThrow(/Do not add any trailing slash/);
    });

    t.it("", () => process.exit());
});
