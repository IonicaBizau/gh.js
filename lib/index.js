"use strict"

// Dependencies
const ul = require("ul")
    , jsonRequest = require("jsonrequest")
    , queryString = require("querystring")
    , lastChar = require("last-char")

module.exports = class GitHub {

    /**
     * GitHub
     * Creates a new instance of `GitHub`.
     *
     * @name GitHub
     * @function
     * @param {String|Object} options An access token or an object containing
     * the following options:
     *
     *  - `host` (String): The GitHub API host (default: `"https://api.github.com/"`).
     *  - `token` (String): The GitHub token.
     *  - `user_agent` (String): The user agen (default: `"gh.js"`).
     *
     * @return {GitHub} A new `GitHub` instance.
     */
    constructor (options) {
        if (typeof options === "string") {
            options = {
                token: options
            }
        }
        options = options || {}
        this.host = options.host || "https://api.github.com/"
        this.token = options.token
        this.user_agent = options.user_agent || "gh.js"
    }

    /**
     * req
     * Makes a request to the GitHub API.
     *
     * @name req
     * @function
     * @param {String} url The request url.
     * @param {Object} options An object containing the following fields:
     *
     *  - `all` (Boolean|Function): If `true`, then the endpoint pages will be
     *    iterated and the results will be concatenated in one array. If a function
     *    is provided, that function will be called when a page is fetched.
     *  - `opts` (Object): An object containing querystring parameters to be stringified.
     *  - `data` (Object): The POST data (if provided the request will be a POST request).
     *  - `req_options` (Object): Custom options passed to [`jsonrequest`](https://github.com/IonicaBizau/jsonrequest).
     *  - `method` (String): Custom method (by default: `GET` or `POST`, if there is data).
     *
     * @param {Function} callback The callback function.
     * @return {Request} The request object.
     */
    req (url, options, callback) {
        let req = null
        url = this.host + url

        if (lastChar(url) === "/") {
            throw new Error("Do not add the trailing slash at the end of the string.")
        }

        options = options || {}
        options.opts = options.opts || {}

        if (typeof data === "function") {
            callback = data
            data = undefined
        }

        let qs = queryString.stringify(options.opts)
        if (qs) {
            url += "?" + qs
        }

        let opts = {
            url: url
          , data: options.data
          , headers: {
                "User-agent": this.user_agent
            }
        }

        if (this.token) {
            opts.headers["Authorization"] = `Bearer ${this.token}`
        }

        if (options.method) {
            opts.method = options.method
        }

        if (options.req_options) {
            opts = ul.deepMerge(opts, options.req_options)
        }

        return jsonRequest(opts, (err, data, res) => {
            this.checkResponse(err, data, res, callback)
        })
    }

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
    checkResponse (err, data, res, callback) {
        if (res.statusCode === 204) { return callback(null, {}, res) }
        if (typeof data === "string") {
            data = JSON.parse(data)
        }
        if (err) { return callback(err, null, res) }
        if (res.statusCode === 200) { return callback(null, data, res) }
        if (data.message) { return callback(data.message, null, res) }
        return callback(null, data, res)
    }

    /**
     * get
     * Higher level function for making API requests.
     *
     * @name get
     * @function
     * @param {String} url The request url.
     * @param {Object} options An object containing the following fields:
     *
     *  - `all` (Boolean|Function): If `true`, then the endpoint pages will be
     *    iterated and the results will be concatenated in one array. If a function
     *    is provided, that function will be called when a page is fetched.
     *  - `opts` (Object): An object containing querystring parameters to be stringified.
     *  - `data` (Object): The POST data (if provided the request will be a POST request).
     *  - `req_options` (Object): Custom options passed to [`jsonrequest`](https://github.com/IonicaBizau/jsonrequest).
     *  - `method` (String): Custom method (by default: `GET` or `POST`, if there is data).
     *
     * @param {Function} callback The callback function.
     * @return {Request} The request object.
     */
    get (url, options, callback) {

        var page = 1

        if (typeof options === "function") {
            callback = options
            options = {}
        }

        options = ul.merge(options, {
            opts: {}
        })

        if (options.all) {
            let allItems = []
            options.opts.per_page = 100
            delete options.all
            let doSeq = () => {
                options.opts.page = page
                return this.req(url, options, (err, res, _res) => {
                    if (err) { return callback(err) }
                    allItems = allItems.concat(res)
                    if (typeof options.all === "function") {
                        options.all(err, res, page, _res)
                    }
                    if (!res || !res.length) {
                        return callback(null, allItems)
                    }
                    ++page
                    doSeq()
                })
            }
            return doSeq()
        }

        return this.req(url, options, callback)
    }
}
