[![gh.js](http://i.imgur.com/ku5PMH1.png)](#)

# gh.js [![Support this project][donate-now]][paypal-donations]
Tiny GitHub API wrapper for server and client.

## Installation
### Server
```sh
$ npm i gh.js
```

Then you can use it this way:

```js
var GitHub = require("gh.js");

var gh = new GitHub({
    token: "an optional token"
});

gh.get("users/IonicaBizau", function (err, repos) {
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

## Example

```js
// Dependencies
var GitHub = require("gh.js");

// Create a new instance
var gh = new GitHub();
gh.get("users/IonicaBizau", function (err, repos) {
    console.log(err || repos);
});
```

## Documentation

### `GitHub(options)`
Creates a new instance of `GitHub`.

#### Params
- **Object** `options`: An object containing the following options:
 - `host` (String): The GitHub API host (default: `"https://api.github.com/"`).
 - `token` (String): The GitHub token.
 - `user_agent` (String): The user agen (default: `"gh.js"`).

#### Return
- **GitHub** A new `GitHub` instance.

### `req(url, data, callback)`
Makes a request to the GitHub API.

#### Params
- **String** `url`: The request url.
- **Object** `data`: The data object.
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
 - `all` (Boolean): If `true`, then the endpoint pages will be iterated and the results will be concatenated in one array.
 - `opts` (Object): An object containing querystring parameters to be stringified.
 - `data` (Object): The POST data (if provided the request will be a POST request).
- **Function** `callback`: The callback function.

#### Return
- **Request** The request object.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`gh-polyglot`](https://github.com/IonicaBizau/node-gh-polyglot)

 - [`github-labeller`](https://github.com/IonicaBizau/github-labeller#readme)

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2015

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md