## Documentation
You can see below the API reference of this module.

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

