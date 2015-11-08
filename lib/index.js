// Handle the client require
if (typeof require === "undefined") {
    var require = function (pk) {
        if (pk === "ul") {
            return {
                deepMerge: function () { var dst = {} , src , p , args = [].splice.call(arguments, 0) ; while (args.length > 0) { src = args.splice(-1)[0]; if (toString.call(src) != "[object Object]") { continue; } for (p in src) { if (!src.hasOwnProperty(p)) { continue; } if (toString.call(src[p]) == "[object Object]") { dst[p] = this.deepMerge(src[p], dst[p] || {}); } else { if (src[p] !== undefined) { dst[p] = src[p]; } }; } } return dst; }
            };
        }
        if (pk === "querystring") {
            return {
                stringify: function (obj) {
                    var str = "";
                    Object.keys(obj).forEach(function (c) {
                        str += "&" + encodeURIComponent(c) + "=" + encodeURIComponent(obj[c]);
                    });
                    return str.substr(1);
                }
            };
        }
        return null;
    };
}

// Dependencies
var Ul = require("ul")
  , Jsonreq = require("jsonrequest")
  , QueryString = require("querystring")
  ;

/**
 * GitHub
 * Creates a new instance of `GitHub`.
 *
 * @name GitHub
 * @function
 * @param {Object} options An object containing the following options:
 *
 *  - `host` (String): The GitHub API host (default: `"https://api.github.com/"`).
 *  - `token` (String): The GitHub token.
 *  - `user_agent` (String): The user agen (default: `"gh.js"`).
 *
 * @return {GitHub} A new `GitHub` instance.
 */
function GitHub (options) {
    options = options || {};
    this.host = options.host || "https://api.github.com/";
    this.token = options.token;
    this.user_agent = options.user_agent || "gh.js";
}

/**
 * req
 * Makes a request to the GitHub API.
 *
 * @name req
 * @function
 * @param {String} url The request url.
 * @param {Object} data The data object.
 * @param {Function} callback The callback function.
 * @return {Request} The request object.
 */
GitHub.prototype.req = function (url, data, callback) {
    var self = this
      , req = null
      , url = self.host + url
      ;

    if (typeof data === "function") {
        callback = data;
        data = undefined;
    }

    // Handle the token
    if (self.token) {
        url += url.indexOf("?") > -1 ? "&" : "?";
        url += "access_token=" + self.token;
    }

    // Jsonreq on server, XHR on client
    if (typeof Jsonreq === "function") {
        req = Jsonreq({
            url: url
          , data: data
          , headers: {
                "User-agent": self.user_agent
            }
        }, function (err, data, res) {
            self.checkResponse(err, data, res, callback);
        });
    } else {
        req = new XMLHttpRequest();
        callback = callback || function () {};
        req.open("GET", url, true);
        req.send();
        req.onreadystatechange = function() {
            if (req.readyState !== 4) { return; }
            self.checkResponse(null, req.responseText, {
                statusCode: req.status
            }, callback);
        };
    }

    return req;
};

/**
 * checkResponse
 * Checks if the response is an error or not.
 *
 * @name checkResponse
 * @function
 * @param {Error|null} err The error value.
 * @param {Object} data The data object.
 * @param {Response} res The response object.
 * @param {Function} callback The callback option.
 */
GitHub.prototype.checkResponse = function (err, data, res, callback) {
    if (typeof data === "string") {
        data = JSON.parse(data);
    }
    if (err) { return callback(err); }
    if (res.statusCode === 200) { return callback(null, data); }
    if (data.message) { return callback(data.message); }
    return callback(null, data);
};

/**
 * get
 * Higher level function for making API requests.
 *
 * @name get
 * @function
 * @param {String} url The request url.
 * @param {Object} options An object containing the following fields:
 *
 *  - `all` (Boolean): If `true`, then the endpoint pages will be iterated and the results will be concatenated in one array.
 *  - `opts` (Object): An object containing querystring parameters to be stringified.
 *  - `data` (Object): The POST data (if provided the request will be a POST request).
 *
 * @param {Function} callback The callback function.
 * @return {Request} The request object.
 */
GitHub.prototype.get = function (url, options, callback) {

    var self = this
      , page = 1
      , doSeq = null
      , allItems = null
      ;

    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    options = Ul.deepMerge(options, {
        opts: {}
    });

    if (options.all) {
        allItems = [];
        options.opts.per_page = 100;
        doSeq = function () {
            return self.req(url + "?" + QueryString.stringify(Ul.deepMerge({
                page: page
            }, options.opts)), options.data, function (err, res) {
                if (err) { return callback(err); }
                allItems = allItems.concat(res);
                if (!res || !res.length) {
                    return callback(null, allItems);
                }
                ++page;
                doSeq();
            });
        };
        return doSeq();
    }

    if (Object.keys(options.opts).length) {
        url += url + "?";
    }

    return self.req(url + QueryString.stringify(options.opts), options.data, callback);
};

if (typeof module === "undefined" && typeof window === "object") {
    window.GitHub = GitHub;
} else {
    module.exports = GitHub;
}
