![gh.js](http://i.imgur.com/ku5PMH1.png)

# `gh.js`
Tiny GitHub API wrapper for server and client.

## Installation

### Server

```sh
$ npm install gh.js
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
- **Function** `callback`: The callback function.

#### Return
- **Request** The request object.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
