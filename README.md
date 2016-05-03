
[![gh.js](http://i.imgur.com/ku5PMH1.png)](#)

# gh.js

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Travis](https://img.shields.io/travis/IonicaBizau/gh.js.svg)](https://travis-ci.org/IonicaBizau/gh.js/) [![Version](https://img.shields.io/npm/v/gh.js.svg)](https://www.npmjs.com/package/gh.js) [![Downloads](https://img.shields.io/npm/dt/gh.js.svg)](https://www.npmjs.com/package/gh.js) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Tiny GitHub API wrapper for server and client.

## :cloud: Installation
### Server
```sh
$ npm i gh.js
```

Then you can use it this way:

```js
let GitHub = require("gh.js");

let gh = new GitHub({
    token: "an optional token"
});

gh.get("users/IonicaBizau", (err, repos) => {
    console.log(err || repos);
});
```
### Client
```html
<script src="path/to/gh.js"></script>
<script>
(function () {
    var gh = new GitHub();
    gh.get("users/IonicaBizau", function (err, repos) {
        console.log(err || repos);
    });
})();
</script>
```

## :clipboard: Example



```js
// Dependencies
const GitHub = require("gh.js");

// Create a new instance
let gh = new GitHub("");
// Or for authenticated requests, send the access token
// let gh = new GitHub("access token");

gh.get("users/IonicaBizau", (err, user) => {
    console.log(err || user);
});

// Get the repositories of a user
gh.get("users/IonicaBizau/repos", {
    all: (err, pageRepos, currentPage) => {
        console.log("Fetched page " + currentPage);
    }
}, (err, repos) => {
    console.log(err || repos);
});
```

## :memo: Documentation

### `GitHub(options)`
Creates a new instance of `GitHub`.

#### Params
- **String|Object** `options`: An access token or an object containing the following options:

 - `host` (String): The GitHub API host (default: `"https://api.github.com/"`).
 - `token` (String): The GitHub token.
 - `user_agent` (String): The user agen (default: `"gh.js"`).

#### Return
- **GitHub** A new `GitHub` instance.

### `req(url, options, callback)`
Makes a request to the GitHub API.

#### Params
- **String** `url`: The request url.
- **Object** `options`: An object containing the following fields:
 - `all` (Boolean|Function): If `true`, then the endpoint pages will be
   iterated and the results will be concatenated in one array. If a function
   is provided, that function will be called when a page is fetched.
 - `opts` (Object): An object containing querystring parameters to be stringified.
 - `data` (Object): The POST data (if provided the request will be a POST request).
 - `req_options` (Object): Custom options passed to [`jsonrequest`](https://github.com/IonicaBizau/jsonrequest).
 - `method` (String): Custom method (by default: `GET` or `POST`, if there is data).
- **Function** `callback`: The callback function.

#### Return
- **Request** The request object.

### `checkResponse(err, data, res, callback)`
Checks if the response is an error or not.

#### Params
- **Error** `err`: The error value.
- **Object** `data`: The data object.
- **Response** `res`: The response object.
- **Function** `callback`: The callback option.

### `get(url, options, callback)`
Higher level function for making API requests.

#### Params
- **String** `url`: The request url.
- **Object** `options`: An object containing the following fields:
 - `all` (Boolean|Function): If `true`, then the endpoint pages will be
   iterated and the results will be concatenated in one array. If a function
   is provided, that function will be called when a page is fetched.
 - `opts` (Object): An object containing querystring parameters to be stringified.
 - `data` (Object): The POST data (if provided the request will be a POST request).
 - `req_options` (Object): Custom options passed to [`jsonrequest`](https://github.com/IonicaBizau/jsonrequest).
 - `method` (String): Custom method (by default: `GET` or `POST`, if there is data).
- **Function** `callback`: The callback function.

#### Return
- **Request** The request object.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`gh-following`](https://github.com/IonicaBizau/gh-following#readme)—Fetches the users you follow but they don't follow you and the users that follow you but you don't.
 - [`gh-notifier`](https://bitbucket.org/IonicaBizau/gh-notifier#readme)—Receive desktop notifications from your GitHub dashboard.
 - [`gh-polyglot`](https://github.com/IonicaBizau/node-gh-polyglot)—Get language stats about GitHub users and repositories.
 - [`gh-repos`](https://github.com/IonicaBizau/gh-repos#readme)—Get one or all the owner repositories from GitHub.
 - [`github-emojify`](https://github.com/IonicaBizau/github-emojifiy#readme)—Emojify your GitHub repository descriptions.
 - [`github-labeller`](https://github.com/IonicaBizau/github-labeller#readme)—Automagically create issue labels in your GitHub projects.
 - [`ship-release`](https://github.com/IonicaBizau/ship-release#readme)—Publish new versions on GitHub and npm with ease.
 - [`sort-github-user-repos`](https://github.com/IonicaBizau/sort-github-user-repos#readme)—Sort GitHub repositories by stars for user.
 - [Hubber Memory Game](https://github.com/alysonla/hubber-memory-game) by [**@alysonla**](https://github.com/alysonla/)


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
